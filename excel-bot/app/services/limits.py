"""Ограничение частоты запросов на пользователя (Redis)."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol


class RedisLike(Protocol):
    async def incr(self, name: str) -> int: ...
    async def expire(self, name: str, time: int) -> bool: ...
    async def ttl(self, name: str) -> int: ...


@dataclass(frozen=True)
class RateLimitResult:
    allowed: bool
    retry_after: int = 0


class RateLimiter:
    """Счётчик запросов в скользящем окне длиной window секунд.

    Реализация простая (INCR + EXPIRE на первом обращении): окно фиксированное,
    для антиабьюза этого достаточно и стоит один round-trip.
    """

    def __init__(self, redis: RedisLike, limit: int, window: int = 60, prefix: str = "rl") -> None:
        self._redis = redis
        self._limit = limit
        self._window = window
        self._prefix = prefix

    def _key(self, tg_id: int) -> str:
        return f"{self._prefix}:{tg_id}"

    async def hit(self, tg_id: int) -> RateLimitResult:
        key = self._key(tg_id)
        count = await self._redis.incr(key)
        if count == 1:
            await self._redis.expire(key, self._window)
        if count <= self._limit:
            return RateLimitResult(allowed=True)

        ttl = await self._redis.ttl(key)
        if ttl is None or ttl < 0:
            # Ключ без TTL — значит EXPIRE не доехал; восстанавливаем окно.
            await self._redis.expire(key, self._window)
            ttl = self._window
        return RateLimitResult(allowed=False, retry_after=ttl)
