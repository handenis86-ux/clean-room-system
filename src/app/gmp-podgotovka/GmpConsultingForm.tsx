'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { CheckCircle2, Send, AlertCircle, Phone } from 'lucide-react';
import { formsConfig } from '@/config/forms';
import { siteConfig, phoneTel } from '@/config/site';
import { trackEvent } from '@/lib/track';

/**
 * GMP-consulting lead form. Uses the same Web3Forms access key as
 * QuoteRequestForm — single inbox for all leads. Fires `generate_lead`
 * GTM event with `method: 'gmp_consulting_form'` BEFORE the network call
 * so we capture intent even if Web3Forms times out.
 */

const productionTypes = [
  'Твёрдые лекарственные формы',
  'Стерильные лекарственные формы / парентеральные',
  'Лиофилизаты',
  'Биотехнологические препараты',
  'Медицинские изделия',
  'Другое',
] as const;

const targetDates = [
  'До конца 2026 г.',
  'Q1 2027 (январь-март)',
  'Q2 2027 (апрель-июнь)',
  'Q3+ 2027 или позже',
  'Уже сертифицированы — нужна поддержка',
  'Пока изучаем вопрос',
] as const;

const helpOptions = [
  'Обучение QA-персонала',
  'Подготовка SOP и документации',
  'Pre-audit (внутренний аудит готовности)',
  'Mock inspection',
  'Сопровождение на GMP-инспекции',
  'CCS (Contamination Control Strategy)',
  'Supplier qualification расходников',
  'Бесплатная 30-минутная консультация',
] as const;

interface FormState {
  name: string;
  phone: string;
  email: string;
  company: string;
  position: string;
  productionType: string;
  targetDate: string;
  helpNeeded: string[];
  comment: string;
  agree: boolean;
  botcheck: string;
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  company: '',
  position: '',
  productionType: '',
  targetDate: '',
  helpNeeded: [],
  comment: '',
  agree: false,
  botcheck: '',
};

