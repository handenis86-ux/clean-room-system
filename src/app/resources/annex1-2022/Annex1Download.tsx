'use client';

import { useState } from 'react';
import { FileDown, CheckCircle2, Clock } from 'lucide-react';
import LeadMagnetForm from '@/components/forms/LeadMagnetForm';
import { trackEvent } from '@/lib/track';

interface Edition {
  id: string;
  lang: string;
  label: string;
  note: string;
  href?: string;
  size?: string;
}

/**
 * Русская и английская версии лежат в /public/docs. Узбекского перевода
 * Annex 1 (2022) не существует — ни официального, ни нашего; выдумывать
 * перевод нормативного документа нельзя, поэтому позиция помечена как
 * готовящаяся и ссылки не имеет.
 */
const EDITIONS: Edition[] = [
  {
    id: 'ru-pdf',
    lang: 'RU',
    label: 'Русский — PDF',
    note: 'Полный перевод, 11 разделов и глоссарий',
    href: '/docs/annex1-2022-ru.pdf',
    size: '385 КБ',
  },
  {
    id: 'ru-docx',
    lang: 'RU',
    label: 'Русский — DOCX',
    note: 'Редактируемая версия для вставки в SOP',
    href: '/docs/annex1-2022-ru.docx',
    size: '72 КБ',
  },
  {
    id: 'en-pdf',
    lang: 'EN',
    label: 'English — PDF',
    note: 'Официальный текст Еврокомиссии, C(2022) 5938 final',
    href: '/docs/annex1-2022-en.pdf',
    size: '604 КБ',
  },
  {
    id: 'uz',
    lang: 'UZ',
    label: 'Oʻzbekcha — готовится',
    note: 'Официального узбекского перевода Annex 1 не существует. Готовим собственный — оставьте контакты, сообщим о выходе',
  },
];

export default function Annex1Download() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="grid lg:grid-cols-[1fr_minmax(0,420px)] gap-8 items-start">
      {/* Список редакций */}
      <div>
        <h2 className="text-[20px] font-bold text-text-dark mb-4">
          Доступные редакции
        </h2>
        <div className="space-y-3">
          {EDITIONS.map((e) => {
            const available = Boolean(e.href);
            const open = unlocked && available;
            return (
              <div
                key={e.id}
                className={[
                  'flex items-start gap-4 rounded-xl border p-4 transition-colors',
                  open
                    ? 'border-brand bg-brand-light/30'
                    : 'border-surface-input bg-white',
                ].join(' ')}
              >
                <div
                  className={[
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold',
                    available
                      ? 'bg-brand-light text-brand-dark'
                      : 'bg-surface text-text-muted',
                  ].join(' ')}
                >
                  {e.lang}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-text-dark">
                    {e.label}
                    {e.size && (
                      <span className="ml-2 text-[12px] font-normal text-text-muted">
                        {e.size}
                      </span>
                    )}
                  </p>
                  <p className="text-[13px] text-text-muted leading-relaxed mt-0.5">
                    {e.note}
                  </p>
                </div>
                <div className="shrink-0 self-center">
                  {!available ? (
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-text-muted">
                      <Clock size={15} />
                      Скоро
                    </span>
                  ) : open ? (
                    <a
                      href={e.href}
                      download
                      onClick={() =>
                        trackEvent('lead_magnet_download', {
                          resource: `annex1_2022_${e.id}`,
                        })
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-[13px] font-semibold text-white hover:bg-brand-hover transition-colors"
                    >
                      <FileDown size={15} />
                      Скачать
                    </a>
                  ) : (
                    <span className="text-[13px] text-text-muted">
                      после формы
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {unlocked && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[14px] text-emerald-900 leading-relaxed">
              Готово — ссылки активны. Русская версия переведена нами с
              официального английского текста Еврокомиссии; при любых
              расхождениях приоритет за английским оригиналом, он тоже в списке.
            </p>
          </div>
        )}
      </div>

      {/* Форма */}
      <div className="rounded-2xl border-2 border-brand/20 bg-white p-5 lg:p-6 lg:sticky lg:top-6">
        {unlocked ? (
          <div className="text-center py-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
              <CheckCircle2 size={26} />
            </div>
            <h3 className="text-[18px] font-bold text-text-dark mb-1.5">
              Доступ открыт
            </h3>
            <p className="text-[14px] text-text-muted leading-relaxed">
              Скачивайте нужные редакции слева. Когда выйдет узбекская версия —
              напишем.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-[18px] font-bold text-text-dark mb-1.5">
              Оставьте контакты для доступа
            </h3>
            <p className="text-[13px] text-text-muted leading-relaxed mb-4">
              Документ бесплатный. Контакты нужны, чтобы отправить обновления,
              когда выйдет узбекская версия или изменится редакция.
            </p>
            <LeadMagnetForm
              compact={false}
              requirePhone
              resourceId="annex1_2022"
              subject="Скачивание Annex 1 (2022)"
              submitLabel="Открыть доступ к документу"
              onSuccess={() => setUnlocked(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}
