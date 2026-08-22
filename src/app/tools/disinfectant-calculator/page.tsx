import { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import CalculatorShell from '@/components/calculators/CalculatorShell';
import DisinfectantCalculator from './DisinfectantCalculator';

const URL = `${siteConfig.url}/tools/disinfectant-calculator`;

export const metadata: Metadata = {
  title: 'Калькулятор расчёта дезсредств для cleanroom — л/год по GMP',
  description:
    'Расчёт годового расхода Contec ProChlor, Sterile IPA, HydroPure для GMP A/B/C/D: площадь × частота × 60 мл/м² × ротация спорицида по Annex 1 §8.66. КП за 24 ч.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    url: URL,
    title:
      'Калькулятор дезинфектантов для чистых помещений — Contec по GMP',
    description:
      'Посчитайте годовую потребность в спорициде, IPA и базовых дезинфектантах Contec для cleanroom GMP A/B/C/D с ротацией по Annex 1.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Калькулятор расхода дезинфектантов для cleanroom',
  url: URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Онлайн-инструмент расчёта годовой потребности в дезинфицирующих средствах Contec для cleanroom по EU GMP A/B/C/D.',
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

export default function DisinfectantCalculatorPage() {
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
        title="Калькулятор расхода дезинфектантов для cleanroom"
        subtitle="Рассчитайте годовую потребность в Contec ProChlor (спорицид), Sterile IPA и HydroPure по площади и классу GMP. Учтена еженедельная ротация спорицида по Annex 1 §8.66."
        breadcrumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Инструменты', href: '/tools' },
          { label: 'Калькулятор дезинфектантов' },
        ]}
        footnote={
          <>
            Нормативная база: EU GMP Annex 1 §8.66 — для бактерицидных
            дезинфектантов обязательна ротация со спорицидом на регулярной
            основе. Расход 60 мл/м² рабочего раствора — типовая оценка для
            протирочной дезинфекции в cleanroom. Реальное потребление зависит
            от типа поверхности, метода нанесения (триггер vs мопп vs
            fogging), длительности контакта и SOP предприятия. Все расчёты —
            ориентировочные; перед закупкой согласуйте план дезинфекции
            и валидацию контактного времени с QA-отделом.
          </>
        }
      >
        <Suspense fallback={null}>
          <DisinfectantCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}
