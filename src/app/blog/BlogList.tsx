'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ALL_CATEGORIES_LABEL, BlogArticle } from '@/data/articles';

interface BlogListProps {
  articles: BlogArticle[];
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogList({ articles }: BlogListProps) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.category)));
    unique.sort((a, b) => a.localeCompare(b, 'ru'));
    return [ALL_CATEGORIES_LABEL, ...unique];
  }, [articles]);

  const [activeCategory, setActiveCategory] =
    useState<string>(ALL_CATEGORIES_LABEL);

  const filtered = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES_LABEL) return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [articles, activeCategory]);

  const featured = filtered[0];
  const gridArticles = filtered.slice(1);

  return (
    <>
      {/* Category tabs */}
      <div className="bg-white border-b border-surface-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-6 py-3 overflow-x-auto">
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm py-2 border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-brand-dark font-semibold border-brand-dark'
                      : 'text-text font-normal border-transparent hover:text-brand-dark'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured article */}
      {featured ? (
        <section className="bg-white pt-10 pb-4">
          <div className="container mx-auto px-4 lg:px-8">
            <article className="rounded-xl bg-white border border-surface-stroke shadow overflow-hidden">
              <div className="grid md:grid-cols-2">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="relative aspect-[16/9] md:aspect-auto"
                >
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </Link>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <span className="inline-block self-start text-[11px] font-semibold text-white bg-brand-dark px-2.5 py-1 rounded-full mb-3">
                    {featured.category}
                  </span>
                  <Link href={`/blog/${featured.slug}`}>
                    <h2 className="text-xl font-bold text-text-dark mb-3 hover:text-brand transition-colors leading-snug">
                      {featured.title}
                    </h2>
                  </Link>
                  <p className="text-[13px] text-text line-clamp-3 mb-4">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span className="w-1 h-1 rounded-full bg-text-muted" />
                    <span>{featured.readingTime} мин чтения</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      ) : (
        <section className="bg-white pt-10 pb-4">
          <div className="container mx-auto px-4 lg:px-8 text-center text-text-muted py-12">
            В этой категории пока нет статей.
          </div>
        </section>
      )}

      {/* Articles grid */}
      {gridArticles.length > 0 && (
        <section className="bg-white py-8 pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-xl bg-white border border-surface-stroke shadow hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <Link
                    href={`/blog/${article.slug}`}
                    className="block relative aspect-[3/2]"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>
                  <div className="p-5">
                    <span className="inline-block text-[11px] font-semibold text-white bg-brand-dark px-2.5 py-1 rounded-full mb-3">
                      {article.category}
                    </span>
                    <Link href={`/blog/${article.slug}`}>
                      <h3 className="text-base font-bold text-text-dark mb-2 line-clamp-2 group-hover:text-brand transition-colors leading-snug">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-[13px] text-text line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span>{formatDate(article.publishedAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-text-muted" />
                      <span>{article.readingTime} мин чтения</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
