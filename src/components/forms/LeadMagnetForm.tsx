'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formsConfig } from '@/config/forms';
import { trackEvent } from '@/lib/track';
import TurnstileWidget from '@/components/ui/TurnstileWidget';

interface LeadFormFields {
  email: string;
  name: string;
  phone: string;
  company: string;
  position: string;
  botcheck: string;
}

interface LeadMagnetFormProps {
  /**
   * Куда редиректить после отправки. По умолчанию — страница чек-листа.
   */
  redirectTo?: string;
  /**
   * Идентификатор ресурса для GTM-события.
   */
  resourceId?: string;
  /**
   * Компактный режим (узкое расположение в промо-блоке).
   */
  compact?: boolean;
  /**
   * Текст кнопки сабмита.
   */
  submitLabel?: string;
  /**
   * Показывать и требовать телефон. Для тяжёлых материалов (нормативные
   * документы) это оправданно: ценность материала окупает лишнее поле.
   */
  requirePhone?: boolean;
  /**
   * Тема письма — чтобы заявки на разные материалы различались в почте.
   */
  subject?: string;
  /**
   * Если задан — вызывается вместо редиректа. Используется там, где ссылки
   * на скачивание раскрываются на той же странице.
   */
  onSuccess?: () => void;
}

export default function LeadMagnetForm({
  redirectTo = '/resources/gmp-audit-checklist',
  resourceId = 'gmp_audit_checklist_2027',
  compact = false,
  submitLabel = 'Получить чек-лист бесплатно',
  requirePhone = false,
  subject = 'Скачивание lead-магнита: GMP-аудит чеклист',
  onSuccess,
}: LeadMagnetFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<LeadFormFields>({
    email: '',
    name: '',
    phone: '',
    company: '',
    position: '',
    botcheck: '',
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email.trim() || !form.name.trim() || !form.company.trim()) {
      setError('Заполните обязательные поля.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Укажите корректный email.');
      return;
    }
    if (requirePhone && form.phone.replace(/\D/g, '').length < 9) {
      setError('Укажите корректный номер телефона, например +998 90 123 45 67.');
      return;
    }
    if (!agree) {
      setError('Подтвердите согласие на обработку персональных данных.');
      return;
    }
    if (formsConfig.turnstileSiteKey && !turnstileToken) {
      setError('Подтвердите, что вы не робот.');
      return;
    }

    if (!formsConfig.web3formsAccessKey) {
      // eslint-disable-next-line no-console
      console.warn('[LeadMagnetForm] web3formsAccessKey is empty.');
      if (onSuccess) onSuccess();
      else router.push(redirectTo);
      return;
    }

    setLoading(true);
    try {
      const payload: Record<string, string> = {
        access_key: formsConfig.web3formsAccessKey,
        subject,
        from_name: form.name,
        replyto: form.email,
        name: form.name,
        email: form.email,
        phone: form.phone || '—',
        company: form.company,
        position: form.position || '—',
        resource: resourceId,
        botcheck: form.botcheck || '',
        page_url:
          typeof window !== 'undefined' ? window.location.href : '',
      };
      // Turnstile is a client-side UX gate only — Web3Forms requires Pro
      // to validate it server-side. Honeypot + JS-required widget still
      // filter basic bots.

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: { success?: boolean; message?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data?.message || 'Ошибка отправки формы');
      }

      trackEvent('lead_magnet_download', { resource: resourceId });

      if (onSuccess) {
        setLoading(false);
        onSuccess();
      } else {
        router.push(redirectTo);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Произошла ошибка при отправке. Попробуйте позже.'
      );
      setLoading(false);
    }
  };

  const inputClass =
    'w-full h-[44px] px-3.5 text-[15px] text-text-dark bg-white border border-surface-input rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-colors placeholder:text-text-muted';

  const gridClass = compact
    ? 'grid grid-cols-1 sm:grid-cols-2 gap-3'
    : 'space-y-3';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="botcheck"
        value={form.botcheck}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className={gridClass}>
        <div>
          <label
            htmlFor="lm-name"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Имя *
          </label>
          <input
            id="lm-name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Ваше имя"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="lm-email"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Email *
          </label>
          <input
            id="lm-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={inputClass}
            placeholder="email@company.com"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {requirePhone && (
          <div>
            <label
              htmlFor="lm-phone"
              className="block text-[12px] font-medium text-text-dark mb-1"
            >
              Телефон *
            </label>
            <input
              id="lm-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={inputClass}
              placeholder="+998 90 123 45 67"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label
            htmlFor="lm-company"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Компания *
          </label>
          <input
            id="lm-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder="Название предприятия"
            required
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="lm-position"
            className="block text-[12px] font-medium text-text-dark mb-1"
          >
            Должность
          </label>
          <input
            id="lm-position"
            name="position"
            type="text"
            autoComplete="organization-title"
            className={inputClass}
            placeholder="QA-директор, нач. производства..."
            value={form.position}
            onChange={handleChange}
          />
        </div>
      </div>

      <label className="flex items-start gap-2.5 text-[13px] text-text leading-snug cursor-pointer select-none">
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

      {formsConfig.turnstileSiteKey && (
        <TurnstileWidget
          siteKey={formsConfig.turnstileSiteKey}
          onVerify={(token) => setTurnstileToken(token)}
        />
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-[13px]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-[48px] text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Отправка...' : submitLabel}
      </button>

      <p className="text-[12px] text-text-muted leading-relaxed text-center">
        🔒 Не используем ваш email для спама. Только полезные материалы по
        cleanroom-индустрии.
      </p>
    </form>
  );
}
