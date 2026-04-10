import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Filter, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface Props {
  params: { category: string };
}

const categoriesData: Record<string, {
  name: string;
  description: string;
  image: string;
  subcategories: { name: string; slug: string; count: number }[];
  products: { id: string; name: string; sku: string; image: string; inStock: boolean }[];
}> = {
  clothing: {
    name: 'Одежда для чистых помещений',
    description: 'Профессиональная спецодежда для работы в контролируемых средах. Многоразовые и одноразовые варианты для помещений всех классов чистоты.',
    image: '/images/categories/clothing.png',
    subcategories: [
      { name: 'Комбинезоны', slug: 'coveralls', count: 45 },
      { name: 'Халаты', slug: 'labcoats', count: 32 },
      { name: 'Головные уборы', slug: 'headwear', count: 16 },
    ],
    products: [
      { id: '1', name: 'Комбинезон Tyvek с капюшоном', sku: 'TVK-001', image: '/images/categories/coverall.png', inStock: true },
      { id: '2', name: 'Комбинезон многоразовый белый', sku: 'CVR-002', image: '/images/categories/coverall-front.png', inStock: true },
      { id: '3', name: 'Халат лабораторный', sku: 'CLT-003', image: '/images/categories/labcoat.png', inStock: true },
      { id: '4', name: 'Комбинезон с капюшоном синий', sku: 'CVR-004', image: '/images/categories/clothing.png', inStock: false },
    ],
  },
  gloves: {
    name: 'Перчатки',
    description: 'Широкий ассортимент перчаток для чистых помещений: нитриловые, латексные, виниловые.',
    image: '/images/categories/gloves.png',
    subcategories: [
      { name: 'Нитриловые', slug: 'nitrile', count: 34 },
      { name: 'Латексные', slug: 'latex', count: 23 },
      { name: 'Стерильные', slug: 'sterile', count: 14 },
    ],
    products: [
      { id: '1', name: 'Перчатки нитриловые синие', sku: 'GLV-001', image: '/images/categories/gloves.png', inStock: true },
      { id: '2', name: 'Перчатки нитриловые стерильные', sku: 'GLV-002', image: '/images/categories/glove-single.png', inStock: true },
    ],
  },
  footwear: {
    name: 'Обувь',
    description: 'Специализированная обувь и бахилы для чистых помещений.',
    image: '/images/categories/footwear.png',
    subcategories: [
      { name: 'Ботинки', slug: 'shoes', count: 18 },
      { name: 'Бахилы', slug: 'shoe-covers', count: 22 },
    ],
    products: [
      { id: '1', name: 'Ботинки для чистых помещений', sku: 'FTW-001', image: '/images/categories/footwear.png', inStock: true },
      { id: '2', name: 'Бахилы высокие', sku: 'FTW-002', image: '/images/categories/bootcovers.png', inStock: true },
    ],
  },
  masks: {
    name: 'Очки и маски',
    description: 'Средства защиты органов дыхания и зрения для работы в чистых помещениях.',
    image: '/images/categories/masks.png',
    subcategories: [
      { name: 'Маски', slug: 'masks', count: 25 },
      { name: 'Очки защитные', slug: 'goggles', count: 14 },
    ],
    products: [
      { id: '1', name: 'Очки защитные для чистых помещений', sku: 'MSK-001', image: '/images/categories/masks.png', inStock: true },
      { id: '2', name: 'Маска стерильная на завязках', sku: 'MSK-002', image: '/images/categories/mask-sterile.png', inStock: true },
      { id: '3', name: 'Очки лабораторные с резинкой', sku: 'MSK-003', image: '/images/categories/goggles.png', inStock: true },
      { id: '4', name: 'Маска трёхслойная медицинская', sku: 'MSK-004', image: '/images/categories/facemask.png', inStock: true },
    ],
  },
  disinfectants: {
    name: 'Дезинфектанты',
    description: 'Профессиональные дезинфицирующие средства для обработки поверхностей и оборудования.',
    image: '/images/categories/disinfectants.png',
    subcategories: [
      { name: 'Спиртовые растворы', slug: 'alcohol', count: 32 },
      { name: 'Биоциды', slug: 'biocides', count: 18 },
    ],
    products: [
      { id: '1', name: 'Набор дезинфектантов для чистых помещений', sku: 'DSF-001', image: '/images/categories/disinfectants.png', inStock: true },
    ],
  },
  wipes: {
    name: 'Салфетки',
    description: 'Безворсовые и пропитанные салфетки для протирки поверхностей и оборудования.',
    image: '/images/categories/wipes.png',
    subcategories: [
      { name: 'Сухие салфетки', slug: 'dry', count: 42 },
      { name: 'Пропитанные', slug: 'pre-saturated', count: 38 },
    ],
    products: [
      { id: '1', name: 'Салфетки и расходные материалы', sku: 'WPS-001', image: '/images/categories/wipes.png', inStock: true },
    ],
  },
  cleaning: {
    name: 'Уборочный инвентарь',
    description: 'Профессиональное оборудование для уборки чистых помещений.',
    image: '/images/categories/cleaning.png',
    subcategories: [
      { name: 'Мопы и швабры', slug: 'mops', count: 35 },
      { name: 'Ведра и тележки', slug: 'buckets', count: 28 },
    ],
    products: [
      { id: '1', name: 'Комплект для мытья полов', sku: 'CLN-001', image: '/images/categories/cleaning.png', inStock: true },
      { id: '2', name: 'Тележка для уборки', sku: 'CLN-002', image: '/images/categories/mop-cart.png', inStock: true },
    ],
  },
  packaging: {
    name: 'Упаковочные материалы',
    description: 'Упаковочные материалы для чистых помещений: пакеты, контейнеры, стерильная упаковка.',
    image: '/images/categories/packaging.png',
    subcategories: [
      { name: 'Пакеты', slug: 'bags', count: 22 },
      { name: 'Контейнеры', slug: 'containers', count: 18 },
    ],
    products: [
      { id: '1', name: 'Оборудование и принадлежности', sku: 'PKG-001', image: '/images/categories/packaging.png', inStock: true },
      { id: '2', name: 'Стол для чистых помещений', sku: 'PKG-002', image: '/images/categories/work-table.png', inStock: true },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(categoriesData).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoriesData[params.category];
  if (!category) return { title: 'Категория не найдена' };
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: Props) {
  const category = categoriesData[params.category];

  if (!category) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-800 pt-8 pb-12 md:pt-10 md:pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Каталог', href: '/catalog' }, { label: category.name }]} />
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mt-4 mb-3">
            {category.name}
          </h1>
          <p className="text-brand-200 max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 lg:sticky lg:top-24">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter size={18} />
                  Подкатегории
                </h3>
                <ul className="space-y-1">
                  {category.subcategories.map((sub) => (
                    <li key={sub.slug}>
                      <button className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-brand-700 text-sm">
                        <span>{sub.name}</span>
                        <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                          {sub.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <hr className="my-4 border-gray-200" />

                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-600" />
                  Только в наличии
                </label>
              </div>
            </aside>

            {/* Products grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                  Найдено <span className="font-semibold text-gray-900">{category.products.length}</span> товаров
                </p>
                <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700">
                  <option>По популярности</option>
                  <option>По названию</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {category.products.map((product) => (
                  <article key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-xl">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      {!product.inStock && (
                        <span className="absolute top-3 left-3 text-xs font-medium bg-gray-800/70 text-white px-2.5 py-1 rounded-full">
                          Под заказ
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 mb-1">Арт: {product.sku}</p>
                      <h3 className="font-medium text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2 mb-3">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        {product.inStock ? (
                          <span className="text-xs font-medium text-green-600">В наличии</span>
                        ) : (
                          <span className="text-xs text-gray-400">Под заказ</span>
                        )}
                        <Link
                          href="/contacts"
                          className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-600 transition-colors"
                        >
                          Запросить КП
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
