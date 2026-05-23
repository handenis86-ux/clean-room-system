import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  Truck,
  Phone,
  ShieldCheck,
  Package,
  Building2,
  FileText,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';
import { localBusinessJsonLd } from '@/data/local-business-schema';

export const metadata: Metadata = {
  title:
    'Поставщик cleanroom-расходников в Ташкенте — Clean Room Systems',
  description:
    'CRS / TOPAZ COMPANY — B2B-дистрибьютор расходников для чистых помещений в Ташкенте: Contec, Terragene, TINMAN, IBC Nanotex. 280+ SKU со склада, доставка по Узбекистану.',
  alternates: {
    canonical: `${siteConfig.url}/locations/tashkent-cleanroom-supplier`,
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'поставщик cleanroom Ташкент',
    'дезинфектанты cleanroom Ташкент',
    'расходники для чистых помещений Ташкент',
    'GMP расходники Ташкент',
    'cleanroom одежда Ташкент',
    'Contec Ташкент',
    'Terragene Ташкент',
    'TINMAN Узбекистан',
    'IBC Nanotex Узбекистан',
    'Pharma Park Ташкент поставщик',
  ],
  openGraph: {
    title:
      'Поставщик cleanroom-расходников в Ташкенте — Clean Room Systems',
    description:
      'Склад в Ташкенте, 280+ SKU, 12+ брендов. Дезинфектанты, одежда, перчатки, салфетки, индикаторы стерилизации, мебель TINMAN. Доставка по Узбекистану.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

interface AudienceItem {
  title: string;
  description: string;
}

const audienceList: AudienceItem[] = [
  {
    title: 'Резиденты Pharma Park (Tashkent Pharma Park)',
    description:
      'Кластерные фарм-предприятия Зангиатинского района с контрактными обязательствами по EU GMP. У нас есть опыт поставок расходников и compliance-документации (TDS, протоколы партий, ISO 9001/13485) под требования резидентов СЭЗ — от gowning-комплектов до индикаторов стерилизации и спорицидов для ротации по §11 Annex 1.',
  },
  {
    title: 'Независимые фарм-предприятия Ташкента',
    description:
      'Производители готовых лекарственных форм в индустриальных зонах Юнусабада, Чиланзара, Сергели, Мирзо-Улугбекского района — нестерильные и стерильные производства, готовящиеся к обязательной GMP-сертификации к 1 января 2027 г. Поставляем годовой запас расходников и СИЗ под классы зон C/D и A/B.',
  },
  {
    title: 'Биотех и медицинские лаборатории',
    description:
      'Лаборатории молекулярной диагностики, ПЦР-центры, биотех-стартапы в Ташкенте, работающие по ISO 15189 и BSL-2. Поставляем стерильные перчатки Shield Scientific, салфетки Contec PROSAT, дезинфектанты на основе изопропанола 70% и перекиси водорода.',
  },
  {
    title: 'QC-лаборатории при фарм-заводах',
    description:
      'Аналитические и микробиологические лаборатории фарм-предприятий — точка приложения биоиндикаторов Terragene Bionova (паровая, ЭО, плазма), reference standards-доступа, расходников для подготовки образцов. Опыт работы с компетентными аудиторами АРФО.',
  },
  {
    title: 'НИИ, университетские лаборатории, R&D-центры',
    description:
      'Институты при Министерстве инновационного развития, ТашФармИ, медицинские университеты, R&D-департаменты крупных производителей. Малые объёмы с быстрой доставкой по Ташкенту, гибкая разбивка партии под академический бюджет.',
  },
  {
    title: 'Медицинские учреждения и клиники',
    description:
      'Хирургические отделения, CSSD (стерилизационные отделения), отделения интенсивной терапии частных клиник Ташкента. Индикаторы стерилизации Terragene под автоклавы, плазменные и ЭО-стерилизаторы, средства дезинфекции поверхностей с EN 13697-валидацией.',
  },
];

interface CategoryItem {
  title: string;
  href: string;
  text: string;
}

const categoryList: CategoryItem[] = [
  {
    title: 'Дезинфектанты cleanroom',
    href: '/catalog/disinfectants-and-detergents',
    text: 'Contec Sporicidin, Diversey Oxivir, Neokhim Bacillol — бактерицидные и спорицидные растворы для ротации по §8.66 Annex 1. Готовые к применению формы (RTU) и концентраты, sterile / non-sterile варианты. Полный TDS-пакет с данными EN 13697 / EN 13727 / ASTM E2197 — для disinfection validation.',
  },
  {
    title: 'Защитные перчатки',
    href: '/catalog/perchatki-zashchitnye',
    text: 'Isofield Gecko, Shield Scientific Shieldskin Xtreme, Ansell BioClean — нитриловые перчатки cleanroom: стерильные / нестерильные, длина 240/300/400 мм, AQL 0,65 / 1,5. Подходят для зон A/B/C/D. На складе размеры 6,0–9,0 в наличии.',
  },
  {
    title: 'Одежда: стерильная, многоразовая, одноразовая',
    href: '/catalog/garments',
    text: 'Комбинезоны DuPont Tyvek IsoClean (стерильные, для зон A/B), Ansell BioClean, многоразовые полиэстеровые комплекты для зон C/D. Бахилы, шапочки, маски, рукава. Подбор под gowning-программу с учётом класса зон по ISO 14644-1.',
  },
  {
    title: 'Салфетки и мопы cleanroom',
    href: '/catalog/cleanroom-wipes',
    text: 'Contec PROSAT (заранее увлажнённые IPA 70% / WFI), sterile microfiber wipes, полиэстеровые и целлюлозные салфетки. Под классы ISO 4–8, validated low-particulate, double-bag packaging для зон A/B.',
  },
  {
    title: 'Индикаторы стерилизации',
    href: '/catalog/indicators',
    text: 'Terragene Bionova — биологические и химические индикаторы для паровых, ЭО, плазменных, формальдегидных стерилизаторов. Self-contained биоиндикаторы (24h read-out), интеграторы класса 6, контроль соответствия EN ISO 11138/11140. Единственный авторизованный дистрибьютор Terragene в Узбекистане.',
  },
  {
    title: 'Мебель cleanroom TINMAN',
    href: '/brands/tinman',
    text: 'AISI 304/316 нержавеющая мебель: скамьи и обувницы для gowning, шкафы для одежды, рабочие столы, тележки, мойки, pass-through. ISO 4 / GMP Class A. Единственный в Узбекистане авторизованный дистрибьютор TINMAN (Сербия) — flat-pack доставка со склада в Ташкенте.',
  },
];

interface DeliveryRow {
  city: string;
  time: string;
}

const deliveryRows: DeliveryRow[] = [
  { city: 'г. Ташкент (все районы)', time: '1–2 рабочих дня' },
  { city: 'Зангиата, Pharma Park, Янгиюль', time: '1–3 рабочих дня' },
  { city: 'Самарканд, Джизак, Гулистан', time: '3–5 рабочих дней' },
  { city: 'Бухара, Навои, Карши', time: '5–7 рабочих дней' },
  { city: 'Ургенч, Нукус, Термез', time: '7–10 рабочих дней' },
  { city: 'Андижан, Фергана, Наманган', time: '4–6 рабочих дней' },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'Какие фарм-предприятия Ташкента уже ваши клиенты?',
    answer:
      'Среди наших клиентов — резиденты Tashkent Pharma Park, независимые фарм-производители Ташкента и Ташкентской области, биотехнологические лаборатории, медицинские учреждения, R&D-центры при университетах. Конкретные референсы предоставляем по NDA: запросите список релевантных кейсов под профиль вашего производства — пришлём с краткой аннотацией поставленных категорий и compliance-документации.',
  },
  {
    question: 'Есть ли склад в Ташкенте? Какие SKU доступны сразу?',
    answer:
      'Да, основной склад — в Ташкенте по адресу ул. Нукус, 85/1 (Мирзо-Улугбекский район). На складе постоянно представлены ходовые позиции по всем 17 категориям каталога: дезинфектанты в наиболее востребованных объёмах (1L / 5L / 20L), нитриловые перчатки в размерах 7,0–8,5, базовые комбинезоны Tyvek, salfetки PROSAT в стандартных размерах, биоиндикаторы Terragene под пар, ЭО, плазму. Полная номенклатура — 280+ SKU. Под-заказные позиции (нестандартные размеры одежды, специальные дезинфектанты, мебель TINMAN под индивидуальные размеры) — поставка под заказ 6–12 недель.',
  },
  {
    question: 'Сколько SKU в наличии прямо сейчас?',
    answer:
      'Каталог содержит 280+ SKU в 17 категориях. На складе в Ташкенте — около 60% номенклатуры в постоянном наличии, остальное — заказывается под конкретный проект с цепочкой поставок 6–12 недель в зависимости от бренда. Резерв расходников под годовой контракт обсуждаем индивидуально: при заключении рамочного договора держим страховой запас под объём заказчика.',
  },
  {
    question: 'Как заказать? Минимальный заказ?',
    answer:
      'Запрос через форму на /contacts, Telegram @khan_denis, WhatsApp +998 99 821-12-22 или почту info@cleanroom.uz. Жёсткого минимального заказа по сумме нет — поставляем от 1 коробки до годового контракта на 500+ M UZS. Для B2B-клиентов оформляем счёт-фактуру, акт выполненных работ, ТТН на русском языке (по запросу — на узбекском). Оплата — банковский перевод (UZS, USD, EUR), наличный расчёт, post-payment по согласованию.',
  },
  {
    question: 'Работаете ли с тендерами и государственными закупками?',
    answer:
      'Да. ООО «TOPAZ COMPANY» — действующее юридическое лицо в Узбекистане с полным пакетом документов для участия в тендерах: лицензии, регистрация в xarid.uz, статистические коды, опыт работы по госконтрактам с фарм-предприятиями и медучреждениями. Для подготовки тендерной заявки предоставляем коммерческое предложение с гарантированной ценой на 30–90 дней, спецификации с привязкой к ТЗ заказчика и сертификаты партнёров (Contec, Terragene, TINMAN, Diversey, Shield Scientific).',
  },
];

export default function TashkentCleanroomSupplierPage() {
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
        name: 'Локации',
        item: `${siteConfig.url}/locations/tashkent-cleanroom-supplier`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Поставщик в Ташкенте',
        item: `${siteConfig.url}/locations/tashkent-cleanroom-supplier`,
      },
    ],
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand to-brand-dark py-12 px-4 lg:px-[80px] text-white">
        <nav
          className="flex items-center gap-1.5 text-[13px] text-brand-muted mb-4"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Главная
          </Link>
          <span>/</span>
          <span className="text-white">Поставщик в Ташкенте</span>
        </nav>
        <div className="max-w-[1100px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
            <MapPin size={14} />
            Локация — Ташкент
          </div>
          <h1 className="text-[28px] md:text-[44px] font-extrabold text-white leading-tight max-w-[900px]">
            Поставщик cleanroom-расходников в Ташкенте
          </h1>
          <p className="text-[16px] md:text-[19px] text-brand-muted mt-5 leading-relaxed max-w-[850px]">
            B2B-поставки расходных материалов, одежды и мебели для чистых
            помещений фармацевтических, биотехнологических и медицинских
            производств Узбекистана. Склад в Ташкенте, авторизованные
            партнёрства с Contec, Terragene, TINMAN, IBC Nanotex.
          </p>

          {/* Trust metrics */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-[24px] md:text-[28px] font-extrabold text-white">
                280+
              </div>
              <div className="text-[12px] text-brand-muted uppercase tracking-wider mt-1">
                SKU в каталоге
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-[24px] md:text-[28px] font-extrabold text-white">
                12+
              </div>
              <div className="text-[12px] text-brand-muted uppercase tracking-wider mt-1">
                Авторизованных брендов
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-[24px] md:text-[28px] font-extrabold text-white">
                17
              </div>
              <div className="text-[12px] text-brand-muted uppercase tracking-wider mt-1">
                Категорий расходников
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-[24px] md:text-[28px] font-extrabold text-white">
                Ташкент
              </div>
              <div className="text-[12px] text-brand-muted uppercase tracking-wider mt-1">
                Склад · доставка по UZ
              </div>
            </div>
          </div>

          {/* Office address quick reference */}
          <div className="mt-8 inline-flex items-start gap-3 px-5 py-4 bg-white/5 border border-white/10 rounded-xl">
            <MapPin size={20} className="text-white flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[14px] font-bold text-white">
                ООО «TOPAZ COMPANY»
              </div>
              <div className="text-[13px] text-brand-muted mt-0.5">
                г. Ташкент, ул. Нукус, 85/1 · Мирзо-Улугбекский район
              </div>
              <div className="text-[13px] text-brand-muted">
                Пн–Пт 09:00–18:00 · {siteConfig.phone}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — Audience */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Building2 size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Кому мы поставляем в Ташкенте
            </h2>
          </div>
          <p className="text-[15px] text-text mb-8 max-w-[850px] leading-relaxed">
            Ташкент и Ташкентская область — центр фармацевтической, биотех- и
            медицинской индустрии Узбекистана. Здесь сосредоточены крупнейшие
            кластеры производства, аналитические лаборатории и
            научно-исследовательские центры. Наша клиентская база охватывает
            все ключевые сегменты.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {audienceList.map((a) => (
              <div
                key={a.title}
                className="bg-surface rounded-xl border border-surface-input p-5"
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

      {/* Section 2 — Categories */}
      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Package size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Категории на складе в Ташкенте
            </h2>
          </div>
          <p className="text-[15px] text-text mb-8 max-w-[850px] leading-relaxed">
            Шесть ключевых направлений с постоянным наличием в Ташкенте.
            Полный каталог — 17 категорий, 280+ SKU. Compliance-документация
            (TDS, протоколы партий, ISO 9001 / ISO 13485 / CE / EAC) — по
            запросу для каждой позиции.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {categoryList.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-xl border border-surface-input p-5 flex flex-col"
              >
                <h3 className="text-[17px] font-bold text-brand-dark mb-2">
                  {c.title}
                </h3>
                <p className="text-[14px] text-text leading-relaxed flex-1">
                  {c.text}
                </p>
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-1.5 mt-4 text-brand font-semibold hover:text-brand-dark transition-colors text-[14px]"
                >
                  Перейти в каталог
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-brand-light/30 border border-brand-light rounded-xl">
            <p className="text-[14px] text-text leading-relaxed">
              <strong>Полный каталог.</strong> Все 17 категорий и 280+ SKU —
              на странице{' '}
              <Link
                href="/catalog"
                className="text-brand font-semibold underline"
              >
                /catalog
              </Link>
              . Включая стулья cleanroom, обувь, защитные очки, уборочные
              тележки, многоразовую одежду.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Logistics */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Truck size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Логистика и поставки в Ташкенте и по Узбекистану
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-[18px] font-bold text-text-dark mb-3">
                Склад в Ташкенте
              </h3>
              <p className="text-[15px] text-text leading-relaxed mb-4">
                Основной склад — по адресу{' '}
                <strong>ул. Нукус, 85/1</strong>{' '}
                (Мирзо-Улугбекский район, Ташкент). На складе постоянно
                представлены ходовые позиции по всем категориям. Самовывоз
                возможен по предварительному согласованию (Пн–Пт 09:00–18:00).
              </p>
              <h3 className="text-[18px] font-bold text-text-dark mb-3 mt-6">
                Способы доставки
              </h3>
              <ul className="space-y-2 text-[14px] text-text">
                <li className="flex gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-brand flex-shrink-0 mt-0.5"
                  />
                  <span>
                    <strong>Курьерская доставка по Ташкенту</strong> — в день
                    оплаты или на следующий рабочий день
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-brand flex-shrink-0 mt-0.5"
                  />
                  <span>
                    <strong>Транспортная компания</strong> — отправка в любой
                    регион Узбекистана с подтверждением получения
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-brand flex-shrink-0 mt-0.5"
                  />
                  <span>
                    <strong>Самовывоз со склада</strong> — для срочных
                    заявок и при заказах большого объёма
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-brand flex-shrink-0 mt-0.5"
                  />
                  <span>
                    <strong>Доставка собственным транспортом</strong> —
                    мебель TINMAN и крупногабаритные заказы по Ташкенту и
                    области
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-text-dark mb-3">
                Сроки доставки по регионам
              </h3>
              <div className="bg-surface rounded-xl border border-surface-input overflow-hidden">
                <table className="w-full text-[14px]">
                  <thead className="bg-brand-light">
                    <tr>
                      <th className="text-left p-3 border-b border-surface-input">
                        Регион / город
                      </th>
                      <th className="text-left p-3 border-b border-l border-surface-input">
                        Срок
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryRows.map((row) => (
                      <tr key={row.city}>
                        <td className="p-3 border-b border-surface-input text-text">
                          {row.city}
                        </td>
                        <td className="p-3 border-b border-l border-surface-input text-text font-semibold whitespace-nowrap">
                          {row.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[13px] text-text-muted mt-3 leading-relaxed">
                Сроки указаны при наличии товара на складе в Ташкенте. Для
                под-заказных позиций (нестандартные размеры одежды, мебель
                TINMAN с индивидуальной конфигурацией) сроки производственного
                цикла — 6–12 недель + логистика.
              </p>
            </div>
          </div>
          <div className="bg-brand-light/30 border border-brand-light rounded-xl p-5">
            <h3 className="text-[16px] font-bold text-text-dark mb-3">
              Документы для B2B-заказчиков
            </h3>
            <p className="text-[14px] text-text leading-relaxed">
              ООО «TOPAZ COMPANY» оформляет полный пакет документов на
              русском (по запросу — на узбекском): счёт-фактура с НДС, акт
              выполненных работ / отгрузки, ТТН (товарно-транспортная
              накладная), сертификаты соответствия партнёров (Contec,
              Terragene, TINMAN, Diversey, Shield Scientific), TDS-документы,
              протоколы партий для compliance-пакета фарм-производств.
              Жёсткого минимального заказа по сумме нет.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — GMP 2027 context */}
      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              GMP-2027 контекст для Ташкента
            </h2>
          </div>
          <div className="space-y-5 text-[15px] text-text leading-relaxed max-w-[900px]">
            <p>
              <strong>1 января 2027 г.</strong> — дата обязательной
              GMP-сертификации для всех фарм-предприятий Узбекистана.
              Регулятор — <strong>Агентство по развитию фармацевтической
              отрасли (АРФО)</strong> при Минздраве, штаб-квартира которого
              расположена в Ташкенте. Это означает: ташкентские
              фарм-предприятия фактически находятся в зоне регулярного
              контакта с инспекторами и испытывают повышенное внимание
              регулятора по сравнению с предприятиями в регионах.
            </p>
            <p>
              <strong>Региональная специфика инспекций АРФО в Ташкенте.</strong>{' '}
              По итогам наблюдений за работой регулятора, ташкентские
              инспекции обычно проходят интенсивнее: 4–5 дней на площадке
              против стандартных 3-х, больше внимания к документации на
              государственном языке, плотный график follow-up визитов после
              устранения findings. Это связано с тем, что Ташкент — пилотный
              регион для гармонизации с EU GMP и PIC/S, и АРФО формирует
              практику аудита именно на здешних кейсах.
            </p>
            <p>
              <strong>Резиденты Tashkent Pharma Park</strong> — отдельная
              категория с контрактными обязательствами по EU GMP параллельно
              с льготами по налогам и инфраструктурой. Невыполнение
              сертификации к 1 января 2027 г. — основание для пересмотра
              резидентского статуса со стороны Дирекции Pharma Park.
              Зангиатинский фарм-кластер и Pharma Park — это около 20+
              предприятий, активно готовящихся к сертификации.
            </p>
            <p>
              <strong>Индустриальные зоны Ташкента</strong> (Юнусабад,
              Чиланзар, Сергели, Мирзо-Улугбек) концентрируют независимых
              производителей готовых лекарственных форм. Здесь приоритет —
              модернизация HVAC, развёртывание EM-программы, полное обновление
              SOP-пакета и закупка годового запаса расходников. Запас под
              полный годовой цикл обычно формируется за 3–6 месяцев до
              инспекции АРФО.
            </p>
            <p>
              Подробный гид по обязательной GMP-сертификации Узбекистана 2027:
              нормативная база, перечень субъектов сертификации,
              аудит-чек-листы, поэтапная подготовка — на странице{' '}
              <Link
                href="/compliance/gmp-2027-uzbekistan"
                className="text-brand font-semibold underline"
              >
                /compliance/gmp-2027-uzbekistan
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — Partnerships */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={28} className="text-brand" />
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark">
              Партнёрства и сертификаты
            </h2>
          </div>
          <div className="space-y-5 text-[15px] text-text leading-relaxed max-w-[900px]">
            <p>
              <strong>Clean Room Systems — авторизованный дистрибьютор
              ведущих мировых производителей cleanroom-расходников</strong>{' '}
              в Узбекистане. Прямые партнёрские соглашения с фабриками
              исключают серый импорт, гарантируют доступ к актуальным
              версиям продуктовых линий и обновлённой compliance-документации
              (TDS, COA, ISO-сертификаты).
            </p>
            <ul className="space-y-3 ml-1">
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="text-brand flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Contec Inc.</strong> (США) — салфетки PROSAT,
                  дезинфектанты Sporicidin, расходники для cleanroom-уборки
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="text-brand flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Terragene</strong> (Аргентина) — биологические и
                  химические индикаторы стерилизации Bionova: единственный
                  авторизованный дистрибьютор в Узбекистане
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="text-brand flex-shrink-0 mt-0.5" />
                <span>
                  <strong>TINMAN</strong> (Сербия) — нержавеющая мебель и
                  оборудование cleanroom AISI 304/316: единственный
                  авторизованный дистрибьютор в Узбекистане
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="text-brand flex-shrink-0 mt-0.5" />
                <span>
                  <strong>IBC Nanotex</strong> — расходники, многоразовая
                  одежда и SIZ для cleanroom-производств
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="text-brand flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Shield Scientific</strong> (Нидерланды),{' '}
                  <strong>Diversey</strong> (США/UK),{' '}
                  <strong>Ansell BioClean</strong> — перчатки и дезинфектанты
                </span>
              </li>
            </ul>
            <p>
              <strong>ООО «TOPAZ COMPANY»</strong> — действующее юридическое
              лицо в Республике Узбекистан, зарегистрированное в Ташкенте.
              Опыт работы с локальной регуляторикой АРФО, понимание языка
              узбекистанских inspection-документов, налаженные процессы
              растаможки расходников с полным compliance-пакетом. Сертификаты
              авторизованного партнёрства от Contec, Terragene, TINMAN и
              других брендов — предоставляются по запросу под тендерные
              процедуры и для compliance-аудитов клиентов.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16 px-4 lg:px-[80px]">
        <div className="max-w-[850px] mx-auto text-center">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-white mb-4">
            Запросить КП с доставкой по Ташкенту
          </h2>
          <p className="text-[16px] text-brand-muted mb-8 leading-relaxed">
            Подберём полный пакет расходников и СИЗ под класс зон вашего
            производства — со склада в Ташкенте, с компетентной
            compliance-документацией под inspection-package АРФО.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              <FileText size={16} />
              Запросить КП
            </Link>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              WhatsApp
            </a>
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
              href="/catalog"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                Полный каталог
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                17 категорий, 280+ SKU
              </p>
            </Link>
            <Link
              href="/compliance/gmp-2027-uzbekistan"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                GMP-сертификация Узбекистан 2027
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Требования АРФО, чек-листы, ресурсы
              </p>
            </Link>
            <Link
              href="/compliance/annex1"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                EU GMP Annex 1 — Compliance Matrix
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                17 категорий × 9 §-разделов Annex 1
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
                Нержавеющая мебель AISI 304/316
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
            <Link
              href="/delivery"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                Доставка и оплата
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                Условия B2B-поставок по Узбекистану
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
              href="/contacts"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                Контакты
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                г. Ташкент, ул. Нукус, 85/1
              </p>
            </Link>
            <Link
              href="/company/about"
              className="block p-4 bg-white rounded-xl border border-surface-input hover:border-brand transition-colors"
            >
              <p className="font-bold text-brand-dark text-[14px]">
                О компании
              </p>
              <p className="text-[12px] text-text-muted mt-1">
                CRS / TOPAZ COMPANY — профиль
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
