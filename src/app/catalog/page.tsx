import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Каталог продукции | Clean Room System',
  description:
    'Полный каталог расходных материалов и оборудования для чистых помещений. Одежда, перчатки, обувь, дезинфектанты, салфетки и другая продукция.',
  alternates: {
    canonical: 'https://clean-room-systems.uz/catalog',
  },
};

const categories = [
  {
    title: 'Одежда для чистых помещений',
    description:
      'Комбинезоны, халаты, шапочки и бахилы для помещений всех классов чистоты.',
    image: '/images/categories/clothing.png',
    href: '/catalog/clothing',
  },
  {
    title: 'Перчатки',
    description:
      'Нитриловые, латексные и виниловые перчатки. Стерильные и нестерильные варианты.',
    image: '/images/categories/gloves.png',
    href: '/catalog/gloves',
  },
  {
    title: 'Обувь',
    description:
      'Сабо, ботинки и бахилы для чистых помещений. Антистатические модели.',
    image: '/images/categories/footwear.png',
    href: '/catalog/footwear',
  },
  {
    title: 'Очки и маски',
    description:
      'Медицинские маски, респираторы, защитные очки и лицевые щитки.',
    image: '/images/categories/masks.png',
    href: '/catalog/masks',
  },
  {
    title: 'Дезинфектанты',
    description:
      'Профессиональные средства для дезинфекции поверхностей и оборудования.',
    image: '/images/categories/disinfectants.png',
    href: '/catalog/disinfectants',
  },
  {
    title: 'Салфетки',
    description:
      'Безворсовые и пропитанные салфетки для протирки в чистых помещениях.',
    image: '/images/categories/wipes.png',
    href: '/catalog/wipes',
  },
  {
    title: 'Уборочный инвентарь',
    description: 'Мопы, швабры, вёдра и комплексные системы для уборки.',
    image: '/images/categories/cleaning.png',
    href: '/catalog/cleaning',
  },
  {
    title: 'Упаковочные материалы',
    description:
      'Пакеты, контейнеры и стерильная упаковка для чистых помещений.',
    image: '/images/categories/packaging.png',
    href: '/catalog/packaging',
  },
];

export default function CatalogPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-brand-800 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumbs
            items={[{ label: 'Главная', href: '/' }, { label: 'Каталог' }]}
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mt-6 mb-5">
            Каталог продукции
          </h1>
          <p className="text-lg text-brand-200 max-w-2xl">
            Расходные материалы и оборудование для чистых помещений от ведущих
            мировых производителей. Всё необходимое для соответствия стандартам
            GMP и ISO.
          </p>
        </div>
      </section>

      {/* Category cards grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-heading font-bold text-gray-900 text-lg mb-2 group-hover:text-brand-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-3 transition-all duration-300">
                    Подробнее
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
