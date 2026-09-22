"""Месячные лимиты: чистые функции, без обращений к БД."""

from __future__ import annotations

import datetime as dt
from typing import Protocol

from app.db.models import PLAN_FREE, PLAN_PRO


class QuotaUser(Protocol):
    """Минимум полей от User, который нужен лимитам (удобно для тестов)."""

    plan: str
    plan_until: dt.datetime | None
    requests_used_month: int
    quota_month: dt.date


def as_utc(value: dt.datetime | None) -> dt.datetime | None:
    """Приводит момент времени к UTC.

    PostgreSQL отдаёт timestamptz с таймзоной, но значение может прийти и наивным
    (другой драйвер, тесты на sqlite) — тогда считаем его UTC, иначе сравнение падает.
    """
    if value is None:
        return None
    return value.replace(tzinfo=dt.UTC) if value.tzinfo is None else value.astimezone(dt.UTC)


def current_period(today: dt.date | None = None) -> dt.date:
    """Первое число текущего месяца — ключ периода для счётчика запросов."""
    today = today or dt.date.today()
    return today.replace(day=1)


def effective_plan(user: QuotaUser, now: dt.datetime | None = None) -> str:
    """Pro считается активным, только пока не истёк plan_until."""
    if user.plan != PLAN_PRO:
        return PLAN_FREE
    plan_until = as_utc(user.plan_until)
    if plan_until is None:
        return PLAN_FREE
    now = as_utc(now) or dt.datetime.now(dt.UTC)
    return PLAN_PRO if plan_until > now else PLAN_FREE


def reset_if_new_month(user: QuotaUser, today: dt.date | None = None) -> bool:
    """Обнуляет счётчик, если он остался с прошлого месяца. True — если обнулили."""
    period = current_period(today)
    if user.quota_month == period:
        return False
    user.quota_month = period
    user.requests_used_month = 0
    return True


def remaining(user: QuotaUser, limit: int, today: dt.date | None = None) -> int:
    """Сколько запросов осталось в текущем месяце (счётчик прошлого месяца не в счёт)."""
    used = 0 if user.quota_month != current_period(today) else user.requests_used_month
    return max(limit - used, 0)
