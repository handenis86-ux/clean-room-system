"""Кнопки под ответом: другой вариант, подробнее, проверка формулы, 👎."""

from __future__ import annotations

import contextlib

from aiogram import F, Router
from aiogram.exceptions import TelegramBadRequest
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

from app.bot import texts
from app.bot.handlers.common import send_outcome
from app.bot.handlers.formula import Flow, run_task
from app.bot.keyboards import CB_ALTERNATIVE, CB_CHECK, CB_ELABORATE, CB_EXAMPLE, CB_FEEDBACK
from app.bot.service import Deps
from app.bot.texts import EXAMPLES
from app.db import repo
from app.db.base import session_scope

router = Router(name="callbacks")


def _parse_id(data: str | None) -> int | None:
    if not data or ":" not in data:
        return None
    _, _, raw = data.partition(":")
    return int(raw) if raw.isdigit() else None


@router.callback_query(F.data.startswith(f"{CB_EXAMPLE}:"))
async def cb_example(callback: CallbackQuery, deps: Deps) -> None:
    await callback.answer()
    index = _parse_id(callback.data)
    if index is None or index >= len(EXAMPLES) or not isinstance(callback.message, Message):
        return
    await run_task(callback.message, deps, EXAMPLES[index])


@router.callback_query(F.data == CB_CHECK)
async def cb_check_mode(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.set_state(Flow.check)
    if isinstance(callback.message, Message):
        await callback.message.answer(texts.CHECK_MODE_ON)


@router.callback_query(F.data.startswith(f"{CB_FEEDBACK}:"))
async def cb_feedback(callback: CallbackQuery, deps: Deps) -> None:
    request_id = _parse_id(callback.data)
    if request_id is None or not isinstance(callback.message, Message):
        await callback.answer()
        return

    async with session_scope(deps.session_factory) as session:
        await repo.set_feedback(session, request_id, callback.message.chat.id, -1)

    await callback.answer("Спасибо за отметку")
    await callback.message.answer(texts.FEEDBACK_THANKS)


async def _rerun(callback: CallbackQuery, deps: Deps, *, variant: bool, elaborate: bool) -> None:
    request_id = _parse_id(callback.data)
    if request_id is None or not isinstance(callback.message, Message):
        await callback.answer()
        return

    chat_id = callback.message.chat.id
    async with session_scope(deps.session_factory) as session:
        request = await repo.get_request(session, request_id, chat_id)
        original = request.prompt if request else None
        mode = request.mode if request else None

    if original is None:
        await callback.answer("Не нашёл исходный запрос — пришлите задачу заново", show_alert=True)
        return

    await callback.answer()
    status = await callback.message.answer(texts.THINKING)
    try:
        outcome = await deps.flow.handle(
            tg_id=chat_id,
            username=callback.from_user.username if callback.from_user else None,
            task=original,
            mode=mode,
            variant=variant,
            elaborate=elaborate,
        )
        await send_outcome(callback.message, outcome, deps.settings)
    finally:
        with contextlib.suppress(TelegramBadRequest):
            await status.delete()


@router.callback_query(F.data.startswith(f"{CB_ALTERNATIVE}:"))
async def cb_alternative(callback: CallbackQuery, deps: Deps) -> None:
    await _rerun(callback, deps, variant=True, elaborate=False)


@router.callback_query(F.data.startswith(f"{CB_ELABORATE}:"))
async def cb_elaborate(callback: CallbackQuery, deps: Deps) -> None:
    await _rerun(callback, deps, variant=False, elaborate=True)
