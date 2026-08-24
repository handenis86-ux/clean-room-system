import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Annex1Download from './Annex1Download';

const URL = `${siteConfig.url}/resources/annex1-2022`;

export const metadata: Metadata = {
  title: 'Скачать EU GMP Annex 1 (2022) на русском и английском',
  description:
    'EU GMP Приложение 1 «Производство стерильных лекарственных средств», редакция 2022 года (C(2022) 5938 final): полный текст на русском в PDF и DOCX и официальный английский оригинал. Бесплатно, после короткой формы.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'EU GMP Annex 1 (2022) — скачать полный текст',
    description:
      'Русский перевод и официальный английский оригинал Приложения 1 EU GMP в редакции 2022 года.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function Annex12022Page() {
  return (
    <main>
      <section className="bg-brand-dark text-white py-14 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[12px] font-bold uppercase tracking-wider mb-4">
            <BookOpen size={14} /> Нормативный документ
          </div>
          <h1 className="text-[28px] md:text-[42px] font-extrabold leading-tight mb-4">
            EU GMP Annex 1 (2022): полный текст
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/85 leading-relaxed max-w-[760px]">
            Приложение 1 «Производство стерильных лекарственных средств»,
            редакция Европейской комиссии C(2022) 5938 final от 22 августа
            2022 года. Основной текст действует с 25 августа 2023 года.
            Базовый документ для всех, кто готовится к обязательной
            GMP-сертификации в Узбекистане с 1 января 2027 года.
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <Annex1Download />
        </div>
      </section>

      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-5">
            Что изменила редакция 2022 года
          </h2>
          <p className="text-[15px] text-text leading-relaxed mb-4">
            Пересмотр 2007 года был инициирован совместно рабочей группой
            инспекторов GMP/GDP и комитетом PIC/S. Ключевые изменения, которые
            чаще всего становятся предметом вопросов на инспекции:
          </p>
          <ul className="space-y-3 text-[15px] text-text leading-relaxed">
            <li>
              <strong className="text-text-dark">Стратегия контроля контаминации (CCS)</strong>{' '}
              — §2.3–2.5 вводят обязательный документ, связывающий воедино
              проектирование объекта, процессы, мониторинг и управление рисками.
            </li>
            <li>
              <strong className="text-text-dark">Класс A — «без роста»</strong> —
              таблица 6 заменила прежний предел «&lt;1 КОЕ»; любой рост в классе A
              требует расследования.
            </li>
            <li>
              <strong className="text-text-dark">Разделены классификация и мониторинг</strong>{' '}
              — таблица 1 задаёт пределы частиц для квалификации помещения,
              таблица 5 — для рутинного мониторинга. Для класса A по частицам
              ≥ 5 мкм это принципиально разные требования.
            </li>
            <li>
              <strong className="text-text-dark">Дезинфекция вынесена в §4.33–4.36</strong>{' '}
              — письменная программа, более одного типа средства с разными
              механизмами действия, периодический спорицид, валидация процесса
              и обязательная стерильность препаратов для зон A и B.
            </li>
            <li>
              <strong className="text-text-dark">Барьерные технологии</strong> —
              §4.18–4.22 формализуют требования к изоляторам и RABS, включая
              биодеконтаминацию спорицидным средством.
            </li>
          </ul>
          <p className="text-[14px] text-text-muted leading-relaxed mt-6">
            Разбор применимости разделов Annex 1 к конкретным категориям
            расходников — на странице{' '}
            <Link
              href="/compliance/annex1"
              className="text-brand font-semibold hover:underline"
            >
              соответствия Annex 1
            </Link>
            . Практическая программа дезинфекции с валидацией —{' '}
            <Link
              href="/resources/disinfection-validation-protocol"
              className="text-brand font-semibold hover:underline"
            >
              протокол валидации дезинфекции
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-brand-dark text-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto flex flex-col lg:flex-row lg:items-center gap-6 lg:justify-between">
          <div>
            <h2 className="text-[22px] md:text-[26px] font-extrabold leading-tight mb-2">
              Нужен разбор под вашу площадку?
            </h2>
            <p className="text-[15px] text-white/80 leading-relaxed max-w-[560px]">
              Подберём расходники под конкретные §-разделы Annex 1 и соберём
              пакет документов под инспекционный запрос.
            </p>
          </div>
          <Link
            href="/gmp-podgotovka"
            className="inline-flex shrink-0 items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
          >
            Подготовка к GMP-инспекции
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
