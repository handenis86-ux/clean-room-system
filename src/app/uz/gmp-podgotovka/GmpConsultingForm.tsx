'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { CheckCircle2, Send, AlertCircle, Phone } from 'lucide-react';
import { formsConfig } from '@/config/forms';
import { siteConfig, phoneTel } from '@/config/site';
import { trackEvent } from '@/lib/track';
import { t } from '@/data/i18n/dictionary';

/**
 * Узбекская версия формы GMP-консалтинга.
 *
 * Использует тот же Web3Forms access key, что и русская форма — все лиды
 * приходят в один общий inbox. В payload и в dataLayer добавлен параметр
 * `language: 'uz'`, чтобы в GTM/GA4 можно было отличать узбекские лиды
 * для атрибуции и приоритизации в CRM.
 */

const dict = t.uz.gmpConsulting;

const productionTypes = [
  'Qattiq dori shakllari',
  'Steril dori shakllari / parenteral',
  'Liofilizatlar',
  'Biotexnologik preparatlar',
  'Tibbiy buyumlar',
  'Boshqa',
] as const;

const targetDates = [
  '2026 yil oxirigacha',
  'Q1 2027 (yanvar — mart)',
  'Q2 2027 (aprel — iyun)',
  'Q3+ 2027 yoki keyinroq',
  'Sertifikatlanganmiz — qoʻllab-quvvatlash kerak',
  'Hozircha oʻrganmoqdamiz',
] as const;

