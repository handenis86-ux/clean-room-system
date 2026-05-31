import { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import CalculatorShell from '@/components/calculators/CalculatorShell';
import GowningBudgetCalculator from './GowningBudgetCalculator';

const URL = `${siteConfig.url}/tools/gowning-room-budget`;

export const metadata: Metadata = {
  title: 'Калькулятор бюджета gowning room — расчёт мебели cleanroom TINMAN',
  description:
    'Онлайн-расчёт стоимости комплекта нерж. мебели для gowning room по площади и числу операторов: скамейки, шкафы, стойки, раковины, pass-through. КП за 24 часа.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    url: URL,
    title:
      'Бюджет на gowning room — калькулятор мебели TINMAN для cleanroom',
    description:
      'Посчитайте бюджет на оборудование комнаты переодевания: AISI 304 скамейки, шкафы, стойки, sticky mats. Спецификация и КП за 24 часа.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Калькулятор бюджета gowning room',
  url: URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Онлайн-инструмент расчёта бюджета на комплект мебели TINMAN из нерж. стали для gowning room по EU GMP A/B/C/D.',
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

export default function GowningBudgetPage() {
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
        title="Бюджет на gowning room — оборудование cleanroom"
        subtitle="Рассчитайте комплект нерж. мебели TINMAN для комнаты переодевания: скамейки, шкафы, стойки, раковины, pass-through. Цены ориентировочные — менеджер CRS пришлёт точное КП за 24 часа."
        breadcrumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Инструменты', href: '/tools' },
          { label: 'Бюджет gowning room' },
        ]}
        footnote={
          <>
            <strong>Важно про цены:</strong> расчёт показывает ориентировочный
            бюджет для планирования, а не финальное КП. В стоимость включены
            типовые накладные при импорте в Узбекистан: таможенная пошлина 40%
            (HS 9403, мебель), НДС 12%, логистика и монтаж ~15%. Точная цена
            зависит от текущих курсов USD/UZS, спецификации (AISI 304 vs 316),
            габаритов, сроков, способа поставки (FCA/CIF/DAP), валидации и
            сертификации. Нормативы плотности (минимум 2–3 м² свободной
            площади на оператора) основаны на EU GMP Annex 1 §4.10 и
            ISO 14644-4. Точное КП — после короткого брифинга, в течение
            24 часов.
          </>
        }
      >
        <Suspense fallback={null}>
          <GowningBudgetCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}
