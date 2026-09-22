"""Основной сценарий: текст задачи → формула. И режим «Проверить формулу»."""

from __future__ import annotations

import contextlib
import logging

from aiogram import F, Router
from aiogram.exceptions import TelegramBadRequest
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import Message

from app.bot import texts
from app.bot.handlers.common import send_outcome
from app.bot.service import Deps
from app.db.models import MODE_CHECK, MODE_GENERATE

logger = logging.getLogger(__name__)

router = Router(name="formula")


class Flow(StatesGroup):
    """Ожидание формулы пользователя в режиме проверки."""

    check = State()


async def run_task(message: Message, deps: Deps, task: str, mode: str = MODE_GENERATE) -> None:
    """Общий путь для текста задачи, примеров из онбординга и кнопок под ответом."""
    status = await message.answer(texts.THINKING)
    try:
        outcome = await deps.flow.handle(
            tg_id=message.chat.id,
            username=message.from_user.username if message.from_user else None,
            task=task,
            mode=mode,
        )
        await send_outcome(message, outcome, deps.settings)
    finally:
        with contextlib.suppress(TelegramBadRequest):
            await status.delete()


@router.message(F.text.startswith("/"))
async def unknown_command(message: Message) -> None:
    await message.answer("Не знаю такой команды. /help — что я умею.")


@router.message(F.text)
async def handle_text(message: Message, state: FSMContext, deps: Deps) -> None:
    task = (message.text or "").strip()
    if not task:
        await message.answer(texts.NON_TEXT)
        return

    limit = deps.settings.max_input_chars
    if len(task) > limit:
        # Длинный ввод отбиваем до обращения к API — это и деньги, и антиабьюз.
        await message.answer(texts.TOO_LONG.format(limit=limit))
        return

    mode = MODE_CHECK if await state.get_state() == Flow.check.state else MODE_GENERATE
    if mode == MODE_CHECK:
        await state.clear()

    await run_task(message, deps, task, mode=mode)


@router.message()
async def handle_non_text(message: Message) -> None:
    """Фото, файлы, голосовые — в MVP не принимаем."""
    await message.answer(texts.NON_TEXT)
