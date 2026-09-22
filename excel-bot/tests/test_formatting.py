from __future__ import annotations

from app.services.formatting import TELEGRAM_MESSAGE_LIMIT, render_answer
from tests.conftest import sample_answer


def test_renders_both_locales_and_remaining():
    text = render_answer(sample_answer(), remaining=7)
    assert "Формула (русский Excel)" in text
    assert "Формула (английский Excel)" in text
    assert "Осталось запросов в этом месяце: 7" in text


def test_escapes_html_in_model_output():
    text = render_answer(sample_answer(explanation="сравните <b>A1</b> & B1"))
    assert "&lt;b&gt;A1&lt;/b&gt; &amp; B1" in text


def test_skips_formula_block_when_model_refused():
    answer = sample_answer(formula_ru="", formula_en="", explanation="Я умею только формулы Excel.")
    text = render_answer(answer)
    assert "Формула (русский Excel)" not in text
    assert "Я умею только формулы Excel." in text


def test_fits_telegram_limit():
    answer = sample_answer(explanation="очень длинный текст " * 1000)
    assert len(render_answer(answer, remaining=3)) <= TELEGRAM_MESSAGE_LIMIT
