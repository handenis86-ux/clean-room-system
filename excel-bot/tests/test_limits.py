from __future__ import annotations

from app.services.limits import RateLimiter


async def test_allows_up_to_limit(fake_redis):
    limiter = RateLimiter(fake_redis, limit=5)
    results = [await limiter.hit(1) for _ in range(5)]
    assert all(result.allowed for result in results)


async def test_blocks_after_limit_and_reports_retry_after(fake_redis):
    limiter = RateLimiter(fake_redis, limit=5, window=60)
    for _ in range(5):
        await limiter.hit(1)
    blocked = await limiter.hit(1)
    assert blocked.allowed is False
    assert blocked.retry_after == 60


async def test_counters_are_per_user(fake_redis):
    limiter = RateLimiter(fake_redis, limit=1)
    assert (await limiter.hit(1)).allowed is True
    assert (await limiter.hit(2)).allowed is True
    assert (await limiter.hit(1)).allowed is False


async def test_restores_window_when_ttl_missing(fake_redis):
    limiter = RateLimiter(fake_redis, limit=1, window=30)
    await limiter.hit(1)
    fake_redis.ttls.clear()  # ключ без TTL — EXPIRE не доехал
    blocked = await limiter.hit(1)
    assert blocked.retry_after == 30
    assert fake_redis.ttls["rl:1"] == 30
