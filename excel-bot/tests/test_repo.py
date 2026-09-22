from __future__ import annotations

import datetime as dt

from app.db import repo
from app.db.base import session_scope
from app.db.models import PLAN_FREE, PLAN_PRO
from app.services.quota import current_period
from tests.conftest import sample_answer


async def test_creates_user_once_and_updates_username(session_factory):
    async with session_scope(session_factory) as session:
        user = await repo.get_or_create_user(session, 100, "ivan")
        assert user.plan == PLAN_FREE
        assert user.quota_month == current_period()

    async with session_scope(session_factory) as session:
        again = await repo.get_or_create_user(session, 100, "ivan_new")
        assert again.tg_id == 100
        assert again.username == "ivan_new"


async def test_stale_counter_is_reset_on_next_visit(session_factory):
    async with session_scope(session_factory) as session:
        user = await repo.get_or_create_user(session, 101)
        user.requests_used_month = 10
        user.quota_month = dt.date(2020, 1, 1)

    async with session_scope(session_factory) as session:
        user = await repo.get_or_create_user(session, 101)
        assert user.requests_used_month == 0
        assert user.quota_month == current_period()


async def test_expired_pro_is_downgraded(session_factory):
    async with session_scope(session_factory) as session:
        user = await repo.get_or_create_user(session, 102)
        user.plan = PLAN_PRO
        user.plan_until = dt.datetime.now(dt.UTC) - dt.timedelta(days=1)

    async with session_scope(session_factory) as session:
        user = await repo.get_or_create_user(session, 102)
        assert user.plan == PLAN_FREE


async def test_activate_pro_extends_active_subscription(session_factory):
    async with session_scope(session_factory) as session:
        user = await repo.get_or_create_user(session, 103)
        await repo.activate_pro(session, user, days=30)
        first_until = user.plan_until
        await repo.activate_pro(session, user, days=30)
        assert user.plan == PLAN_PRO
        assert (user.plan_until - first_until).days == 30


async def test_request_log_and_feedback(session_factory):
    async with session_scope(session_factory) as session:
        await repo.get_or_create_user(session, 104)
        request = await repo.log_request(session, 104, "посчитай сумму", sample_answer())
        request_id = request.id
        assert request.tokens_in == 600
        assert request.tokens_out == 400

    async with session_scope(session_factory) as session:
        assert await repo.set_feedback(session, request_id, 104, -1) is True
        # Чужой запрос по id не достать и не оценить.
        assert await repo.set_feedback(session, request_id, 999, -1) is False
        assert await repo.get_request(session, request_id, 999) is None
        stored = await repo.get_request(session, request_id, 104)
        assert stored.feedback == -1
        assert stored.response_json["formula_en"].startswith("=SUMIFS")


async def test_stats_count_requests_payments_and_complaints(session_factory):
    async with session_scope(session_factory) as session:
        await repo.get_or_create_user(session, 105)
        first = await repo.log_request(session, 105, "задача 1", sample_answer())
        await repo.log_request(session, 105, "задача 2", sample_answer())
        await repo.set_feedback(session, first.id, 105, -1)
        await repo.record_payment(session, 105, "manual", 29000)

    async with session_scope(session_factory) as session:
        stats = await repo.collect_stats(session)

    assert stats.total_users == 1
    assert stats.total_requests == 2
    assert stats.day.requests == 2
    assert stats.day.complaints == 1
    assert stats.day.complaint_share == 0.5
    assert stats.day.payments == 1
    assert int(stats.day.revenue) == 29000
    assert float(stats.day.cost_usd) > 0
