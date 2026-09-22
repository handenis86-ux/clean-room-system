"""Роутеры бота. Порядок важен: команды и колбэки раньше общего текстового хендлера."""

from aiogram import F, Router

from app.bot.handlers import admin, callbacks, formula, start, tariff


def build_router() -> Router:
    router = Router(name="root")
    # Бот рассчитан на личную переписку: в группе chat.id != пользователю,
    # а значит лимиты и история поехали бы не на того.
    router.message.filter(F.chat.type == "private")
    router.callback_query.filter(F.message.chat.type == "private")
    router.include_router(start.router)
    router.include_router(tariff.router)
    router.include_router(admin.router)
    router.include_router(callbacks.router)
    router.include_router(formula.router)
    return router


__all__ = ["build_router"]