const helpOptions = [
  'QA-xodimlarni oʻqitish',
  'SOP va hujjatlarni tayyorlash',
  'Pre-audit (ichki tayyorlik auditi)',
  'Mock inspection',
  'GMP-tekshiruvda hamrohlik',
  'CCS (Contamination Control Strategy)',
  'Sarflanadigan materiallar supplier qualification',
  'Bepul 30-daqiqalik maslahat',
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

export default function GmpConsultingFormUz() {
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
      setError(dict.errorName);
      return;
    }
    if (!form.phone.trim()) {
      setError(dict.errorPhone);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(dict.errorEmail);
      return;
    }
    if (!form.company.trim()) {
      setError(dict.errorCompany);
      return;
    }
    if (!form.productionType) {
      setError(dict.errorProduction);
      return;
    }
    if (!form.targetDate) {
      setError(dict.errorDate);
      return;
    }
    if (form.helpNeeded.length === 0) {
      setError(dict.errorHelp);
      return;
    }
    if (!form.agree) {
      setError(dict.errorAgree);
      return;
    }

    // language: 'uz' — для атрибуции узбекских лидов.
    trackEvent('generate_lead', {
      method: 'gmp_consulting_form',
      language: 'uz',
      production_type: form.productionType,
      target_date: form.targetDate,
    });

    if (!formsConfig.web3formsAccessKey) {
      // eslint-disable-next-line no-console
      console.warn('[GmpConsultingFormUz] web3formsAccessKey is empty.');
      setSuccess(true);
      return;
    }

    setLoading(true);
    try {
      const body: Record<string, string> = {
        access_key: formsConfig.web3formsAccessKey,
        subject: `GMP-konsalting arizasi (UZ): ${form.company}`,
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
        language: 'uz',
        form_source: 'gmp_consulting_landing_uz',
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
        throw new Error(data?.message || dict.errorGeneric);
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : dict.errorGeneric);
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
          {dict.successTitle}
        </h3>
        <p className="text-[15px] text-emerald-800 leading-relaxed mb-5">
          {dict.successBody} <strong>{form.phone}</strong> {dict.successOrEmail}{' '}
          <strong>{form.email}</strong>. {dict.successFooter}
        </p>
        <ul className="space-y-2.5">
          <li>
            <Link
              href="/uz/compliance/gmp-2027-uzbekistan"
              className="inline-flex items-center gap-2 text-emerald-900 font-semibold hover:underline"
            >
              › GMP Oʻzbekistonda 2027 — reference-hub
            </Link>
          </li>
          <li>
            <Link
              href="/uz/blog/gmp-uzbekistan-2027-podgotovka"
              className="inline-flex items-center gap-2 text-emerald-900 font-semibold hover:underline"
            >
              › GMP 2027 ga tayyorgarlik — blog-koʻrib chiqish
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
          <Send size={12} /> GMP-konsalting arizasi
        </div>
        <h3 className="text-[22px] lg:text-[26px] font-extrabold text-text-dark leading-tight">
          {dict.formTitle}
        </h3>
        <p className="text-[14px] text-text-muted mt-1.5 leading-relaxed">
          {dict.formSubtitle}
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
          <label htmlFor="gmp-name-uz" className="block text-[12px] font-medium text-text-dark mb-1">
            {dict.labelName} *
          </label>
          <input
            id="gmp-name-uz"
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder={dict.placeholderName}
            required
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gmp-phone-uz" className="block text-[12px] font-medium text-text-dark mb-1">
            {dict.labelPhone} * <span className="text-text-muted">(+998…)</span>
          </label>
          <input
            id="gmp-phone-uz"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder={dict.placeholderPhone}
            required
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gmp-email-uz" className="block text-[12px] font-medium text-text-dark mb-1">
            {dict.labelEmail} *
          </label>
          <input
            id="gmp-email-uz"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={inputClass}
            placeholder={dict.placeholderEmail}
            required
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gmp-company-uz" className="block text-[12px] font-medium text-text-dark mb-1">
            {dict.labelCompany} *
          </label>
          <input
            id="gmp-company-uz"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder={dict.placeholderCompany}
            required
            value={form.company}
            onChange={(e) => setField('company', e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="gmp-position-uz" className="block text-[12px] font-medium text-text-dark mb-1">
            {dict.labelPosition}
          </label>
          <input
            id="gmp-position-uz"
            type="text"
            autoComplete="organization-title"
            className={inputClass}
            placeholder={dict.placeholderPosition}
            value={form.position}
            onChange={(e) => setField('position', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gmp-production-type-uz" className="block text-[12px] font-medium text-text-dark mb-1">
            {dict.labelProductionType} *
          </label>
          <select
            id="gmp-production-type-uz"
            className={selectClass}
            required
            value={form.productionType}
            onChange={(e) => setField('productionType', e.target.value)}
          >
            <option value="" disabled>
              {dict.placeholderSelect}
            </option>
            {productionTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="gmp-target-date-uz" className="block text-[12px] font-medium text-text-dark mb-1">
            {dict.labelTargetDate} *
          </label>
          <select
            id="gmp-target-date-uz"
            className={selectClass}
            required
            value={form.targetDate}
            onChange={(e) => setField('targetDate', e.target.value)}
          >
            <option value="" disabled>
              {dict.placeholderSelect}
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
          {dict.labelHelp} *
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
        <label htmlFor="gmp-comment-uz" className="block text-[12px] font-medium text-text-dark mb-1">
          {dict.labelComment}
        </label>
        <textarea
          id="gmp-comment-uz"
          className={inputClass.replace('h-[44px]', 'min-h-[88px]') + ' py-2.5'}
          placeholder={dict.placeholderComment}
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
          {dict.labelAgree}{' '}
          <Link
            href="/privacy"
            className="text-brand hover:underline"
            target="_blank"
            rel="noopener"
          >
            {dict.privacyLink}
          </Link>
        </span>
      </label>

      {error && (
        <div className="mt-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[13px]">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-red-600">
              {dict.errorPhoneHint}{' '}
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
          t.uz.common.sending
        ) : (
          <>
            {dict.submitButton} <Send size={16} />
          </>
        )}
      </button>

      <p className="text-[11px] text-text-muted leading-relaxed text-center mt-3 flex items-center justify-center gap-1.5">
        <Phone size={11} /> {dict.callDirect}:{' '}
        <a href={`tel:${phoneTel}`} className="text-brand font-semibold">
          {siteConfig.phone}
        </a>
      </p>
    </form>
  );
}
