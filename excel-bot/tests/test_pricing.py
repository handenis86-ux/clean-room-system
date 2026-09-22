from __future__ import annotations

from decimal import Decimal

from app.services.pricing import TokenUsage, cost_usd


def test_typical_request_matches_tz_estimate():
    # ТЗ: ~600 токенов входа и ~400 выхода ≈ 0,003 USD.
    usage = TokenUsage(input_tokens=600, output_tokens=400)
    assert cost_usd(usage, 1.0, 5.0) == Decimal("0.002600")


def test_cache_read_is_ten_times_cheaper_than_input():
    cached = cost_usd(TokenUsage(cache_read_tokens=1_000_000), 1.0, 5.0)
    plain = cost_usd(TokenUsage(input_tokens=1_000_000), 1.0, 5.0)
    assert cached == plain / 10


def test_cache_write_costs_more_than_plain_input():
    written = cost_usd(TokenUsage(cache_write_tokens=1_000_000), 1.0, 5.0)
    assert written == Decimal("1.250000")


def test_billable_input_sums_all_input_kinds():
    usage = TokenUsage(input_tokens=10, cache_read_tokens=5, cache_write_tokens=2)
    assert usage.billable_input == 17
