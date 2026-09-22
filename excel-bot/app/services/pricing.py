"""Себестоимость запроса к Claude API."""

from __future__ import annotations

from dataclasses import dataclass
from decimal import ROUND_HALF_UP, Decimal

MTOK = Decimal(1_000_000)


@dataclass(frozen=True)
class TokenUsage:
    input_tokens: int = 0
    output_tokens: int = 0
    cache_read_tokens: int = 0
    cache_write_tokens: int = 0

    @property
    def billable_input(self) -> int:
        """Для отчётности «сколько всего токенов ушло на вход»."""
        return self.input_tokens + self.cache_read_tokens + self.cache_write_tokens


def cost_usd(
    usage: TokenUsage,
    input_price_per_mtok: float,
    output_price_per_mtok: float,
) -> Decimal:
    """Стоимость одного запроса.

    Кэшированный ввод тарифицируется иначе: запись в кэш — 1.25x цены ввода,
    чтение из кэша — 0.1x. Без этого себестоимость в метриках завышается.
    """
    in_price = Decimal(str(input_price_per_mtok))
    out_price = Decimal(str(output_price_per_mtok))

    total = (
        Decimal(usage.input_tokens) * in_price
        + Decimal(usage.cache_write_tokens) * in_price * Decimal("1.25")
        + Decimal(usage.cache_read_tokens) * in_price * Decimal("0.1")
        + Decimal(usage.output_tokens) * out_price
    ) / MTOK

    return total.quantize(Decimal("0.000001"), rounding=ROUND_HALF_UP)
