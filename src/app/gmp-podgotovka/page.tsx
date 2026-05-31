import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  FileText,
  Search,
  Briefcase,
  Layers,
  Truck,
  Building2,
  ClipboardCheck,
  CalendarClock,
  Phone,
  MessageCircle,
  Send,
  ArrowRight,
  Clock,
  CheckCircle2,
  Award,
  HelpCircle,
} from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';
import GmpConsultingForm from './GmpConsultingForm';

export const metadata: Metadata = {
  title:
    'Подготовка к GMP в Узбекистане 2027: обучение, аудит, сопровождение GMP-инспекции',
  description:
    'Поможем пройти GMP-инспекцию в Узбекистане с первого раза. Обучение QA, подготовка SOP, mock inspection, supplier qualification. Партнёрство с практикующими GMP-консультантами. Бесплатная диагностика готовности.',
  alternates: {
    canonical: `${siteConfig.url}/gmp-podgotovka`,
    languages: {
      ru: `${siteConfig.url}/gmp-podgotovka`,
      uz: `${siteConfig.url}/uz/gmp-podgotovka`,
      'x-default': `${siteConfig.url}/gmp-podgotovka`,
    },
  },
  keywords: [
    'обучение GMP Узбекистан',
    'GMP консультант Узбекистан',
    'подготовка к GMP 2027',
    'сертификация GMP',
    'GMP-консалтинг Ташкент',
    'GMP инспекция Узбекистан',
    'pre-audit GMP',
    'SOP подготовка фарм-завод',
    'supplier qualification расходники',
    'CCS Annex 1 Узбекистан',
  ],
  openGraph: {
    title:
      'Подготовка к GMP в Узбекистане 2027 — обучение, аудит, сопровождение GMP-инспекции',
    description:
      'Поможем пройти GMP-инспекцию в Узбекистане с первого раза. Партнёрство с практикующими GMP-консультантами Pharma Park. Бесплатная диагностика готовности предприятия.',
    type: 'website',
    url: `${siteConfig.url}/gmp-podgotovka`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    icon: Users,
    title: 'Обучение QA-персонала',
    description:
      'Компетенции для GMP-зон A/B/C/D, gowning-procedures, поведение в чистых зонах, документирование. Очные занятия на площадке + онлайн-модули с аттестацией.',
  },
  {
    icon: FileText,
    title: 'Подготовка SOP и документации',
    description:
      'Site Master File, Validation Master Plan, batch records, deviations log, CAPA. Адаптация шаблонов под узбекистанский язык и формат GMP-инспекции.',
  },
  {
    icon: Search,
    title: 'Pre-audit (внутренний аудит готовности)',
    description:
      'Gap-анализ против EU GMP Annex 1 (2022) на площадке. План closures с приоритизацией по criticality и реалистичными сроками закрытия.',
  },
  {
    icon: ShieldCheck,
    title: 'Mock inspection',
    description:
      'Имитация GMP-инспекции за 2-3 месяца до реальной. 3-5 дней на площадке, plant-walk, опрос персонала, проверка inspection-package.',
  },
  {
    icon: Briefcase,
    title: 'Сопровождение на GMP-инспекции',
    description:
      'Присутствие на площадке во время инспекции, помощь с reply-letter, закрытие observations в течение 30 дней. Опыт прохождения реальных GMP-инспекций в Узбекистане.',
  },
  {
    icon: Layers,
    title: 'CCS (Contamination Control Strategy)',
    description:
      'Разработка с нуля или ревизия CCS-документа по Annex 1 §2.5. Покрытие всех источников контаминации, обоснование контрольных мер и мониторинга.',
  },
  {
    icon: Truck,
    title: 'Supplier qualification расходников',
    description:
      'TDS, CoA, EN/ISO сертификаты по всем критичным позициям. Наша экспертиза как дистрибьютора — ускоряет single-window процесс qualification.',
  },
];

interface WhyItem {
  title: string;
  description: string;
}

const whyUs: WhyItem[] = [
  {
    title: 'Снабжаем 13 действующих GMP-заводов',
    description:
      'Видим, что реально просят инспекторы Центра надлежащих практик на площадках. Знаем, какие compliance-документы поставщиков критично иметь готовыми к инспекции.',
  },
  {
    title: 'Партнёрство с практикующими GMP-консультантами',
    description:
      'Не теоретики — наши партнёры уже сертифицировали предприятия в Узбекистане и работают с резидентами Pharma Park. Опыт реальных GMP-инспекций.',
  },
  {
    title: 'Расходники + консультация в одном окне',
    description:
      'Single supplier qualification ускоряет вашу подготовку. Не нужно отдельно тендерить поставщика и консультанта — закрываем оба направления связкой.',
  },
];

