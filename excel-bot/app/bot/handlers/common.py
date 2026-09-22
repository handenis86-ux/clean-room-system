"""Общая отправка результата сценария пользователю."""

from __future__ import annotations

from aiogram.types import Message

from app.bot import texts
from app.bot.keyboards import answer_keyboard, paywall_keyboard
from app.bot.service import Answered, Failed, Outcome, Paywall, RateLimited
from app.config import Settings
from app.services.formatting import render_answer


async def send_outcome(message: Message, outcome: Outcome, settings: Settings) -> None:
    if isinstance(outcome, RateLimited):
        await message.answer(texts.RATE_LIMITED.format(seconds=max(outcome.retry_after, 1)))
        return

    if isinstance(outcome, Paywall):
        await message.answer(
            texts.PAYWALL.format(
                limit=settings.free_monthly_limit,
                price=f"{settings.pro_price_uzs:,}".replace(",", " "),
                pro_limit=settings.pro_monthly_limit,
            ),
            reply_markup=paywall_keyboard(),
        )
        return

    if isinstance(outcome, Failed):
        await message.answer(texts.ERROR)
        return

    if isinstance(outcome, Answered):
        await message.answer(
            render_answer(outcome.answer, remaining=outcome.remaining),
            reply_markup=answer_keyboard(outcome.request_id),
        )
