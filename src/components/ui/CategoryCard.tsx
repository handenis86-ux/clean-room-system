import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  const imageUrl = category.image || '/images/placeholder-category.jpg';

  return (
    <Link
      href={`/catalog/${category.slug}`}
      className="card group block overflow-hidden"
    >
      <div className="relative aspect-square">
        <Image
          src={imageUrl}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg line-clamp-2">{category.name}</h3>
          {productCount !== undefined && (
            <p className="text-sm text-brand-300/70 mt-1">
              {productCount} товаров
            </p>
          )}
          <div className="flex items-center gap-1 text-sm text-white/90 mt-2 group-hover:text-brand-500 transition-colors">
            Перейти
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
