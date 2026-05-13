import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Hand,
  Building2,
  Droplet,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

const URL = `${siteConfig.url}/tools`;

export const metadata: Metadata = {
  title: 'B2B-калькуляторы для cleanroom — расход перчаток, мебель, дезинфектанты',
  description:
    'Онлайн-инструменты CRS: расчёт годового расхода нитриловых перчаток, бюджет мебели TINMAN на gowning room, потребность в дезинфектантах Contec по GMP A/B/C/D.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    url: URL,
    title: 'B2B-калькуляторы для чистых помещений — CRS',
    description:
      'Three B2B calculators: gloves consumption, gowning room budget, disinfectant volume — для GMP A/B/C/D.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'B2B-калькуляторы для cleanroom',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      url: `${siteConfig.url}/tools/gloves-calculator`,
      name: 'Калькулятор расхода перчаток для cleanroom',
    },
    {
      '@type': 'ListItem',
      position: 2,
      url: `${siteConfig.url}/tools/gowning-room-budget`,
      name: 'Калькулятор бюджета gowning room',
    },
    {
      '@type': 'ListItem',
      position: 3,
      url: `${siteConfig.url}/tools/disinfectant-calculator`,
      name: 'Калькулятор расхода дезинфектантов',
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Главная',
      item: siteConfig.url,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Инструменты',
      item: URL,
    },
  ],
};

interface ToolCard {
  href: string;
  title: string;
  desc: string;
  bullets: string[];
  Icon: LucideIcon;
  badge: string;
}

const tools: ToolCard[] = [
  {
    href: '/tools/gloves-calculator',
    title: 'Расход перчаток',
    desc: 'Сколько нитриловых перчаток нужно заводу на год — по операторам, сменам, классу GMP.',
    bullets: [
      'Annex 1 §7.14 — частота смены',
      'Стерильные / нестерильные',
      'Рекомендуемый SKU',
    ],
    Icon: Hand,
    badge: 'GMP A/B/C/D',
  },
  {
    href: '/tools/gowning-room-budget',
    title: 'Бюджет gowning room',
    desc: 'Стоимость комплекта мебели TINMAN AISI 304 для комнаты переодевания.',
    bullets: [
      'Скамейки, шкафы, стойки, раковины',
      'Pass-through для зоны A/B',
      'Спецификация SKU + КП',
    ],
    Icon: Building2,
    badge: 'TINMAN AISI 304',
  },
  {
    href: '/tools/disinfectant-calculator',
    title: 'Расход дезинфектантов',
    desc: 'Сколько литров ProChlor, Sterile IPA и HydroPure нужно на год.',
    bullets: [
      '60 мл/м² × частота × 52 нед.',
      'Ротация спорицида (Annex 1 §8.66)',
      'Контейнеры 1 / 5 л',
    ],
    Icon: Droplet,
    badge: 'Contec ProChlor',
  },
];

export default function ToolsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand to-brand-dark text-white">
        <div className="container max-w-page py-10 lg:py-14">
          <nav
            className="flex items-center gap-2 text-sm text-white/70 mb-5 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Главная
            </Link>
            <ChevronRight size={14} className="text-white/40" />
            <span className="text-white">Инструменты</span>
          </nav>

          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold uppercase tracking-wider mb-3">
            B2B-калькуляторы
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight max-w-4xl text-white">
            Калькуляторы для cleanroom — расчёт за минуту
          </h1>
          <p className="mt-4 text-base lg:text-lg text-white/85 max-w-3xl">
            Три быстрых инструмента для QA, инженеров и закупщиков: годовой
            расход перчаток, бюджет на gowning room и потребность в
            дезинфектантах по EU GMP A/B/C/D. Менеджер CRS пришлёт КП на
            расчётный объём за 24 часа.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-surface py-10 lg:py-14">
        <div className="container max-w-page">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex flex-col rounded-2xl bg-white border border-surface-border p-6 hover:border-brand hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-light text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                    <t.Icon size={24} />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-surface text-text-muted">
                    {t.badge}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-text-dark group-hover:text-brand transition-colors">
                  {t.title}
                </h2>
                <p className="text-[14px] text-text-muted mt-2 leading-relaxed">
                  {t.desc}
                </p>
                <ul className="mt-4 space-y-1.5 text-[13px] text-text">
                  {t.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-brand shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-brand">
                  Открыть калькулятор
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* Why bottom */}
          <div className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-extrabold text-text-dark mb-3">
              Зачем эти калькуляторы
            </h2>
            <p className="text-[15px] text-text leading-relaxed">
              CRS — поставщик расходников и мебели для cleanroom в Узбекистане.
              Калькуляторы — это бесплатный способ для отделов закупок и QA
              быстро оценить годовой бюджет на расходники без долгих переписок:
              ввели параметры производства → получили цифру → запросили КП.
              Все расчёты основаны на типовых SOP по EU GMP Annex 1 (2022) и
              USP &lt;1116&gt;.
            </p>
            <p className="text-[14px] text-text-muted leading-relaxed mt-3">
              Не нашли нужный инструмент?{' '}
              <Link
                href="/contacts"
                className="text-brand font-semibold hover:underline"
              >
                Напишите менеджеру
              </Link>{' '}
              — поможем посчитать вручную или предложим dataset под вашу SOP.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
