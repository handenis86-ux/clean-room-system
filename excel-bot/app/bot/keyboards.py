"""Инлайн-клавиатуры."""

from __future__ import annotations

from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder

from app.bot.texts import EXAMPLES

CB_EXAMPLE = "ex"
CB_ALTERNATIVE = "alt"
CB_ELABORATE = "more"
CB_CHECK = "check"
CB_FEEDBACK = "fb"
CB_PAY = "pay"


def examples_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for index, example in enumerate(EXAMPLES):
        title = example if len(example) <= 40 else example[:39] + "…"
        builder.row(
            InlineKeyboardButton(text=f"Пример: {title}", callback_data=f"{CB_EXAMPLE}:{index}")
        )
    return builder.as_markup()


def answer_keyboard(request_id: int) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(
            text="🔁 Другой вариант", callback_data=f"{CB_ALTERNATIVE}:{request_id}"
        ),
        InlineKeyboardButton(text="📖 Подробнее", callback_data=f"{CB_ELABORATE}:{request_id}"),
    )
    builder.row(InlineKeyboardButton(text="🧪 Проверить формулу", callback_data=CB_CHECK))
    builder.row(
        InlineKeyboardButton(text="👎 Не сработало", callback_data=f"{CB_FEEDBACK}:{request_id}")
    )
    return builder.as_markup()


def paywall_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text="💳 Оплатить Pro", callback_data=CB_PAY))
    return builder.as_markup()
