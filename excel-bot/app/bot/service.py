"""Сценарий «запрос → формула»: лимиты, вызов модели, запись в БД."""

from __future__ import annotations

import logging
from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

from app.config import Settings
from app.db import repo
from app.db.base import session_scope
from app.db.models import MODE_GENERATE
from app.payments.base import PaymentProvider
from app.services.claude_client import ClaudeService, FormulaAnswer, FormulaServiceError
from app.services.limits import RateLimiter
from app.services.quota import effective_plan, remaining

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class RateLimited:
    retry_after: int


@dataclass(frozen=True)
class Paywall:
    plan: str
    limit: int


@dataclass(frozen=True)
class Answered:
    answer: FormulaAnswer
    request_id: int
    remaining: int


@dataclass(frozen=True)
class Failed:
    reason: str


Outcome = RateLimited | Paywall | Answered | Failed


@dataclass
class Deps:
    """Всё, что нужно хендлерам. Кладётся в workflow_data диспетчера."""

    settings: Settings
    session_factory: async_sessionmaker[AsyncSession]
    claude: ClaudeService
    limiter: RateLimiter
    payments: PaymentProvider
    flow: FormulaFlow


class FormulaFlow:
    def __init__(
        self,
        settings: Settings,
        session_factory: async_sessionmaker[AsyncSession],
        claude: ClaudeService,
        limiter: RateLimiter,
    ) -> None:
        self._settings = settings
        self._session_factory = session_factory
        self._claude = claude
        self._limiter = limiter

    async def handle(
        self,
        tg_id: int,
        username: str | None,
        task: str,
        mode: str = MODE_GENERATE,
        *,
        variant: bool = False,
        elaborate: bool = False,
    ) -> Outcome:
        hit = await self._limiter.hit(tg_id)
        if not hit.allowed:
            return RateLimited(retry_after=hit.retry_after)

        async with session_scope(self._session_factory) as session:
            user = await repo.get_or_create_user(session, tg_id, username)
            plan = effective_plan(user)
            limit = self._settings.monthly_limit(plan)
            left = remaining(user, limit)

        if left <= 0:
            return Paywall(plan=plan, limit=limit)

        # Запрос к модели идёт вне транзакции: держать её открытой 15 секунд нельзя.
        # Из-за этого при двух одновременных сообщениях лимит можно перебрать на единицу —
        # приемлемо, частоту всё равно ограничивает RateLimiter.
        try:
            answer = await self._claude.ask(task, mode, variant=variant, elaborate=elaborate)
        except FormulaServiceError as exc:
            logger.warning("formula request failed for %s: %s", tg_id, exc)
            return Failed(reason=str(exc))

        async with session_scope(self._session_factory) as session:
            user = await repo.get_or_create_user(session, tg_id, username)
            await repo.consume_request(session, user)
            request = await repo.log_request(session, tg_id, task, answer, mode=mode)
            left = remaining(user, self._settings.monthly_limit(effective_plan(user)))
            request_id = request.id

        return Answered(answer=answer, request_id=request_id, remaining=left)
