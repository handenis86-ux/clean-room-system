import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    title: 'Одежда для чистых помещений',
    description: 'Комбинезоны, халаты и головные уборы для работы в чистых зонах',
    image: '/images/categories/clothing.png',
    href: '/catalog/clothing',
    count: 24,
  },
  {
    title: 'Перчатки',
    description: 'Стерильные и нестерильные перчатки для чистых помещений',
    image: '/images/categories/gloves.png',
    href: '/catalog/gloves',
    count: 18,
  },
  {
    title: 'Обувь',
    description: 'Специализированная обувь и бахилы для чистых помещений',
    image: '/images/categories/footwear.png',
    href: '/catalog/footwear',
    count: 12,
  },
  {
    title: 'Дезинфектанты',
    description: 'Дезинфицирующие средства для поверхностей и оборудования',
    image: '/images/categories/disinfectants.png',
    href: '/catalog/disinfectants',
    count: 16,
  },
  {
    title: 'Салфетки',
    description: 'Безворсовые салфетки для протирки поверхностей и оборудования',
    image: '/images/categories/wipes.png',
    href: '/catalog/wipes',
    count: 20,
  },
  {
    title: 'Уборочный инвентарь',
    description: 'Мопы, ведра и системы уборки для чистых помещений',
    image: '/images/categories/cleaning.png',
    href: '/catalog/cleaning',
    count: 14,
  },
  {
    title: 'Очки и маски',
    description: 'Защитные очки, маски и средства защиты органов дыхания',
    image: '/images/categories/masks.png',
    href: '/catalog/masks',
    count: 10,
  },
  {
    title: 'Упаковочные материалы',
    description: 'Пакеты, плёнки и контейнеры для чистых помещений',
    image: '/images/categories/packaging.png',
    href: '/catalog/packaging',
    count: 8,
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="text-center mb-14">
          <h2 className="text-[36px] font-extrabold text-text-dark mb-4">
            Каталог продукции
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group bg-white rounded-xl overflow-hidden border border-surface-stroke shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
            >
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-5 flex flex-col gap-2.5">
                <h3 className="text-[18px] font-bold text-brand-dark">
                  {cat.title}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[13px] font-medium text-brand">
                    {cat.count} товаров
                  </span>
                  <span className="text-[13px] font-semibold text-brand">
                    Смотреть →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
