'use client';

import { useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import { CheckCircle2, Send } from 'lucide-react';
import { formsConfig } from '@/config/forms';
import { trackEvent } from '@/lib/track';
import { CALCULATOR_TYPE, CalcKind } from './useCalcGtm';

interface QuoteRequestFormProps {
  /** Slug-id калькулятора (для GTM-события и темы письма). */
  calculatorId: CalcKind;
  /** Заголовок калькулятора — отображается в теме email и в success-сообщении. */
  calculatorName: string;
  /** Числовое значение результата для GTM-события (например, пар/год). */
  resultAmount?: number;
  /** Печатаемое представление основного результата (для письма). */
  resultLabel: string;
  /** Структурированные параметры расчёта — попадают в payload Web3Forms. */
  payload: Record<string, string | number | boolean>;
  /** CTA-кнопка label (по умолчанию: «Запросить КП на этот объём»). */
  submitLabel?: string;
  /**
   * Оффер формы. По умолчанию — запрос КП на объём: это работает там, где
   * решение принимает снабжение (перчатки, бюджет гардеробной). Для стерильных
   * дезинфектантов A/B решение принимает QA и первый шаг — испытание
   * эффективности, а не цена; такие калькуляторы передают свой текст.
   */
  offerBadge?: string;
  offerTitle?: string;
  offerSubtitle?: string;
  /** Хвост success-сообщения: «…в течение 1 рабочего дня <successPromise>». */
  successPromise?: string;
}

export default function QuoteRequestForm({
  calculatorId,
  calculatorName,
  resultAmount,
  resultLabel,
  payload,
  submitLabel = 'Запросить КП на этот объём',
  offerBadge = 'Получить точное КП',
  offerTitle = 'КП на расчётный объём — за 24 часа',
  offerSubtitle = 'Менеджер CRS пришлёт цены, спецификацию SKU и предложит график поставки.',
  successPromise = 'и пришлёт КП на расчётный объём',
}: QuoteRequestFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [agree, setAgree] = useState(false);
  const [botcheck, setBotcheck] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const intentFired = useRef(false);
  const formStarted = useRef(false);

  /**
   * Push `calculator_form_started` on first focus of any field — раньше воронка
   * прыгала от «подвигал ползунок» сразу к «отправил форму», и мы не отличали
   * «форму не увидел» от «увидел и отказался». Это событие делит шаг надвое.
   */
  const handleFieldFocus = () => {
    if (formStarted.current) return;
    if (typeof window === 'undefined') return;
    formStarted.current = true;
    trackEvent('calculator_form_started', {
      calculator_type: CALCULATOR_TYPE[calculatorId],
      calculator: calculatorId,
      result_amount: resultAmount ?? null,
    });
  };

  /**
   * Push `calculator_quote_requested` on submit attempt — срабатывает один раз
   * за визит, даже если пользователь жмёт кнопку несколько раз. ВАЖНО: это не
   * клик по кнопке, а именно попытка отправки, включая неудачную валидацию.
   * Захватывает сводку расчёта, чтобы видеть, на какой объём пришёл лид.
   */
  const pushQuoteIntent = () => {
    if (intentFired.current) return;
    if (typeof window === 'undefined') return;
    intentFired.current = true;
    trackEvent('calculator_quote_requested', {
      calculator_type: CALCULATOR_TYPE[calculatorId],
      calculator: calculatorId,
      result_amount: resultAmount ?? null,
      result_label: resultLabel,
      ...payload,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Fire the intent event as soon as the user attempts to submit, even if
    // validation fails. We want to see «КП requested» demand independently of
    // whether the email field was valid on first try.
    pushQuoteIntent();

    if (!name.trim()) {
      setError('Укажите имя.');
      return;
    }
    // Достаточно одного канала связи. Три обязательных поля для анонимного
    // первого касания — слишком тяжёлый вход: за 30 дней 7 человек посчитали
    // расход и ни один не отправил форму.
    if (!phone.trim() && !email.trim()) {
      setError('Оставьте телефон или email — достаточно одного.');
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Укажите корректный email.');
      return;
    }
    // Узбекский номер без кода страны — 9 цифр.
    if (phone.trim() && phone.replace(/\D/g, '').length < 9) {
      setError('Укажите корректный номер телефона, например +998 90 123 45 67.');
      return;
    }
    if (!agree) {
      setError('Подтвердите согласие на обработку данных.');
      return;
    }

    if (!formsConfig.web3formsAccessKey) {
      // eslint-disable-next-line no-console
      console.warn('[QuoteRequestForm] web3formsAccessKey is empty.');
      setSuccess(true);
      return;
    }

    setLoading(true);
    try {
      // Flatten payload to strings for Web3Forms
      const flat: Record<string, string> = {};
      Object.entries(payload).forEach(([k, v]) => {
        flat[`calc_${k}`] = String(v);
      });

      const body: Record<string, string> = {
        access_key: formsConfig.web3formsAccessKey,
        subject: `Заявка с калькулятора: ${calculatorName}`,
        from_name: name,
        // replyto только при валидном email — иначе Web3Forms отклонит отправку.
        ...(email.trim() ? { replyto: email } : {}),
        name,
        email: email.trim() || '—',
        phone: phone.trim() || '—',
        company: company || '—',
        calculator: calculatorId,
        result_label: resultLabel,
        result_amount: String(resultAmount ?? ''),
        botcheck,
        page_url:
          typeof window !== 'undefined' ? window.location.href : '',
        ...flat,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data: { success?: boolean; message?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data?.message || 'Ошибка отправки формы');
      }

      // Successful Web3Forms submission — fire a separate `generate_lead`
      // event so we can split «showed intent» (button click above) vs
      // «actually delivered email». Both are useful for the funnel.
      trackEvent('generate_lead', {
        calculator_type: CALCULATOR_TYPE[calculatorId],
        calculator: calculatorId,
        result_amount: resultAmount ?? null,
      });

      setSuccess(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Произошла ошибка при отправке. Попробуйте позже.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-xl bg-emerald-50 border-2 border-emerald-200 p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-xl font-bold text-emerald-900 mb-2">
          Заявка отправлена
        </h3>
        <p className="text-[14px] text-emerald-800 leading-relaxed max-w-md mx-auto">
          Менеджер CRS свяжется с вами{' '}
          {phone.trim() && (
            <>
              по телефону <strong>{phone}</strong>
            </>
          )}
          {phone.trim() && email.trim() ? ' или ' : ''}
          {email.trim() && (
            <>
              по email <strong>{email}</strong>
            </>
          )}{' '}
          в течение 1 рабочего дня {successPromise}.
        </p>
        <p className="text-[12px] text-emerald-700/80 mt-3">
          Тем временем —{' '}
          <Link
            href="/catalog"
            className="underline hover:no-underline font-semibold"
          >
            посмотреть каталог
          </Link>{' '}
          или{' '}
          <Link
            href="/blog"
            className="underline hover:no-underline font-semibold"
          >
            прочитать статьи в базе знаний
          </Link>
          .
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full h-[44px] px-3.5 text-[15px] text-text-dark bg-white border border-surface-input rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-colors placeholder:text-text-muted';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border-2 border-brand/20 p-5 lg:p-6"
      noValidate
    >
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-wider mb-2">
          <Send size={12} /> {offerBadge}
        </div>
        <h3 className="text-xl font-bold text-text-dark leading-tight">
          {offerTitle}
        </h3>
        <p className="text-[13px] text-text-muted mt-1">{offerSubtitle}</p>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="botcheck"
        value={botcheck}
        onChange={(e) => setBotcheck(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor={`qr-name-${calculatorId}`}
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Имя *
          </label>
          <input
            id={`qr-name-${calculatorId}`}
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Ваше имя"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFieldFocus}
          />
        </div>
        <div>
          <label
            htmlFor={`qr-email-${calculatorId}`}
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Email
          </label>
          <input
            id={`qr-email-${calculatorId}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            className={inputClass}
            placeholder="email@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFieldFocus}
          />
        </div>
        <div>
          <label
            htmlFor={`qr-phone-${calculatorId}`}
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Телефон
          </label>
          <input
            id={`qr-phone-${calculatorId}`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+998 90 123 45 67"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={handleFieldFocus}
          />
        </div>
        <div>
          <label
            htmlFor={`qr-company-${calculatorId}`}
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Компания
          </label>
          <input
            id={`qr-company-${calculatorId}`}
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder="Название предприятия (опционально)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onFocus={handleFieldFocus}
          />
        </div>
      </div>

      <p className="text-[12px] text-text-muted mt-2">
        Обязательно только имя и один способ связи — телефон или email.
      </p>

      <label className="flex items-start gap-2.5 text-[12px] text-text leading-snug cursor-pointer select-none mt-4">
        <input
          type="checkbox"
          required
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 w-[16px] h-[16px] shrink-0 accent-brand cursor-pointer"
        />
        <span>
          Согласен с{' '}
          <Link
            href="/privacy"
            className="text-brand hover:underline"
            target="_blank"
            rel="noopener"
          >
            политикой обработки персональных данных
          </Link>
        </span>
      </label>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[13px]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full h-[48px] text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          'Отправка...'
        ) : (
          <>
            {submitLabel} <Send size={16} />
          </>
        )}
      </button>

      <p className="text-[11px] text-text-muted leading-relaxed text-center mt-3">
        Расчётные параметры автоматически приложатся к запросу. Без спама.
      </p>
    </form>
  );
}
