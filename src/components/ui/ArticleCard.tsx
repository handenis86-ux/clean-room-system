import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { Article } from '@/types';
import { formatDate, truncate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'horizontal' | 'featured';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const imageUrl = article.image || '/images/placeholder-article.jpg';

  if (variant === 'horizontal') {
    return (
      <article className="card flex flex-col sm:flex-row overflow-hidden group">
        <Link href={`/news/${article.slug}`} className="relative w-full sm:w-48 aspect-video sm:aspect-square flex-shrink-0">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 192px"
          />
        </Link>
        <div className="p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <Calendar size={14} />
              <time dateTime={article.publishedAt?.toISOString()}>
                {formatDate(article.publishedAt || article.createdAt)}
              </time>
            </div>
            <Link href={`/news/${article.slug}`}>
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
            {article.excerpt && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {truncate(article.excerpt, 120)}
              </p>
            )}
          </div>
          <Link
            href={`/news/${article.slug}`}
            className="inline-flex items-center gap-1 text-sm text-brand-700 hover:text-brand-600 mt-3 font-medium"
          >
            Читать далее
            <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article className="card overflow-hidden group relative">
        <Link href={`/news/${article.slug}`} className="block relative aspect-[16/9]">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
              <Calendar size={14} />
              <time dateTime={article.publishedAt?.toISOString()}>
                {formatDate(article.publishedAt || article.createdAt)}
              </time>
            </div>
            <h3 className="font-bold text-xl md:text-2xl line-clamp-2">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="text-sm text-white/80 mt-2 line-clamp-2">
                {truncate(article.excerpt, 150)}
              </p>
            )}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="card overflow-hidden group">
      <Link href={`/news/${article.slug}`} className="block relative aspect-video">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <Calendar size={14} />
          <time dateTime={article.publishedAt?.toISOString()}>
            {formatDate(article.publishedAt || article.createdAt)}
          </time>
        </div>
        <Link href={`/news/${article.slug}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        {article.excerpt && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {truncate(article.excerpt, 150)}
          </p>
        )}
        <Link
          href={`/news/${article.slug}`}
          className="inline-flex items-center gap-1 text-sm text-brand-700 hover:text-brand-600 mt-4 font-medium"
        >
          Читать далее
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
