import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  Phone,
  Download,
  FileText,
} from 'lucide-react';
import { categories } from '@/data/products';
import {
  STANDARDS,
  StandardId,
  getRefsByStandard,
  getStandardsForCategory,
} from '@/data/standards-mapping';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title:
    'Соответствие стандартам — каталог Clean Room Systems (Annex 1, ICH, USP)',
  description:
    'Compliance matrix всех 17 категорий каталога Clean Room Systems против EU GMP Annex 1 (2022), ICH Q7/Q9/Q10 и USP <1116>. Для QA-специалистов фарм-индустрии.',
  alternates: {
    canonical: `${siteConfig.url}/compliance/standards`,
  },
  openGraph: {
    title:
      'Compliance Matrix — 5 стандартов × 17 категорий | Clean Room Systems',
    description:
      'Подбор расходников против EU GMP Annex 1 (2022), ICH Q7/Q9/Q10 и USP <1116>. Готовая база для CCS и валидационного пакета.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const STANDARD_ORDER: StandardId[] = [
  'gmp_annex1_2022',
  'ich_q7',
  'ich_q9',
  'ich_q10',
  'usp_1116',
];

const STANDARD_INTRO: Record<StandardId, string> = {
  gmp_annex1_2022:
    'EU GMP Annex 1 (2022) — пересмотренный Европейской комиссией основной документ для производства стерильных лекарственных средств. Версия 2022 года вступила в действие 25 августа 2023 г. и реструктурировала весь подход к стерильному производству: введён обязательный документ Contamination Control Strategy (CCS, §2-§3), формализован принцип Quality Risk Management (привязка к ICH Q9), разделены требования к классам зон A/B/C/D, расширены положения по environmental monitoring (§9) и aseptic process simulation (APS). Отдельный §11 целиком посвящён очистке, дезинфекции и спорициду. Это краеугольный документ для всех резидентов Pharma Park, готовящихся к обязательной GMP-сертификации в Узбекистане с 1 января 2027 г. Каталог Clean Room Systems напрямую покрывает большинство категорий расходников и СИЗ, упомянутых в Annex 1: одежда, перчатки, салфетки, дезинфектанты, мопы, sticky mats, биоиндикаторы.',
  ich_q7:
    'ICH Q7 — международное руководство по Good Manufacturing Practice для активных фармацевтических ингредиентов (API, субстанций). Принято Международным советом по гармонизации (ICH) и инкорпорировано в FDA 21 CFR, EU GMP Part II и в нормативную базу большинства стран PIC/S, включая Россию и Казахстан. В Узбекистане ICH Q7 применяется производителями субстанций и заводами полного цикла, выпускающими активные ингредиенты для собственных формуляций. Документ покрывает квалификацию помещений, производственный контроль (§5), упаковку и маркировку (§14), валидацию (§12), контроль изменений (§13). Для не-стерильных API класс чистоты помещений мягче, но требования к контролю поставщиков расходников и упаковки — сопоставимы с Annex 1. Каталог CRS для производителей API применим прежде всего в части упаковочных материалов, СИЗ и дезинфектантов.',
  ich_q9:
    'ICH Q9 (R1) — пересмотренное в 2023 году руководство по Quality Risk Management. Это методологический документ: он не описывает конкретные требования, а формулирует принципы риск-подхода, которые пронизывают и Annex 1, и ICH Q7, и ICH Q10. R1-версия подчеркнула формализацию субъективности риск-оценки, требование адекватного hazard identification и связь с CCS. Annex II документа содержит примеры применения риск-подхода к qualification, validation, supplier management, change control и cleaning programs. Для каталога CRS ICH Q9 — это основа обоснования выбора каждой категории расходников: класс одежды, тип перчаток, уровень стерильности салфеток, ротация дезинфектантов — всё определяется риск-классификацией зоны и операции. Без явной привязки к ICH Q9 любой выбор поставщика расходников будет атакован аудитором как «не обоснованный».',
  ich_q10:
    'ICH Q10 — Pharmaceutical Quality System (PQS), концептуальная рамка управления качеством на всём жизненном цикле препарата. Документ описывает четыре элемента PQS: Process Performance & Product Quality Monitoring (§3.2), Corrective Action / Preventive Action (CAPA, §3.2.2), Change Management (§3.2.3) и Management Review (§3.2.4). Отдельный §2.7 посвящён управлению аутсорс-активностями и квалификации поставщиков — это ключевой раздел для дистрибьютора расходников. В контексте каталога CRS ICH Q10 определяет, как покупатель должен формализовать отношения с поставщиком: оценка качества партий, change control при смене артикула, аудит производителя, корректирующие действия по жалобам. Для каждой категории каталога мы готовы предоставить TDS, протоколы партий, сертификаты ISO 9001/13485 и CE — это основной пакет для квалификации поставщика по Q10.',
  usp_1116:
    'USP <1116> — глава Фармакопеи США «Microbiological Control and Monitoring of Aseptic Processing Environments». В отличие от Annex 1 (нормативный документ ЕС), USP <1116> носит характер информационной главы, но фактически признаётся регуляторами США (FDA), Канады и многих других стран как best-practice reference. Документ детально описывает: классификацию cleanroom (раздел 4), мониторинг персонала и gowning (раздел 5), очистку и дезинфекцию (раздел 6), микробиологический мониторинг и flora identification (раздел 7), интерпретацию результатов EM (раздел 8). USP <1116> требует валидации программы дезинфекции (включая ротацию спорицида), отпечатков перчаток после критических операций, применения стерильной одежды и мопов в зонах A/B. Для производителей, экспортирующих в США или работающих с американскими contract manufacturing partners, USP <1116> часто является обязательным reference вместе с Annex 1.',
};

