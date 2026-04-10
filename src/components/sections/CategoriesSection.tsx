import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    title: 'Одежда для чистых помещений',
    image: '/images/categories/clothing.png',
    href: '/catalog/clothing',
  },
  {
    title: 'Перчатки',
    image: '/images/categories/gloves.png',
    href: '/catalog/gloves',
  },
  {
    title: 'Обувь',
    image: '/images/categories/footwear.png',
    href: '/catalog/footwear',
  },
  {
    title: 'Дезинфектанты',
    image: '/images/categories/disinfectants.png',
    href: '/catalog/disinfectants',
  },
  {
    title: 'Салфетки',
    image: '/images/categories/wipes.png',
    href: '/catalog/wipes',
  },
  {
    title: 'Уборочный инвентарь',
    image: '/images/categories/cleaning.png',
    href: '/catalog/cleaning',
  },
  {
    title: 'Очки и маски',
    image: '/images/categories/masks.png',
    href: '/catalog/masks',
  },
  {
    title: 'Упаковочные материалы',
    image: '/images/categories/packaging.png',
    href: '/catalog/packaging',
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Каталог продукции
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Полный ассортимент расходных материалов и оборудования для оснащения
            чистых помещений любого класса.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold text-gray-900 text-sm sm:text-base group-hover:text-brand-600 transition-colors">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/catalog"
            className="inline-block bg-brand-800 text-white font-semibold px-8 py-3 rounded-lg hover:bg-brand-900 transition-colors duration-300"
          >
            Смотреть весь каталог
          </Link>
        </div>
      </div>
    </section>
  );
}
