"""Логи и Sentry."""

from __future__ import annotations

import logging

from app.config import Settings


def setup_logging(settings: Settings) -> None:
    logging.basicConfig(
        level=getattr(logging, settings.log_level.upper(), logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    # aiohttp/httpx шумят на каждый запрос — оставляем только предупреждения.
    logging.getLogger("httpx").setLevel(logging.WARNING)
    logging.getLogger("httpcore").setLevel(logging.WARNING)

    if settings.sentry_dsn:
        import sentry_sdk

        sentry_sdk.init(dsn=settings.sentry_dsn, traces_sample_rate=0.0)
        logging.getLogger(__name__).info("sentry enabled")
