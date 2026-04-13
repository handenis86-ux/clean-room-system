import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, Mail, Package, FileText, ChevronRight } from 'lucide-react';
import {
  categories,
  getProductBySlug,
  productSlug,
} from '@/data/products';
import { getProductImage } from '@/data/product-images';

interface Props {
  params: { category: string; product: string };
}

export function generateStaticParams() {
  const params: { category: string; product: string }[] = [];
  for (const cat of categories) {
    for (const p of cat.products) {
      params.push({ category: cat.slug, product: productSlug(p.sku) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = getProductBySlug(params.category, params.product);
  if (!result) return { title: 'Товар не найден' };
  return {
    title: `${result.product.name} — ${result.category.title}`,
    description: result.product.description || result.category.description,
  };
}

export default function ProductPage({ params }: Props) {
  const result = getProductBySlug(params.category, params.product);

  if (!result) {
    notFound();
  }

  const { category, product } = result;
  const productImage = getProductImage(product.sku);

  // Other products in the same category (exclude current)
  const otherProducts = category.products
    .filter((p) => p.sku !== product.sku)
    .slice(0, 5);

  return (
    <>
      {/* Breadcrumbs */}
      <section className="bg-brand-light py-4 px-4 lg:px-[80px]">
        <nav className="flex items-center gap-1.5 text-[13px] text-text flex-wrap">
          <Link href="/" className="hover:text-brand transition-colors">
            Главная
          </Link>
          <ChevronRight size={12} className="text-text-muted" />
          <Link href="/catalog" className="hover:text-brand transition-colors">
            Каталог
          </Link>
          <ChevronRight size={12} className="text-text-muted" />
          <Link
            href={`/catalog/${category.slug}`}
            className="hover:text-brand transition-colors"
          >
            {category.title}
          </Link>
          <ChevronRight size={12} className="text-text-muted" />
          <span className="text-text-muted">{product.name}</span>
        </nav>
      </section>

      {/* Main content */}
      <section className="py-10 px-4 lg:px-[80px]">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT — Image */}
          <div className="lg:w-[45%] shrink-0">
            <div className="relative aspect-square w-full bg-white rounded-xl border border-surface-stroke overflow-hidden flex items-center justify-center">
              {productImage ? (
                <Image
                  src={productImage}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  unoptimized
                />
              ) : (
                <>
                  <Image
                    src={category.image}
                    alt={product.name}
                    fill
                    className="object-cover opacity-20"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="relative z-10 w-20 h-20 rounded-full bg-brand-light flex items-center justify-center">
                    <Package size={36} className="text-brand" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="lg:w-[55%] flex flex-col gap-5">
            {/* Product name */}
            <h1 className="text-[28px] font-bold text-brand-dark leading-tight">
              {product.name}
            </h1>

            {/* SKU + Status */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[13px] text-text-muted">
                Арт: {product.sku}
              </span>
              <span className="bg-brand-light text-brand rounded-full px-3 py-1 text-[13px] font-medium">
                Под заказ
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-[15px] text-text leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Specs table */}
            {product.specs && product.specs.length > 0 && (
              <div className="mt-2">
                <div className="bg-brand-dark text-white text-[14px] font-semibold px-4 py-2.5 rounded-t-lg">
                  Характеристики
                </div>
                <div className="border border-t-0 border-surface-stroke rounded-b-lg overflow-hidden">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className={`flex text-[14px] border-b border-[#EEEEEE] last:border-b-0 ${
                        i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                      }`}
                    >
                      <span className="w-[40%] px-4 py-2.5 text-text-muted font-medium">
                        {spec.label}
                      </span>
                      <span className="w-[60%] px-4 py-2.5 text-text-dark">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {product.datasheets && product.datasheets.length > 0 && (
              <div className="mt-2">
                <h3 className="text-[16px] font-bold text-text-dark mb-3">
                  Документы
                </h3>
                <div className="flex flex-col gap-2">
                  {product.datasheets.map((doc, i) => (
                    <a
                      key={i}
                      href={doc.url}
                      download
                      className="flex items-center gap-3 px-4 py-3 bg-surface rounded-lg border border-surface-stroke hover:border-brand transition-colors group"
                    >
                      <FileText
                        size={20}
                        className="text-brand shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[14px] font-medium text-text-dark group-hover:text-brand transition-colors">
                          {doc.name}
                        </span>
                        {doc.size && (
                          <span className="text-[12px] text-text-muted ml-2">
                            {doc.size}
                          </span>
                        )}
                      </div>
                      <span className="text-[13px] text-brand font-medium shrink-0">
                        Скачать
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Standards */}
            {product.standards && product.standards.length > 0 && (
              <div className="mt-2">
                <h3 className="text-[16px] font-bold text-text-dark mb-3">
                  Стандарты
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.standards.map((std, i) => (
                    <span
                      key={i}
                      className="bg-brand-light text-brand text-[13px] font-medium px-3 py-1.5 rounded-full"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/contacts"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-dark transition-colors"
              >
                Запросить цену
              </Link>
              <div className="flex items-center justify-center gap-6 text-[14px]">
                <a
                  href="tel:+998998211222"
                  className="flex items-center gap-1.5 text-brand hover:text-brand-dark transition-colors"
                >
                  <Phone size={14} />
                  +998 99 821-12-22
                </a>
                <a
                  href="mailto:info@crs.uz"
                  className="flex items-center gap-1.5 text-brand hover:text-brand-dark transition-colors"
                >
                  <Mail size={14} />
                  info@crs.uz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other products in category */}
      {otherProducts.length > 0 && (
        <section className="bg-surface py-12 px-4 lg:px-[80px]">
          <h2 className="text-[22px] font-bold text-text-dark mb-6">
            Другие товары в категории
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
            {otherProducts.map((p) => {
              const pImage = getProductImage(p.sku);
              return (
                <Link
                  key={p.sku}
                  href={`/catalog/${category.slug}/${productSlug(p.sku)}`}
                  className="group shrink-0 w-[220px] rounded-xl bg-white border border-surface-stroke shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-white flex items-center justify-center p-4">
                    {pImage ? (
                      <Image
                        src={pImage}
                        alt={p.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        sizes="220px"
                        unoptimized
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                        <Package size={22} className="text-brand" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-1.5 flex-1">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider">
                      Арт: {p.sku}
                    </p>
                    <h3 className="text-[14px] font-bold text-brand-dark leading-snug line-clamp-2">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
