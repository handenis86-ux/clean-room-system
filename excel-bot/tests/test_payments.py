from __future__ import annotations

import pytest

from app.payments import DisabledProvider, get_provider


async def test_disabled_provider_explains_that_payments_are_not_live():
    provider = get_provider("disabled", support_contact="@support")
    assert isinstance(provider, DisabledProvider)

    invoice = await provider.create_invoice(1, 29000)
    assert invoice.available is False
    assert invoice.url is None
    assert "@support" in invoice.message


async def test_provider_without_support_contact_still_answers():
    invoice = await get_provider("").create_invoice(1, 29000)
    assert invoice.available is False
    assert invoice.message


def test_unknown_provider_is_rejected():
    with pytest.raises(ValueError):
        get_provider("payme")