interface ProcessStep {
  num: string;
  title: string;
  description: string;
  duration: string;
}

const processSteps: ProcessStep[] = [
  {
    num: '01',
    title: 'Бесплатный 30-минутный созвон',
    description:
      'Определяем стартовую точку: статус инфраструктуры, готовность SOP, наличие QA-команды, целевая дата сертификации. Согласуем формат дальнейшей работы.',
    duration: '30 минут',
  },
  {
    num: '02',
    title: 'Gap-аудит на площадке',
    description:
      'Выезжаем к вам на 2-3 дня. Выявляем расхождения с EU GMP / Annex 1, фиксируем findings по severity (critical / major / minor) с примерами и ссылками на §-разделы.',
    duration: '2-3 дня',
  },
  {
    num: '03',
    title: 'План подготовки 12-24 мес.',
    description:
      'Готовим road-map с бюджетной оценкой по каждому блоку, контрольными точками, ответственными. Документ, по которому можно защищать бюджет перед собственниками.',
    duration: '1-2 недели',
  },
  {
    num: '04',
    title: 'Сопровождение до сертификата',
    description:
      'Регулярные визиты, mock inspection за 2-3 мес. до подачи заявки, присутствие на GMP-инспекции, помощь с reply-letter. Контракт до получения сертификата.',
    duration: '12-24 мес.',
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'Можно ли подготовиться к GMP-2027 за 6 месяцев?',
    answer:
      'Реалистично — только при условии, что инфраструктура (HVAC, перепады давления, классификация зон по ISO 14644) уже соответствует Annex 1 в общих чертах, а QA-команда работает по SOP минимум 12 месяцев. Если стартовое состояние «старое советское производство без EM» — за 6 мес. невозможно даже с большим бюджетом, реалистичный таргет 18-24 мес. с предварительным согласованием фазированной сертификации с Агентством по развитию фармотрасли.',
  },
  {
    question: 'Сколько стоит подготовка к GMP-сертификации?',
    answer:
      'Стоимость нашего сопровождения за 18 месяцев — диапазон $30-100k в зависимости от размера предприятия и стартового состояния. Это закрывает методологию: gap-аудит, SOP, обучение, mock inspection, сопровождение на GMP-инспекции. Отдельно идут расходы на инфраструктуру (HVAC, ремонт зон), QC-лабораторию и закупку расходников. Полная разбивка бюджета — на бесплатном 30-минутном созвоне.',
  },
  {
    question: 'Кто будет проводить обучение и аудит — ваши сотрудники?',
    answer:
      'CRS / TOPAZ COMPANY работает в партнёрстве с практикующими GMP-консультантами, имеющими опыт сертификации предприятий в Узбекистане (в том числе резидентов Pharma Park). Аудит и обучение проводят непосредственно консультанты — мы курируем процесс, обеспечиваем supplier qualification по расходникам и поддерживаем коммуникацию с площадкой. Конкретный состав команды представляем на первом созвоне.',
  },
  {
    question: 'Что входит в supplier qualification?',
    answer:
      'Полный пакет документов на каждую критичную позицию: TDS (technical data sheet), CoA на партии (certificate of analysis), сертификаты соответствия EN/ISO (например, EN 14126 для одежды, ISO 13485 для медизделий, ISO 14644 для расходников cleanroom), декларации о соответствии CE / EAC. Дополнительно — QA-анкеты поставщика, аудит-отчёты, контрольные образцы. Как дистрибьютор IBC Nanotex, Contec, BIMOS, Terragene и др., мы предоставляем полный compliance-pack «из коробки», что экономит 2-4 недели qualification по каждому SKU.',
  },
  {
    question: 'Можно ли получить сертификат GMP без GMP-инспекции?',
    answer:
      'Нет. Для локального производителя в Узбекистане обязательна GMP-инспекция Центра надлежащих практик на площадке — это единственный путь получения узбекистанского сертификата GMP. Иностранные GMP-сертификаты (EU, FDA, MHRA) признаются только для импортёров при регистрации препарата, но не освобождают локальный завод от инспекции. Узбекистан движется к полному членству в PIC/S (горизонт 2027-2029), что в будущем расширит mutual recognition, но до этого момента — только инспекция Центра.',
  },
  {
    question: 'В чём отличие от обычного консалтинга?',
    answer:
      'Три ключевых отличия. (1) Single window: получаете методологию консалтинга и compliance-пакет поставщика расходников в одной коммуникации — никаких отдельных тендеров. (2) Знание узбекистанской специфики: наши партнёры уже проходили GMP-инспекции, знают язык документации, региональные нюансы. (3) Точка обзора со стороны supplier: видим, какие compliance-документы критичны на инспекции «изнутри 13 действующих GMP-заводов», которые мы снабжаем — это даёт практический фильтр для приоритизации подготовки.',
  },
  {
    question: 'Что если GMP-инспекция найдёт нарушения?',
    answer:
      'Это нормальная часть процесса — даже у предприятий с EU GMP-историей инспектор находит observations. Критично — закрыть их в reply-letter в течение 30 дней с конкретными CAPA-действиями и сроками. Мы сопровождаем этот процесс: помогаем формулировать ответы, готовить root cause analysis, согласовывать сроки закрытия. При major findings возможна повторная инспекция (фокусная) — её мы тоже сопровождаем. Сертификат выдаётся после подтверждения закрытия всех critical и major observations.',
  },
  {
    question: 'Работаете ли с не-фарм производствами (медизделия, БАД, косметика)?',
    answer:
      'Да. Для медицинских изделий это ISO 13485 + национальные требования (отдельный регуляторный путь, без фарм-инспекции, но методология подготовки сходна). Для БАД и косметики — упрощённые системы качества (HACCP, GMP косметики ISO 22716), для которых тот же подход «обучение + SOP + supplier qualification» применим. Объём сопровождения и стоимость значительно ниже, чем для фармы — обсуждаем индивидуально.',
  },
];

