/**
 * Единая точка входа для соответствия каталога CRS отраслевым стандартам.
 *
 * Покрывает:
 *  - EU GMP Annex 1 (2022) — Manufacture of Sterile Medicinal Products
 *  - ICH Q7 — GMP Guide for APIs
 *  - ICH Q9 (R1) — Quality Risk Management
 *  - ICH Q10 — Pharmaceutical Quality System (PQS)
 *  - ICH Q11 — Development and Manufacture of Drug Substances (API)
 *  - USP <1116> — Microbiological Control and Monitoring of Aseptic Processing Environments
 *  - ASTM Cleanroom Standards (E2500-25, E2042/E2042M, F51/F51M-20, E2090, F1671/F1671M-22)
 *  - ISO 13485 — Medical Devices: Quality Management Systems
 *
 * Annex 1 импортируется как есть из `gmp-annex1-mapping.ts` (legacy-совместимость).
 * ICH/USP/ASTM/ISO добавлены в этом файле — для категорий, где они объективно применимы.
 *
 * Финальное подтверждение применимости — на стороне QA предприятия в составе
 * валидационного пакета.
 */
import { gmpAnnex1Mapping } from './gmp-annex1-mapping';

export type StandardId =
  | 'gmp_annex1_2022'
  | 'ich_q7'
  | 'ich_q9'
  | 'ich_q10'
  | 'ich_q11'
  | 'usp_1116'
  | 'astm_cleanroom'
  | 'iso_13485';

export interface StandardMeta {
  id: StandardId;
  shortName: string;
  fullName: string;
  scope: string;
}

export const STANDARDS: Record<StandardId, StandardMeta> = {
  gmp_annex1_2022: {
    id: 'gmp_annex1_2022',
    shortName: 'GMP Annex 1',
    fullName:
      'EU GMP Annex 1 (2022): Manufacture of Sterile Medicinal Products',
    scope:
      'Производство стерильных лекарственных средств — главный документ для cleanroom A/B/C/D, gowning, EM, дезинфекции.',
  },
  ich_q7: {
    id: 'ich_q7',
    shortName: 'ICH Q7',
    fullName:
      'ICH Q7: Good Manufacturing Practice Guide for Active Pharmaceutical Ingredients',
    scope:
      'GMP для производства активных фармацевтических ингредиентов (API/субстанций).',
  },
  ich_q9: {
    id: 'ich_q9',
    shortName: 'ICH Q9',
    fullName: 'ICH Q9 (R1): Quality Risk Management',
    scope:
      'Управление качественными рисками — основа CCS, валидации, выбора расходников по риск-подходу.',
  },
  ich_q10: {
    id: 'ich_q10',
    shortName: 'ICH Q10',
    fullName: 'ICH Q10: Pharmaceutical Quality System',
    scope:
      'Фармацевтическая система качества — рамки управления изменениями, отклонениями, поставщиками.',
  },
  ich_q11: {
    id: 'ich_q11',
    shortName: 'ICH Q11',
    fullName: 'ICH Q11: Development and Manufacture of Drug Substances',
    scope:
      'Разработка и производство активных фармацевтических субстанций (API) — риск-подход к выбору материалов и процессу.',
  },
  usp_1116: {
    id: 'usp_1116',
    shortName: 'USP <1116>',
    fullName:
      'USP <1116>: Microbiological Control and Monitoring of Aseptic Processing Environments',
    scope:
      'Микробиологический контроль и мониторинг асептических производственных сред (US Pharmacopeia).',
  },
  astm_cleanroom: {
    id: 'astm_cleanroom',
    shortName: 'ASTM',
    fullName:
      'ASTM Cleanroom Standards (E2500-25, E2042/E2042M, F51/F51M-20, E2090, F1671/F1671M-22)',
    scope:
      'Серия ASTM-стандартов для cleanroom: материалы, тестовые методы, валидация систем, контроль выделения частиц и проникновения патогенов.',
  },
  iso_13485: {
    id: 'iso_13485',
    shortName: 'ISO 13485',
    fullName: 'ISO 13485: Medical Devices — Quality Management Systems',
    scope:
      'Менеджмент качества для производителей медицинских изделий, в том числе работающих в чистых помещениях.',
  },
};