export default function GmpConsultingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleHelp = (option: string) => {
    setForm((prev) => {
      const has = prev.helpNeeded.includes(option);
      return {
        ...prev,
        helpNeeded: has
          ? prev.helpNeeded.filter((o) => o !== option)
          : [...prev.helpNeeded, option],
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError('Укажите ваше имя.');
      return;
    }
    if (!form.phone.trim()) {
      setError('Укажите телефон.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Укажите корректный email.');
      return;
    }
    if (!form.company.trim()) {
      setError('Укажите название компании.');
      return;
    }
    if (!form.productionType) {
      setError('Выберите тип производства.');
      return;
    }
    if (!form.targetDate) {
      setError('Выберите целевую дату GMP-сертификации.');
      return;
    }
    if (form.helpNeeded.length === 0) {
      setError('Выберите хотя бы один пункт «Какая помощь нужна».');
      return;
    }
    if (!form.agree) {
      setError('Подтвердите согласие на обработку персональных данных.');
      return;
    }

    // Fire BEFORE network call so we capture intent even on timeout.
    trackEvent('generate_lead', {
      method: 'gmp_consulting_form',
      production_type: form.productionType,
      target_date: form.targetDate,
    });

    if (!formsConfig.web3formsAccessKey) {
      // eslint-disable-next-line no-console
      console.warn('[GmpConsultingForm] web3formsAccessKey is empty.');
      setSuccess(true);
      return;
    }

    setLoading(true);
    try {
      const body: Record<string, string> = {
        access_key: formsConfig.web3formsAccessKey,
        subject: `Заявка на GMP-консалтинг: ${form.company}`,
        from_name: form.name,
        replyto: form.email,
        name: form.name,
        phone: form.phone,
        email: form.email,
        company: form.company,
        position: form.position || '—',
        production_type: form.productionType,
        target_date: form.targetDate,
        help_needed: form.helpNeeded.join(', '),
        comment: form.comment || '—',
        form_source: 'gmp_consulting_landing',
        botcheck: form.botcheck,
        page_url:
          typeof window !== 'undefined' ? window.location.href : '',
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

      setSuccess(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Произошла ошибка при отправке. Попробуйте позже или позвоните напрямую.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        id="lead-form"
        className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-6 lg:p-8 max-w-[640px] mx-auto"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold text-emerald-900 mb-3">
          Спасибо! Заявка отправлена
        </h3>
        <p className="text-[15px] text-emerald-800 leading-relaxed mb-5">
          Свяжемся с вами в течение 24 часов по телефону{' '}
          <strong>{form.phone}</strong> или email{' '}
          <strong>{form.email}</strong>. А пока — подборка наших гайдов по GMP:
        </p>
        <ul className="space-y-2.5">
          <li>
            <Link
              href="/compliance/gmp-2027-uzbekistan"
              className="inline-flex items-center gap-2 text-emerald-900 font-semibold hover:underline"
            >
              › GMP в Узбекистане 2027 — reference-hub
            </Link>
          </li>
          <li>
            <Link
              href="/resources/gmp-audit-checklist"
              className="inline-flex items-center gap-2 text-emerald-900 font-semibold hover:underline"
            >
              › GMP audit checklist (PDF)
            </Link>
          </li>
          <li>
            <Link
              href="/blog/gmp-uzbekistan-2027-podgotovka"
              className="inline-flex items-center gap-2 text-emerald-900 font-semibold hover:underline"
            >
              › Подготовка к GMP 2027 — блог-обзор
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  const inputClass =
    'w-full h-[44px] px-3.5 text-[15px] text-text-dark bg-white border border-surface-input rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-colors placeholder:text-text-muted';
  const selectClass = inputClass + ' appearance-none';

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border-2 border-brand/20 shadow-lg p-5 lg:p-7 max-w-[640px] mx-auto"
      noValidate
    >
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-wider mb-2">
          <Send size={12} /> Заявка на GMP-консалтинг
        </div>
        <h3 className="text-[22px] lg:text-[26px] font-extrabold text-text-dark leading-tight">
          Получите план подготовки к GMP-инспекции
        </h3>
        <p className="text-[14px] text-text-muted mt-1.5 leading-relaxed">
          Заполните форму — свяжемся в течение 24 часов и согласуем 30-минутный
          диагностический созвон. Бесплатно.
        </p>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="botcheck"
        value={form.botcheck}
        onChange={(e) => setField('botcheck', e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="gmp-name"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Имя *
          </label>
          <input
            id="gmp-name"
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Ваше имя"
            required
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="gmp-phone"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Телефон * <span className="text-text-muted">(+998…)</span>
          </label>
          <input
            id="gmp-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+998 __ ___-__-__"
            required
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="gmp-email"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Email *
          </label>
          <input
            id="gmp-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={inputClass}
            placeholder="email@company.com"
            required
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="gmp-company"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Компания *
          </label>
          <input
            id="gmp-company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder="Название предприятия"
            required
            value={form.company}
            onChange={(e) => setField('company', e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="gmp-position"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Должность
          </label>
          <input
            id="gmp-position"
            type="text"
            autoComplete="organization-title"
            className={inputClass}
            placeholder="QA-директор, регуляторный специалист..."
            value={form.position}
            onChange={(e) => setField('position', e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="gmp-production-type"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Тип производства *
          </label>
          <select
            id="gmp-production-type"
            className={selectClass}
            required
            value={form.productionType}
            onChange={(e) => setField('productionType', e.target.value)}
          >
            <option value="" disabled>
              Выберите…
            </option>
            {productionTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="gmp-target-date"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Целевая дата сертификации *
          </label>
          <select
            id="gmp-target-date"
            className={selectClass}
            required
            value={form.targetDate}
            onChange={(e) => setField('targetDate', e.target.value)}
          >
            <option value="" disabled>
              Выберите…
            </option>
            {targetDates.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="block text-[12px] font-medium text-text-dark mb-2">
          Какая помощь нужна * (можно выбрать несколько)
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {helpOptions.map((option) => {
            const checked = form.helpNeeded.includes(option);
            return (
              <label
                key={option}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-colors text-[13px] leading-snug ${
                  checked
                    ? 'border-brand bg-brand-light/30 text-brand-dark font-semibold'
                    : 'border-surface-input bg-white text-text hover:border-brand/40'
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 w-[16px] h-[16px] shrink-0 accent-brand cursor-pointer"
                  checked={checked}
                  onChange={() => toggleHelp(option)}
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5">
        <label
          htmlFor="gmp-comment"
          className="block text-[12px] font-medium text-text-dark mb-1"
        >
          Комментарий
        </label>
        <textarea
          id="gmp-comment"
          className={
            inputClass.replace('h-[44px]', 'min-h-[88px]') + ' py-2.5'
          }
          placeholder="Опишите ситуацию: что уже сделано, в чём затруднения…"
          value={form.comment}
          onChange={(e) => setField('comment', e.target.value)}
        />
      </div>

      <label className="flex items-start gap-2.5 text-[12px] text-text leading-snug cursor-pointer select-none mt-4">
        <input
          type="checkbox"
          required
          checked={form.agree}
          onChange={(e) => setField('agree', e.target.checked)}
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
        <div className="mt-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[13px]">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-red-600">
              Если форма не отправляется — позвоните напрямую:{' '}
              <a href={`tel:${phoneTel}`} className="underline font-semibold">
                {siteConfig.phone}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full h-[52px] text-[16px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          'Отправка...'
        ) : (
          <>
            Получить план подготовки <Send size={16} />
          </>
        )}
      </button>

      <p className="text-[11px] text-text-muted leading-relaxed text-center mt-3 flex items-center justify-center gap-1.5">
        <Phone size={11} /> Или позвоните:{' '}
        <a href={`tel:${phoneTel}`} className="text-brand font-semibold">
          {siteConfig.phone}
        </a>
      </p>
    </form>
  );
}
