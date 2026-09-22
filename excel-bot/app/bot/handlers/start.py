"""Онбординг и справка."""

from __future__ import annotations

from aiogram import Router
from aiogram.filters import Command, CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from app.bot import texts
from app.bot.keyboards import examples_keyboard

router = Router(name="start")


@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.START, reply_markup=examples_keyboard())


@router.message(Command("help"))
async def cmd_help(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.HELP)
