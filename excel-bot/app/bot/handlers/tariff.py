"""Тариф, остаток лимита и оплата."""

from __future__ import annotations

from aiogram import F, Router
from aiogram.filters import Command
from aiogram.types import CallbackQuery, Message

from app.bot import texts
from app.bot.keyboards import CB_PAY, paywall_keyboard
from app.bot.service import Deps
from app.db import repo
from app.db.base import session_scope
from app.db.models import PLAN_PRO
from app.services.quota import effective_plan, remaining

router = Router(name="tariff")

_PLAN_TITLES = {"free": "Free", "pro": "Pro"}


def _format_price(value: int) -> str:
    return f"{value:,}".replace(",", " ")


@router.message(Command("tarif", "tariff"))
async def cmd_tariff(message: Message, deps: Deps) -> None:
    settings = deps.settings
    async with session_scope(deps.session_factory) as session:
        user = await repo.get_or_create_user(
            session, message.chat.id, message.from_user.username if message.from_user else None
        )
        plan = effective_plan(user)
        limit = settings.monthly_limit(plan)
        left = remaining(user, limit)
        plan_until = user.plan_until

    until_line = ""
    if plan == PLAN_PRO and plan_until:
        until_line = f"<b>Подписка активна до:</b> {plan_until:%d.%m.%Y}\n"

    await message.answer(
        texts.TARIFF.format(
            plan=_PLAN_TITLES.get(plan, plan),
            remaining=left,
            limit=limit,
            plan_until=until_line,
            free_limit=settings.free_monthly_limit,
            price=_format_price(settings.pro_price_uzs),
            pro_limit=settings.pro_monthly_limit,
        )
    )
    await message.answer(texts.OFFER_PENDING)


async def _send_invoice(target: Message, deps: Deps) -> None:
    settings = deps.settings
    invoice = await deps.payments.create_invoice(target.chat.id, settings.pro_price_uzs)
    if invoice.available and invoice.url:
        await target.answer(f"Счёт на {_format_price(settings.pro_price_uzs)} сум: {invoice.url}")
    else:
        await target.answer(invoice.message)


@router.message(Command("pay"))
async def cmd_pay(message: Message, deps: Deps) -> None:
    await _send_invoice(message, deps)


@router.callback_query(F.data == CB_PAY)
async def cb_pay(callback: CallbackQuery, deps: Deps) -> None:
    await callback.answer()
    if isinstance(callback.message, Message):
        await _send_invoice(callback.message, deps)


@router.message(Command("offer"))
async def cmd_offer(message: Message) -> None:
    await message.answer(texts.OFFER_PENDING, reply_markup=paywall_keyboard())
