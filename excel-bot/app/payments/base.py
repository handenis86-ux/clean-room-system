"""Точка расширения для эквайринга.

Эквайринг в MVP ещё не подключён (ждём договор с Payme), поэтому здесь только
интерфейс и заглушка. Когда мерчант будет готов, добавляется PaymeProvider с
методом create_invoice и обработчиком callback'ов — остальной код не меняется:
активация подписки уже живёт в repo.activate_pro + repo.record_payment.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol, runtime_checkable


@dataclass(frozen=True)
class Invoice:
    """Результат попытки выставить счёт."""

    available: bool
    url: str | None = None
    order_id: str | None = None
    message: str = ""


@runtime_checkable
class PaymentProvider(Protocol):
    name: str

    async def create_invoice(self, user_id: int, amount: int, currency: str = "UZS") -> Invoice: ...


class DisabledProvider:
    """Заглушка: приём платежей ещё не включён."""

    name = "disabled"

    def __init__(self, support_contact: str = "") -> None:
        self._support_contact = support_contact

    async def create_invoice(self, user_id: int, amount: int, currency: str = "UZS") -> Invoice:
        tail = f" Напишите {self._support_contact}." if self._support_contact else ""
        return Invoice(
            available=False,
            message=(
                "Онлайн-оплата ещё подключается — мы заканчиваем договор с платёжным "
                f"провайдером.{tail}"
            ),
        )


def get_provider(name: str, *, support_contact: str = "") -> PaymentProvider:
    """Выбор провайдера по имени из настроек."""
    if name in ("", "disabled", "none"):
        return DisabledProvider(support_contact=support_contact)
    raise ValueError(f"неизвестный провайдер оплаты: {name}")
