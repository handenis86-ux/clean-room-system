import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Award,
  Wrench,
  Phone,
  ArrowRight,
  CheckCircle2,
  Truck,
  FileText,
  Building2,
  Layers,
} from 'lucide-react';
import { categories } from '@/data/products';
import { siteConfig, phoneTel } from '@/config/site';

export const metadata: Metadata = {
  title:
    'TINMAN — нержавеющая мебель и оборудование cleanroom в Узбекистане',
  description:
    'Поставщик мебели и оборудования TINMAN (Сербия) для чистых помещений в Узбекистане: скамейки, шкафы, столы, тележки, диспенсеры, шлюзы, раковины. AISI 304/316, ISO 4 / GMP A.',
  alternates: {
    canonical: `${siteConfig.url}/brands/tinman`,
  },
  openGraph: {
    title: 'TINMAN cleanroom-мебель в Узбекистане | Clean Room Systems',
    description:
      '14 категорий нержавеющей мебели и оборудования для cleanroom: AISI 304/316, ISO 4 / GMP A. Поставка по Узбекистану через Clean Room Systems.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const TINMAN_SLUGS = [
  'tinman-benches',
  'tinman-cabinets',
  'tinman-tables',
  'cleanroom-dispensers',
  'tinman-carts',
  'tinman-shelves',
  'tinman-drawers',
  'tinman-garment-racks',
  'tinman-pass-through',
  'tinman-sinks',
  'tinman-step-stools',
  'tinman-platforms',
  'tinman-mirrors',
  'tinman-waste-bins',
];

const STATS = [
  { value: 'AISI 304', label: 'Стандартный материал', sub: 'AISI 316 — опция' },
  { value: '2R', label: 'Зеркальная полировка', sub: 'Без следов и царапин' },
  { value: 'ISO 4', label: 'Класс чистоты', sub: 'EU GMP Class A' },
  { value: '14', label: 'Категорий продукции', sub: '38 моделей в каталоге' },
];

const ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: 'Сертификат cleanroom-готовности',
    text: 'Каждое изделие имеет полный пакет: TDS, сертификат AISI, паспорт качества. Подходит под аудит EU GMP, FDA, WHO.',
  },
  {
    icon: Wrench,
    title: 'Закрытые сварные швы',
    text: 'Все стыки сварные, без щелей и зазоров — нет накопления частиц и микроорганизмов. Поверхности легко моются.',
  },
  {
    icon: Award,
    title: 'Регулируемые / закреплённые ножки',
    text: 'Стандартная опция non-slip leveling feet или anchored — без следов скольжения и контаминационно-чистый монтаж.',
  },
  {
    icon: Layers,
    title: 'Модульный дизайн',
    text: 'Длина 800–2000 мм, глубина 350/425 мм, конфигурируемая высота. Подбор под конкретное помещение клиента.',
  },
  {
    icon: Truck,
    title: 'Flat-pack доставка',
    text: 'Сборка на месте по детальной инструкции — экономия на логистике, минимум места при хранении.',
  },
  {
    icon: FileText,
    title: 'GMP-документация',
    text: 'Сертификаты материалов, протоколы партий, инструкции по очистке и санитарии — для валидационного пакета.',
  },
];

const APPLICATIONS = [
  {
    title: 'Gowning rooms (зоны переодевания)',
    items: [
      'Скамейки CRB B с обувницами для переобувания',
      'Стойки для одежды CRG D с разделителями зон',
      'Зеркала CRM для проверки целостности гоунинга',
      'Шкафы CRGC для хранения чистой одежды',
    ],
  },
  {
    title: 'Production zones (зоны B/C/D)',
    items: [
      'Рабочие столы CRT для линии розлива/упаковки',
      'Тележки CRC для перемещения batch-материалов',
      'Стеллажи CRSHM для in-process хранения',
      'Раковины CRSU для мытья рук перед операциями',
    ],
  },
  {
    title: 'Material flow & транспорт',
    items: [
      'Pass-through шлюзы — перенос материалов между зонами без cross-contamination',
      'EVOK LAM Cart — мобильная ламинарная зона для транспортировки стерильных продуктов',
      'Платформы CRST для работ на высоте без выноса частиц',
    ],
  },
  {
    title: 'Документация и QC',
    items: [
      'Шкафы для логбуков и SOP в зоне C/D',
      'Урны CRW BH с педальным открытием для использованных СИЗ',
      'Диспенсеры для перчаток, бахил, шапочек на входе',
    ],
  },
];

