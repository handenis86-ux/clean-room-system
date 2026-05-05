import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Phone, Download } from 'lucide-react';
import { categories } from '@/data/products';
import { gmpAnnex1Mapping } from '@/data/gmp-annex1-mapping';
import { siteConfig, phoneTel } from '@/config/site';

export const metadata: Metadata = {
  title:
    'EU GMP Annex 1 (2022) — соответствие каталога Clean Room Systems',
  description:
    'Compliance matrix всех 17 категорий каталога Clean Room Systems против разделов EU GMP Annex 1 (2022). Гид для QA-специалистов фарм-производств Узбекистана.',
  alternates: {
    canonical: `${siteConfig.url}/compliance/annex1`,
  },
  openGraph: {
    title: 'EU GMP Annex 1 (2022) — Compliance Matrix Clean Room Systems',
    description:
      'Подбор расходников для чистых помещений по разделам EU GMP Annex 1 (2022). 17 категорий × 11 разделов в одной таблице.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const annexSections = [
  {
    id: '3',
    label: '§3',
    title: 'PQS / CCS',
    full: 'Pharmaceutical Quality System & Contamination Control Strategy',
  },
  {
    id: '4',
    label: '§4',
    title: 'Personnel',
    full: 'Гигиена, гоунинг персонала, обучение',
  },
  {
    id: '5',
    label: '§5',
    title: 'Premises',
    full: 'Помещения, классификация, qualification',
  },
  {
    id: '6',
    label: '§6',
    title: 'Equipment',
    full: 'Оборудование (дизайн, очистка, стерилизация)',
  },
  {
    id: '7',
    label: '§7',
    title: 'Utilities',
    full: 'Утилиты (HVAC, вода, газы)',
  },
  {
    id: '8',
    label: '§8',
    title: 'Production',
    full: 'Производство (aseptic, APS, sterilization, lyo)',
  },
  {
    id: '9',
    label: '§9',
    title: 'Monitoring',
    full: 'Environmental & process monitoring',
  },
  {
    id: '10',
    label: '§10',
    title: 'QC',
    full: 'Quality Control — стерильность, релиз',
  },
  {
    id: '11',
    label: '§11',
    title: 'Disinfection',
    full: 'Очистка и дезинфекция',
  },
];

const matchesSection = (categorySlug: string, sectionId: string): boolean => {
  const refs = gmpAnnex1Mapping[categorySlug] || [];
  const re = new RegExp(`§${sectionId}(\\.|$|-|\\s)`);
  return refs.some((r) => re.test(r.section));
};

export default function ComplianceAnnex1Page() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: `${siteConfig.url}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compliance',
        item: `${siteConfig.url}/compliance/annex1`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'EU GMP Annex 1 (2022)',
        item: `${siteConfig.url}/compliance/annex1`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Чем EU GMP Annex 1 (2022) отличается от версии 2008 года?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Annex 1 (2022) реструктурирован и расширен. Добавлены новые разделы: §2 — Стратегия контроля контаминации (CCS), формализация подхода Quality Risk Management по ICH Q9, расширенные требования к Environmental Monitoring (§9). Раздел очистки и дезинфекции вынесен в отдельный §11 (раньше — §8.42). Срок применения в ЕС — с 25 августа 2023 г.',
        },
      },
      {
        '@type': 'Question',
        name: 'Когда Узбекистан перейдёт на EU GMP Annex 1 (2022)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Республика Узбекистан движется к гармонизации с EU/PIC/S — обязательная GMP-сертификация для производителей лекарств вступает с 1 января 2027 г. Большинство аудитов на этом этапе будет ориентироваться на актуальную версию Annex 1 (2022).',
        },
      },
      {
        '@type': 'Question',
        name: 'Можно ли использовать ваш каталог при составлении CCS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да. Mapping категорий на разделы Annex 1 — стартовая точка для CCS-документа. Для каждой категории мы указываем релевантные §-разделы, что упрощает обоснование выбора расходников. Финальная привязка к процессам — на стороне QA предприятия.',
        },
      },
      {
        '@type': 'Question',
        name: 'Как проверить соответствие конкретного SKU §-разделу?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'На каждой странице товара блок «Соответствие стандартам» показывает применимые §-разделы Annex 1, ICH и USP. Для технического подтверждения запросите TDS, протоколы партий и сертификаты (CE, ЕАС, ISO 9001/13485) у нашего отдела продаж.',
        },
      },
      {
        '@type': 'Question',
        name: 'Покрывает ли каталог CRS все требования Annex 1?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Каталог покрывает расходные материалы и СИЗ — это около 60-70% позиций, упоминаемых в Annex 1. Стационарное оборудование (HVAC, изоляторы, RABS, autoclaves), валидационные сервисы и документационная поддержка — за пределами нашего скоупа, рекомендуем отдельных подрядчиков.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-dark py-12 px-4 lg:px-[80px]">
        <nav className="flex items-center gap-1.5 text-[13px] text-brand-muted mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Главная
          </Link>
          <span>/</span>
          <span className="text-white">Compliance Annex 1</span>
        </nav>
        <div className="max-w-[900px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand text-white rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            B2B compliance reference
          </div>
          <h1 className="text-[28px] md:text-[42px] font-extrabold text-white leading-tight">
            EU GMP Annex 1 (2022) — соответствие каталога
          </h1>
          <p className="text-[16px] md:text-[18px] text-brand-muted mt-4 leading-relaxed">
            17 категорий расходников Clean Room Systems разнесены по 9
            ключевым разделам Annex 1 (2022). Эта страница помогает
            QA-специалистам и нач. производства собрать комплект расходных
            материалов под валидационный пакет и подготовить площадку к
            аудиту регулятора.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto space-y-5 text-[15px] text-text leading-relaxed">
          <p>
            <strong>EU GMP Annex 1 (2022)</strong> — основной нормативный
            документ Европейской комиссии для производства стерильных
            лекарственных средств. Версия 2022 года переработала структуру
            документа, добавила раздел про Contamination Control Strategy
            (CCS), формализовала использование Quality Risk Management по{' '}
            <a
              href="https://database.ich.org/sites/default/files/ICH_Q9%28R1%29_Guideline_Step4_2023_0126.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline"
            >
              ICH Q9
            </a>{' '}
            и расширила требования к environmental monitoring.
          </p>
          <p>
            В <strong>Республике Узбекистан</strong> переход на обязательную
            GMP-сертификацию для производителей лекарственных средств
            запланирован к <strong>1 января 2027 г.</strong> На этом этапе
            большинство аудитов будет ориентироваться на актуальную версию
            Annex 1 (2022). Резиденты Pharma Park уже сейчас готовят
            производственные площадки под новые требования.
          </p>
          <p>
            Compliance Matrix ниже — рабочий инструмент для составления{' '}
            <strong>CCS-документа</strong>, обоснования выбора поставщиков
            расходных материалов и подготовки к самоинспекции перед визитом
            регулятора. Для каждой категории каталога указаны §-разделы Annex
            1, к которым она относится. На странице конкретной категории и
            каждого товара — детальный текст применимости.
          </p>
        </div>
      </section>

      {/* Compliance Matrix */}
      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1240px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-6">
            Compliance Matrix: 17 категорий × 9 разделов
          </h2>
          <div className="bg-white rounded-xl border border-surface-input overflow-x-auto">
            <table className="w-full border-collapse text-[13px] min-w-[900px] compliance-matrix">
              <thead className="bg-brand-light">
                <tr>
                  <th className="text-left p-3 border-b border-surface-input min-w-[220px]">
                    Категория каталога
                  </th>
                  {annexSections.map((s) => (
                    <th
                      key={s.id}
                      className="p-2 border-b border-l border-surface-input text-center min-w-[60px]"
                      title={s.full}
                    >
                      <div className="font-bold text-brand-dark">
                        {s.label}
                      </div>
                      <div className="text-[10px] text-text-muted font-normal mt-0.5">
                        {s.title}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => {
                  const refs = gmpAnnex1Mapping[cat.slug] || [];
                  if (refs.length === 0) return null;
                  return (
                    <tr
                      key={cat.slug}
                      className="hover:bg-brand-light/20 transition-colors"
                    >
                      <td className="p-3 border-b border-surface-input">
                        <Link
                          href={`/catalog/${cat.slug}`}
                          className="font-medium text-brand-dark hover:text-brand transition-colors"
                        >
                          {cat.title}
                        </Link>
                      </td>
                      {annexSections.map((s) => {
                        const match = matchesSection(cat.slug, s.id);
                        return (
                          <td
                            key={s.id}
                            className="p-2 border-b border-l border-surface-input text-center"
                          >
                            {match ? (
                              <span
                                className="inline-block w-6 h-6 leading-6 rounded-full bg-brand text-white text-[14px] font-bold"
                                title={`Соответствует ${s.label}`}
                              >
                                ✓
                              </span>
                            ) : (
                              <span className="text-text-muted">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-[13px]">
            {annexSections.map((s) => (
              <div
                key={s.id}
                className="flex items-start gap-2 p-3 bg-white rounded-lg border border-surface-input"
              >
                <span className="font-bold text-brand-dark whitespace-nowrap">
                  {s.label}
                </span>
                <div>
                  <p className="font-semibold text-text-dark">{s.title}</p>
                  <p className="text-text-muted text-[12px] leading-snug mt-0.5">
                    {s.full}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-category deep dive */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-2">
            Детально по категориям
          </h2>
          <p className="text-[15px] text-text mb-8">
            Для каждой категории — текст применимости §-разделов Annex 1,
            подготовленный с учётом узбекской регуляторной практики.
          </p>
          <div className="space-y-8">
            {categories.map((cat) => {
              const refs = gmpAnnex1Mapping[cat.slug] || [];
              if (refs.length === 0) return null;
              return (
                <div key={cat.slug} className="border-l-2 border-brand pl-5">
                  <h3 className="text-[18px] font-bold text-text-dark mb-1">
                    <Link
                      href={`/catalog/${cat.slug}`}
                      className="hover:text-brand transition-colors inline-flex items-center gap-1.5"
                    >
                      {cat.title}
                      <ArrowRight size={14} />
                    </Link>
                  </h3>
                  <p className="text-[13px] text-text-muted mb-3">
                    {refs.length} §-разделов Annex 1
                  </p>
                  <ul className="space-y-2.5">
                    {refs.map((ref) => (
                      <li key={ref.section} className="text-[14px]">
                        <div className="flex items-start gap-2.5">
                          <span className="font-bold text-brand-dark whitespace-nowrap min-w-[80px]">
                            {ref.section}
                          </span>
                          <div>
                            <p className="font-semibold text-text-dark">
                              {ref.title}
                            </p>
                            <p className="text-text-muted text-[13px] mt-0.5 leading-relaxed">
                              {ref.relevance}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-6">
            Как пользоваться этой страницей
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 bg-white rounded-xl border border-surface-input">
              <p className="font-bold text-brand-dark mb-2">QA-специалист</p>
              <p className="text-[14px] text-text leading-relaxed">
                Используйте matrix как чек-лист готовности к аудиту. Для
                каждого закрытого §-раздела убедитесь, что в производстве
                есть подтверждённый поставщик расходников, TDS, валидация.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-surface-input">
              <p className="font-bold text-brand-dark mb-2">
                Нач. производства
              </p>
              <p className="text-[14px] text-text leading-relaxed">
                Matrix помогает быстро понять, какие категории расходников
                покрывают «слепые зоны» вашего CCS. Кликайте на категорию —
                откроется детальный список SKU.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-surface-input">
              <p className="font-bold text-brand-dark mb-2">Аудитор</p>
              <p className="text-[14px] text-text leading-relaxed">
                Каждая ячейка ✓ — это обоснованная привязка категории к
                разделу Annex 1. Используйте matrix для оценки полноты
                закупочной программы предприятия.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16 px-4 lg:px-[80px]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-white mb-4">
            Нужна консультация по подбору расходников?
          </h2>
          <p className="text-[16px] text-brand-muted mb-8 leading-relaxed">
            Поможем привязать ваш CCS / валидационный пакет к конкретным
            SKU из каталога. Подготовим коммерческое предложение под класс
            чистоты и тип процессов.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              <Phone size={16} />
              Запросить КП
            </Link>
            <Link
              href="/resources/gmp-audit-checklist"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Download size={16} />
              Чек-лист GMP-аудита
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-6">
            Частые вопросы
          </h2>
          <div className="space-y-5">
            {faqJsonLd.mainEntity.map((q) => (
              <div
                key={q.name}
                className="border-l-2 border-brand pl-5 py-1"
              >
                <h3 className="text-[16px] font-bold text-text-dark mb-2">
                  {q.name}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {q.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
