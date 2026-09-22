from __future__ import annotations

import datetime as dt

from app.db.models import PLAN_FREE, PLAN_PRO, User
from app.services.quota import current_period, effective_plan, remaining, reset_if_new_month


def make_user(**overrides) -> User:
    defaults = {
        "tg_id": 1,
        "plan": PLAN_FREE,
        "plan_until": None,
        "requests_used_month": 0,
        "quota_month": dt.date(2026, 3, 1),
    }
    defaults.update(overrides)
    return User(**defaults)


def test_current_period_is_first_day_of_month():
    assert current_period(dt.date(2026, 3, 15)) == dt.date(2026, 3, 1)


def test_counter_resets_on_new_month():
    user = make_user(requests_used_month=10, quota_month=dt.date(2026, 2, 1))
    assert reset_if_new_month(user, dt.date(2026, 3, 1)) is True
    assert user.requests_used_month == 0
    assert user.quota_month == dt.date(2026, 3, 1)


def test_counter_survives_within_month():
    user = make_user(requests_used_month=7)
    assert reset_if_new_month(user, dt.date(2026, 3, 20)) is False
    assert user.requests_used_month == 7


def test_remaining_ignores_stale_counter():
    user = make_user(requests_used_month=10, quota_month=dt.date(2026, 2, 1))
    assert remaining(user, 10, dt.date(2026, 3, 1)) == 10


def test_remaining_never_negative():
    user = make_user(requests_used_month=12)
    assert remaining(user, 10, dt.date(2026, 3, 5)) == 0


def test_expired_pro_falls_back_to_free():
    now = dt.datetime(2026, 3, 15, tzinfo=dt.UTC)
    active = make_user(plan=PLAN_PRO, plan_until=now + dt.timedelta(days=1))
    expired = make_user(plan=PLAN_PRO, plan_until=now - dt.timedelta(seconds=1))
    assert effective_plan(active, now) == PLAN_PRO
    assert effective_plan(expired, now) == PLAN_FREE
    assert effective_plan(make_user(plan=PLAN_PRO, plan_until=None), now) == PLAN_FREE
