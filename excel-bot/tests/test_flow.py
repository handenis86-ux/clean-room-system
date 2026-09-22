from __future__ import annotations

from app.bot.service import Answered, Failed, FormulaFlow, Paywall, RateLimited
from app.db import repo
from app.db.base import session_scope
from app.services.claude_client import FormulaServiceError
from app.services.limits import RateLimiter
from tests.conftest import FakeClaude


def make_flow(settings, session_factory, fake_redis, claude: FakeClaude) -> FormulaFlow:
    limiter = RateLimiter(fake_redis, settings.rate_limit_per_minute)
    return FormulaFlow(settings, session_factory, claude, limiter)


async def test_happy_path_consumes_one_request(settings, session_factory, fake_redis):
    claude = FakeClaude()
    flow = make_flow(settings, session_factory, fake_redis, claude)

    outcome = await flow.handle(1, "ivan", "посчитай сумму по менеджеру")

    assert isinstance(outcome, Answered)
    assert outcome.remaining == settings.free_monthly_limit - 1
    assert claude.calls[0]["task"] == "посчитай сумму по менеджеру"

    async with session_scope(session_factory) as session:
        stored = await repo.get_request(session, outcome.request_id, 1)
        assert stored.prompt == "посчитай сумму по менеджеру"


async def test_paywall_after_free_limit(settings, session_factory, fake_redis):
    settings.free_monthly_limit = 2
    settings.rate_limit_per_minute = 100
    flow = make_flow(settings, session_factory, fake_redis, FakeClaude())

    for _ in range(2):
        assert isinstance(await flow.handle(2, None, "задача"), Answered)

    outcome = await flow.handle(2, None, "задача")
    assert isinstance(outcome, Paywall)
    assert outcome.limit == 2


async def test_pro_plan_gets_the_bigger_limit(settings, session_factory, fake_redis):
    settings.free_monthly_limit = 1
    settings.rate_limit_per_minute = 100
    flow = make_flow(settings, session_factory, fake_redis, FakeClaude())

    async with session_scope(session_factory) as session:
        user = await repo.get_or_create_user(session, 3)
        await repo.activate_pro(session, user, days=30)

    for _ in range(3):
        assert isinstance(await flow.handle(3, None, "задача"), Answered)


async def test_rate_limit_blocks_before_reaching_the_model(settings, session_factory, fake_redis):
    settings.rate_limit_per_minute = 1
    claude = FakeClaude()
    flow = make_flow(settings, session_factory, fake_redis, claude)

    await flow.handle(4, None, "задача")
    outcome = await flow.handle(4, None, "задача")

    assert isinstance(outcome, RateLimited)
    assert len(claude.calls) == 1


async def test_api_failure_does_not_consume_quota(settings, session_factory, fake_redis):
    claude = FakeClaude(error=FormulaServiceError("timeout"))
    flow = make_flow(settings, session_factory, fake_redis, claude)

    outcome = await flow.handle(5, None, "задача")
    assert isinstance(outcome, Failed)

    async with session_scope(session_factory) as session:
        user = await repo.get_or_create_user(session, 5)
        assert user.requests_used_month == 0
