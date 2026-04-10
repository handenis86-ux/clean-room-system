'use client';

import { useState, FormEvent } from 'react';

interface FormFields {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPageForm() {
  const [form, setForm] = useState<FormFields>({
    name: '',
    company: '',
    email: '',
    phone: '',
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
        throw new Error(
          data?.error || 'Ошибка отправки формы'
        );
      }

      setSuccess(true);
      setForm({ name: '', company: '', email: '', phone: '', message: '' });
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
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-brand-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
        <p className="text-gray-500">
          Наш менеджер свяжется с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="label">Имя *</label>
          <input
            id="name"
            name="name"
            type="text"
            className="input"
            placeholder="Ваше имя"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="company" className="label">Компания</label>
          <input
            id="company"
            name="company"
            type="text"
            className="input"
            placeholder="Название компании"
            value={form.company}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="label">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="email@company.com"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="label">Телефон</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="input"
            placeholder="+998"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label">Сообщение *</label>
        <textarea
          id="message"
          name="message"
          className="input min-h-[140px] resize-y"
          placeholder="Опишите ваш запрос..."
          required
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
        className="w-full px-8 py-4 text-[15px] font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Отправка...' : 'Отправить запрос'}
      </button>
    </form>
  );
}
