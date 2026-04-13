import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

export default function CategoriesSection() {
  // Show the 8 most populated categories on the homepage
  const featured = [...categories]
    .sort((a, b) => b.products.length - a.products.length)
    .slice(0, 8);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="text-center mb-14">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark mb-4">
            Каталог продукции
          </h2>
          <p className="text-[16px] text-text max-w-2xl mx-auto">
            Полный ассортимент расходных материалов и одежды для оснащения
            чистых помещений любого класса.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog/${cat.slug}`}
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
                <h3 className="text-[18px] font-bold text-brand-dark line-clamp-2 min-h-[52px]">
                  {cat.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[13px] font-medium text-brand">
                    {cat.products.length}{' '}
                    {pluralize(cat.products.length, ['товар', 'товара', 'товаров'])}
                  </span>
                  <span className="text-[13px] font-semibold text-brand">
                    Смотреть →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white bg-brand-dark rounded-lg hover:bg-brand transition-colors"
          >
            Смотреть весь каталог
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
