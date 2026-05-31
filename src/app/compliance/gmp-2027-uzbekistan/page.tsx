import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  Phone,
  Download,
  FileText,
  CalendarClock,
  Building2,
  ClipboardCheck,
  BookOpen,
  Users,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title:
    'Сертификат GMP в Узбекистане: как получить к январю 2027 — порядок АРФО',
  description:
    'Как получить сертификат GMP в Узбекистане до 1 января 2027 г.: кто выдаёт (АРФО), какие документы нужны, сроки и стоимость инспекции, чек-лист подготовки для фарм-завода и резидентов Pharma Park.',
  alternates: {
    canonical: `${siteConfig.url}/compliance/gmp-2027-uzbekistan`,
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'GMP сертификация Узбекистан',
    'GMP Узбекистан 2027',
    'GMP сертификация требования',
    'АРФО Узбекистан',
    'GMP инспекция Узбекистан',
    'GMP подготовка фарм-завода',
    'Pharma Park Ташкент GMP',
    'EU GMP Annex 1 Узбекистан',
    'PIC/S Узбекистан',
    'Site Master File Узбекистан',
  ],
  openGraph: {
    title:
      'GMP сертификация в Узбекистане к 2027 — требования, ресурсы, чек-лист',
    description:
      'Reference-hub для QA-департаментов фарм-предприятий Узбекистана: нормативная база АРФО, аудит-чек-листы, поэтапная подготовка к обязательной GMP-сертификации с 1 января 2027 г.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

interface SectionNav {
  id: string;
  label: string;
}

const sectionNav: SectionNav[] = [
  { id: 'regulatory-base', label: 'Нормативная база' },
  { id: 'who-is-affected', label: 'Кого касается' },
  { id: 'inspector-checks', label: 'Что проверяет АРФО' },
  { id: 'preparation', label: 'Поэтапная подготовка' },
  { id: 'resources', label: 'Где взять помощь' },
  { id: 'related-standards', label: 'Связанные стандарты' },
  { id: 'today-actions', label: 'Что делать сегодня' },
  { id: 'faq', label: 'FAQ' },
];

interface AudienceItem {
  title: string;
  description: string;
}

const audienceList: AudienceItem[] = [
  {
    title: 'Производители нестерильных ЛС',
    description:
      'Таблетки, капсулы, порошки, мази, сиропы. С 1 января 2027 г. обязательная GMP-сертификация требуется для каждой регистрации препарата и для участия в тендерах Минздрава. Класс зон C/D, упрощённый EM-режим, но полный пакет SOP и PQS обязателен.',
  },
  {
    title: 'Стерильные производства',
    description:
      'Инъекционные растворы, лиофилизаты, офтальмологические препараты, биотехнология. Ориентир — EU GMP Annex 1 (2022): зоны A/B с continuous monitoring, CCS-документ, APS (media fill) минимум 3 успешных подряд, валидация газовых потоков (smoke studies).',
  },
  {
    title: 'Резиденты Pharma Park',
    description:
      'Контрактные обязательства резидента СЭЗ предусматривают сертификацию по EU GMP параллельно с льготами по налогам и инфраструктурой. Невыполнение к 1 января 2027 г. — основание для пересмотра резидентского статуса со стороны Дирекции Pharma Park.',
  },
  {
    title: 'Иностранные импортёры в UZ',
    description:
      'Производители из ЕС/PIC/S-стран используют для регистрации в Узбекистане свои национальные GMP-сертификаты (см. FAQ). Производители из стран вне PIC/S — обязаны пройти инспекцию АРФО на собственной площадке либо подать пакет на mutual recognition.',
  },
  {
    title: 'Контрактные производители (CMO/CDMO)',
    description:
      'CMO, выпускающие препараты для третьих лиц, должны иметь GMP-сертификат, в скоупе которого указаны все производимые лекарственные формы. Заказчик (MAH) — обязан включить CMO в свой Site Master File и предоставить копию GMP-сертификата при регистрации.',
  },
  {
    title: 'Биотех и API-производство',
    description:
      'Производители активных фарм-субстанций ориентируются прежде всего на ICH Q7 + ICH Q11 (development drug substance). АРФО при инспекции площадки API проверяет соответствие Q7 для процессов синтеза и Annex 1 — для зон финальной очистки и упаковки.',
  },
];

interface InspectorCategory {
  id: string;
  title: string;
  items: string[];
}

const inspectorCategories: InspectorCategory[] = [
  {
    id: 'documentation',
    title: 'Документация',
    items: [
      'Регистрационные удостоверения Минздрава на все выпускаемые препараты — состав / дозировка / технология должны совпадать с фактическими SOP и batch records.',
      'Действующая лицензия на производство ЛС (номенклатура должна охватывать все выпускаемые формы).',
      'Site Master File (SMF) на узбекском или русском языке — описание площадки, процессов, организационной структуры.',
      'Validation Master Plan (VMP) и его обновлённая версия за последние 12 месяцев.',
      'SOP-пакет (минимум 80 SOP для стерильного, 50 — для нестерильного производства).',
      'Batch records последних партий с подтверждением QP-релиза.',
      'Журналы change control, deviation management, CAPA, log непрерывных улучшений.',
      'Product Quality Review (PQR) минимум по 1 итерации на каждый продукт за последний год.',
    ],
  },
  {
    id: 'premises',
    title: 'Помещения и оборудование',
    items: [
      'Классификация зон по ISO 14644-1 (A/B/C/D или ISO 5/7/8) с подтверждающими сертификатами quallification.',
      'Перепады давления между зонами разной чистоты (мин. +/−10 Pa), мониторинг 24/7 с алармами.',
      'HEPA-фильтрация H14 в зонах A/B, плановый PAO leak-test минимум раз в год.',
      'Поверхности (стены, потолки, мебель) — гладкие, без щелей, устойчивые к спорициду на основе перекиси водорода или хлорсодержащих.',
      'Шлюзы и pass-through камеры с интерлок-системой между чистой и грязной сторонами.',
      'HVAC-система: схемы air balance, log температуры/влажности, протоколы тех. обслуживания.',
      'Зоны gowning: чёткое разделение «грязная / промежуточная / чистая» с раздельной обувью.',
    ],
  },
  {
    id: 'personnel',
    title: 'Персонал',
    items: [
      'Квалификация QP (Quality Person) с правом подписи релизов — диплом + опыт в фарм-производстве.',
      'QA-руководитель с верифицированной квалификацией (нотариальный перевод для иностранных дипломов).',
      'Обучение по GMP всех операторов с регулярной верификацией знаний (минимум 1 раз в год).',
      'Программа gowning-квалификации: тренинг + 3 successful gowning trials на каждого оператора зон A/B.',
      'Медосмотры по приказу Минздрава, регулярная микробиологическая верификация (отпечатки перчаток, маски).',
      'Журналы обучения, аттестации, допусков к работе в зонах разной чистоты.',
    ],
  },
  {
    id: 'qc',
    title: 'Контроль качества',
    items: [
      'QC-лаборатория с аттестованным оборудованием: ВЭЖХ, ИК-спектрометр, UV-Vis, рН-метры, весы.',
      'Методики контроля валидированы (ICH Q2: специфичность, линейность, точность, воспроизводимость).',
      'Программа стабильности с реальным временем хранения и accelerated conditions (ICH Q1A).',
      'Микробиологическая лаборатория с зонами BSL-1 или BSL-2, проверкой ростовых свойств сред.',
      'Out-of-Specification (OOS) и Out-of-Trend (OOT) procedure с примерами расследований за последний год.',
      'Reference standards и working standards с прослеживаемостью до фармакопейных эталонов.',
    ],
  },
  {
    id: 'disinfection',
    title: 'Дезинфекция и валидация',
    items: [
      'Программа дезинфекции по §8.66 Annex 1: 2 ротационных агента (бактерицид + спорицид).',
      'Validated disinfection efficacy: tests on real surfaces по EN 13697 / ASTM E2197 с реальными изолятами.',
      'IQ/OQ/PQ протоколы для критического оборудования (boilers, autoclaves, lyo, fillers).',
      'Cleaning validation для всех оборудования с ровненькой схемой и MACO/PDE-расчётами.',
      'Validation HVAC, smoke studies для асептических зон, recovery time после интервенций.',
      'Periodic re-validation: график ревалидации с обоснованием частоты по риск-подходу ICH Q9.',
    ],
  },
  {
    id: 'batch-records',
    title: 'Документация партий',
    items: [
      'Batch records (BMR + BPR) с поэтапной фиксацией всех критических параметров.',
      'QP-release с подписью на каждой партии перед выпуском в обращение.',
      'Deviation management: log отклонений, root cause analysis, обоснование выпуска или отзыва партии.',
      'CAPA-программа с трекингом исполнения корректирующих и предупреждающих действий.',
      'Annual Product Review (APR) / PQR — обобщение всех данных по продукту за год.',
      'Архив batch records — минимум +1 год к сроку годности препарата (узбекистанский требование — 5 лет).',
    ],
  },
  {
    id: 'sterile',
    title: 'Стерильное производство (доп.)',
    items: [
      'Aseptic Process Simulation (APS / media fill) — 3 successful runs подряд, повторение каждые 6 месяцев.',
      'Continuous Environmental Monitoring в зонах A/B: частицы 0,5/5 мкм в реальном времени.',
      'Микробиологический мониторинг: settle plates, contact plates, air sampling — по программе с alert/action limits.',
      'Sporicidal обработка зон A/B минимум раз в месяц (перекись водорода 6% или хлорсодержащие).',
      'Smoke studies (видеозапись) для подтверждения unidirectional airflow и absence of turbulence в зонах A.',
      'Operator gowning qualification + повторная квалификация раз в год + после каждого significant change.',
    ],
  },
];

interface PrepStage {
  period: string;
  responsible: string;
  tasks: string[];
}

const prepStages: PrepStage[] = [
  {
    period: 'Q3 2026 (T-6 мес.)',
    responsible: 'QA-руководитель + GMP-консультант',
    tasks: [
      'Independent gap-аудит по EU GMP + Annex 1 (2022) + узбекистанским требованиям АРФО.',
      'Формирование risk-based road-map с приоритизацией по criticality.',
      'Утверждение бюджета: HVAC, ремонт, лаборатория, SOP, обучение, расходники.',
      'Назначение QP с правом подписи и подача документов на верификацию в АРФО.',
    ],
  },
  {
    period: 'Q4 2026 (T-3 мес.)',
    responsible: 'QA + начальник производства + закупки',
    tasks: [
      'Финализация SOP-пакета на гос-русском/узбекском (мин. 80 SOP для стерильного, 50 для нестерильного).',
      'Тренинг операторов по обновлённым SOP с верификацией знаний и журналом аттестации.',
      'Закупка критических расходников под полную программу года: одежда, перчатки, дезинфектанты, салфетки.',
      'Закрытие major findings внутреннего аудита, обновление CCS-документа и Validation Master Plan.',
    ],
  },
  {
    period: 'Q1 2027 (T-0)',
    responsible: 'QA + директор + GMP-консультант (external)',
    tasks: [
      'External mock inspection с GMP-экспертом за 4-6 недель до подачи заявки в АРФО.',
      'Финальная сборка inspection-package: SMF, VMP, CCS, SOP-list, batch records, deviations, CAPA, PQR.',
      'Подача заявки в АРФО (через портал uzpharm-control.uz или офис в Ташкенте).',
      'Plant-walk репетиции с командой, готовность отвечать на вопросы инспектора без панических пауз.',
    ],
  },
];

interface ResourceItem {
  title: string;
  description: string;
  link?: { href: string; label: string };
}

const helpResources: ResourceItem[] = [
  {
    title: 'Консультанты по GMP',
    description:
      'Independent QA-эксперты с опытом сопровождения сертификации в Узбекистане и странах ЕАЭС. Стоимость сопровождения за 18 месяцев — $30-100k в зависимости от размера предприятия (см. бюджетную таблицу в блог-статье). Полезно искать консультантов с опытом фактических инспекций АРФО, а не только EU/PIC/S.',
  },
  {
    title: 'Поставщики cleanroom-расходников и одежды',
    description:
      'Каталог Clean Room Systems покрывает 17 категорий: одежда, перчатки, салфетки, дезинфектанты, мопы, sticky mats, биоиндикаторы, упаковка. Compliance-документация: TDS, протоколы партий, CE / EAC / ISO 9001 / ISO 13485. Готовая привязка SKU к §-разделам Annex 1 — на странице каждой категории.',
    link: { href: '/catalog', label: 'Открыть каталог' },
  },
  {
    title: 'Мебель cleanroom (TINMAN)',
    description:
      'TINMAN — производитель нержавеющей мебели и оборудования cleanroom (Сербия), эксклюзивный дистрибьютор в Узбекистане — Clean Room Systems. Покрывает §5 Premises и §6 Equipment Annex 1: рабочие столы, шкафы, тележки, мойки, скамьи, pass-through. Полный пакет compliance для design qualification.',
    link: { href: '/brands/tinman', label: 'Каталог TINMAN' },
  },
  {
    title: 'Тренинг персонала',
    description:
      'Формат — обычно онлайн (Annex 1 / ICH-overview) + on-site практика на площадке для gowning, дезинфекции, batch record review. Длительность — от 2-дневных модулей до полного курса PQS (5-7 дней). Внутренний QA-департамент должен покрывать минимум базовый GMP-курс для всех операторов раз в год.',
  },
  {
    title: 'Lab-сертификация и валидация',
    description:
      'Validation сервисы для автоклавов, лиофилизаторов, HVAC, чистых сред, аналитических приборов. На рынке Узбекистана это либо подразделения местных инжиниринговых компаний, либо узбекистанские филиалы региональных сервис-провайдеров (Москва, Стамбул, Сеул). DQ / IQ / OQ / PQ-протоколы должны быть оформлены под локальный язык инспектора АРФО.',
  },
];

interface RelatedStandard {
  shortName: string;
  fullName: string;
  whatItIs: string;
  whyRelevant: string;
  link?: { href: string; label: string };
}

const relatedStandards: RelatedStandard[] = [
  {
    shortName: 'EU GMP Annex 1 (2022)',
    fullName:
      'Manufacture of Sterile Medicinal Products (European Commission)',
    whatItIs:
      'Базовый документ для всех стерильных производств. Действует с 25 августа 2023 г. Структура: §1-2 Scope/Principle, §3 PQS+CCS, §4 Personnel, §5 Premises, §6 Equipment, §7 Utilities, §8 Production, §9 Monitoring, §10 QC, §11 Disinfection.',
    whyRelevant:
      'АРФО при инспекции стерильных производств ориентируется именно на эту версию. Аудит ожидает CCS-документ, APS-данные, EM-программу, gowning-квалификацию по §4.',
    link: { href: '/compliance/annex1', label: 'Compliance Matrix Annex 1' },
  },
  {
    shortName: 'ICH Q7',
    fullName: 'GMP for Active Pharmaceutical Ingredients',
    whatItIs:
      'Международное руководство ICH для производителей API. Покрывает синтез, очистку, упаковку субстанций. Инкорпорировано в EU GMP Part II.',
    whyRelevant:
      'Обязательно для производителей API в Узбекистане (включая заводы полного цикла с собственным синтезом). АРФО проверяет соответствие Q7 параллельно с Annex 1 в зонах финальной очистки.',
  },
  {
    shortName: 'ICH Q9 (R1)',
    fullName: 'Quality Risk Management',
    whatItIs:
      'Методологический документ по риск-подходу. Пересмотрен в 2023 г. (R1). Annex II — примеры применения к qualification, supplier management, change control.',
    whyRelevant:
      'CCS-документ Annex 1 и обоснование SOP-программы строятся на риск-подходе Q9. Без явных ссылок на Q9 аудитор атакует выбор поставщиков и параметров мониторинга как «не обоснованный».',
  },
  {
    shortName: 'ICH Q10',
    fullName: 'Pharmaceutical Quality System (PQS)',
    whatItIs:
      'Концептуальная рамка управления качеством на всём жизненном цикле препарата. Четыре элемента: process monitoring, CAPA, change management, management review.',
    whyRelevant:
      'PQS — формальная основа всей QA-инфраструктуры. §2.7 Q10 регулирует supplier management — это раздел, по которому аудитор будет проверять закупочную программу расходников.',
  },
  {
    shortName: 'ICH Q11',
    fullName: 'Development & Manufacture of Drug Substances',
    whatItIs:
      'Руководство ICH по разработке и производству активных субстанций (chemical и biotechnology). Принято в 2012 г., обновлено addendum 2017.',
    whyRelevant:
      'Применимо для API-производителей в Узбекистане в дополнение к ICH Q7. Описывает development-фазу процесса и обоснование критических параметров CQA.',
  },
  {
    shortName: 'USP <1116>',
    fullName: 'Microbiological Control and Monitoring of Aseptic Processing',
    whatItIs:
      'Глава Фармакопеи США по микробиологическому мониторингу асептики. Информационная глава (не нормативная), но признана best-practice reference.',
    whyRelevant:
      'Обязательна при экспорте в США / работе с американскими CMO. В Узбекистане применяется как дополнительный reference для EM-программы и валидации дезинфекции.',
  },
  {
    shortName: 'ISO 14644 series',
    fullName: 'Cleanrooms and Associated Controlled Environments',
    whatItIs:
      'Международная серия стандартов по cleanroom. Ключевые: ISO 14644-1 (классификация), -2 (мониторинг), -3 (тест-методы), -4 (дизайн), -7 (separative devices).',
    whyRelevant:
      'Все классы зон в SMF указываются по ISO 14644-1 (ISO 5 / 7 / 8). Сертификация qualification зон (PQ) выполняется именно по этому стандарту.',
    link: {
      href: '/resources/iso-14644-classes-spec',
      label: 'ISO 14644 справочник',
    },
  },
  {
    shortName: 'ASTM E2500',
    fullName:
      'Specification, Design, Verification of Pharmaceutical Manufacturing Systems',
    whatItIs:
      'Risk-based рамка для commissioning и qualification оборудования. Обновлена в 2025 г. (E2500-25). Дополняет ICH Q9 практическим инструментарием.',
    whyRelevant:
      'Используется как методологическая основа для DQ / IQ / OQ / PQ-протоколов критического оборудования (autoclave, lyo, fillers, HVAC).',
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question:
      'Что будет, если предприятие не получит GMP к 1 января 2027 г.?',
    answer:
      'Юридические последствия: невозможность регистрации новых препаратов (отзыв подаваемых пакетов), отзыв действующих РУ в порядке, установленном Минздравом, запрет на участие в тендерах Минздрава и фондов страхования, остановка экспортных контрактов (большинство стран-импортёров требуют GMP-сертификат поставщика), штрафы и приостановка лицензии при выявлении нарушений. На практике АРФО обычно даёт фазированный fallback (см. ниже), но опираться на это рискованно: предупреждение касается прежде всего предприятий, активно готовящихся и опаздывающих на 3-6 месяцев.',
  },
  {
    question:
      'Можно ли использовать иностранный GMP-сертификат (EU, FDA) вместо узбекистанского?',
    answer:
      'Для импортёра: да. При регистрации препарата в Узбекистане производитель из страны ЕС, PIC/S или с FDA-инспекцией может предоставить копию своего национального GMP-сертификата с переводом — АРФО признаёт документы регуляторов ЕС, FDA, MHRA, TGA, PMDA, Health Canada. Для локального производителя в Узбекистане: нет. Заводу, физически расположенному на территории Узбекистана, требуется именно узбекистанский GMP-сертификат, выданный АРФО, — это не подменяется иностранным даже при наличии полной локализации европейской технологии. Узбекистан движется к членству в PIC/S; до этого момента mutual recognition с другими регуляторами носит ограниченный характер.',
  },
  {
    question:
      'Какой минимальный срок подготовки производства к GMP?',
    answer:
      'Реалистичный минимум — 18-24 месяца, и это при условии, что инфраструктура уже соответствует Annex 1 в общих чертах (есть HVAC под классы C/D, базовая лаборатория QC, действующая SOP-программа). Если стартовое состояние — «старое советское производство без EM», реалистичный срок увеличивается до 30-36 месяцев и требует капитального ремонта зон + полной модернизации HVAC + развёртывания QC-лаборатории. Подробный таймлайн 24 месяцев — в нашей основной статье «Подготовка к GMP-сертификации в Узбекистане к 2027».',
  },
  {
    question:
      'Сколько стоит GMP-сертификация в Узбекистане?',
    answer:
      'Прямые сборы АРФО за инспекцию и выдачу сертификата — фиксированная тарифная ставка регулятора (детали — на портале uzpharm-control.uz и в актах Минфина). Это небольшая часть бюджета. Основная стоимость — это подготовка: GMP-консультант ($30-100k за 18 мес.), модернизация HVAC ($30-800k), капитальный ремонт зон ($50-1500k в зависимости от размера), QC-лаборатория ($50-700k), SOP и тренинг ($5-30k), recurring закупка расходников ($20-200k/год). Детальная разбивка по small / medium / large предприятиям — в нашей основной блог-статье.',
  },
  {
    question:
      'Кто выдаёт GMP-сертификат в Узбекистане?',
    answer:
      'Сертификат GMP в Республике Узбекистан выдаёт Агентство по развитию фармацевтической отрасли при Минздраве (АРФО, uzpharm-control.uz). АРФО проводит инспекцию площадки, оценивает inspection-package (SMF, VMP, CCS, SOP, batch records, deviations, PQR), запрашивает дополнительные документы и оформляет сертификат на конкретные лекарственные формы. Срок действия сертификата — 3 года с обязательной ре-инспекцией. Параллельно действуют лицензия Минздрава на производство ЛС (срок действия — до 5 лет, обновляется отдельно) и регистрационные удостоверения на каждый препарат.',
  },
  {
    question:
      'Можно ли получить временное разрешение, если опаздываешь?',
    answer:
      'АРФО на практике рассматривает запросы о фазированной сертификации — это не «временное разрешение», а согласованный план поэтапного выхода на полное соответствие с фиксированными milestones. Условия: подача обоснования в АРФО за 6-12 месяцев до 1 января 2027 г., внешний независимый аудит с детальным gap-list, утверждённый road-map с конкретными датами закрытия findings, регулярные отчёты в АРФО о прогрессе. Подобный fallback ориентирован прежде всего на средние и крупные предприятия, активно работающие в направлении полного compliance. Для предприятий, не начавших подготовку до конца 2026 г., шанс получить фазированную сертификацию минимален.',
  },
  {
    question:
      'Какие SOP обязательно должны быть переведены на гос-русский / узбекский?',
    answer:
      'Все SOP, журналы и batch records, которыми операторы пользуются в ежедневной работе — на государственном языке (узбекский или русский). Инспектор АРФО — гражданин Узбекистана и читает документы только на этих языках. На корпоративном английском допускаются только: верхнеуровневые политики (Quality Manual, Code of Conduct), технические TDS поставщиков с приложенным верифицированным переводом, валидационные протоколы поставщиков оборудования (если в SOP есть ссылка на оригинал + переведённый резюме). Игнорирование требования — частая причина major findings.',
  },
];

export default function ComplianceGmpUzbekistan2027Page() {
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
        name: 'GMP сертификация Узбекистан 2027',
        item: `${siteConfig.url}/compliance/gmp-2027-uzbekistan`,
      },
    ],
  };

  const techArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline:
      'GMP сертификация в Узбекистане к 2027 году — требования, подготовка, ресурсы',
    description:
      'Reference-hub по обязательной GMP-сертификации фарм-предприятий Узбекистана к 1 января 2027 г.: нормативная база АРФО, перечень субъектов сертификации, аудит-чек-листы, поэтапная подготовка, связанные международные стандарты, типичные ошибки.',
    mainEntityOfPage: `${siteConfig.url}/compliance/gmp-2027-uzbekistan`,
    url: `${siteConfig.url}/compliance/gmp-2027-uzbekistan`,
    inLanguage: 'ru',
    isAccessibleForFree: true,
    datePublished: '2026-05-23',
    dateModified: '2026-05-23',
    audience: {
      '@type': 'BusinessAudience',
      audienceType:
        'Pharmaceutical Quality Professionals — QA-инженеры, проектные отделы, отделы регуляторики фарм-предприятий Узбекистана',
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Обязательная GMP-сертификация в Узбекистане с 1 января 2027 г.',
      },
      { '@type': 'Thing', name: 'АРФО — Агентство по развитию фарм-отрасли' },
      { '@type': 'Thing', name: 'EU GMP Annex 1 (2022)' },
      { '@type': 'Thing', name: 'PIC/S гармонизация' },
      { '@type': 'Thing', name: 'Pharma Park Ташкент' },
      { '@type': 'Thing', name: 'Site Master File (SMF)' },
      { '@type': 'Thing', name: 'Contamination Control Strategy (CCS)' },
      { '@type': 'Thing', name: 'Validation Master Plan (VMP)' },
      { '@type': 'Thing', name: 'GMP-инспекция фарм-завода' },
    ],
    keywords: [
      'GMP сертификация Узбекистан',
      'GMP Узбекистан 2027 требования',
      'АРФО Узбекистан GMP',
      'GMP инспекция Узбекистан',
      'EU GMP Annex 1 Узбекистан',
      'PIC/S Узбекистан',
      'Pharma Park Ташкент GMP',
      'Site Master File Узбекистан',
      'GMP подготовка фарм-завода',
    ].join(', '),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ключевые ресурсы для подготовки к GMP-сертификации в Узбекистане 2027',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'EU GMP Annex 1 — Compliance Matrix',
        url: `${siteConfig.url}/compliance/annex1`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Все стандарты — Compliance Matrix',
        url: `${siteConfig.url}/compliance/standards`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'GMP audit checklist (PDF)',
        url: `${siteConfig.url}/resources/gmp-audit-checklist`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'ISO 14644 классы — справочник',
        url: `${siteConfig.url}/resources/iso-14644-classes-spec`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Disinfection validation protocol',
        url: `${siteConfig.url}/resources/disinfection-validation-protocol`,
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Gowning room design guide',
        url: `${siteConfig.url}/resources/gowning-room-design-guide`,
      },
      {
        '@type': 'ListItem',
        position: 7,
        name: 'Подготовка к GMP 2027 — блог-обзор',
        url: `${siteConfig.url}/blog/gmp-uzbekistan-2027-podgotovka`,
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(techArticleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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
          <span className="text-white">GMP в Узбекистане 2027</span>
        </nav>
        <div className="max-w-[900px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand text-white rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            GMP / Compliance
          </div>
          <h1 className="text-[28px] md:text-[42px] font-extrabold text-white leading-tight">
            GMP сертификация в Узбекистане к 2027 году
          </h1>
          <p className="text-[16px] md:text-[18px] text-brand-muted mt-4 leading-relaxed">
            Что должны успеть фарм-предприятия, как готовится АРФО, какие
            документы потребуются. Reference-hub для QA-инженеров, проектных
            отделов и отделов регуляторики Узбекистана.
          </p>
          <p className="text-[13px] text-brand-muted mt-4">
            Актуализировано: 23 мая 2026 г.
          </p>

          {/* Section nav */}
          <div className="mt-8 flex flex-wrap gap-2">
            {sectionNav.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-[12px] text-white hover:bg-white/10 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1 — Regulatory base */}
      <section
        id="regulatory-base"
        className="bg-white py-12 px-4 lg:px-[80px]"
      >
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Нормативная база
            </h2>
          </div>
          <div className="space-y-5 text-[15px] text-text leading-relaxed">
            <p>
              Курс на обязательную GMP-сертификацию фарм-производств в
              Узбекистане закреплён <strong>Постановлением Кабинета
              Министров</strong> и нормативами Министерства здравоохранения.
              Регулятором назначено <strong>Агентство по развитию
              фармацевтической отрасли при Минздраве (АРФО)</strong> — портал{' '}
              <a
                href="https://uzpharm-control.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline inline-flex items-center gap-1"
              >
                uzpharm-control.uz <ExternalLink size={12} />
              </a>
              . АРФО ведёт регистрацию фарм-предприятий, выдаёт регистрационные
              удостоверения, проводит GMP-инспекции и оформляет сертификаты.
            </p>
            <p>
              Ключевая контрольная дата — <strong>1 января 2027 года</strong>.
              После этой даты выпуск нестерильных и стерильных лекарственных
              форм без действующего GMP-сертификата перестанет быть законным
              основанием для регистрации препарата и обращения в Республике
              Узбекистан. Решение продиктовано тремя факторами: вступлением
              Узбекистана в ВТО, экспортными амбициями (ЕАЭС, MENA, Юго-Восточная
              Азия) и переходом отрасли в эпоху Pharma Park.
            </p>
            <p>
              АРФО ориентируется на <strong>EU GMP</strong> и{' '}
              <strong>Annex 1 (редакция 2022 г.)</strong>, вступивший в силу в
              ЕС 25 августа 2023 г. Это значит: все производители, претендующие
              на сертификат в Узбекистане, должны соответствовать европейским
              правилам в полном объёме, включая обновлённые требования к
              Contamination Control Strategy (CCS), мониторингу частиц 5 мкм в
              реальном времени и квалификации персонала зон A/B. Где UZ-нормы
              <em>идентичны</em> EU: классы зон A/B/C/D, требования к gowning,
              программе дезинфекции, валидации, EM, APS. Где
              <em>отличаются</em>: язык документации (узбекский/русский для SOP
              и batch records), дополнительные узбекистанские документы
              (лицензия Минздрава, акт пожарной безопасности, согласование
              номенклатуры с РУ).
            </p>
            <p>
              <strong>Связь с PIC/S.</strong> Узбекистан движется к членству в
              Pharmaceutical Inspection Co-operation Scheme — это
              международное соглашение регуляторов о взаимном признании GMP.
              Полное членство ожидается в горизонте 2027-2029 гг. До этого
              момента mutual recognition с другими PIC/S-регуляторами носит
              ограниченный характер: для импортёров из ЕС/PIC/S-стран
              действует упрощённая процедура (см. FAQ), для локальных
              производителей — только узбекистанский сертификат от АРФО.
            </p>
            <p>
              <strong>Кого касается дата 1 января 2027 г.</strong> Все
              производители готовых лекарственных средств (как стерильных, так
              и нестерильных), производители активных фарм-субстанций (API),
              контрактные производители (CMO/CDMO) и резиденты Pharma Park.
              Производители медицинских изделий — отдельный регуляторный режим
              (ISO 13485 + национальные требования), но к 2027 г. для них
              также ожидается ужесточение регулирования. Иностранные
              производители, импортирующие в Узбекистан, — см. ниже секцию
              «Кого касается».
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Who is affected */}
      <section
        id="who-is-affected"
        className="bg-surface py-12 px-4 lg:px-[80px]"
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Кого касается обязательная GMP
            </h2>
          </div>
          <p className="text-[15px] text-text mb-8 max-w-[800px] leading-relaxed">
            Дата 1 января 2027 г. распространяется на широкий перечень
            субъектов фарм-индустрии Узбекистана. Ниже — детализация по типу
            организации с указанием специфики применения GMP-требований.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {audienceList.map((a) => (
              <div
                key={a.title}
                className="bg-white rounded-xl border border-surface-input p-5"
              >
                <h3 className="text-[16px] font-bold text-brand-dark mb-2">
                  {a.title}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Inspector checks */}
      <section
        id="inspector-checks"
        className="bg-white py-12 px-4 lg:px-[80px]"
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardCheck size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Что проверяет инспектор АРФО
            </h2>
          </div>
          <p className="text-[15px] text-text mb-8 max-w-[800px] leading-relaxed">
            Инспекция АРФО на площадке обычно занимает 3-5 рабочих дней.
            Инспектор работает по утверждённому inspection plan и проверяет
            семь ключевых блоков. Ниже — детализация ожиданий по каждому
            блоку. Узбекистано-специфичный чек-лист (РУ, лицензия, акт
            пожарной безопасности, перевод документации) — в нашей основной
            блог-статье.
          </p>
          <div className="space-y-6">
            {inspectorCategories.map((cat) => (
              <div
                key={cat.id}
                id={`check-${cat.id}`}
                className="bg-surface rounded-xl border border-surface-input p-6"
              >
                <h3 className="text-[18px] font-bold text-text-dark mb-3">
                  {cat.title}
                </h3>
                <ul className="space-y-2.5 text-[14px] text-text">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-brand font-bold flex-shrink-0">
                        ›
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Preparation stages */}
      <section
        id="preparation"
        className="bg-surface py-12 px-4 lg:px-[80px]"
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <CalendarClock size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Поэтапная подготовка: что → когда → ответственный
            </h2>
          </div>
          <p className="text-[15px] text-text mb-8 max-w-[800px] leading-relaxed">
            Матрица ниже показывает ключевые milestones последних 6 месяцев до
            инспекции АРФО. Полный 24-месячный таймлайн с детализацией каждого
            квартала — в нашей{' '}
            <Link
              href="/blog/gmp-uzbekistan-2027-podgotovka"
              className="text-brand underline font-semibold"
            >
              основной блог-статье о подготовке к GMP 2027
            </Link>
            .
          </p>
          <div className="bg-white rounded-xl border border-surface-input overflow-x-auto">
            <table className="w-full border-collapse text-[14px] min-w-[700px]">
              <thead className="bg-brand-light">
                <tr>
                  <th className="text-left p-4 border-b border-surface-input">
                    Период
                  </th>
                  <th className="text-left p-4 border-b border-l border-surface-input">
                    Ответственный
                  </th>
                  <th className="text-left p-4 border-b border-l border-surface-input">
                    Задачи
                  </th>
                </tr>
              </thead>
              <tbody>
                {prepStages.map((stage) => (
                  <tr key={stage.period}>
                    <td className="p-4 border-b border-surface-input font-bold text-brand-dark whitespace-nowrap align-top">
                      {stage.period}
                    </td>
                    <td className="p-4 border-b border-l border-surface-input text-text align-top">
                      {stage.responsible}
                    </td>
                    <td className="p-4 border-b border-l border-surface-input text-text align-top">
                      <ul className="space-y-1.5">
                        {stage.tasks.map((t, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-brand">›</span>
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[13px] text-text-muted leading-relaxed max-w-[800px]">
            Подготовка к GMP — это не линейный процесс: HVAC-модернизация, ремонт
            зон, развёртывание QC-лаборатории и SOP-программа выполняются
            параллельно с T-21 до T-6. Матрица выше — только финальные 6 месяцев.
            Для полного road-map с бюджетной разбивкой см. блог-статью.
          </p>
        </div>
      </section>

      {/* Inline consulting CTA */}
      <section className="bg-brand-light/40 border-y border-brand-light py-10 lg:py-14 px-4 lg:px-[80px]">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white rounded-2xl border-2 border-brand/30 p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand text-white text-[11px] font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck size={12} />
                  GMP-консалтинг
                </div>
                <h2 className="text-[22px] lg:text-[26px] font-extrabold text-text-dark leading-tight mb-2">
                  Нужна помощь с подготовкой к GMP?
                </h2>
                <p className="text-[14px] lg:text-[15px] text-text leading-relaxed">
                  Получите бесплатную диагностику готовности предприятия за
                  30 минут. Партнёрство с практикующими GMP-консультантами,
                  которые уже сертифицировали заводы в Узбекистане.
                </p>
              </div>
              <Link
                href="/gmp-podgotovka"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors whitespace-nowrap"
              >
                Получить план
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Help resources */}
      <section
        id="resources"
        className="bg-white py-12 px-4 lg:px-[80px]"
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Building2 size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Где взять помощь
            </h2>
          </div>
          <p className="text-[15px] text-text mb-8 max-w-[800px] leading-relaxed">
            Подготовка к GMP — это командная работа: внешний консультант
            закрывает методологию, поставщики расходников и оборудования —
            физическую инфраструктуру, валидационные сервисы — qualification
            оборудования. Ниже — карта ключевых ролей экосистемы. Конкретных
            подрядчиков мы здесь не рекомендуем (за исключением собственного
            каталога) — выбор по результатам тендера или референс-проверки.
          </p>
          <div className="space-y-5">
            {helpResources.map((r) => (
              <div
                key={r.title}
                className="border-l-2 border-brand pl-5 py-1"
              >
                <h3 className="text-[17px] font-bold text-text-dark mb-2">
                  {r.title}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {r.description}
                </p>
                {r.link && (
                  <Link
                    href={r.link.href}
                    className="inline-flex items-center gap-1.5 mt-3 text-brand font-semibold hover:text-brand-dark transition-colors text-[14px]"
                  >
                    {r.link.label}
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Related standards */}
      <section
        id="related-standards"
        className="bg-surface py-12 px-4 lg:px-[80px]"
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Связанные стандарты
            </h2>
          </div>
          <p className="text-[15px] text-text mb-8 max-w-[800px] leading-relaxed">
            GMP в Узбекистане — это не один документ, а связка международных
            стандартов. Annex 1 описывает <em>что делать</em>, ICH Q9/Q10
            формулируют <em>методологию</em> (риск-подход, PQS), ISO 14644
            задаёт <em>классификацию зон</em>, ASTM E2500 — <em>как
            квалифицировать оборудование</em>. Без формального покрытия всех
            применимых стандартов аудитор атакует QA-пакет как «недостаточно
            обоснованный».
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {relatedStandards.map((s) => (
              <div
                key={s.shortName}
                className="bg-white rounded-xl border border-surface-input p-5"
              >
                <h3 className="text-[17px] font-bold text-brand-dark mb-1">
                  {s.shortName}
                </h3>
                <p className="text-[12px] text-text-muted mb-3">
                  {s.fullName}
                </p>
                <p className="text-[13px] text-text leading-relaxed mb-3">
                  <strong>Что это:</strong> {s.whatItIs}
                </p>
                <p className="text-[13px] text-text leading-relaxed">
                  <strong>Зачем нужно:</strong> {s.whyRelevant}
                </p>
                {s.link && (
                  <Link
                    href={s.link.href}
                    className="inline-flex items-center gap-1.5 mt-3 text-brand font-semibold hover:text-brand-dark transition-colors text-[13px]"
                  >
                    {s.link.label}
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-brand-light/30 border border-brand-light rounded-xl">
            <p className="text-[14px] text-text leading-relaxed">
              <strong>Полная Compliance Matrix.</strong> 8 стандартов × 17
              категорий каталога расходников — рабочий инструмент для
              составления CCS-документа и валидационного пакета. Доступна на
              странице{' '}
              <Link
                href="/compliance/standards"
                className="text-brand font-semibold underline"
              >
                /compliance/standards
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Section 7 — Today actions */}
      <section
        id="today-actions"
        className="bg-white py-12 px-4 lg:px-[80px]"
      >
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardCheck size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Что делать сегодня
            </h2>
          </div>
          <p className="text-[15px] text-text mb-6 leading-relaxed">
            До 1 января 2027 г. остаётся ограниченное время. Чек-лист на
            ближайшие 14 дней — практичные шаги, которые не требуют согласования
            бюджета и могут быть выполнены QA-командой самостоятельно.
          </p>
          <div className="bg-surface rounded-xl border border-surface-input p-6 mb-8">
            <h3 className="text-[17px] font-bold text-text-dark mb-4">
              Чек-лист на 14 дней
            </h3>
            <ul className="space-y-3 text-[14px] text-text">
              <li className="flex gap-3">
                <span className="text-brand font-bold flex-shrink-0">1.</span>
                <span className="leading-relaxed">
                  Скачать{' '}
                  <Link
                    href="/resources/gmp-audit-checklist"
                    className="text-brand underline font-semibold"
                  >
                    GMP audit checklist
                  </Link>{' '}
                  и пройти его самостоятельно по своей площадке — фиксировать
                  все «нет» и «частично» с примерами.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand font-bold flex-shrink-0">2.</span>
                <span className="leading-relaxed">
                  Сверить регистрационные удостоверения Минздрава с
                  фактической технологией производства каждого препарата.
                  Несоответствия — major risk в момент инспекции.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand font-bold flex-shrink-0">3.</span>
                <span className="leading-relaxed">
                  Провести инвентаризацию SOP: какие есть, на каком языке, кто
                  владелец, когда последняя ревизия. Цель — список SOP с
                  needs-translation и needs-update.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand font-bold flex-shrink-0">4.</span>
                <span className="leading-relaxed">
                  Прочитать{' '}
                  <Link
                    href="/blog/gmp-uzbekistan-2027-podgotovka"
                    className="text-brand underline font-semibold"
                  >
                    блог-статью «GMP в Узбекистане 2027: что должны успеть
                    фарм-предприятия»
                  </Link>{' '}
                  — там полный 24-месячный таймлайн, бюджет по размеру
                  предприятия и fallback-сценарий для опаздывающих.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand font-bold flex-shrink-0">5.</span>
                <span className="leading-relaxed">
                  Оценить состояние QC-лаборатории: какое оборудование
                  аттестовано, какие методики валидированы, есть ли
                  программа стабильности.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand font-bold flex-shrink-0">6.</span>
                <span className="leading-relaxed">
                  Сформировать предварительный список независимых
                  GMP-консультантов (минимум 3) и запросить КП на gap-аудит +
                  18-месячное сопровождение.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand font-bold flex-shrink-0">7.</span>
                <span className="leading-relaxed">
                  Запросить КП на годовой запас расходников: одежда, перчатки,
                  дезинфектанты, салфетки, мопы, биоиндикаторы. Сверить
                  TDS-пакет каждого поставщика с требованиями Annex 1.
                </span>
              </li>
            </ul>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/resources/gmp-audit-checklist"
              className="flex items-center gap-3 p-5 bg-surface border border-surface-input rounded-xl hover:border-brand hover:bg-brand-light/20 transition-colors"
            >
              <Download size={24} className="text-brand flex-shrink-0" />
              <div>
                <p className="font-bold text-text-dark text-[15px]">
                  GMP audit checklist
                </p>
                <p className="text-[13px] text-text-muted">
                  Чек-лист готовности к инспекции АРФО (PDF)
                </p>
              </div>
            </Link>
            <Link
              href="/blog/gmp-uzbekistan-2027-podgotovka"
              className="flex items-center gap-3 p-5 bg-surface border border-surface-input rounded-xl hover:border-brand hover:bg-brand-light/20 transition-colors"
            >
              <BookOpen size={24} className="text-brand flex-shrink-0" />
              <div>
                <p className="font-bold text-text-dark text-[15px]">
                  Подготовка к GMP 2027
                </p>
                <p className="text-[13px] text-text-muted">
                  24-мес. таймлайн, бюджет, fallback
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16 px-4 lg:px-[80px]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-white mb-4">
            Запросить КП на годовой запас расходников
          </h2>
          <p className="text-[16px] text-brand-muted mb-8 leading-relaxed">
            Подберём полный пакет расходников и СИЗ под класс зон A/B/C/D
            вашего производства. Готовый compliance-пакет (TDS, протоколы
            партий, ISO 9001 / 13485, CE) — под inspection-package АРФО.
            Поставка с растаможкой в Ташкент.
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
              Чек-лист GMP-аудита
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <FileText size={16} />
              B2B-калькуляторы
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-6">
            Частые вопросы
          </h2>
          <div className="space-y-5">
            {faqs.map((q) => (
              <div
                key={q.question}
                className="border-l-2 border-brand pl-5 py-1"
              >
                <h3 className="text-[16px] font-bold text-text-dark mb-2">
                  {q.question}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {q.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[20px] md:text-[24px] font-extrabold text-text-dark mb-6">
            По теме
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/compliance/annex1"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                EU GMP Annex 1 — Compliance Matrix
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                17 категорий каталога × 9 §-разделов Annex 1
              </p>
            </Link>
            <Link
              href="/compliance/standards"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                Все стандарты — Compliance Matrix
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                8 стандартов: Annex 1, ICH, USP, ASTM, ISO 13485
              </p>
            </Link>
            <Link
              href="/blog/gmp-uzbekistan-2027-podgotovka"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                Подготовка к GMP 2027 — блог
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                24-мес. таймлайн, бюджет, кейсы, fallback
              </p>
            </Link>
            <Link
              href="/resources/gmp-audit-checklist"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                GMP audit checklist
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Чек-лист готовности к инспекции АРФО (PDF)
              </p>
            </Link>
            <Link
              href="/resources/iso-14644-classes-spec"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                ISO 14644 классы
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Спецификации классов чистоты ISO 5/7/8
              </p>
            </Link>
            <Link
              href="/resources/disinfection-validation-protocol"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                Disinfection validation
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Протокол валидации дезинфекции по §11
              </p>
            </Link>
            <Link
              href="/resources/gowning-room-design-guide"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                Gowning room design
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Дизайн зоны переодевания по §4
              </p>
            </Link>
            <Link
              href="/catalog/disinfectants-and-detergents"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                Дезинфектанты
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Бактерицид + спорицид для ротации §11
              </p>
            </Link>
            <Link
              href="/catalog/perchatki-zashchitnye"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                Перчатки защитные
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Стерильные / нестерильные по §7
              </p>
            </Link>
            <Link
              href="/catalog/garments"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                Одежда одноразовая
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Комбинезоны для зон A/B/C/D §4
              </p>
            </Link>
            <Link
              href="/brands/tinman"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                TINMAN — мебель cleanroom
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Нержавеющая мебель под §5 / §6 Annex 1
              </p>
            </Link>
            <Link
              href="/tools"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                B2B-калькуляторы
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Расчёт расходников, gowning room, дезинфекции
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
