"""Операции с БД: пользователи, запросы, оплаты, статистика."""

from __future__ import annotations

import datetime as dt
from dataclasses import dataclass
from decimal import Decimal

from sqlalchemy import func, select, update
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.dialects.sqlite import insert as sqlite_insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import (
    MODE_GENERATE,
    PAYMENT_PAID,
    PLAN_FREE,
    PLAN_PRO,
    Payment,
    Request,
    User,
)
from app.services.claude_client import FormulaAnswer
from app.services.quota import as_utc, current_period, effective_plan, reset_if_new_month


async def get_or_create_user(
    session: AsyncSession,
    tg_id: int,
    username: str | None = None,
    lang: str = "ru",
) -> User:
    """Возвращает пользователя, попутно приводя его состояние в актуальное:
    сбрасывает счётчик в новом месяце и снимает Pro, если подписка истекла."""
    # INSERT ... ON CONFLICT DO NOTHING: два сообщения подряд от нового пользователя
    # не должны падать на дубликате первичного ключа.
    insert = pg_insert if session.get_bind().dialect.name == "postgresql" else sqlite_insert
    stmt = (
        insert(User)
        .values(tg_id=tg_id, username=username, lang=lang, quota_month=current_period())
        .on_conflict_do_nothing(index_elements=[User.tg_id])
    )
    await session.execute(stmt)

    user = await session.get(User, tg_id, with_for_update=True)
    assert user is not None  # только что вставили или уже был

    if username and user.username != username:
        user.username = username

    reset_if_new_month(user)

    if user.plan == PLAN_PRO and effective_plan(user) == PLAN_FREE:
        user.plan = PLAN_FREE

    await session.flush()
    return user


async def consume_request(session: AsyncSession, user: User) -> None:
    """Списывает один запрос из месячного лимита."""
    user.requests_used_month += 1
    await session.flush()


async def log_request(
    session: AsyncSession,
    user_id: int,
    prompt: str,
    answer: FormulaAnswer,
    mode: str = MODE_GENERATE,
) -> Request:
    request = Request(
        user_id=user_id,
        mode=mode,
        prompt=prompt,
        response_json=answer.as_dict(),
        tokens_in=answer.usage.billable_input,
        tokens_out=answer.usage.output_tokens,
        cost_usd=answer.cost,
        latency_ms=answer.latency_ms,
    )
    session.add(request)
    await session.flush()
    return request


async def get_request(session: AsyncSession, request_id: int, user_id: int) -> Request | None:
    """Запрос конкретного пользователя — чужой по id достать нельзя."""
    stmt = select(Request).where(Request.id == request_id, Request.user_id == user_id)
    return (await session.execute(stmt)).scalar_one_or_none()


async def set_feedback(session: AsyncSession, request_id: int, user_id: int, value: int) -> bool:
    stmt = (
        update(Request)
        .where(Request.id == request_id, Request.user_id == user_id)
        .values(feedback=value)
    )
    result = await session.execute(stmt)
    return bool(result.rowcount)


async def activate_pro(session: AsyncSession, user: User, days: int = 30) -> User:
    """Включает Pro на days дней. Если подписка ещё действует — продлевает её."""
    now = dt.datetime.now(dt.UTC)
    plan_until = as_utc(user.plan_until)
    base = plan_until if plan_until and plan_until > now else now
    user.plan = PLAN_PRO
    user.plan_until = base + dt.timedelta(days=days)
    await session.flush()
    return user


async def record_payment(
    session: AsyncSession,
    user_id: int,
    provider: str,
    amount: Decimal | int,
    currency: str = "UZS",
    state: str = PAYMENT_PAID,
    external_id: str | None = None,
) -> Payment:
    payment = Payment(
        user_id=user_id,
        provider=provider,
        amount=Decimal(amount),
        currency=currency,
        state=state,
        external_id=external_id,
        paid_at=dt.datetime.now(dt.UTC) if state == PAYMENT_PAID else None,
    )
    session.add(payment)
    await session.flush()
    return payment


@dataclass
class WindowStats:
    new_users: int = 0
    requests: int = 0
    complaints: int = 0
    cost_usd: Decimal = Decimal("0")
    payments: int = 0
    revenue: Decimal = Decimal("0")

    @property
    def complaint_share(self) -> float:
        return self.complaints / self.requests if self.requests else 0.0


@dataclass
class Stats:
    total_users: int
    pro_users: int
    total_requests: int
    day: WindowStats
    week: WindowStats


async def _window_stats(session: AsyncSession, since: dt.datetime) -> WindowStats:
    new_users = await session.scalar(
        select(func.count()).select_from(User).where(User.created_at >= since)
    )
    row = (
        await session.execute(
            select(
                func.count(Request.id),
                func.coalesce(func.sum(Request.cost_usd), 0),
                func.count(Request.id).filter(Request.feedback < 0),
            ).where(Request.created_at >= since)
        )
    ).one()
    pay_row = (
        await session.execute(
            select(func.count(Payment.id), func.coalesce(func.sum(Payment.amount), 0)).where(
                Payment.state == PAYMENT_PAID, Payment.created_at >= since
            )
        )
    ).one()

    return WindowStats(
        new_users=new_users or 0,
        requests=row[0] or 0,
        cost_usd=Decimal(row[1] or 0),
        complaints=row[2] or 0,
        payments=pay_row[0] or 0,
        revenue=Decimal(pay_row[1] or 0),
    )


async def collect_stats(session: AsyncSession, now: dt.datetime | None = None) -> Stats:
    now = now or dt.datetime.now(dt.UTC)
    total_users = await session.scalar(select(func.count()).select_from(User)) or 0
    pro_users = (
        await session.scalar(
            select(func.count())
            .select_from(User)
            .where(User.plan == PLAN_PRO, User.plan_until > now)
        )
        or 0
    )
    total_requests = await session.scalar(select(func.count()).select_from(Request)) or 0

    return Stats(
        total_users=total_users,
        pro_users=pro_users,
        total_requests=total_requests,
        day=await _window_stats(session, now - dt.timedelta(days=1)),
        week=await _window_stats(session, now - dt.timedelta(days=7)),
    )
