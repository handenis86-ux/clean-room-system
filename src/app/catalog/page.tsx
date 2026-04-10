import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Каталог продукции | Clean Room System',
  description:
    'Полный каталог расходных материалов и оборудования для чистых помещений. Индикаторы стерилизации, дезинфицирующие средства, защитная одежда, перчатки и аксессуары.',
  alternates: {
    canonical: 'https://clean-room-systems.uz/catalog',
  },
};

const categories = [
  {
    title: 'Индикаторы стерилизации',
    description:
      'Химические и биологические индикаторы для контроля процессов стерилизации.',
    image: '/images/categories/sterilization-kit.png',
    href: '/catalog/sterilization',
    count: '24 товара',
  },
  {
    title: 'Дезинфицирующие средства',
    description:
      'Профессиональные средства для дезинфекции поверхностей и оборудования чистых помещений.',
    image: '/images/categories/disinfectants.png',
    href: '/catalog/disinfectants',
    count: '36 товаров',
  },
  {
    title: 'Одноразовая защитная одежда',
    description:
      'Комбинезоны, халаты, шапочки и бахилы одноразового использования для помещений всех классов.',
    image: '/images/categories/clothing.png',
    href: '/catalog/disposable-clothing',
    count: '42 товара',
  },
  {
    title: 'Многоразовая защитная одежда',
    description:
      'Многоразовые комбинезоны и халаты из специальных тканей для чистых помещений.',
    image: '/images/categories/clothing-alt.png',
    href: '/catalog/reusable-clothing',
    count: '18 товаров',
  },
  {
    title: 'Перчатки',
    description:
      'Нитриловые, латексные и виниловые перчатки. Стерильные и нестерильные варианты.',
    image: '/images/categories/gloves.png',
    href: '/catalog/gloves',
    count: '31 товар',
  },
  {
    title: 'Уборочный инвентарь',
    description:
      'Мопы, швабры, вёдра и комплексные системы для уборки чистых помещений.',
    image: '/images/categories/cleaning.png',
    href: '/catalog/cleaning',
    count: '27 товаров',
  },
  {
    title: 'Защитные очки',
    description:
      'Защитные очки и лицевые щитки для работы в чистых помещениях.',
    image: '/images/categories/masks.png',
    href: '/catalog/goggles',
    count: '12 товаров',
  },
  {
    title: 'Аксессуары',
    description:
      'Дополнительные аксессуары и принадлежности для оснащения чистых помещений.',
    image: '/images/categories/packaging.png',
    href: '/catalog/accessories',
    count: '19 товаров',
  },
];

export default function CatalogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-light py-12 px-[80px]">
        <nav className="flex items-center gap-1.5 text-[13px] text-text mb-4">
          <Link href="/" className="hover:text-brand transition-colors">
            Главная
          </Link>
          <span>/</span>
          <span>Каталог</span>
        </nav>
        <h1 className="text-[42px] font-bold text-brand-dark leading-tight">
          Каталог продукции
        </h1>
        <p className="text-[16px] text-brand max-w-[600px] mt-3">
          Расходные материалы и оборудование для чистых помещений от ведущих
          мировых производителей. Всё необходимое для соответствия стандартам GMP
          и ISO.
        </p>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group rounded-xl bg-white border border-surface-stroke shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-2.5">
                <h3 className="text-[18px] font-bold text-brand-dark">
                  {category.title}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-brand">
                    {category.count}
                  </span>
                  <span className="text-[13px] font-semibold text-brand group-hover:translate-x-1 transition-transform">
                    Смотреть &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-[32px] font-bold text-white mb-4">
            Не нашли нужный товар?
          </h2>
          <p className="text-[16px] text-brand-light mb-8">
            Мы работаем с широким каталогом поставщиков и можем найти любую
            продукцию для чистых помещений. Оставьте заявку, и мы подберём
            решение.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              Запросить консультацию
            </Link>
            <a
              href="tel:+998998211222"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              +998 99 821-12-22
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