const STANDARD_SLUG_LABEL: Record<StandardId, string> = {
  gmp_annex1_2022: 'EU GMP Annex 1 (2022)',
  ich_q7: 'ICH Q7',
  ich_q9: 'ICH Q9 (R1)',
  ich_q10: 'ICH Q10',
  usp_1116: 'USP <1116>',
};

interface StandardSummary {
  id: StandardId;
  totalRefs: number;
  categoriesCount: number;
}

export default function ComplianceStandardsPage() {
  // Pre-compute summary stats per standard
  const summary: StandardSummary[] = STANDARD_ORDER.map((stdId) => {
    let totalRefs = 0;
    let categoriesCount = 0;
    categories.forEach((cat) => {
      const refs = getRefsByStandard(cat.slug, stdId);
      if (refs.length > 0) {
        totalRefs += refs.length;
        categoriesCount += 1;
      }
    });
    return { id: stdId, totalRefs, categoriesCount };
  });

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
        name: 'Все стандарты',
        item: `${siteConfig.url}/compliance/standards`,
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline:
      'Соответствие международным стандартам — каталог Clean Room Systems',
    description:
      'Compliance matrix 17 категорий каталога против EU GMP Annex 1 (2022), ICH Q7, ICH Q9 (R1), ICH Q10 и USP <1116>.',
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/compliance/standards`,
    inLanguage: 'ru',
    about: STANDARD_ORDER.map((stdId) => ({
      '@type': 'Thing',
      name: STANDARDS[stdId].fullName,
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Чем ICH отличается от EU GMP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'EU GMP — это нормативный регламент Европейского Союза с обязательным применением для всех производителей лекарств в ЕС и для экспортёров на этот рынок. ICH (International Council for Harmonisation) — международный технический совет, выпускающий гармонизированные руководства (Q1-Q14), которые затем инкорпорируются в национальные нормативные базы. ICH Q7/Q9/Q10 — это методологическая рамка (как делать), Annex 1 — конкретные требования к стерильному производству (что делать). Annex 1 (2022) явно ссылается на ICH Q9 как основу риск-подхода и на ICH Q10 как PQS. На практике в Узбекистане GMP-инспекция проверит соответствие и тому, и другому.',
        },
      },
      {
        '@type': 'Question',
        name: 'Достаточно ли только Annex 1 или нужны все стандарты?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Annex 1 (2022) сам по себе ссылается на ICH Q9 (риск-подход) и ICH Q10 (PQS) — без них вы не сможете формально обосновать ни CCS, ни выбор поставщиков, ни программу дезинфекции. ICH Q7 нужен производителям API. USP <1116> рекомендуется как дополнительный reference для микробиологической программы. На практике QA-пакет фарм-производителя в Узбекистане должен покрывать минимум Annex 1 + Q9 + Q10. ICH Q7 — для участков синтеза. USP <1116> — обязателен при экспорте в США или работе с американскими CMO.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какие стандарты применимы для производителя API в Узбекистане?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Производитель API ориентируется прежде всего на ICH Q7 (это его основной GMP-документ) + ICH Q9 (риск-подход к процессам синтеза, очистки, кросс-контаминации) + ICH Q10 (PQS, change control, supplier management). Annex 1 применим частично — если API стерильный или если на производстве есть зоны асептической обработки. USP <1116> для большинства API-производителей не критичен. Каталог CRS для API-сектора покрывает упаковочные материалы (категория cleanroom-packaging), СИЗ, дезинфектанты и расходники для общей очистки.',
        },
      },
      {
        '@type': 'Question',
        name: 'Как использовать matrix для составления CCS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Compliance Matrix — стартовая таблица для документа Contamination Control Strategy. Шаги: (1) выписать из таблицы все категории, релевантные вашему производству; (2) для каждой категории открыть страницу /catalog/{slug} и выбрать конкретные SKU под класс зоны; (3) скачать TDS и сертификаты с каждой карточки товара; (4) в CCS-документе сослаться на §-разделы Annex 1 + соответствующие пункты ICH Q9 (риск-обоснование) + ICH Q10 (управление поставщиком). Per-standard breakdown ниже на этой странице сразу даёт текст relevance для каждой ссылки — его можно использовать как заготовку для CCS-параграфов.',
        },
      },
      {
        '@type': 'Question',
        name: 'Где скачать оригинальные документы стандартов?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'EU GMP Annex 1 (2022) — официальная PDF на сайте Европейской комиссии (health.ec.europa.eu). ICH Q7, Q9 (R1), Q10 — на портале database.ich.org, открытый доступ. USP <1116> — платный доступ через USP-NF online (uspnf.com), либо через институциональную подписку. Узбекские нормативные акты по GMP — на портале lex.uz. Если нужна помощь со ссылками или сравнением версий — наш отдел продаж готов отправить актуальный пакет ссылок отдельным письмом.',
        },
      },
      {
        '@type': 'Question',
        name: 'Покрывает ли каталог CRS все требования Annex 1 + ICH + USP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Каталог покрывает расходные материалы и СИЗ — это около 60-70% позиций, упоминаемых в перечисленных стандартах: одежда, перчатки, салфетки, мопы, дезинфектанты, биоиндикаторы, sticky mats, упаковка, мебель, обувь. Стационарное оборудование (HVAC, изоляторы, RABS, autoclaves, laminar flow), валидационные сервисы (DQ/IQ/OQ/PQ), документационная поддержка CCS и обучение персонала — за пределами скоупа дистрибьютора. По этим позициям мы рекомендуем отдельных подрядчиков и можем предоставить контакты партнёров.',
        },
      },
      {
        '@type': 'Question',
        name: 'Можно ли получить compliance-документацию в виде Excel-таблицы?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да. По запросу отдел продаж Clean Room Systems отправляет полную compliance matrix в формате Excel — с разбивкой по категориям, SKU, §-разделам Annex 1, ссылками на ICH/USP и колонками под TDS / протоколы партий / сертификаты. Это удобный формат для подключения к QMS-системе предприятия. Запросить можно через форму на странице контактов или по телефону отдела продаж.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-dark py-12 px-4 lg:px-[80px]">
        <nav
          className="flex items-center gap-1.5 text-[13px] text-brand-muted mb-4"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link
            href="/compliance/annex1"
            className="hover:text-white transition-colors"
          >
            Compliance
          </Link>
          <span>/</span>
          <span className="text-white">Все стандарты</span>
        </nav>
        <div className="max-w-[900px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand text-white rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            B2B compliance reference
          </div>
          <h1 className="text-[28px] md:text-[42px] font-extrabold text-white leading-tight">
            Соответствие международным стандартам — каталог Clean Room Systems
          </h1>
          <p className="text-[16px] md:text-[18px] text-brand-muted mt-4 leading-relaxed">
            17 категорий расходников разнесены по 5 ключевым стандартам
            фарм-индустрии: EU GMP Annex 1 (2022), ICH Q7, ICH Q9 (R1), ICH Q10
            и USP &lt;1116&gt;. Эта страница — рабочий инструмент QA-департамента
            для составления CCS, валидационного пакета и подготовки производства
            к GMP-инспекции.
          </p>
          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {summary.map((s) => (
              <div
                key={s.id}
                className="bg-white/5 border border-white/10 rounded-lg p-3"
              >
                <p className="text-[11px] text-brand-muted uppercase tracking-wider font-bold">
                  {STANDARDS[s.id].shortName}
                </p>
                <p className="text-[20px] text-white font-extrabold mt-1">
                  {s.categoriesCount}
                  <span className="text-[12px] text-brand-muted font-normal ml-1">
                    категорий
                  </span>
                </p>
                <p className="text-[11px] text-brand-muted mt-0.5">
                  {s.totalRefs} ref-связей
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro per standard */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-6">
            5 стандартов: что и зачем
          </h2>
          <p className="text-[15px] text-text leading-relaxed mb-8">
            Современный QA-пакет фарм-производства не ограничивается одним
            нормативным документом. Annex 1 устанавливает требования к
            стерильному производству, ICH Q7-Q10 описывают методологию (риск,
            PQS, GMP для API), USP &lt;1116&gt; добавляет детализацию микробиологической
            программы. Все пять документов взаимно ссылаются друг на друга, и
            аудит регулятора Узбекистана к 2027 г. будет ожидать формального
            покрытия каждого из них в QA-документации.
          </p>
          <div className="space-y-8">
            {STANDARD_ORDER.map((stdId) => {
              const meta = STANDARDS[stdId];
              return (
                <div
                  key={stdId}
                  id={`standard-${stdId}`}
                  className="border-l-2 border-brand pl-5"
                >
                  <div className="flex items-baseline gap-3 flex-wrap mb-2">
                    <h3 className="text-[18px] md:text-[20px] font-bold text-text-dark">
                      {meta.shortName}
                    </h3>
                    <span className="text-[13px] text-text-muted">
                      {meta.fullName}
                    </span>
                  </div>
                  <p className="text-[14px] text-text leading-relaxed">
                    {STANDARD_INTRO[stdId]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Matrix */}
      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1240px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-2">
            Compliance Matrix: 17 категорий × 5 стандартов
          </h2>
          <p className="text-[15px] text-text mb-6">
            Цифра в ячейке — количество ref-связей категории с разделами
            стандарта. Кликните по категории, чтобы перейти в каталог.
            Прочерк означает, что для данной комбинации mapping не задан
            (категория не критична для этого стандарта).
          </p>
          <div className="bg-white rounded-xl border border-surface-input overflow-x-auto">
            <table className="w-full border-collapse text-[13px] min-w-[800px] compliance-matrix">
              <thead className="bg-brand-light">
                <tr>
                  <th className="text-left p-3 border-b border-surface-input min-w-[260px]">
                    Категория каталога
                  </th>
                  {STANDARD_ORDER.map((stdId) => (
                    <th
                      key={stdId}
                      className="p-2 border-b border-l border-surface-input text-center min-w-[100px]"
                      title={STANDARDS[stdId].fullName}
                    >
                      <div className="font-bold text-brand-dark text-[12px]">
                        {STANDARDS[stdId].shortName}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => {
                  const stdsForCat = getStandardsForCategory(cat.slug);
                  if (stdsForCat.length === 0) return null;
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
                      {STANDARD_ORDER.map((stdId) => {
                        const refs = getRefsByStandard(cat.slug, stdId);
                        return (
                          <td
                            key={stdId}
                            className="p-2 border-b border-l border-surface-input text-center"
                          >
                            {refs.length > 0 ? (
                              <span
                                className="inline-block min-w-[28px] h-7 leading-7 px-2 rounded-full bg-brand text-white text-[13px] font-bold"
                                title={`${refs.length} ref-связей с ${STANDARDS[stdId].shortName}`}
                              >
                                {refs.length}
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
            {STANDARD_ORDER.map((stdId) => (
              <div
                key={stdId}
                className="flex items-start gap-2 p-3 bg-white rounded-lg border border-surface-input"
              >
                <span className="font-bold text-brand-dark whitespace-nowrap">
                  {STANDARDS[stdId].shortName}
                </span>
                <div>
                  <p className="font-semibold text-text-dark">
                    {STANDARDS[stdId].fullName.replace(/^[^:]+:\s*/, '')}
                  </p>
                  <p className="text-text-muted text-[12px] leading-snug mt-0.5">
                    {STANDARDS[stdId].scope}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-standard breakdown */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-2">
            Детализация по стандартам
          </h2>
          <p className="text-[15px] text-text mb-8">
            Для каждого стандарта — список релевантных категорий каталога с
            конкретными §-разделами и текстом обоснования. Используйте этот
            блок как заготовку для параграфов CCS, обоснования закупки и
            валидационных протоколов.
          </p>

          {STANDARD_ORDER.map((stdId) => {
            const meta = STANDARDS[stdId];
            const relevantCats = categories.filter(
              (cat) => getRefsByStandard(cat.slug, stdId).length > 0
            );
            if (relevantCats.length === 0) {
              return (
                <div
                  key={stdId}
                  id={`breakdown-${stdId}`}
                  className="mb-12 last:mb-0"
                >
                  <h3 className="text-[20px] md:text-[24px] font-extrabold text-text-dark mb-2">
                    {meta.shortName}{' '}
                    <span className="text-[14px] text-text-muted font-normal">
                      — {meta.scope}
                    </span>
                  </h3>
                  <p className="text-[14px] text-text-muted italic">
                    Mapping для этого стандарта пока не задан в категориях
                    каталога. Свяжитесь с отделом продаж — подготовим
                    индивидуальный compliance-разбор под ваш процесс.
                  </p>
                </div>
              );
            }
            return (
              <div
                key={stdId}
                id={`breakdown-${stdId}`}
                className="mb-12 last:mb-0"
              >
                <div className="bg-brand-light/30 border border-brand-light rounded-xl p-5 mb-6">
                  <h3 className="text-[20px] md:text-[24px] font-extrabold text-text-dark mb-1">
                    {meta.shortName}
                  </h3>
                  <p className="text-[14px] text-text-dark font-semibold mb-1">
                    {meta.fullName}
                  </p>
                  <p className="text-[13px] text-text">{meta.scope}</p>
                  <p className="text-[12px] text-text-muted mt-2">
                    {relevantCats.length} релевантных категорий ·{' '}
                    {relevantCats.reduce(
                      (acc, cat) =>
                        acc + getRefsByStandard(cat.slug, stdId).length,
                      0
                    )}{' '}
                    ref-связей
                  </p>
                </div>

                <div className="space-y-6">
                  {relevantCats.map((cat) => {
                    const refs = getRefsByStandard(cat.slug, stdId);
                    return (
                      <div
                        key={cat.slug}
                        className="border-l-2 border-brand pl-5"
                      >
                        <h4 className="text-[16px] font-bold text-text-dark mb-1">
                          <Link
                            href={`/catalog/${cat.slug}`}
                            className="hover:text-brand transition-colors inline-flex items-center gap-1.5"
                          >
                            {cat.title}
                            <ArrowRight size={14} />
                          </Link>
                        </h4>
                        <p className="text-[12px] text-text-muted mb-3">
                          {refs.length} ref-связ
                          {refs.length === 1 ? 'ь' : 'и'} с {meta.shortName}
                        </p>
                        <ul className="space-y-2.5">
                          {refs.map((ref) => (
                            <li
                              key={`${ref.section}-${ref.title}`}
                              className="text-[14px]"
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="font-bold text-brand-dark whitespace-nowrap min-w-[90px]">
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
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16 px-4 lg:px-[80px]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-white mb-4">
            Готовим compliance-пакет под GMP-инспекцию 2027?
          </h2>
          <p className="text-[16px] text-brand-muted mb-8 leading-relaxed">
            Подготовим Excel-версию compliance matrix под ваше производство,
            подберём расходники под класс зон A/B/C/D и оформим коммерческое
            предложение с TDS и сертификатами на каждый SKU.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              <Phone size={16} />
              Запросить КП
            </Link>
            <Link
              href="/resources/gmp-audit-checklist"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Download size={16} />
              Чек-лист GMP-аудита 2027
            </Link>
            <Link
              href="/compliance/annex1"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <FileText size={16} />
              Compliance Matrix только Annex 1
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