export default function TinmanBrandPage() {
  // Список TINMAN-категорий из каталога с сохранением порядка
  const tinmanCategories = TINMAN_SLUGS.map((slug) =>
    categories.find((c) => c.slug === slug)
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const totalProducts = tinmanCategories.reduce(
    (sum, c) => sum + c.products.length,
    0
  );

  // JSON-LD Brand + Organization
  const brandJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    '@id': `${siteConfig.url}/brands/tinman#brand`,
    name: 'TINMAN',
    description:
      'TINMAN — производитель нержавеющей мебели и оборудования для чистых помещений (Сербия). Полный ассортимент cleanroom-мебели для фарм-, биотех- и медицинских производств.',
    url: 'https://tinmanclean.com',
    logo: `${siteConfig.url}/og-image.png`,
    sameAs: ['https://tinmanclean.com'],
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
        name: 'Бренды',
        item: `${siteConfig.url}/brands/tinman`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'TINMAN',
        item: `${siteConfig.url}/brands/tinman`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-dark py-12 md:py-16 px-4 lg:px-[80px]">
        <nav className="flex items-center gap-1.5 text-[13px] text-brand-muted mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-white transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <span className="text-white">TINMAN</span>
        </nav>

        <div className="max-w-[1100px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand text-white rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
            <Building2 size={14} />
            Эксклюзивный поставщик в Узбекистане
          </div>

          <h1 className="text-[32px] md:text-[48px] font-extrabold text-white leading-tight">
            TINMAN — нержавеющая мебель
            <br />
            и оборудование для cleanroom
          </h1>

          <p className="text-[16px] md:text-[18px] text-brand-muted mt-5 leading-relaxed max-w-[750px]">
            Производитель cleanroom-мебели из Сербии. Скамейки, шкафы, столы,
            тележки, диспенсеры, передаточные шлюзы, раковины — всё из{' '}
            <strong className="text-white">AISI 304/316</strong> с зеркальной
            полировкой 2R. Класс чистоты{' '}
            <strong className="text-white">ISO 4 / GMP A</strong>. Поставка по
            Узбекистану через Clean Room Systems.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-7">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              <Phone size={16} />
              Запросить КП на проект
            </Link>
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Смотреть {tinmanCategories.length} категорий
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-light/30 border-y border-surface-input py-10 px-4 lg:px-[80px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1100px] mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[28px] md:text-[36px] font-extrabold text-brand-dark leading-none">
                {s.value}
              </p>
              <p className="text-[14px] font-semibold text-text-dark mt-2">
                {s.label}
              </p>
              <p className="text-[12px] text-text-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why TINMAN */}
      <section className="bg-white py-14 md:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
              + ПОЧЕМУ TINMAN
            </p>
            <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark">
              Что отличает TINMAN от другой нержавейки
            </h2>
            <p className="text-[15px] text-text mt-3 max-w-[700px] mx-auto leading-relaxed">
              Не любая нержавеющая мебель подходит для cleanroom. TINMAN
              проектирует каждую модель с учётом специфики GMP-аудита.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map((a) => (
              <div
                key={a.title}
                className="p-5 bg-surface rounded-xl border border-surface-input"
              >
                <div className="w-11 h-11 bg-brand-light rounded-lg flex items-center justify-center mb-3.5">
                  <a.icon size={20} className="text-brand" />
                </div>
                <h3 className="text-[16px] font-bold text-text-dark mb-2">
                  {a.title}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All categories grid */}
      <section
        id="categories"
        className="bg-surface py-14 md:py-16 px-4 lg:px-[80px]"
      >
        <div className="max-w-[1240px] mx-auto">
          <div className="mb-8">
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
              + АССОРТИМЕНТ
            </p>
            <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-3">
              {tinmanCategories.length} категорий мебели и оборудования
            </h2>
            <p className="text-[15px] text-text leading-relaxed max-w-[750px]">
              Полный цикл оснащения cleanroom: от gowning room до
              производственной зоны. {totalProducts} моделей, готовых к
              поставке.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tinmanCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog/${cat.slug}`}
                className="group bg-white rounded-xl border border-surface-input overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-[180px] w-full bg-gray-50 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[16px] font-bold text-brand-dark mb-1.5 line-clamp-1">
                    {cat.title}
                  </h3>
                  <p className="text-[13px] text-text-muted line-clamp-2 leading-relaxed mb-3">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-brand">
                      {cat.products.length}{' '}
                      {cat.products.length === 1
                        ? 'модель'
                        : cat.products.length < 5
                          ? 'модели'
                          : 'моделей'}
                    </span>
                    <span className="font-semibold text-brand group-hover:translate-x-1 transition-transform">
                      Смотреть →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-white py-14 md:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-10">
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
              + ПРИМЕНЕНИЕ
            </p>
            <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-3">
              Где используется TINMAN
            </h2>
            <p className="text-[15px] text-text leading-relaxed max-w-[750px]">
              Какие модели подбираются под каждую функциональную зону
              фарм-производства.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {APPLICATIONS.map((app) => (
              <div
                key={app.title}
                className="p-6 bg-surface rounded-xl border border-surface-input"
              >
                <h3 className="text-[18px] font-bold text-text-dark mb-4">
                  {app.title}
                </h3>
                <ul className="space-y-2.5">
                  {app.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] text-text leading-relaxed"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-brand shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="bg-brand-light/30 py-14 md:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
              + СООТВЕТСТВИЕ СТАНДАРТАМ
            </p>
            <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-3">
              Готовность к GMP-аудиту
            </h2>
            <p className="text-[15px] text-text leading-relaxed max-w-[750px] mx-auto">
              Мебель TINMAN покрывает требования основных нормативов для
              стерильных и асептических производств.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'EU GMP Annex 1 (2022)', sub: '§5 Premises, §6 Equipment, §11 Disinfection' },
              { label: 'ISO 14644-1', sub: 'Class 4 (по умолчанию) до Class 8' },
              { label: 'ASTM E2042', sub: 'Cleanroom Cleaning Practice' },
              { label: 'ISO 13485', sub: '§6.4 Work Environment' },
            ].map((c) => (
              <div
                key={c.label}
                className="p-4 bg-white rounded-xl border border-surface-input"
              >
                <p className="font-bold text-brand-dark text-[14px] mb-1">
                  {c.label}
                </p>
                <p className="text-[12px] text-text-muted leading-snug">
                  {c.sub}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center mt-6 text-[14px]">
            <Link
              href="/compliance/standards"
              className="text-brand underline hover:text-brand-dark"
            >
              Полная Compliance Matrix всех 8 стандартов →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-14 md:py-18 px-4 lg:px-[80px]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-white mb-4">
            Запустить cleanroom-проект с TINMAN
          </h2>
          <p className="text-[16px] text-brand-muted mb-7 leading-relaxed">
            Подберём комплектацию мебели под ваш проект, учтём класс чистоты
            каждой зоны, подготовим коммерческое предложение со сроками
            поставки. Конфигурация под ваше помещение, не stock-варианты.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              <Phone size={16} />
              Запросить КП
            </Link>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
