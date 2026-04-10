import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0]?.url || '/images/placeholder-product.jpg';

  return (
    <article className="product-card card group">
      <Link href={`/catalog/${product.category?.slug}/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="product-card-image object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isFeatured && (
              <span className="badge-accent">Хит</span>
            )}
            {product.oldPrice && product.price && (
              <span className="badge bg-red-500 text-white">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
            {!product.inStock && (
              <span className="badge bg-gray-200 text-gray-600">Нет в наличии</span>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900 hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-colors"
              aria-label="Добавить в корзину"
            >
              <ShoppingCart size={20} />
            </button>
            <Link
              href={`/catalog/${product.category?.slug}/${product.slug}`}
              className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900 hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-colors"
              aria-label="Посмотреть товар"
            >
              <Eye size={20} />
            </Link>
          </div>
        </div>
      </Link>

      <div className="p-4">
        {product.category && (
          <Link
            href={`/catalog/${product.category.slug}`}
            className="text-xs text-gray-600 hover:text-brand-700 transition-colors"
          >
            {product.category.name}
          </Link>
        )}

        <Link href={`/catalog/${product.category?.slug}/${product.slug}`}>
          <h3 className="font-medium text-gray-900 mt-1 line-clamp-2 group-hover:text-brand-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.sku && (
          <p className="text-xs text-gray-400 mt-1">Артикул: {product.sku}</p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through mr-2">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className={`font-bold ${product.price ? 'text-brand-700' : 'text-gray-600'}`}>
              {formatPrice(product.price)}
            </span>
          </div>

          {product.inStock && (
            <span className="text-xs text-accent-500">В наличии</span>
          )}
        </div>
      </div>
    </article>
  );
}