export default function GmpPodgotovkaPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Подготовка к GMP-сертификации в Узбекистане',
    serviceType: 'GMP Consulting & Pre-audit Services',
    description:
      'Обучение QA-персонала, подготовка SOP и документации, pre-audit, mock inspection, сопровождение на GMP-инспекции, разработка CCS, supplier qualification расходников. Партнёрство с практикующими GMP-консультантами для фарм-предприятий Узбекистана.',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      legalName: 'ООО «TOPAZ COMPANY»',
      url: siteConfig.url,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ул. Нукус, 85/1',
        addressLocality: 'Ташкент',
        addressCountry: 'UZ',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Узбекистан',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType:
        'QA-руководители, регуляторные специалисты, директора фарм-предприятий Узбекистана',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        minPrice: 30000,
        maxPrice: 100000,
        description:
          'Сопровождение подготовки к GMP-сертификации за 18 месяцев. Точная стоимость зависит от размера предприятия и стартового состояния.',
      },
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/gmp-podgotovka`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги по подготовке к GMP',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
      })),
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
        name: 'Подготовка к GMP в Узбекистане',
        item: `${siteConfig.url}/gmp-podgotovka`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-dark py-14 lg:py-20 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <nav
            className="flex items-center gap-1.5 text-[13px] text-brand-muted mb-5"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Главная
            </Link>
            <span>/</span>
            <span className="text-white">Подготовка к GMP</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand text-white rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
            <Clock size={14} />
            До GMP-сертификации — 7 месяцев
          </div>

          <h1 className="text-[28px] md:text-[42px] lg:text-[48px] font-extrabold text-white leading-[1.1] max-w-[900px]">
            Подготовка к GMP в Узбекистане:
            <br />
            <span className="text-brand-muted">
              обучение, аудит, сопровождение GMP-инспекции
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] text-brand-muted mt-5 leading-relaxed max-w-[800px]">
            До обязательной GMP-сертификации осталось 7 месяцев. Поможем
            пройти GMP-инспекцию с первого раза. Работаем в партнёрстве с
            практикующими GMP-консультантами, которые уже сертифицировали
            предприятия в Узбекистане.
          </p>

          {/* Trust signals */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[900px]">
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <Building2
                size={22}
                className="text-white shrink-0 mt-0.5"
              />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">
                  13 GMP-заводов
                </p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  снабжаем действующие сертифицированные предприятия
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <CalendarClock
                size={22}
                className="text-white shrink-0 mt-0.5"
              />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">
                  18-24 мес.
                </p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  реалистичный таймлайн подготовки с нуля
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <Award size={22} className="text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">
                  Pharma Park
                </p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  партнёры — практикующие GMP-консультанты
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <CheckCircle2
                size={22}
                className="text-white shrink-0 mt-0.5"
              />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">
                  Бесплатно
                </p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  30-минутная диагностика готовности
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              Получить план подготовки
              <ArrowRight size={16} />
            </a>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-surface py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <GmpConsultingForm />
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[800px] mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-wider mb-3">
              Услуги
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight">
              С чем поможем
            </h2>
            <p className="text-[15px] md:text-[16px] text-text mt-4 leading-relaxed">
              7 направлений подготовки к GMP-инспекции — от обучения QA-команды
              до сопровождения непосредственно на площадке во время инспекции.
              Закрываем всю цепочку single window.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="bg-surface rounded-xl border border-surface-input p-6 hover:border-brand/40 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-light text-brand mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-[18px] font-bold text-text-dark mb-2 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-text leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors"
            >
              Заполнить заявку
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-surface py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[800px] mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-wider mb-3">
              Почему мы
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight">
              Почему CRS / TOPAZ COMPANY
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyUs.map((w, i) => (
              <div
                key={w.title}
                className="bg-white rounded-xl border border-surface-input p-6"
              >
                <div className="text-[42px] font-extrabold text-brand-light leading-none mb-3">
                  0{i + 1}
                </div>
                <h3 className="text-[18px] font-bold text-text-dark mb-2 leading-tight">
                  {w.title}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {w.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[800px] mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-wider mb-3">
              Процесс
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight">
              Как мы работаем
            </h2>
            <p className="text-[15px] md:text-[16px] text-text mt-4 leading-relaxed">
              4 этапа от первичного созвона до получения сертификата. Каждый
              этап завершается фиксированным артефактом — план, отчёт, mock
              inspection report, финальная reply-letter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="bg-surface rounded-xl border border-surface-input p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[44px] font-extrabold text-brand leading-none">
                      {step.num}
                    </span>
                    <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-bold text-text-dark mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-text leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <ArrowRight
                    size={20}
                    className="hidden lg:block absolute top-[42px] -right-[14px] text-brand z-10"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-wider mb-3">
              <HelpCircle size={12} />
              FAQ
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight">
              Частые вопросы
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group bg-white rounded-xl border border-surface-input p-5 lg:p-6 [&_summary]:list-none"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer">
                  <h3 className="text-[16px] lg:text-[17px] font-bold text-text-dark leading-snug">
                    {f.question}
                  </h3>
                  <ArrowRight
                    size={18}
                    className="text-brand shrink-0 mt-1 rotate-90 group-open:-rotate-90 transition-transform"
                  />
                </summary>
                <div className="mt-3 pt-3 border-t border-surface-input text-[14px] text-text leading-relaxed">
                  {f.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-dark py-14 lg:py-20 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-[26px] md:text-[36px] font-extrabold text-white mb-4 leading-tight">
            Готовы начать подготовку к GMP-2027?
          </h2>
          <p className="text-[16px] text-brand-muted mb-8 leading-relaxed max-w-[700px] mx-auto">
            Бесплатный 30-минутный диагностический созвон — определим стартовую
            точку, дадим честную оценку реальности целевого срока, согласуем
            формат дальнейшей работы.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              Заполнить заявку
              <ArrowRight size={16} />
            </a>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap text-[14px] text-brand-muted">
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <span className="text-white/20">•</span>
            <a
              href={siteConfig.social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Send size={16} />
              Telegram
            </a>
            <span className="text-white/20">•</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <FileText size={16} />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-12 px-4 lg:px-[80px] border-t border-surface-input">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[20px] md:text-[24px] font-extrabold text-text-dark mb-6">
            По теме
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/compliance/gmp-2027-uzbekistan"
              className="block p-4 bg-surface rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px] flex items-center gap-2">
                <ShieldCheck size={16} /> GMP в Узбекистане 2027 — hub
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Нормативная база Узбекистана, кого касается, чек-лист инспектора
              </p>
            </Link>
            <Link
              href="/blog/gmp-uzbekistan-2027-podgotovka"
              className="block p-4 bg-surface rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px] flex items-center gap-2">
                <CalendarClock size={16} /> Подготовка к GMP 2027 — блог
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                24-мес. таймлайн, бюджет, кейсы, fallback-сценарий
              </p>
            </Link>
            <Link
              href="/resources/gmp-audit-checklist"
              className="block p-4 bg-surface rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px] flex items-center gap-2">
                <ClipboardCheck size={16} /> GMP audit checklist
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                PDF-чек-лист готовности к GMP-инспекции
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
