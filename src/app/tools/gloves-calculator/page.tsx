import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import CalculatorShell from '@/components/calculators/CalculatorShell';
import GlovesCalculator from './GlovesCalculator';

const URL = `${siteConfig.url}/tools/gloves-calculator`;

export const metadata: Metadata = {
  title: 'Калькулятор расхода перчаток для cleanroom — расчёт пар/год по GMP',
  description:
    'Онлайн-расчёт годового расхода стерильных и нестерильных нитриловых перчаток для GMP A/B/C/D. Операторы, смены, частота смены, упаковки, КП за 24 часа.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    url: URL,
    title:
      'Калькулятор перчаток для чистых помещений — расход на год по GMP',
    description:
      'Посчитайте годовую потребность в нитриловых перчатках для GMP A/B/C/D: операторы × смены × частота × резерв. Рекомендуемые SKU и КП.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Калькулятор расхода перчаток для cleanroom',
  url: URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Онлайн-инструмент расчёта годовой потребности в перчатках для cleanroom по EU GMP A/B/C/D.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  inLanguage: 'ru',
};

export default function GlovesCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd),
        }}
      />

      <CalculatorShell
        eyebrow="Инструмент"
        title="Калькулятор расхода перчаток для cleanroom"
        subtitle="Рассчитайте годовую потребность в стерильных и нестерильных нитриловых перчатках по классам GMP A/B/C/D. Расчёт меняется мгновенно — менеджер пришлёт КП на расчётный объём за 24 часа."
        breadcrumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Инструменты', href: '/tools' },
          { label: 'Калькулятор перчаток' },
        ]}
        footnote={
          <>
            Норматив частоты смены перчаток (6 / 4 / 3 раз за смену для зон
            A/B, C, D) основан на типовой практике EU GMP Annex 1 §7.14 и
            рекомендациях USP &lt;1116&gt;. Точный расход зависит от типа
            операций, длительности контакта с дезинфектантами и внутренних SOP
            предприятия. Все расчёты — оценочные; перед закупкой согласуйте с
            QA-отделом.
          </>
        }
      >
        <GlovesCalculator />
      </CalculatorShell>
    </>
  );
}
