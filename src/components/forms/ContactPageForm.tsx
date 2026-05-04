'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { formsConfig } from '@/config/forms';

interface FormFields {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  botcheck: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Format Uzbekistan phone number as +998 XX XXX-XX-XX.
 * Strips non-digit characters, ensures the 998 country prefix and groups
 * the remaining digits.
 */
function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (!digits) return '';
  // Drop leading 8 (Russian habit) — replace with 998.
  if (digits.startsWith('8') && !digits.startsWith('998')) {
    digits = '998' + digits.slice(1);
  }
  if (!digits.startsWith('998')) {
    digits = '998' + digits;
  }
  // Cap at country code (3) + 9 subscriber digits = 12 digits total.
  digits = digits.slice(0, 12);

  const cc = digits.slice(0, 3); // 998
  const p1 = digits.slice(3, 5); // operator code
  const p2 = digits.slice(5, 8);
  const p3 = digits.slice(8, 10);
  const p4 = digits.slice(10, 12);

  let out = '+' + cc;
  if (p1) out += ' ' + p1;
  if (p2) out += ' ' + p2;
  if (p3) out += '-' + p3;
  if (p4) out += '-' + p4;
  return out;
}

export default function ContactPageForm() {
  const [form, setForm] = useState<FormFields>({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
    botcheck: '',
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setForm((prev) => ({ ...prev, phone: formatPhone(value) }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation — required fields.
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError('Заполните обязательные поля.');
      return;
    }
    // Phone — at least 12 digits (998 + 9 subscriber digits).
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 12) {
      setError('Укажите корректный номер телефона.');
      return;
    }
    // Email — minimal regex check.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Укажите корректный email.');
      return;
    }
    if (!agree) {
      setError('Подтвердите согласие на обработку персональных данных.');
      return;
    }

    if (!formsConfig.web3formsAccessKey) {
      // eslint-disable-next-line no-console
      console.warn(
        '[ContactPageForm] web3formsAccessKey is empty — form submission disabled. ' +
          'Set formsConfig.web3formsAccessKey in src/config/forms.ts.'
      );
      if (typeof window !== 'undefined') {
        window.alert(
          'Форма пока не настроена. Позвоните, пожалуйста, +998 99 821-12-22.'
        );
      }
      return;
    }

    setLoading(true);
    try {
      const payload = {
        access_key: formsConfig.web3formsAccessKey,
        subject: 'Новая заявка с сайта cleanroom.uz',
        from_name: form.name,
        replyto: form.email,
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company || '—',
        message: form.message,
        botcheck: form.botcheck || '',
        page_url:
          typeof window !== 'undefined' ? window.location.href : '',
      };

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

      // GTM trigger — fires only on successful submission.
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'form_submit' });
      }

      setSuccess(true);
      setForm({
        name: '',
        company: '',
        phone: '',
        email: '',
        message: '',
        botcheck: '',
      });
      setAgree(false);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Произошла ошибка при отправке. Попробуйте позже или свяжитесь с нами по телефону.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-brand"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-text-dark mb-2">
          Заявка отправлена!
        </h3>
        <p className="text-text">
          Наш менеджер свяжется с вами в ближайшее время.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full h-[44px] px-3.5 text-[16px] text-text-dark bg-white border border-surface-input rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-colors placeholder:text-text-muted';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot — hidden from real users, bots fill it and are dropped by Web3Forms */}
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

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-[13px] font-medium text-text-dark mb-1.5"
        >
          Имя *
        </label>
        <input
          id="name"
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

      {/* Company */}
      <div>
        <label
          htmlFor="company"
          className="block text-[13px] font-medium text-text-dark mb-1.5"
        >
          Компания
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className={inputClass}
          placeholder="Название компании"
          value={form.company}
          onChange={handleChange}
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-[13px] font-medium text-text-dark mb-1.5"
        >
          Телефон *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={inputClass}
          placeholder="+998 XX XXX-XX-XX"
          required
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-[13px] font-medium text-text-dark mb-1.5"
        >
          Email *
        </label>
        <input
          id="email"
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

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-[13px] font-medium text-text-dark mb-1.5"
        >
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full h-[100px] px-3.5 py-2.5 text-[16px] text-text-dark bg-white border border-surface-input rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-colors resize-none placeholder:text-text-muted"
          placeholder="Опишите ваш запрос..."
          value={form.message}
          onChange={handleChange}
        />
      </div>

      {/* Privacy consent */}
      <label className="flex items-start gap-2.5 text-[14px] text-text leading-snug cursor-pointer select-none">
        <input
          type="checkbox"
          required
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 w-[18px] h-[18px] shrink-0 accent-brand cursor-pointer"
        />
        <span>
          Я согласен с{' '}
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
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-[48px] text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
}