export interface StandardReference {
  standard: StandardId;
  section: string;
  title: string;
  relevance: string;
}

/**
 * Дополнительные ссылки на ICH Q7/Q9/Q10 и USP <1116> по категориям.
 * Annex 1 в этом блоке нет — он добавляется ниже автоматически из
 * gmpAnnex1Mapping.
 */
const additionalMapping: Record<string, StandardReference[]> = {
  indicators: [
    {
      standard: 'ich_q10',
      section: 'Section 3.2',
      title: 'Process Performance & Product Quality Monitoring',
      relevance:
        'Биоиндикаторы — часть программы непрерывного мониторинга качества стерилизации, обязательной по ICH Q10.',
    },
    {
      standard: 'ich_q9',
      section: 'Annex II.5',
      title: 'Risk-based qualification of sterilization',
      relevance:
        'Выбор типа индикатора и точек загрузки автоклава должен опираться на риск-анализ цикла стерилизации.',
    },
    {
      standard: 'ich_q11',
      section: 'Section 7.3',
      title: 'Manufacturing Process Development (API)',
      relevance:
        'Для производителей API стерилизация оборудования и упаковки субстанции верифицируется биоиндикаторами как часть development-пакета процесса.',
    },
    {
      standard: 'usp_1116',
      section: 'Section 7',
      title: 'Microorganisms in Cleanrooms',
      relevance:
        'Биоиндикаторы используются как часть программы микробиологического контроля асептических зон.',
    },
    {
      standard: 'iso_13485',
      section: 'Section 7.5.6',
      title: 'Validation of processes for production',
      relevance:
        'Для производителей медицинских изделий ISO 13485 требует валидации процессов стерилизации с применением биологических индикаторов и пара­метрического контроля.',
    },
  ],
  'disinfectants-and-detergents': [
    {
      standard: 'usp_1116',
      section: 'Section 6',
      title: 'Disinfectant Selection and Application',
      relevance:
        'USP <1116> детально описывает критерии выбора дезинфектантов, ротации спорицида и валидации эффективности.',
    },
    {
      standard: 'ich_q9',
      section: 'Annex II.4',
      title: 'Risk-based disinfection program design',
      relevance:
        'Программа дезинфекции (концентрация, частота, ротация) должна строиться на риск-анализе зон и микрофлоры.',
    },
    {
      standard: 'ich_q10',
      section: 'Section 3.2.4',
      title: 'Process Performance Monitoring',
      relevance:
        'Эффективность дезинфекции отслеживается через EM-программу как часть непрерывного контроля процесса.',
    },
    {
      standard: 'ich_q11',
      section: 'Section 5',
      title: 'Process Development (API cleaning)',
      relevance:
        'Производители API применяют дезинфектанты и моющие средства в рамках программы cleaning verification зон синтеза и кросс-контаминации между batch.',
    },
    {
      standard: 'iso_13485',
      section: 'Section 6.4',
      title: 'Work environment & contamination control',
      relevance:
        'ISO 13485 §6.4.2 прямо требует процедур контроля контаминации при производстве стерильных медицинских изделий — дезинфектанты и моющие средства входят в этот контур.',
    },
  ],
  garments: [
    {
      standard: 'usp_1116',
      section: 'Section 5',
      title: 'Personnel Monitoring & Gowning',
      relevance:
        'USP <1116> требует валидации gowning через отпечатки и монитор персонала; одноразовая стерильная одежда — стандарт зон A/B.',
    },
    {
      standard: 'ich_q9',
      section: 'Annex II.7',
      title: 'Risk-based selection of garments',
      relevance:
        'Класс одежды (стерильная/нестерильная, низковыделяющая) выбирается по риск-категории зоны.',
    },
    {
      standard: 'astm_cleanroom',
      section: 'F51/F51M-20',
      title: 'Sizing & Counting Particulate on Garments',
      relevance:
        'ASTM F51/F51M-20 — стандартный метод подсчёта частиц ≥5 мкм в/на ткани cleanroom-комбинезонов; применим для входного контроля и квалификации поставщика.',
    },
    {
      standard: 'iso_13485',
      section: 'Section 7.5.2',
      title: 'Cleanliness of product',
      relevance:
        'Для производителей медизделий ISO 13485 §7.5.2 требует контроля чистоты персонала в зоне производства; стерильная или низковыделяющая одежда — обязательный элемент.',
    },
  ],
  'reusable-garm': [
    {
      standard: 'usp_1116',
      section: 'Section 5',
      title: 'Personnel Monitoring & Gowning',
      relevance:
        'Многоразовая одежда требует validation цикла стирки/стерилизации и periodic re-qualification.',
    },
    {
      standard: 'ich_q10',
      section: 'Section 3.2.3',
      title: 'Change Control',
      relevance:
        'Любые изменения поставщика или цикла обслуживания одежды должны проходить через формальную процедуру change control.',
    },
    {
      standard: 'astm_cleanroom',
      section: 'F51/F51M-20',
      title: 'Particulate Monitoring of Reusable Garments',
      relevance:
        'F51/F51M-20 — основной метод для re-qualification многоразовых комбинезонов: подсчёт частиц после каждых N циклов стирки/стерилизации.',
    },
  ],
  'perchatki-zashchitnye': [
    {
      standard: 'usp_1116',
      section: 'Section 5',
      title: 'Personnel Monitoring',
      relevance:
        'Отпечатки перчаток (5 пальцев на agar plate) — обязательный элемент мониторинга персонала после критических операций.',
    },
    {
      standard: 'ich_q9',
      section: 'Annex II.7',
      title: 'Risk-based glove selection',
      relevance:
        'Стерильность, AQL, длина манжеты, материал — выбираются по результатам риск-анализа операции и зоны.',
    },
    {
      standard: 'ich_q10',
      section: 'Section 2.7',
      title: 'Management of Outsourced Activities & Suppliers',
      relevance:
        'Контроль поставщика перчаток: TDS, протоколы партий, аудит производителя — часть PQS.',
    },
    {
      standard: 'astm_cleanroom',
      section: 'F1671/F1671M-22',
      title: 'Resistance to Blood-Borne Pathogen Penetration',
      relevance:
        'F1671/F1671M-22 (Phi-X174 bacteriophage challenge) — стандартный метод оценки барьерных свойств перчаток для биотех/медизделий и работы с биологическими агентами.',
    },
    {
      standard: 'iso_13485',
      section: 'Section 7.5.2',
      title: 'Cleanliness of product',
      relevance:
        'Производители медицинских изделий применяют стерильные перчатки в рамках §7.5.2 (cleanliness of product) и §6.4.2 (contamination control).',
    },
  ],
  'cleanroom-wipes': [
    {
      standard: 'usp_1116',
      section: 'Section 6',
      title: 'Disinfection Application',
      relevance:
        'Безворсовые салфетки — носитель дезинфицирующего раствора при влажной обработке поверхностей в зонах A-D.',
    },
    {
      standard: 'ich_q9',
      section: 'Annex II.4',
      title: 'Risk-based wipe selection',
      relevance:
        'Стерильные vs нестерильные, материал, плотность, размер — определяются риск-категорией зоны и операции.',
    },
    {
      standard: 'astm_cleanroom',
      section: 'E2090',
      title: 'Particle & Fiber Release from Cleanroom Wipers',
      relevance:
        'ASTM E2090 — стандартный метод подсчёта частиц и волокон, выделяемых cleanroom-салфетками; ключевой тест для входного контроля и квалификации поставщика.',
    },
    {
      standard: 'astm_cleanroom',
      section: 'E2042/E2042M-09(2021)',
      title: 'Cleaning & Maintaining Controlled Areas and Clean Rooms',
      relevance:
        'ASTM E2042/E2042M описывает процедуры влажной/сухой протирки поверхностей в контролируемых зонах — методическая база для SOP по применению wipes.',
    },
    {
      standard: 'iso_13485',
      section: 'Section 6.4',
      title: 'Work environment & contamination control',
      relevance:
        'Производители медизделий используют cleanroom-салфетки для рутинной очистки рабочих поверхностей в рамках §6.4.2 (contamination control).',
    },
  ],
  'cleaning-cloth': [
    {
      standard: 'usp_1116',
      section: 'Section 6',
      title: 'Cleaning and Sanitisation',
      relevance:
        'Протирочный материал для зон C/D — часть программы рутинной очистки поверхностей.',
    },
  ],
  'cleaning-trolleys-systems': [
    {
      standard: 'usp_1116',
      section: 'Section 6',
      title: 'Cleaning Equipment',
      relevance:
        'Конструкция уборочных систем (двухвёдерные, отжим, материалы) определяется требованиями USP <1116> к недопущению cross-contamination.',
    },
    {
      standard: 'ich_q9',
      section: 'Annex II.4',
      title: 'Risk-based cleaning workflow',
      relevance:
        'Отдельные комплекты инвентаря по зонам, цветовое кодирование — стандартный риск-контроль.',
    },
    {
      standard: 'astm_cleanroom',
      section: 'E2500-25',
      title: 'Specification, Design, Verification of Cleaning Systems',
      relevance:
        'ASTM E2500-25 — risk-based рамка для спецификации и верификации поддерживающих систем чистого помещения, включая уборочные тележки и дозирующие узлы.',
    },
  ],
  'cleaning-equipment': [
    {
      standard: 'usp_1116',
      section: 'Section 6',
      title: 'Cleaning Equipment',
      relevance:
        'Дозаторы, держатели, расходники для cleaning workflow — часть валидированной программы дезинфекции.',
    },
  ],
  mops: [
    {
      standard: 'usp_1116',
      section: 'Section 6',
      title: 'Mopping Systems',
      relevance:
        'Стерильные мопы для зон A/B + cycle validation цикла стирки/стерилизации для multi-use мопов.',
    },
    {
      standard: 'ich_q9',
      section: 'Annex II.4',
      title: 'Mop rotation & qualification',
      relevance:
        'Частота смены мопов, цветовое кодирование, валидация качества — риск-подход.',
    },
    {
      standard: 'astm_cleanroom',
      section: 'E2042/E2042M-09(2021)',
      title: 'Cleaning & Maintaining Controlled Areas',
      relevance:
        'ASTM E2042/E2042M — methodology для влажной протирки и mopping в controlled environments: техника движения, перекрытие зон, частота смены раствора.',
    },
  ],
  goggles: [
    {
      standard: 'ich_q9',
      section: 'Annex II.7',
      title: 'PPE risk assessment',
      relevance:
        'Выбор очков (закрытые vs открытые, автоклавируемые vs одноразовые, антистатические) — по риск-анализу зоны и оператора.',
    },
  ],
  'cleanroom-accessories': [
    {
      standard: 'ich_q10',
      section: 'Section 2.7',
      title: 'Supplier qualification',
      relevance:
        'Аксессуары (журналы, маркеры, бумага) для cleanroom — все должны быть с подтверждённым низким уровнем выделения частиц/волокон.',
    },
  ],
  'cleanroom-shoes': [
    {
      standard: 'usp_1116',
      section: 'Section 5',
      title: 'Footwear Gowning',
      relevance:
        'Обувь — часть полного gowning kit; для зон A/B — стерильная или сменные стерильные бахилы поверх базовой обуви.',
    },
    {
      standard: 'ich_q9',
      section: 'Annex II.7',
      title: 'Footwear material risk',
      relevance:
        'Антистатические свойства, автоклавируемость, материал подошвы — по риск-анализу зоны.',
    },
  ],
  'cleanroom-chairs': [
    {
      standard: 'ich_q9',
      section: 'Annex II.7',
      title: 'Cleanroom furniture risk',
      relevance:
        'Поверхности, материалы, антистатика — выбор по риск-классификации операции и зоны.',
    },
    {
      standard: 'ich_q10',
      section: 'Section 2.7',
      title: 'Supplier qualification',
      relevance:
        'Сертификат cleanroom-classification + cleanability tests от поставщика — часть PQS.',
    },
  ],
  'cleanroom-sticky-mats': [
    {
      standard: 'usp_1116',
      section: 'Section 4',
      title: 'Cleanroom Entry Control',
      relevance:
        'Sticky mats в gowning room и переходных зонах — первый барьер контроля частиц с обуви.',
    },
  ],
  'cleanroom-packaging': [
    {
      standard: 'ich_q7',
      section: 'Section 14',
      title: 'Packaging and Labelling Controls',
      relevance:
        'Упаковочные материалы для API/готовых продуктов — должны не выделять частиц и сохранять стерильность барьера.',
    },
    {
      standard: 'ich_q10',
      section: 'Section 2.7',
      title: 'Supplier qualification',
      relevance:
        'Поставщик упаковки проходит отдельную квалификацию (TDS, протоколы партий, биосовместимость).',
    },
    {
      standard: 'ich_q11',
      section: 'Section 5',
      title: 'Process Development (Container Closure for API)',
      relevance:
        'ICH Q11 §5 включает выбор первичной упаковки субстанции в development-пакете; материал и метод укупорки обосновываются риск-подходом.',
    },
    {
      standard: 'iso_13485',
      section: 'Section 7.5.2',
      title: 'Cleanliness of product',
      relevance:
        'Для медицинских изделий §7.5.2 требует контролируемой чистой упаковки, поддерживающей стерильность до момента использования.',
    },
  ],
  'cleanroom-dispensers': [
    {
      standard: 'usp_1116',
      section: 'Section 6',
      title: 'Disinfection delivery',
      relevance:
        'Дозаторы для дезинфектантов / стерильного ИПА — часть валидированной программы очистки.',
    },
  ],
};

