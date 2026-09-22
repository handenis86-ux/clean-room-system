"""FastAPI-приложение: вебхук Telegram и health-check.

Бот и бэкенд живут в одном процессе, как в ТЗ: FastAPI принимает апдейт от
Telegram и отдаёт его диспетчеру aiogram.
"""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager

import redis.asyncio as aioredis
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.fsm.storage.redis import RedisStorage
from aiogram.types import BotCommand, Update
from fastapi import FastAPI, Header, HTTPException, Request, Response

from app.bot.handlers import build_router
from app.bot.service import Deps, FormulaFlow
from app.config import Settings, get_settings
from app.db.base import create_engine, create_session_factory
from app.logging_setup import setup_logging
from app.payments import get_provider
from app.services.claude_client import ClaudeService
from app.services.limits import RateLimiter

logger = logging.getLogger(__name__)

BOT_COMMANDS = [
    BotCommand(command="start", description="Начало и примеры"),
    BotCommand(command="help", description="Как пользоваться"),
    BotCommand(command="tarif", description="Тариф и остаток лимита"),
    BotCommand(command="pay", description="Оплата подписки"),
]


def build_deps(settings: Settings, redis: aioredis.Redis) -> Deps:
    engine = create_engine(settings.database_url)
    session_factory = create_session_factory(engine)
    claude = ClaudeService(
        api_key=settings.anthropic_api_key,
        model=settings.claude_model,
        max_tokens=settings.claude_max_tokens,
        temperature=settings.claude_temperature,
        timeout_seconds=settings.claude_timeout_seconds,
        input_price_per_mtok=settings.claude_input_price_per_mtok,
        output_price_per_mtok=settings.claude_output_price_per_mtok,
    )
    limiter = RateLimiter(redis, settings.rate_limit_per_minute)
    flow = FormulaFlow(settings, session_factory, claude, limiter)
    return Deps(
        settings=settings,
        session_factory=session_factory,
        claude=claude,
        limiter=limiter,
        payments=get_provider(settings.payment_provider, support_contact=settings.support_contact),
        flow=flow,
    )


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or get_settings()
    setup_logging(settings)

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        redis = aioredis.from_url(settings.redis_url, decode_responses=True)
        deps = build_deps(settings, redis)

        bot = Bot(
            token=settings.bot_token,
            default=DefaultBotProperties(parse_mode=ParseMode.HTML),
        )
        dispatcher = Dispatcher(storage=RedisStorage(redis))
        dispatcher.include_router(build_router())
        dispatcher["deps"] = deps

        app.state.bot = bot
        app.state.dispatcher = dispatcher
        app.state.redis = redis

        if settings.webhook_base:
            await bot.set_webhook(
                settings.webhook_url,
                secret_token=settings.webhook_secret,
                drop_pending_updates=True,
                allowed_updates=["message", "callback_query"],
            )
            logger.info("webhook set to %s", settings.webhook_url)
        else:
            logger.warning("WEBHOOK_BASE не задан — вебхук не выставлен")

        await bot.set_my_commands(BOT_COMMANDS)

        try:
            yield
        finally:
            await bot.session.close()
            await redis.aclose()

    app = FastAPI(title="Excel Formula Bot", lifespan=lifespan, docs_url=None, redoc_url=None)

    @app.get("/healthz")
    async def healthz() -> dict[str, str]:
        return {"status": "ok"}

    @app.post(settings.webhook_path)
    async def telegram_webhook(
        request: Request,
        x_telegram_bot_api_secret_token: str = Header(default=""),
    ) -> Response:
        # Путь угадать нельзя, но Telegram ещё и присылает секрет в заголовке —
        # проверяем оба, иначе чужой POST дойдёт до диспетчера.
        if x_telegram_bot_api_secret_token != settings.webhook_secret:
            raise HTTPException(status_code=403, detail="bad secret token")

        payload = await request.json()
        update = Update.model_validate(payload, context={"bot": request.app.state.bot})
        await request.app.state.dispatcher.feed_update(request.app.state.bot, update)
        return Response(status_code=200)

    return app


app = create_app()
