import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, AlertTriangle, FileText, Phone, Mail } from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';
import PrintButton from '../gmp-audit-checklist/PrintButton';
import '../gmp-audit-checklist/print.css';

export const metadata: Metadata = {
  title: 'ISO 14644 классы чистых помещений — справочник по расходникам',
  description:
    'Практическая спецификация подбора cleanroom-расходников для классов ISO 1-9 / GMP A-D. Чек-листы, нормативы расхода, типичные ошибки. Для QA-специалистов фарм-производств Узбекистана.',
  alternates: {
    canonical: `${siteConfig.url}/resources/iso-14644-classes-spec`,
  },
  openGraph: {
    type: 'article',
    title:
      'ISO 14644 классы чистых помещений — справочник по подбору расходников',
    description:
      'Спецификация расходников для классов ISO 1-9 / GMP A-D: перчатки, одежда, дезинфектанты, салфетки. Нормативы расхода, чек-листы, типичные ошибки выбора.',
    url: `${siteConfig.url}/resources/iso-14644-classes-spec`,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const toc = [
  { id: 'intro', title: 'Введение' },
  { id: 'classification', title: '1. Классификация ISO 14644-1' },
  { id: 'requirements', title: '2. Требования к расходникам по классам' },
  { id: 'iso5', title: '   2.1. Зона ISO 5 / GMP A' },
  { id: 'iso6-7', title: '   2.2. Зона ISO 6–7 / GMP B' },
  { id: 'iso7', title: '   2.3. Зона ISO 7 / GMP C' },
  { id: 'iso8', title: '   2.4. Зона ISO 8 / GMP D' },
  { id: 'checklist', title: '3. Чек-лист подбора расходников' },
  { id: 'criteria', title: '4. Качественные критерии выбора' },
  { id: 'consumption', title: '5. Расчёт потребности' },
  { id: 'mistakes', title: '6. Типичные ошибки выбора' },
  { id: 'sourcing', title: '7. Где купить и что запросить у поставщика' },
  { id: 'conclusion', title: 'Резюме и контакты' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline:
    'Расходники cleanroom для разных классов ISO 14644 — практический справочник',
  description:
    'Экспертная спецификация подбора cleanroom-расходников по классам ISO 14644-1 (ISO 1–9) и EU GMP A–D: перчатки, одежда, дезинфектанты, салфетки, мопы, очки. Нормативы расхода, чек-листы.',
  inLanguage: 'ru',
  datePublished: '2026-05-04',
  dateModified: '2026-05-04',
  author: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/logo.png`,
    },
  },
  image: `${siteConfig.url}/og-image.png`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/resources/iso-14644-classes-spec`,
  },
  about: [
    { '@type': 'Thing', name: 'ISO 14644-1' },
    { '@type': 'Thing', name: 'EU GMP Annex 1' },
    { '@type': 'Thing', name: 'Cleanroom consumables' },
    { '@type': 'Thing', name: 'Pharmaceutical manufacturing' },
    { '@type': 'Thing', name: 'Sterile garments' },
    { '@type': 'Thing', name: 'Disinfectants' },
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
      item: `${siteConfig.url}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Ресурсы',
      item: `${siteConfig.url}/resources/iso-14644-classes-spec`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'ISO 14644 справочник',
      item: `${siteConfig.url}/resources/iso-14644-classes-spec`,
    },
  ],
};

export default function Iso14644ClassesSpecPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-white">
        <div className="container mx-auto px-4 lg:px-20 py-10 lg:py-14">
          {/* Header */}
          <div className="max-w-4xl">
            <div className="no-print flex items-center gap-2 text-[13px] text-text-muted mb-4">
              <Link href="/" className="hover:text-brand">
                Главная
              </Link>
              <span>/</span>
              <span>Ресурсы</span>
              <span>/</span>
              <span className="text-text-dark">ISO 14644 справочник</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-light text-brand-dark rounded-full text-[12px] font-bold uppercase tracking-wider mb-5">
              <FileText size={14} />
              Технический справочник
            </div>

            <h1 className="text-[30px] md:text-[40px] lg:text-[44px] font-extrabold text-text-dark leading-tight mb-5">
              Расходники cleanroom для разных классов ISO 14644 — практический
              справочник
            </h1>

            <p className="text-[17px] md:text-[18px] text-text leading-relaxed mb-6">
              Спецификация для QA-инженеров, начальников цехов и
              специалистов по снабжению фарм-, биотех- и
              микроэлектронных производств. Документ опирается на
              ISO 14644-1:2015, EU GMP Annex 1 (2022), USP &lt;797&gt;,
              IEST-RP-CC003.4 и практику поставок ведущих
              cleanroom-брендов в Узбекистан.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-2">
              <PrintButton />
              <span className="text-[13px] text-text-muted">
                Распечатайте или сохраните как PDF — Ctrl + P
              </span>
            </div>
          </div>

          {/* Layout — sidebar TOC + content */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mt-10">
            {/* TOC */}
            <aside className="no-print lg:sticky lg:top-24 lg:self-start">
              <div className="border border-surface-input rounded-xl p-5 bg-surface">
                <p className="eyebrow mb-3">Содержание</p>
                <ol className="space-y-2 text-[14px]">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-text hover:text-brand transition-colors block leading-snug"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            {/* Article body */}
            <article className="prose-content max-w-3xl">
              {/* Introduction */}
              <section id="intro" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  Введение
                </h2>
                <p className="mb-4">
                  Стандарт ISO 14644-1 «Чистые помещения и связанные с ними
                  контролируемые среды. Часть 1. Классификация чистоты воздуха
                  по концентрации частиц» — основной международный документ,
                  определяющий, как классифицируется чистое помещение в
                  фармацевтике, биотехнологиях, микроэлектронике, медицине и
                  пищевой промышленности. Действующая редакция датирована
                  2015 годом (поправка 2018 г.), и именно она применяется при
                  всех валидациях, аудитах и регистрациях производств в
                  Узбекистане и странах ЕАЭС, а также при сопряжении с EU GMP
                  Annex 1 (2022).
                </p>
                <p className="mb-4">
                  Однако сам стандарт нормирует только{' '}
                  <strong>состояние воздуха</strong>: концентрацию частиц
                  размеров 0.1, 0.2, 0.3, 0.5, 1 и 5 мкм на кубометр. Что
                  именно положено надевать персоналу, какими дезинфектантами
                  обрабатывать поверхности, какие салфетки и мопы применять,
                  какой стерильности должны быть перчатки — в ISO 14644-1
                  напрямую не написано. Эти решения приходится выводить из
                  смежных стандартов: EU GMP Annex 1, USP, IEST-RP, ISO
                  14644-5 (Operations), а также из риск-обоснованной практики
                  предприятия.
                </p>
                <p className="mb-4">
                  В результате на узбекских и центральноазиатских
                  фарм-предприятиях встречаются{' '}
                  <strong>две крайности</strong>: либо «overspec» (стерильные
                  расходники в зонах класса D, что увеличивает себестоимость
                  на 30–60% без выигрыша в качестве), либо «underspec»
                  (нестерильные перчатки в зоне A, неподходящие салфетки для
                  обработки изоляторов, что напрямую угрожает партиям
                  стерильной продукции). Цель этого справочника — закрыть
                  обе крайности и дать однозначные рекомендации по подбору
                  для каждого класса.
                </p>
                <p className="mb-4">
                  Документ построен по принципу «от класса — к артикулу».
                  Сначала мы кратко напомним, что такое классы ISO 14644-1 и
                  как они соотносятся с EU GMP A/B/C/D. Далее по каждой зоне
                  даём спецификацию по 6 категориям расходников: перчатки,
                  одежда, обувь, дезинфектанты, салфетки и мопы, СИЗ для
                  глаз. В конце — чек-листы, формулы расчёта годовой
                  потребности и список самых частых ошибок выбора.
                </p>
                <p className="mb-4">
                  Документ полезен:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    QA / QC-специалистам — как mapping-таблица между
                    классом помещения и допустимыми артикулами;
                  </li>
                  <li>
                    начальникам производства и цехов — для актуализации
                    SOP gowning и cleaning;
                  </li>
                  <li>
                    специалистам по снабжению и закупкам — для написания
                    корректных технических заданий и сравнения предложений
                    поставщиков;
                  </li>
                  <li>
                    проектным командам новых цехов — как стартовая основа
                    спецификации расходных материалов на этапе DQ/IQ.
                  </li>
                </ul>
                <p className="mb-4">
                  Все упоминаемые ниже бренды (Isofield, NPro, Lakeland,
                  Alsico, Contec, Terragene, IBC, MyClean, Pal International)
                  — это коммерчески доступные на узбекском рынке через{' '}
                  {siteConfig.name} и его партнёров позиции. Для каждой
                  категории приведены минимум два альтернативных
                  производителя, чтобы спецификация не привязывалась к
                  единственному источнику.
                </p>
                <p className="mb-4">
                  Отдельная оговорка о терминологии. В русскоязычных
                  стандартах и переводах часто встречается разное
                  обозначение одного и того же класса: «класс ИСО 5», «ISO
                  Class 5», «класс по ISO 14644-1 номер 5», «класс 100» (по
                  старой US Federal Standard 209E, упразднённой в 2001
                  году). Все они в современной нормативной практике
                  означают одно и то же — концентрация частиц ≥0.5 мкм
                  не более 3 520 на кубический метр в установленном
                  состоянии. Аудиторы PIC/S и FDA не принимают ссылки на
                  отозванный FED-STD-209E; используйте только обозначение
                  «ISO Class N» в документации после 2010 года.
                </p>
              </section>

              {/* Section 1 — Classification */}
              <section id="classification" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  1. Классификация ISO 14644-1
                </h2>
                <p className="mb-4">
                  ISO 14644-1:2015 определяет 9 классов чистоты воздуха — от
                  ISO 1 (самый чистый) до ISO 9 (наименее строгий, фактически
                  «слегка контролируемая» среда). Класс задаётся как
                  максимально допустимая концентрация частиц определённого
                  размера на кубический метр воздуха. Методология определена
                  по натуральному логарифму: при увеличении класса на единицу
                  допустимая концентрация растёт в 10 раз. Стандарт также
                  различает три состояния помещения: as-built (после монтажа),
                  at rest (после уборки, без персонала и оборудования) и in
                  operation (во время работы) — и регистрационные документы
                  должны указывать, в каком из этих состояний помещение
                  соответствует объявленному классу.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Таблица классов ISO 14644-1
                </h3>

                <div className="overflow-x-auto -mx-4 lg:mx-0 my-6">
                  <table className="min-w-[640px] w-full text-[14px] border-collapse">
                    <thead>
                      <tr className="bg-surface border border-surface-input">
                        <th className="p-3 text-left border border-surface-input">
                          Класс ISO
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          ≥0.1 мкм / м³
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          ≥0.5 мкм / м³
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          ≥5 мкм / м³
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Применение
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-surface-input font-semibold">
                          ISO 1
                        </td>
                        <td className="p-3 border border-surface-input">10</td>
                        <td className="p-3 border border-surface-input">—</td>
                        <td className="p-3 border border-surface-input">—</td>
                        <td className="p-3 border border-surface-input">
                          Производство микрочипов в нанометрах
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input font-semibold">
                          ISO 2
                        </td>
                        <td className="p-3 border border-surface-input">100</td>
                        <td className="p-3 border border-surface-input">—</td>
                        <td className="p-3 border border-surface-input">—</td>
                        <td className="p-3 border border-surface-input">
                          Полупроводники
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input font-semibold">
                          ISO 3
                        </td>
                        <td className="p-3 border border-surface-input">1 000</td>
                        <td className="p-3 border border-surface-input">35</td>
                        <td className="p-3 border border-surface-input">—</td>
                        <td className="p-3 border border-surface-input">
                          Микроэлектроника, MEMS
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input font-semibold">
                          ISO 4
                        </td>
                        <td className="p-3 border border-surface-input">10 000</td>
                        <td className="p-3 border border-surface-input">352</td>
                        <td className="p-3 border border-surface-input">—</td>
                        <td className="p-3 border border-surface-input">
                          Производство HDD, оптика
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input font-semibold">
                          ISO 5
                        </td>
                        <td className="p-3 border border-surface-input">100 000</td>
                        <td className="p-3 border border-surface-input">3 520</td>
                        <td className="p-3 border border-surface-input">29</td>
                        <td className="p-3 border border-surface-input">
                          Асептический розлив, сборка стерильных продуктов
                          (= GMP A)
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input font-semibold">
                          ISO 6
                        </td>
                        <td className="p-3 border border-surface-input">1 000 000</td>
                        <td className="p-3 border border-surface-input">35 200</td>
                        <td className="p-3 border border-surface-input">293</td>
                        <td className="p-3 border border-surface-input">
                          Расширенная стерильная зона, сборка медизделий
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input font-semibold">
                          ISO 7
                        </td>
                        <td className="p-3 border border-surface-input">—</td>
                        <td className="p-3 border border-surface-input">352 000</td>
                        <td className="p-3 border border-surface-input">2 930</td>
                        <td className="p-3 border border-surface-input">
                          Окружение зоны A (= GMP B in op.) или фасовка
                          таблеток / стерильных API (= GMP C at rest)
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input font-semibold">
                          ISO 8
                        </td>
                        <td className="p-3 border border-surface-input">—</td>
                        <td className="p-3 border border-surface-input">3 520 000</td>
                        <td className="p-3 border border-surface-input">29 300</td>
                        <td className="p-3 border border-surface-input">
                          Подготовка растворов, мойка флаконов (= GMP C in op.
                          / GMP D at rest)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input font-semibold">
                          ISO 9
                        </td>
                        <td className="p-3 border border-surface-input">—</td>
                        <td className="p-3 border border-surface-input">35 200 000</td>
                        <td className="p-3 border border-surface-input">293 000</td>
                        <td className="p-3 border border-surface-input">
                          Окружение для не-критических операций, склады
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-4">
                  Для практической интерпретации: класс ISO 5 в 35 раз
                  «чище» по частицам ≥0.5 мкм, чем ISO 7, и в 350 раз чище,
                  чем ISO 8. Это требует кратно более жёстких ограничений
                  по любому источнику частиц, в первую очередь — по
                  персоналу. Один человек в покое выделяет 10⁵–10⁶ частиц
                  ≥0.5 мкм в минуту, при движении — на порядок больше. В
                  ISO 5 это означает, что без надлежащей одежды, перчаток
                  и поведения класс не может быть удержан и 30 секунд.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Отрасли и типичные классы
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Микроэлектроника и MEMS:</strong> ISO 1–4 в зонах
                    нанесения слоёв (литография), ISO 5 в сборке.
                  </li>
                  <li>
                    <strong>Стерильная фармацевтика (инъекции, вакцины,
                    биологики):</strong> ISO 5 в момент розлива, ISO 6–7 в
                    окружении (Annex 1: класс A в B).
                  </li>
                  <li>
                    <strong>Производство твёрдых лекарственных форм
                    (таблетки, капсулы):</strong> ISO 7–8 (= GMP C–D). При
                    высокоактивных API — особые требования по containment, но
                    классы воздуха те же.
                  </li>
                  <li>
                    <strong>Производство медицинских изделий (катетеры,
                    стенты, имплантаты):</strong> ISO 7 для критических
                    операций, ISO 8 для упаковки и подготовки.
                  </li>
                  <li>
                    <strong>Биотехнологии (mAb, клеточная терапия):</strong>{' '}
                    ISO 5 в LAF/изоляторе, ISO 7 в окружении, ISO 8 в зонах
                    подготовки буферов.
                  </li>
                  <li>
                    <strong>Аптечное приготовление парентеральных растворов
                    (USP &lt;797&gt;):</strong> Primary Engineering Control
                    (LAF) ISO 5 внутри буферной зоны ISO 7.
                  </li>
                  <li>
                    <strong>Микробиология / молекулярная биология
                    (ПЦР):</strong> ISO 7–8 в зонах подготовки реагентов и
                    амплификации.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Соответствие ISO 14644-1 и EU GMP Annex 1
                </h3>
                <p className="mb-4">
                  Annex 1 (2022) использует собственные обозначения зон A, B,
                  C, D — и это{' '}
                  <strong>не прямой синоним классов ISO</strong>. Главные
                  отличия: Annex 1 нормирует частицы только ≥0.5 мкм и ≥5
                  мкм, добавляет микробиологические лимиты (КОЕ/м³, КОЕ на
                  пластину, КОЕ на перчатку), и явно различает at rest / in
                  operation для каждой зоны. Соответствие следующее:
                </p>

                <div className="overflow-x-auto -mx-4 lg:mx-0 my-6">
                  <table className="min-w-[640px] w-full text-[14px] border-collapse">
                    <thead>
                      <tr className="bg-surface border border-surface-input">
                        <th className="p-3 text-left border border-surface-input">
                          GMP
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          ISO at rest
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          ISO in operation
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Микро КОЕ/м³ (in op.)
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Глоувс (КОЕ/перчатка)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-surface-input font-semibold">
                          A
                        </td>
                        <td className="p-3 border border-surface-input">ISO 4.8</td>
                        <td className="p-3 border border-surface-input">ISO 4.8</td>
                        <td className="p-3 border border-surface-input">&lt;1</td>
                        <td className="p-3 border border-surface-input">&lt;1</td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input font-semibold">
                          B
                        </td>
                        <td className="p-3 border border-surface-input">ISO 5</td>
                        <td className="p-3 border border-surface-input">ISO 7</td>
                        <td className="p-3 border border-surface-input">10</td>
                        <td className="p-3 border border-surface-input">5</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input font-semibold">
                          C
                        </td>
                        <td className="p-3 border border-surface-input">ISO 7</td>
                        <td className="p-3 border border-surface-input">ISO 8</td>
                        <td className="p-3 border border-surface-input">100</td>
                        <td className="p-3 border border-surface-input">—</td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input font-semibold">
                          D
                        </td>
                        <td className="p-3 border border-surface-input">ISO 8</td>
                        <td className="p-3 border border-surface-input">не нормируются</td>
                        <td className="p-3 border border-surface-input">200</td>
                        <td className="p-3 border border-surface-input">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-4">
                  Практический вывод: для фармпредприятия достаточно
                  ориентироваться на четыре уровня — A, B, C, D. Все остальные
                  ISO-классы либо относятся к небиологическим производствам,
                  либо выходят за пределы Annex 1. Поэтому далее в этом
                  документе спецификация расходников приводится по EU GMP
                  обозначениям с указанием эквивалента ISO в скобках.
                </p>
                <p className="mb-4">
                  Дополнительная разница, которую часто упускают на
                  стартующих производствах: ISO 14644-1 определяет
                  процедуру измерения и расчёта количества пробных точек
                  (по площади помещения), требования к particle counter
                  (калибровка по ISO 21501-4), длительность пробы и
                  статистику принятия решения. Annex 1 эти процедурные
                  моменты не повторяет, но требует «соответствие ISO
                  14644-1 для частиц». На аудите запрашивают полный
                  протокол реклассификации с расчётом N_L (число точек),
                  V_S (объём пробы) и UCL (верхний доверительный предел).
                  Предприятия, делавшие реклассификацию по упрощённой
                  методике или старой версии стандарта 1999 г.,
                  периодически попадают на major-finding.
                </p>
              </section>

              {/* Section 2 — Requirements by class */}
              <section id="requirements" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  2. Требования к расходникам по классам
                </h2>
                <p className="mb-4">
                  Эта секция — основной справочник. Для каждой зоны мы
                  даём шесть категорий: перчатки, одежда, обувь,
                  дезинфектанты, салфетки/мопы, СИЗ для глаз. Внутри
                  каждой категории — спецификация (что должно быть указано
                  в техническом задании) и реальные коммерчески доступные
                  бренды на узбекском рынке.
                </p>

                {/* 2.1 — ISO 5 / GMP A */}
                <h3
                  id="iso5"
                  className="text-[22px] font-extrabold text-text-dark mb-3 mt-8"
                >
                  2.1. Зона ISO 5 / GMP A — асептика, ламинар, изоляторы
                </h3>
                <p className="mb-4">
                  Зона A — это зона, в которой в момент операции
                  находится открытый стерильный продукт или его
                  первичная упаковка: точка наполнения шприцов и флаконов
                  под ламинаром, открытая стадия лиофилизации, зона
                  сборки стерильных медицинских изделий. Здесь любой
                  расходник, который контактирует с воздухом или
                  поверхностью внутри ламинара, должен быть стерильным,
                  сертифицированным и поставляться в двойной/тройной
                  упаковке для безопасного внесения через материальный
                  шлюз.
                </p>

                <p className="mb-2 font-semibold text-text-dark">
                  Перчатки
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Материал: нитрил (или неопрен для аллергиков),
                    непудрированные.
                  </li>
                  <li>
                    Стерильность: гамма-облучённые, индивидуальная
                    стерильная упаковка с двойным пакетом, SAL 10⁻⁶.
                  </li>
                  <li>
                    AQL по дефектам: ≤1.5 (предпочтительно ≤0.65).
                  </li>
                  <li>Длина: ≥300 мм для перекрытия рукава комбинезона.</li>
                  <li>
                    Размерный ряд от 6.0 до 9.5 с шагом 0.5 (полные
                    цифровые размеры).
                  </li>
                  <li>
                    Tекстура — micro-textured fingertips для удержания
                    предметов.
                  </li>
                  <li>
                    Бренды: Isofield Gecko Sterile, NPro Cleanroom Sterile,
                    Ansell BioClean Maxima, Kimtech G3 Sterile (как
                    альтернатива).
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Одежда (комбинезон + капюшон + бахилы)
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Материал: ламинат полиэтилен/полипропилен (SMS),
                    continuous filament polyester или Tyvek IsoClean.
                  </li>
                  <li>
                    Стерилизация: гамма-облучение, дозу указывать в
                    сертификате каждой партии.
                  </li>
                  <li>
                    Bacterial filtration efficiency (BFE) ≥99.9% на
                    частицах ≥0.5 мкм.
                  </li>
                  <li>
                    Helmke drum particle release: класс I по IEST-RP-CC003
                    (минимальное выделение частиц).
                  </li>
                  <li>
                    Эластичные манжеты на запястьях и щиколотках, упаковка
                    sterile-wrap двойная.
                  </li>
                  <li>
                    Для зоны A — обязательно с интегрированным капюшоном и
                    маской.
                  </li>
                  <li>
                    Бренды: Lakeland CleanMax CTL428, Isofield Sterile
                    Coverall, Alsico Allstar Sterile, DuPont Tyvek IsoClean
                    180.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Обувь и бахилы
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Стерильные бахилы поверх специальной cleanroom-обуви
                    (сабо или закрытые ботинки), материал — non-woven с
                    ESD-свойствами.
                  </li>
                  <li>
                    Высота бахил — от лодыжки до колена (knee-high), с
                    эластичной фиксацией сверху.
                  </li>
                  <li>
                    Подошва — антискользящая, не оставляющая следов.
                  </li>
                  <li>
                    Бренды: Isofield Sterile Knee-High, Lakeland CleanMax
                    Bootie, NPro Boot Cover Sterile.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Дезинфектанты
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Базовый: 70% изопропиловый спирт (ИПА) sterile-filtered
                    с сертификатом стерильности на партию.
                  </li>
                  <li>
                    Спорицид (ротация раз в неделю / по графику):
                    стабилизированная перекись водорода 6%, диоксид хлора
                    или надуксусная кислота.
                  </li>
                  <li>
                    Тестирован на recurring isolates конкретного завода
                    (часть валидации дезинфекции).
                  </li>
                  <li>
                    Поставка в стерильных триггер-спрей бутылках или в
                    bag-in-box диспенсерах.
                  </li>
                  <li>
                    Бренды: Contec Sterile 70 IPA, Pal Klercide,
                    SteriPlus, MyClean Sterile 70, IBC Sterile IPA 70%.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Салфетки и мопы
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Материал: 100% непрерывный полиэстер, лазерная обрезка
                    кромки, без расслоения.
                  </li>
                  <li>
                    Стерилизация: гамма, индивидуальная стерильная
                    упаковка.
                  </li>
                  <li>
                    Pre-saturated (готовая пропитка ИПА 70%) или sterile dry
                    (для пропитки своими дезинфектантами).
                  </li>
                  <li>
                    Низкое выделение волокон (low linting) — обязательно по
                    методике IEST-RP-CC004.
                  </li>
                  <li>
                    Размер 9″×9″ (23×23 см) или 12″×12″ для салфеток;
                    70×60 см для мопов с готовой пропиткой.
                  </li>
                  <li>
                    Бренды: Contec Polynit Heatseal, Berkshire Choice
                    Sterile, Foamtec MicroWipe, Texwipe TX3211 Sterile.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  СИЗ для глаз
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Стерильные одноразовые очки или автоклавируемые
                    многоразовые с обработкой anti-fog.
                  </li>
                  <li>
                    Соответствие EN 166 / ANSI Z87.1.
                  </li>
                  <li>
                    Бренды: NPro VC2 (автоклавируемые), Isofield Sterile
                    Goggles, Honeywell Pulsafe.
                  </li>
                </ul>

                <Pitfall
                  text="В ламинаре зоны A применяют нестерильные «cleanroom-перчатки» класса C — формально это перчатки для cleanroom, фактически они не проходят SAL 10⁻⁶ и недопустимы. Аудитор фиксирует major-finding и под угрозу попадают все партии, выпущенные с этой ошибкой."
                />

                <p className="mb-4">
                  Важная рекомендация для УЗ-предприятий: для зоны A
                  никогда не экономьте на упаковке. Стерильные расходники
                  должны иметь как минимум двойной пакет (внешний — для
                  снятия в проходном шлюзе, внутренний — для внесения в
                  ламинар). Расходники с одинарной упаковкой,
                  поставляемые «по цене стерильных», — частая ловушка на
                  тендерах. Без правильной упаковки внести их в зону A
                  без вторичной контаминации физически невозможно, и весь
                  процесс gowning теряет смысл.
                </p>

                {/* 2.2 — ISO 6-7 / GMP B */}
                <h3
                  id="iso6-7"
                  className="text-[22px] font-extrabold text-text-dark mb-3 mt-10"
                >
                  2.2. Зона ISO 6–7 / GMP B — окружение асептической зоны
                </h3>
                <p className="mb-4">
                  Зона B — фон вокруг зоны A. Здесь ходят операторы, стоит
                  оборудование, выполняются вспомогательные операции, но
                  открытого стерильного продукта быть не должно. По частицам
                  это эквивалент ISO 7 (in op.) / ISO 5 (at rest), по
                  микробиологии — &lt;10 КОЕ/м³. Расходники для B по
                  большинству позиций совпадают с A: тот же стерильный
                  комбинезон, та же дисциплина gowning, те же стерильные
                  перчатки. Допускается чуть менее строгая упаковка
                  (одинарный sterile-wrap при правильном проходном шлюзе) и
                  использование многоразовой одежды после стирки и
                  стерилизации в cleanroom-прачечной.
                </p>

                <p className="mb-2 font-semibold text-text-dark">
                  Перчатки
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Стерильные нитриловые, AQL ≤1.5, длина ≥290 мм.
                  </li>
                  <li>
                    Допустимы перчатки класса «sterile clean» с одинарной
                    упаковкой (в отличие от А).
                  </li>
                  <li>
                    Бренды: Isofield Gecko Sterile, NPro Cleanroom Sterile,
                    Ansell BioClean Eclipse, Kimtech G3 Sterile.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Одежда
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Стерильный комбинезон с капюшоном (single-use или
                    re-sterilized многоразовый из непрерывного
                    полиэстера).
                  </li>
                  <li>
                    Многоразовая одежда: 100% полиэстер с углеродными
                    нитями для антистатичности, цикл жизни 50–80
                    стирок/стерилизаций при контракте с cleanroom-прачечной
                    класса 5.
                  </li>
                  <li>
                    Бренды single-use: те же что и в А (Lakeland CleanMax
                    CTL428, DuPont Tyvek IsoClean 180).
                  </li>
                  <li>
                    Бренды re-usable: Alsico Allstar Reusable, Dastex
                    Cleanroom Garments, Mascot Cleanroom.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Обувь
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Cleanroom-сабо или закрытые ботинки, выделенные только
                    для зоны B, не покидающие стерильную раздевалку.
                  </li>
                  <li>
                    Поверх — стерильные бахилы knee-high (как в А).
                  </li>
                  <li>
                    Бренды: Sika Cleanroom Clogs, Bata Cleanroom Boots,
                    Abeba ESD.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Дезинфектанты
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Стерильные ИПА 70% и спорицид по графику ротации (как в
                    А).
                  </li>
                  <li>
                    Стерильность здесь обязательна — нестерильный
                    дезинфектант сам становится источником контаминации.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Салфетки и мопы
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Стерильные полиэстеровые с лазерной кромкой; для
                    больших поверхностей — стерильные мопы с
                    предварительной пропиткой.
                  </li>
                  <li>
                    Размер 23×23 см (салфетки), 30×40 см или 60×40 см
                    (мопы).
                  </li>
                  <li>
                    Бренды: Contec Polynit Sterile, Berkshire Choice,
                    Texwipe TX3211S.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  СИЗ для глаз
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Стерильные одноразовые либо автоклавируемые с
                    регулярной обработкой по SOP.
                  </li>
                </ul>

                <Pitfall
                  text="В B-зоне используют нестерильные «cleanroom»-комбинезоны после стирки в обычной прачечной. Без cleanroom-laundry с EM, валидированной упаковкой и сертификатом стерилизации такая одежда — источник вторичной контаминации, и партии под угрозой. На аудите запрашивают сертификат прачечной — его отсутствие делает несоответствие неустранимым в краткосрочной перспективе."
                />

                {/* 2.3 — ISO 7 / GMP C */}
                <h3
                  id="iso7"
                  className="text-[22px] font-extrabold text-text-dark mb-3 mt-10"
                >
                  2.3. Зона ISO 7 / GMP C — подготовительные операции для
                  стерильных и нестерильных ЛС
                </h3>
                <p className="mb-4">
                  Зона C — это зоны подготовки растворов перед
                  стерилизующей фильтрацией, мойки флаконов и компонентов,
                  фасовки твёрдых лекарственных форм при наличии
                  containment-требований. По частицам ISO 8 in op. /
                  ISO 7 at rest. Микробиология — &lt;100 КОЕ/м³. Здесь
                  спецификация уже мягче: стерильность не обязательна для
                  всех расходников (но желательна для дезинфектантов
                  поверхностей оборудования), допустимы многоразовые
                  комбинезоны с регулярной стиркой в cleanroom-прачечной
                  класса C.
                </p>

                <p className="mb-2 font-semibold text-text-dark">
                  Перчатки
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Нитриловые непудрированные, AQL ≤1.5; стерильные —
                    по риск-обоснованию (открытые операции с продуктом —
                    стерильные; закрытые — нестерильные допустимы).
                  </li>
                  <li>
                    Длина ≥240 мм (стандартная), для перекрытия рукава.
                  </li>
                  <li>
                    Сертификат пищевой / медицинский (EN 374, EN 455,
                    ASTM D6319).
                  </li>
                  <li>
                    Бренды: Isofield Cleanroom Nitrile, NPro Cleanroom,
                    Ansell BioClean Aseptic, Kimtech G3 Nitrile.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Одежда
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Многоразовый комбинезон с интегрированным капюшоном —
                    полиэстер с углеродными антистатическими нитями,
                    стирка в cleanroom-прачечной класса 7.
                  </li>
                  <li>
                    Альтернатива — одноразовый комбинезон базовой
                    спецификации (полиэстер или SMS, нестерильный).
                  </li>
                  <li>
                    Бренды re-usable: Alsico Allstar, Dastex, Klopman
                    Cleanroom; single-use: Lakeland CleanMax CTL412,
                    DuPont Tyvek IsoClean 130.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Обувь
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Закрытые сабо или ботинки выделенные для зоны C,
                    антистатичные, моющиеся в дезрастворе.
                  </li>
                  <li>
                    Бахилы — нестерильные, многоразовые после стирки.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Дезинфектанты
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Базовый: ИПА 70% (стерильный для контактных
                    поверхностей оборудования, нестерильный для
                    стен/полов).
                  </li>
                  <li>
                    Поверхности и полы: четвертичные аммониевые соединения
                    (ЧАС), бигуаниды, окислители.
                  </li>
                  <li>
                    Спорицид раз в неделю или по триггеру (нестерильный
                    допустим для напольных операций).
                  </li>
                  <li>
                    Бренды: Contec ProSpray, Pal Klercide LpH, MyClean QAC,
                    IBC Surface QAC.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Салфетки и мопы
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Полиэстеровые нестерильные, ультразвуковая или
                    лазерная кромка, low-linting.
                  </li>
                  <li>
                    Допустимы многоразовые микрофибровые мопы с
                    цветовой кодировкой и валидированной программой
                    стирки.
                  </li>
                  <li>
                    Бренды: Contec Heritage, Berkshire Lab Wipes, Foamtec
                    Cleanroom MicroWipe.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  СИЗ для глаз
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Многоразовые автоклавируемые либо одноразовые
                    нестерильные cleanroom-очки.
                  </li>
                </ul>

                <Pitfall
                  text="В зоне C для дезинфекции открытого оборудования (например, бункер таблеточного пресса) применяют нестерильный QAC из бытовой канистры. Аудитор фиксирует, что валидация дезинфекции не покрывает условия применения. Решение — стерильный или sterile-filtered QAC из cleanroom-серии, либо обоснованное переключение на ИПА для финальной обработки."
                />

                {/* 2.4 — ISO 8 / GMP D */}
                <h3
                  id="iso8"
                  className="text-[22px] font-extrabold text-text-dark mb-3 mt-10"
                >
                  2.4. Зона ISO 8 / GMP D — упаковка, склад первичной упаковки,
                  вспомогательные зоны
                </h3>
                <p className="mb-4">
                  Зона D — это зоны вторичной упаковки, склады первичной
                  упаковки, технические помещения с базовым контролем
                  чистоты. По частицам ISO 8 at rest, in op. не нормируется.
                  Микробиология &lt;200 КОЕ/м³. Здесь требования мягкие —
                  допустимы базовые СИЗ, бытовые дезинфектанты с
                  подтверждённой эффективностью, многоразовая одежда из
                  смеси полиэстер/хлопок.
                </p>

                <p className="mb-2 font-semibold text-text-dark">
                  Перчатки
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Нитриловые или латексные нестерильные, AQL ≤4.0
                    (стандарт коммерческого качества).
                  </li>
                  <li>
                    Возможны винил/вилнил для не-критических зон (склад,
                    приёмка).
                  </li>
                  <li>
                    Бренды: любые медицинские или пищевые перчатки с
                    EN 455 / EN 374; популярные на УЗ-рынке — IBC, Maxter,
                    Top Glove.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Одежда
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Халат полиэстер/хлопок, шапочка, обычная рабочая
                    обувь со сменной парой для производственной зоны.
                  </li>
                  <li>
                    Стирка — в обычной промышленной прачечной по
                    утверждённому SOP.
                  </li>
                  <li>
                    Бренды: общая спецодежда, локально пошитая по
                    утверждённой ТЗ.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Обувь
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Базовая закрытая обувь, моющаяся, выделенная для
                    производства.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Дезинфектанты
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Бытовые / индустриальные ЧАС, гипохлориты для
                    периодической дезинфекции, ИПА 70% для протирки
                    поверхностей.
                  </li>
                  <li>
                    Стерильность не требуется. Главное — подтверждённая
                    эффективность по EN 1276 / EN 13727 и совместимость с
                    материалами.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  Салфетки и мопы
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Многоразовые микрофибровые мопы с цветовой кодировкой
                    зон, нестерильные одноразовые целлюлозные салфетки.
                  </li>
                  <li>
                    Бренды: Vermop, Vileda Professional, Contec Heritage.
                  </li>
                </ul>

                <p className="mb-2 font-semibold text-text-dark">
                  СИЗ для глаз
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Базовые защитные очки EN 166 для операций с риском
                    разбрызгивания; постоянное ношение не требуется (если
                    не указано в SOP).
                  </li>
                </ul>

                <Pitfall
                  text="Типичная ошибка: в зоне D используют те же стерильные расходники, что и в зоне C, «на всякий случай». В результате стоимость потребления удваивается (стерильный комбинезон в 4–6 раз дороже многоразового). Аудитор не предъявляет претензий по качеству, но менеджмент платит лишние 10–25 тыс. USD/мес. Risk-based approach Annex 1 явно поощряет дифференциацию — overspec не повышает качество, но снижает рентабельность."
                />
              </section>

              {/* Section 3 — Checklist */}
              <section id="checklist" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  3. Чек-лист подбора расходников
                </h2>
                <p className="mb-4">
                  Этот чек-лист используется при актуализации спецификаций
                  расходных материалов на действующем предприятии и при
                  старте проекта нового цеха. Он структурирован по зонам и
                  по категориям. Отметьте каждый пункт «выполнено / в работе
                  / не выполнено» и определите ответственного.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Чек-лист зоны A / ISO 5
                </h3>
                <Checklist
                  items={[
                    'Стерильные нитриловые перчатки длиной ≥300 мм с двойной упаковкой и AQL ≤1.5 — спецификация утверждена QA.',
                    'Стерильные комбинезоны с капюшоном single-use или re-sterilized, BFE ≥99.9%, IEST класс I — артикул и поставщик утверждены.',
                    'Стерильные knee-high бахилы для надевания поверх cleanroom-обуви — артикул и страховой запас определены.',
                    'Стерильный ИПА 70% sterile-filtered с сертификатом стерильности на каждую партию — поставщик квалифицирован.',
                    'Спорицид (H₂O₂, ClO₂ или PAA) для еженедельной ротации — артикул, концентрация, экспозиция валидированы.',
                    'Стерильные полиэстеровые салфетки с лазерной кромкой и Helmke класс I — артикул в номенклатуре.',
                    'Стерильные мопы pre-saturated для уборки внутри ламинара — артикул в номенклатуре.',
                    'Стерильные одноразовые или автоклавируемые очки, обработка anti-fog — артикул утверждён.',
                    'У всех артикулов есть сертификат стерильности с указанием дозы / процесса (γ, EtO, steam) — пакет аудита собран.',
                    'Quality Agreement подписан с каждым поставщиком категории; страховой запас 8–10 недель.',
                  ]}
                />

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Чек-лист зоны B / ISO 7
                </h3>
                <Checklist
                  items={[
                    'Стерильные нитриловые перчатки длиной ≥290 мм, AQL ≤1.5 — спецификация утверждена.',
                    'Стерильный комбинезон single-use или re-sterilized многоразовый — оба варианта прописаны в SOP gowning.',
                    'Контракт с cleanroom-прачечной класса 5: EM прачечной, валидация упаковки, цикл стерилизации.',
                    'Cleanroom-обувь зоны B + стерильные бахилы — артикулы и SOP смены утверждены.',
                    'Стерильные ИПА 70% и спорицид по графику — поставщик квалифицирован.',
                    'Стерильные полиэстеровые салфетки и мопы (готовая пропитка или dry) — артикулы в номенклатуре.',
                    'Тренинг-программа gowning с реквалификацией каждые 6 мес.',
                  ]}
                />

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Чек-лист зоны C / ISO 8
                </h3>
                <Checklist
                  items={[
                    'Нитриловые перчатки AQL ≤1.5, длина ≥240 мм — спецификация утверждена; стерильные — для критических операций.',
                    'Многоразовый комбинезон с капюшоном (полиэстер + углеродные нити) — артикул, поставщик, прачечная согласованы.',
                    'Альтернативный single-use комбинезон базовой спецификации — для случаев пика производства.',
                    'Cleanroom-обувь зоны C, антистатичная — артикул утверждён.',
                    'ИПА 70% (стерильный для оборудования, нестерильный для стен) и QAC для стен/полов — оба артикула в номенклатуре.',
                    'Полиэстеровые нестерильные салфетки и мопы с цветовой кодировкой зон — артикулы в номенклатуре.',
                    'Многоразовые автоклавируемые или одноразовые очки — артикул утверждён.',
                  ]}
                />

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Чек-лист зоны D / ISO 8 (at rest)
                </h3>
                <Checklist
                  items={[
                    'Нитриловые или латексные нестерильные перчатки AQL ≤4.0 — артикул утверждён.',
                    'Базовый халат полиэстер/хлопок и шапочка — пошив или поставка локально.',
                    'Базовая закрытая cleanroom-обувь — артикул утверждён.',
                    'Бытовые / индустриальные дезинфектанты с подтверждённой эффективностью EN 1276 / EN 13727.',
                    'Многоразовые микрофибровые мопы — артикулы и цветовая кодировка зон.',
                    'Очки EN 166 для операций с риском брызг — артикул в номенклатуре.',
                  ]}
                />
              </section>

              {/* Section 4 — Quality criteria */}
              <section id="criteria" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  4. Качественные критерии при выборе
                </h2>
                <p className="mb-4">
                  Производитель и марка — это только начало. На реальном
                  тендере одинаковая «нитриловая стерильная перчатка» от
                  трёх производителей может отличаться в цене в 2 раза, а в
                  частицах выделения — в 10. Чтобы не делать ошибку
                  сравнения по цене, при формировании спецификации и
                  приёмке партии нужно проверять следующее.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Документация на каждую партию
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Technical Data Sheet (TDS):</strong> размеры,
                    плотность, AQL, частицы по Helmke drum, BFE, эффективность
                    фильтрации частиц 0.3 / 0.5 мкм, ESD-параметры.
                  </li>
                  <li>
                    <strong>Certificate of Analysis (CoA) на каждой
                    партии:</strong> результаты тестов конкретной партии
                    (стерильность, эндотоксины, частицы).
                  </li>
                  <li>
                    <strong>Сертификат стерилизации:</strong> метод (γ, EtO,
                    steam, e-beam), доза/параметры, дата облучения, validation
                    reference.
                  </li>
                  <li>
                    <strong>CE / ЕАС / FDA 510(k):</strong> регистрация в
                    нужной юрисдикции; для УЗ-рынка приоритетен ЕАС, для
                    экспорта — CE.
                  </li>
                  <li>
                    <strong>Сертификат ISO 9001 / ISO 13485 / ISO 14644
                    у производителя:</strong> подтверждение системы
                    качества и cleanroom-производства самой продукции.
                  </li>
                  <li>
                    <strong>Quality Agreement:</strong> двусторонний документ
                    между поставщиком и заводом; описывает спецификации,
                    уведомления об изменениях, права аудита.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Технические критерии для перчаток
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>AQL (Acceptable Quality Limit):</strong> для
                    GMP A/B — ≤1.5 (предпочтительно ≤0.65), для C — ≤1.5,
                    для D — ≤4.0. AQL — статистический показатель, не
                    «брак на партию», а уровень риска принять партию с
                    дефектами.
                  </li>
                  <li>
                    <strong>Целостность по EN 455 / ASTM D5151:</strong>
                    {' '}тест водяной утечки.
                  </li>
                  <li>
                    <strong>Состав:</strong> не должно быть пудры, минимальное
                    содержание экстрагируемых веществ; для антистатических
                    зон — поверхностное сопротивление 10⁶–10⁹ Ω.
                  </li>
                  <li>
                    <strong>Текстура:</strong> micro-textured fingertips для
                    зон A/B, smooth — для зон C/D.
                  </li>
                  <li>
                    <strong>Толщина пальца:</strong> 0.10–0.13 мм для A/B
                    (тактильная чувствительность), 0.13–0.18 мм для C/D
                    (механическая защита).
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Технические критерии для салфеток
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Метод обработки кромки:</strong> лазер
                    (предпочтительно для A/B), heatseal (хорошо для A/B/C),
                    ультразвук (приемлемо для C), «cut edge» (только D).
                  </li>
                  <li>
                    <strong>Состав:</strong> 100% непрерывный полиэстер для
                    A/B, полиэстер/целлюлоза для C, целлюлоза/микрофибра для
                    D.
                  </li>
                  <li>
                    <strong>Helmke drum particle release:</strong> класс I
                    (≤4 ед./пер.) для A/B, класс II–III для C, класс III–IV
                    для D.
                  </li>
                  <li>
                    <strong>Sorption capacity:</strong> минимум 4× от
                    собственной массы (то есть салфетка 5 г впитывает 20 мл
                    раствора).
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Совместимость дезинфектантов и материалов
                </h3>
                <p className="mb-4">
                  При подборе дезинфектанта важно проверить совместимость
                  с материалами оборудования и помещения. ИПА 70%
                  допускается практически везде, но: окисляющие
                  дезинфектанты (надуксусная кислота, диоксид хлора)
                  могут разрушать нержавейку 304 при длительном
                  воздействии — требуется регулярная промывка водой.
                  ЧАС (четвертичные аммониевые) накапливаются на пористых
                  материалах (силикон, EPDM) — нужна процедура нейтрализации.
                  Гипохлориты несовместимы с алюминием и никелем. Все
                  ограничения должны быть прописаны в SOP уборки и в
                  валидации дезинфекции с указанием времени экспозиции и
                  процедуры смыва.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Тест-челлендж дезинфектанта на recurring isolates
                </h3>
                <p className="mb-4">
                  Annex 1 (2022) и USP &lt;1072&gt; явно требуют, чтобы
                  эффективность дезинфектанта была подтверждена не только
                  стандартными лабораторными тест-штаммами (Staphylococcus
                  aureus, Pseudomonas aeruginosa, Candida albicans,
                  Aspergillus brasiliensis по EN 13697 / EN 13727), но и
                  на реальных recurring isolates конкретного предприятия.
                  То есть собственная микрофлора зон A/B/C, выявленная по
                  результатам EM, должна быть протестирована против
                  выбранного дезинфектанта при заявленном времени
                  экспозиции и концентрации. Этот тест выполняется
                  внешней микробиологической лабораторией (в УЗ — обычно
                  Институт микробиологии или партнёры из РФ/ЕС). Без
                  результатов такого теста валидация дезинфекции считается
                  неполной, и аудитор фиксирует major-finding.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Endotoxin testing для критических расходников
                </h3>
                <p className="mb-4">
                  Для производства парентеральных лекарственных средств
                  расходники, контактирующие с открытым продуктом,
                  должны поставляться с сертификатом по эндотоксинам
                  (LAL test по USP &lt;85&gt; или recombinant Factor C).
                  Лимиты: для перчаток — &lt;0.25 EU/перчатка, для
                  салфеток — &lt;0.5 EU/см², для технологических вод
                  (если используются) — &lt;0.25 EU/мл. Это особенно
                  важно для биологических препаратов (mAb, вакцины,
                  клеточная терапия), где эндотоксиновая нагрузка готового
                  продукта строго лимитирована и любой источник, включая
                  перчатки оператора, должен быть учтён.
                </p>

                <Pitfall
                  text="Самая частая «находка» при сверке спецификаций — несовпадение между TDS на сайте производителя и тем, что фактически написано в TDS поставленной партии. Бренд один, но заводы могут быть разные (контрактное производство), и параметры частиц/AQL отличаться. Всегда требуйте TDS и CoA конкретной партии до согласования цены."
                />
              </section>

              {/* Section 5 — Consumption calculation */}
              <section id="consumption" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  5. Расчёт потребности
                </h2>
                <p className="mb-4">
                  Один из самых распространённых вопросов от закупщиков:
                  «Сколько перчаток / комбинезонов / литров ИПА нужно на
                  год?». Точная цифра зависит от технологии и режима
                  работы, но рамочные нормативы можно вывести из EU GMP
                  Annex 1, USP &lt;1116&gt; и практики типового
                  фарм-цеха. Ниже приводим формулы и базовые цифры по
                  каждой категории.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Перчатки
                </h3>
                <p className="mb-4">
                  Базовая формула: <code>N = операторы × смены × циклы ×
                  рабочие_дни × резерв</code>. Цикл — это одно надевание
                  пары перчаток. По Annex 1 в зоне A пара меняется каждые
                  30–60 минут или после любого подозрения на повреждение.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Зона A:</strong> 8–12 пар на оператора в смену
                    (контактный мониторинг 5 пальцев + смена при
                    значимой манипуляции).
                  </li>
                  <li>
                    <strong>Зона B:</strong> 4–6 пар на оператора в смену.
                  </li>
                  <li>
                    <strong>Зона C:</strong> 2–3 пары на оператора в смену.
                  </li>
                  <li>
                    <strong>Зона D:</strong> 1–2 пары на оператора в смену.
                  </li>
                </ul>
                <p className="mb-4">
                  <strong>Пример расчёта:</strong> 10 операторов × 2 смены
                  × 4 пары × 250 рабочих дней × 1.1 страховой коэффициент
                  ≈ 22 000 пар/год для зоны C. Для зоны A те же 10
                  операторов × 2 × 10 × 250 × 1.1 ≈ 55 000 пар/год.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Комбинезоны
                </h3>
                <p className="mb-4">
                  Stewart formula: <code>N_коминезон = операторы × смены ×
                  циклы_смены × рабочие_дни × резерв</code>. Один
                  комбинезон = одна смена в зоне A/B (правило «no re-use»
                  one-shift) или 1 неделя для многоразового в зоне C.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Зона A/B (single-use стерильный):</strong> 1
                    шт. на оператора на смену + 0.5 шт. резерв (поломка
                    при gowning).
                  </li>
                  <li>
                    <strong>Зона A/B (re-sterilized):</strong> минимум 4
                    смены/комбинезон, среднее 8.
                  </li>
                  <li>
                    <strong>Зона C (re-usable):</strong> 1 шт.
                    /оператор/неделю при стирке после каждой смены.
                  </li>
                  <li>
                    <strong>Зона D (re-usable халат):</strong> 1 шт. на 2
                    недели или дольше.
                  </li>
                </ul>
                <p className="mb-4">
                  <strong>Пример расчёта:</strong> 5 операторов в B-зоне
                  × 2 смены × 1.5 (один на смену + резерв) × 250 дней ≈
                  3 750 single-use комбинезонов/год.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Дезинфектанты
                </h3>
                <p className="mb-4">
                  Расчёт: <code>V = площадь_зоны × частота_уборки ×
                  расход_л_на_м² × рабочие_дни</code>. Стандартный расход —
                  20–30 мл/м² при ручной протирке, 50–80 мл/м² при мойке
                  пола.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Зона A/B:</strong> ИПА 70% стерильный — 0.5–1.0 л
                    на м² поверхностей в неделю; спорицид — 0.2 л/м² раз в
                    неделю.
                  </li>
                  <li>
                    <strong>Зона C:</strong> ИПА 70% — 0.3–0.5 л/м² в неделю;
                    QAC — 0.5 л/м² в неделю на полы.
                  </li>
                  <li>
                    <strong>Зона D:</strong> базовый дезинфектант 0.3 л/м² в
                    неделю.
                  </li>
                </ul>
                <p className="mb-4">
                  <strong>Пример расчёта:</strong> зона A площадью 50 м² —
                  50 × 1 л/м² × 52 недели × 1.1 ≈ 2 860 л стерильного
                  ИПА/год. Это около 60 канистр по 5 л в месяц — обычно
                  поставляется в bag-in-box по 20 л.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Салфетки и мопы
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Зона A/B (стерильные салфетки):</strong> 8–15
                    шт. на оператора на смену для протирки оборудования и
                    рук между операциями.
                  </li>
                  <li>
                    <strong>Зона C:</strong> 3–6 шт. на оператора на смену.
                  </li>
                  <li>
                    <strong>Зона D:</strong> 1–2 шт. на оператора на смену.
                  </li>
                  <li>
                    <strong>Мопы:</strong> 1 моп на 20 м² площади на
                    одну уборку. Зона A/B — стерильный pre-saturated
                    одноразовый; зона C — многоразовый микрофибровый
                    (50–80 циклов стирки).
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Сводная таблица потребности на «средний» цех
                </h3>
                <p className="mb-4">
                  Условный завод: 1 линия стерильного розлива (зона A/B,
                  10 операторов, 2 смены), 1 линия твёрдых ЛФ (зона C, 8
                  операторов, 1 смена), вспомогательные зоны D (15
                  человек). 250 рабочих дней.
                </p>

                <div className="overflow-x-auto -mx-4 lg:mx-0 my-6">
                  <table className="min-w-[640px] w-full text-[14px] border-collapse">
                    <thead>
                      <tr className="bg-surface border border-surface-input">
                        <th className="p-3 text-left border border-surface-input">
                          Категория
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Зона A/B
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Зона C
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Зона D
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-surface-input">
                          Перчатки, пар/год
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~55 000 (стерильные)
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~6 000
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~5 000
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input">
                          Комбинезоны, шт./год
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~7 500 (single-use)
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~400 (multi-use, ротация)
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~150 халатов
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input">
                          ИПА 70%, л/год
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~3 000 (стерильный)
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~1 200
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~400
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input">
                          Спорицид, л/год
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~600
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~150
                        </td>
                        <td className="p-3 border border-surface-input">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input">
                          Салфетки, шт./год
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~75 000 (стерильные)
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~12 000
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~4 000
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input">
                          Мопы, шт./год
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~1 800 (стерильные)
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~120 (multi-use)
                        </td>
                        <td className="p-3 border border-surface-input">
                          ~80
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-4">
                  Цифры — ориентировочные, для предметного расчёта на
                  конкретный цех нужны: компоновка, фактические смены,
                  количество запусков партий, время операций. Команда{' '}
                  {siteConfig.name} помогает построить такой расчёт по
                  заполненной анкете для каждого SKU и срок поставки.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Корректирующие коэффициенты к базовому расчёту
                </h3>
                <p className="mb-4">
                  Базовая формула даёт нижнюю границу. Реальная
                  потребность корректируется на следующие факторы:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Сезонные пики:</strong> при выпуске вакцин или
                    сезонной продукции потребление может расти в 1.5–2 раза
                    в течение 2–3 месяцев. Учитывайте при планировании
                    закупок и страхового запаса.
                  </li>
                  <li>
                    <strong>Mock-inspections и аудиты:</strong> в неделю
                    подготовки к внешнему аудиту потребление расходников
                    в зонах A/B вырастает в 1.3–1.5 раза за счёт
                    дополнительной уборки и репетиций gowning.
                  </li>
                  <li>
                    <strong>Расследования отклонений:</strong> при OOS-EM
                    или санитарной обработке после инцидента потребление
                    спорицида и стерильных салфеток скачкообразно
                    увеличивается. Закладывайте 5–10% «инцидентного» резерва
                    в годовой бюджет.
                  </li>
                  <li>
                    <strong>Стажёры и новые операторы:</strong> в период
                    обучения новички потребляют на 30–40% больше
                    комбинезонов и перчаток (порча при gowning, повторные
                    надевания). При расширении штата планируйте отдельно.
                  </li>
                  <li>
                    <strong>Процедуры media fill (APS):</strong> при
                    каждом раунде имитации асептического процесса (по
                    Annex 1 — каждые 6 месяцев, минимум 3 раунда в год)
                    дополнительный расход стерильных комбинезонов 30–80
                    шт. в зависимости от длительности операции.
                  </li>
                  <li>
                    <strong>CIP/SIP циклы:</strong> при ручной финальной
                    верификации после CIP/SIP оборудования операторам
                    нужны дополнительные стерильные салфетки и ИПА на
                    точечную обработку — 5–10% сверх плановой нормы.
                  </li>
                </ul>
              </section>

              {/* Section 6 — Mistakes */}
              <section id="mistakes" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  6. Типичные ошибки выбора
                </h2>
                <p className="mb-4">
                  По нашему опыту работы с фарм-предприятиями Узбекистана и
                  региона, при подборе расходников встречаются повторяющиеся
                  ошибки. Большинство из них проявляются на аудите как
                  major-наблюдения и требуют дорогостоящих CAPA. Лучше
                  избегать заранее.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.1. Использование «универсальных» расходников во всех зонах
                </h3>
                <p className="mb-4">
                  Соблазн упростить snabжение и купить один артикул на все
                  зоны приводит либо к overspec (стерильные перчатки в
                  D-зоне = переплата), либо к underspec (нестерильные
                  перчатки в A-зоне = срыв партии). Правильный подход:
                  отдельная номенклатура SKU для каждой зоны с чётким
                  правилом «не пересекать границу зоны».
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.2. Отказ от ротации спорицида
                </h3>
                <p className="mb-4">
                  Распространённая практика — использовать только ИПА 70% и
                  не вводить регулярный спорицид. Споры Bacillus и
                  Aspergillus устойчивы к спирту, и без периодической
                  обработки спорицидом (минимум раз в неделю) на
                  поверхностях накапливается споровая нагрузка. На EM это
                  проявляется как растущий тренд КОЕ; на аудите —
                  обнаружение Bacillus subtilis в зоне A. Annex 1 (2022)
                  требует ротации в явном виде.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.3. Ошибки в gowning protocol
                </h3>
                <p className="mb-4">
                  Стерильный комбинезон, надетый неправильно, не отличается
                  от нестерильного. Типичные ошибки: касание капюшоном или
                  рукавом стен/пола в раздевалке, нарушение
                  последовательности (перчатки до маски и капюшона),
                  отсутствие двойного пакета на бахилах. Решение — детальный
                  SOP с фото, обучение и реквалификация каждого оператора
                  каждые 6 месяцев с тестом на проба-пластинах
                  (Hand-finger / forehead / chest contact plates).
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.4. Покупка по самой низкой цене
                </h3>
                <p className="mb-4">
                  На тендере цена за пару нитриловых стерильных перчаток
                  может различаться в 2 раза. Часто разница объясняется не
                  «маржой поставщика», а реальными отличиями: AQL 4.0 vs
                  AQL 1.5, отсутствие сертификата стерилизации на каждой
                  партии, толщина 0.08 мм vs 0.12 мм. Эти разницы — не
                  «нюансы», а основания для отбраковки на приёмке. При
                  правильной приёмке дешёвый артикул вернётся 30–50%
                  отбраковкой и в итоге окажется дороже.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.5. Отсутствие страхового запаса
                </h3>
                <p className="mb-4">
                  Логистика стерильных расходников из ЕС в Узбекистан — 8–14
                  недель в среднем (производство под заказ + γ-стерилизация
                  + транспорт + таможня). Без страхового запаса 8–10 недель
                  перерыв в производстве при первом сбое поставки гарантирован.
                  Это одна из самых дорогих ошибок: остановка стерильной
                  линии = упущенная выручка десятки тысяч USD в день.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.6. Один поставщик на критическую категорию
                </h3>
                <p className="mb-4">
                  Annex 1 требует supplier qualification и quality risk
                  management. Зависимость от единственного поставщика по
                  стерильной перчатке или комбинезону — это major-finding
                  в риск-карте. Минимум 2 квалифицированных поставщика на
                  каждую критическую категорию, оба прошли аудит и имеют
                  Quality Agreement.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.7. Несоответствие SOP и фактического артикула
                </h3>
                <p className="mb-4">
                  SOP gowning ссылается на артикул XYZ, в учётной системе
                  и на складе — артикул ABC (закупили альтернативу 2 года
                  назад без change control). Аудитор сравнивает SOP и
                  накладные — несоответствие. Решение — формальный change
                  control при любом изменении поставщика или артикула, с
                  обновлением SOP, валидации и обучения.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.8. Игнорирование совместимости дезинфектанта и
                  материала
                </h3>
                <p className="mb-4">
                  ЧАС, оставленный на резиновых уплотнениях бункера
                  таблеточного пресса, через 6 месяцев приводит к
                  растрескиванию EPDM. Окислители на нержавейке — к
                  питтинговой коррозии. Все ограничения должны быть в
                  валидации дезинфекции и в SOP уборки с фиксированным
                  временем экспозиции и процедурой смыва.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.9. Сертификат стерильности «на тип», а не на партию
                </h3>
                <p className="mb-4">
                  Часть поставщиков предоставляет один общий сертификат
                  стерилизации на серию артикулов, ссылаясь на
                  валидацию процесса γ-облучения. Этого недостаточно для
                  GMP-производителя стерильной фармы: запрашивать
                  необходимо именно сертификат конкретной партии (lot
                  number, доза облучения в kGy, дата облучения,
                  идентификатор контейнера). Без этого аудитор не может
                  привязать партию расходника к партии готового продукта,
                  и трассируемость рвётся. На входной приёмке должен быть
                  чек-лист соответствия: партия в накладной = партия на
                  упаковке = партия в сертификате стерильности.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.10. Хранение расходников после вскрытия упаковки
                </h3>
                <p className="mb-4">
                  Стерильные перчатки и комбинезоны после вскрытия
                  внешнего пакета имеют ограниченный срок применения —
                  обычно 24–48 часов в условиях соответствующего класса.
                  После этого срока действие стерильности «на доверии»
                  прекращается. Распространённая ошибка — открыть коробку
                  стерильного комбинезона в раздевалке и хранить
                  оставшиеся артикулы «как есть» неделю. Решение: либо
                  индивидуальная упаковка каждой единицы (большинство
                  премиальных брендов так и поставляют), либо строгий
                  лимит на количество вскрытий за смену с фиксацией в
                  журнале.
                </p>
              </section>

              {/* Section 7 — Sourcing */}
              <section id="sourcing" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  7. Где купить и что запросить у поставщика
                </h2>
                <p className="mb-4">
                  Финальная часть справочника — практические рекомендации
                  по работе с поставщиком. Хороший поставщик
                  cleanroom-расходников — это не просто продавец каталога,
                  а партнёр, который помогает собрать regulatory dossier,
                  поддерживает страховой запас, обеспечивает квалификацию
                  альтернативных артикулов и реагирует на change notice
                  производителя.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Что должно быть в коммерческом предложении (КП)
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    Полное наименование производителя и страна
                    производства каждого артикула.
                  </li>
                  <li>
                    Артикул производителя (не «склейка» дистрибьютора).
                  </li>
                  <li>
                    Спецификация: материал, размеры, AQL, BFE, частицы по
                    Helmke drum, метод стерилизации.
                  </li>
                  <li>
                    Объём упаковки (шт. в индивидуальном пакете / коробке /
                    палете).
                  </li>
                  <li>
                    Срок годности (для стерильных — обычно 3–5 лет от
                    стерилизации).
                  </li>
                  <li>
                    Срок поставки по отдельной партии (со склада / под
                    заказ).
                  </li>
                  <li>
                    Цена за единицу (FCA / DAP / DDP — Incoterms 2020).
                  </li>
                  <li>
                    Условия оплаты и валюта (USD / EUR / UZS).
                  </li>
                  <li>
                    Гарантии: возврат при отбраковке, замена при дефектах
                    транспортировки.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Документы для запроса с КП
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    TDS (Technical Data Sheet) на каждый артикул на
                    последнюю версию.
                  </li>
                  <li>
                    Образцы CoA (Certificate of Analysis) и Certificate of
                    Sterility за последние 6 месяцев — посмотреть качество
                    документации.
                  </li>
                  <li>
                    Сертификаты регистрации в РУ: ЕАС, при необходимости
                    регистрация в реестре медизделий.
                  </li>
                  <li>
                    ISO 9001 / ISO 13485 / ISO 14644 у производителя.
                  </li>
                  <li>
                    Quality Agreement template — посмотреть, готов ли
                    поставщик к подписанию.
                  </li>
                  <li>
                    Change notification policy: процедура уведомления о
                    замене материала / производственной площадки.
                  </li>
                  <li>
                    Список 3–5 референс-клиентов, которые применяют этот
                    артикул в GMP-производстве.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  CRS как поставщик
                </h3>
                <p className="mb-4">
                  {siteConfig.name} (ООО TOPAZ COMPANY) — официальный B2B-поставщик
                  cleanroom-расходников в Узбекистане. Работаем напрямую с
                  ведущими производителями: Isofield, NPro, Lakeland,
                  Alsico, Contec, Pal International, Terragene, IBC.
                  Поставляем 260+ SKU в 17 категориях для всех классов
                  GMP A–D / ISO 5–8.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    Полный пакет документов на каждую партию: TDS, CoA,
                    Certificate of Sterility, ЕАС.
                  </li>
                  <li>
                    Quality Agreement по запросу.
                  </li>
                  <li>
                    Поддержка спецификаций под любые цеха — от существующих
                    производств до новых проектов в Pharma Park.
                  </li>
                  <li>
                    Страховой запас по критическим SKU на складе в
                    Ташкенте.
                  </li>
                  <li>
                    Срок поставки со склада 1–3 дня, под заказ из ЕС — 8–10
                    недель.
                  </li>
                </ul>

                <div className="rounded-2xl border border-brand/30 bg-brand-light/30 p-6 md:p-8 my-8 no-print-bg">
                  <h3 className="text-[22px] md:text-[24px] font-extrabold text-text-dark mb-3 leading-tight">
                    Нужна спецификация под конкретный цех?
                  </h3>
                  <p className="text-[15px] text-text mb-5 leading-relaxed">
                    Свяжитесь с нашими специалистами — поможем составить
                    спецификацию SKU под ваши классы зон, рассчитаем
                    годовую потребность и подготовим коммерческое
                    предложение со сроками.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contacts"
                      className="no-print inline-flex items-center justify-center px-6 h-[48px] text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors"
                    >
                      Запросить спецификацию
                    </Link>
                    <Link
                      href="/catalog"
                      className="no-print inline-flex items-center justify-center px-6 h-[48px] text-[15px] font-semibold text-brand-dark bg-white border border-brand-dark rounded-lg hover:bg-surface transition-colors"
                    >
                      Каталог продукции
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-brand/20 flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
                    <a
                      href={`tel:${phoneTel}`}
                      className="inline-flex items-center gap-2 text-text-dark hover:text-brand transition-colors"
                    >
                      <Phone size={16} className="text-brand" />
                      {siteConfig.phone}
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center gap-2 text-text-dark hover:text-brand transition-colors"
                    >
                      <Mail size={16} className="text-brand" />
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </section>

              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  Резюме и контакты
                </h2>
                <p className="mb-4">
                  Подбор cleanroom-расходников по классам ISO 14644-1 / EU
                  GMP A–D — это не вопрос «купить подороже». Это
                  риск-обоснованное решение, в котором каждый артикул
                  поддерживает класс зоны, не выделяет лишних частиц,
                  совместим с дезинфектантами, имеет полный пакет
                  документации и поддерживается страховым запасом и
                  альтернативными поставщиками. Правильно собранная
                  спецификация снижает себестоимость на 20–30% по
                  сравнению с интуитивным подбором, а на аудите даёт
                  однозначную картину «всё под контролем».
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Ключевые рекомендации
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    Сделайте mapping-таблицу: зона → артикул, и зафиксируйте
                    в SOP. Любая замена — через change control.
                  </li>
                  <li>
                    Не уравнивайте зоны: A/B = стерильные расходники с
                    полным пакетом, C = частично, D = базовые.
                  </li>
                  <li>
                    AQL ≤1.5 для перчаток A/B/C, ≤4.0 для D — норматив, а
                    не рекомендация.
                  </li>
                  <li>
                    Helmke drum класс I для салфеток A/B — обязательно;
                    лазерная или heatseal кромка.
                  </li>
                  <li>
                    Спорицид раз в неделю с ротацией — Annex 1 (2022)
                    требование.
                  </li>
                  <li>
                    Страховой запас 8–10 недель по критическим SKU; минимум
                    2 квалифицированных поставщика.
                  </li>
                  <li>
                    На каждой партии: TDS, CoA, сертификат стерилизации.
                    Quality Agreement подписан.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Внутренние ресурсы
                </h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <Link href="/catalog/garments" className="text-brand hover:underline">
                      Стерильная одежда для зон A/B/C
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog/perchatki-zashchitnye" className="text-brand hover:underline">
                      Стерильные нитриловые перчатки
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog/disinfectants-and-detergents" className="text-brand hover:underline">
                      Дезинфектанты и спороциды
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog/cleanroom-wipes" className="text-brand hover:underline">
                      Cleanroom-салфетки и мопы
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog/goggles" className="text-brand hover:underline">
                      Защитные очки для cleanroom
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog/cleanroom-shoes" className="text-brand hover:underline">
                      Cleanroom-обувь
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/gmp-audit-checklist" className="text-brand hover:underline">
                      Чек-лист подготовки к GMP-аудиту 2027
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-brand hover:underline">
                      База знаний — статьи о cleanroom-индустрии
                    </Link>
                  </li>
                </ul>

                <p className="text-[13px] text-text-muted mt-10 pt-6 border-t border-surface-input">
                  Документ носит информационный характер, является
                  обзорным справочником и не заменяет нормативного
                  консультирования или валидационных работ. Конкретные
                  спецификации требуют индивидуального gap-анализа под
                  процессы и продуктовый портфель предприятия. Проверяйте
                  актуальные редакции ISO 14644-1, EU GMP Annex 1,
                  USP &lt;797&gt; / &lt;1116&gt; и нормативных актов
                  Республики Узбекистан перед принятием решений.
                </p>
                <p className="text-[13px] text-text-muted mt-2">
                  Обновлено: май 2026 г. © {siteConfig.name}.
                </p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 my-4">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-[15px] text-text leading-relaxed"
        >
          <CheckCircle2 size={18} className="text-brand shrink-0 mt-1" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Pitfall({ text }: { text: string }) {
  return (
    <div className="flex gap-3 p-4 my-5 bg-amber-50 border border-amber-200 rounded-lg">
      <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
      <p className="text-[14px] text-amber-900 leading-relaxed m-0">
        <strong className="font-semibold">Типичная ошибка: </strong>
        {text}
      </p>
    </div>
  );
}
