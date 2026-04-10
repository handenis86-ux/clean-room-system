'use client';

import { useState, FormEvent } from 'react';

interface FormFields {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactPageForm() {
  const [form, setForm] = useState<FormFields>({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Ошибка отправки формы');
      }

      setSuccess(true);
      setForm({ name: '', company: '', phone: '', email: '', message: '' });
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
    'w-full h-[44px] px-3.5 text-[14px] text-text-dark bg-white border border-surface-input rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-colors placeholder:text-text-muted';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          className={inputClass}
          placeholder="+998"
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
          className="w-full h-[100px] px-3.5 py-2.5 text-[14px] text-text-dark bg-white border border-surface-input rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-colors resize-none placeholder:text-text-muted"
          placeholder="Опишите ваш запрос..."
          value={form.message}
          onChange={handleChange}
        />
      </div>

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