/**
 * Полный mapping: Annex 1 + дополнительные стандарты.
 */
export const standardsMapping: Record<string, StandardReference[]> =
  Object.fromEntries(
    Array.from(
      new Set([
        ...Object.keys(gmpAnnex1Mapping),
        ...Object.keys(additionalMapping),
      ])
    ).map((slug) => {
      const annex1Refs: StandardReference[] = (
        gmpAnnex1Mapping[slug] || []
      ).map((r) => ({
        standard: 'gmp_annex1_2022' as const,
        section: r.section,
        title: r.title,
        relevance: r.relevance,
      }));
      const others = additionalMapping[slug] || [];
      return [slug, [...annex1Refs, ...others]];
    })
  );

/**
 * Получить refs для категории по конкретному стандарту.
 */
export function getRefsByStandard(
  categorySlug: string,
  standard: StandardId
): StandardReference[] {
  return (standardsMapping[categorySlug] || []).filter(
    (r) => r.standard === standard
  );
}

/**
 * Получить уникальные стандарты, на которые есть refs у категории.
 */
export function getStandardsForCategory(categorySlug: string): StandardId[] {
  const refs = standardsMapping[categorySlug] || [];
  const order: StandardId[] = [
    'gmp_annex1_2022',
    'ich_q7',
    'ich_q9',
    'ich_q10',
    'ich_q11',
    'usp_1116',
    'astm_cleanroom',
    'iso_13485',
  ];
  const present = new Set(refs.map((r) => r.standard));
  return order.filter((s) => present.has(s));
}
