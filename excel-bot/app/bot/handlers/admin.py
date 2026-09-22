"""Админские команды: /stats и ручная выдача Pro."""

from __future__ import annotations

from aiogram import Router
from aiogram.filters import Command, CommandObject
from aiogram.types import Message

from app.bot.service import Deps
from app.db import repo
from app.db.base import session_scope
from app.db.models import PAYMENT_PAID

router = Router(name="admin")


def _money(value: object) -> str:
    return f"{float(value):.3f}"


@router.message(Command("stats"))
async def cmd_stats(message: Message, deps: Deps) -> None:
    if not deps.settings.is_admin(message.chat.id):
        await message.answer("Команда доступна только администраторам.")
        return

    async with session_scope(deps.session_factory) as session:
        stats = await repo.collect_stats(session)

    lines = [
        "<b>Статистика</b>",
        f"Пользователей: {stats.total_users} (Pro: {stats.pro_users})",
        f"Запросов всего: {stats.total_requests}",
        "",
        "<b>За сутки</b>",
        f"новых: {stats.day.new_users} · запросов: {stats.day.requests}"
        f" · жалоб: {stats.day.complaints} ({stats.day.complaint_share:.0%})",
        f"расход API: ${_money(stats.day.cost_usd)}"
        f" · оплат: {stats.day.payments} на {stats.day.revenue:,.0f} сум".replace(",", " "),
        "",
        "<b>За 7 дней</b>",
        f"новых: {stats.week.new_users} · запросов: {stats.week.requests}"
        f" · жалоб: {stats.week.complaints} ({stats.week.complaint_share:.0%})",
        f"расход API: ${_money(stats.week.cost_usd)}"
        f" · оплат: {stats.week.payments} на {stats.week.revenue:,.0f} сум".replace(",", " "),
    ]
    await message.answer("\n".join(lines))


@router.message(Command("grant"))
async def cmd_grant(message: Message, command: CommandObject, deps: Deps) -> None:
    """Выдать Pro вручную: /grant <tg_id> [дней].

    Нужна, пока не подключён эквайринг: так можно раздать доступ тестовой группе
    и первым платящим, которые перевели деньги вне бота.
    """
    if not deps.settings.is_admin(message.chat.id):
        await message.answer("Команда доступна только администраторам.")
        return

    args = (command.args or "").split()
    if not args or not args[0].lstrip("-").isdigit():
        await message.answer("Формат: /grant &lt;tg_id&gt; [дней]")
        return

    target_id = int(args[0])
    days = int(args[1]) if len(args) > 1 and args[1].isdigit() else 30

    async with session_scope(deps.session_factory) as session:
        user = await repo.get_or_create_user(session, target_id)
        await repo.activate_pro(session, user, days=days)
        await repo.record_payment(
            session,
            user_id=target_id,
            provider="manual",
            amount=deps.settings.pro_price_uzs,
            state=PAYMENT_PAID,
            external_id=f"manual:{target_id}:{user.plan_until:%Y%m%d%H%M%S}",
        )
        until = user.plan_until

    await message.answer(f"Pro для {target_id} активен до {until:%d.%m.%Y}.")
