import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Mail } from 'lucide-react';
import { articles, blogCategories } from '@/data/articles';

export const metadata: Metadata = {
  title: 'База знаний | Clean Room System',
  description:
    'Экспертные статьи о чистых помещениях: классификация по ISO 14644, стандарты GMP, оборудование, технологии мониторинга и обслуживания.',
  alternates: {
    canonical: 'https://clean-room-systems.uz/blog',
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const featured = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark w-full py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              База знаний Clean Room System
            </h1>
            <p className="text-base text-white/80 mb-8">
              Делимся экспертными знаниями о чистых помещениях: стандарты,
              оборудование, технологии проектирования и обслуживания.
            </p>
            <div className="relative max-w-[480px] mx-auto">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Поиск по статьям..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-full text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <div className="bg-white border-b border-surface-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-6 py-3">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                className={`text-sm py-2 border-b-2 transition-colors ${
                  cat === 'Все статьи'
                    ? 'text-brand-dark font-semibold border-brand-dark'
                    : 'text-text font-normal border-transparent hover:text-brand-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured article */}
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

      {/* Articles grid */}
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

          {/* Pagination */}
          <nav className="flex items-center justify-center gap-2 mt-12">
            <button className="w-10 h-10 rounded-lg border border-surface-stroke flex items-center justify-center text-text-muted cursor-not-allowed">
              &larr;
            </button>
            <button className="w-10 h-10 rounded-lg bg-brand text-white font-medium text-sm">
              1
            </button>
            <button className="w-10 h-10 rounded-lg border border-surface-stroke text-text hover:border-brand hover:text-brand transition-colors text-sm">
              2
            </button>
            <button className="w-10 h-10 rounded-lg border border-surface-stroke flex items-center justify-center text-text hover:border-brand hover:text-brand transition-colors">
              &rarr;
            </button>
          </nav>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand-light py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-text-dark mb-3">
              Подпишитесь на рассылку
            </h2>
            <p className="text-sm text-text mb-6">
              Получайте полезные статьи о чистых помещениях, обзоры оборудования
              и новости отрасли прямо на вашу почту. Не чаще двух раз в месяц.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-surface-stroke rounded-lg text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors whitespace-nowrap"
              >
                Подписаться
              </button>
            </form>
            <p className="text-xs text-text-muted mt-4">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <Link
                href="/privacy"
                className="underline hover:text-text"
              >
                политикой конфиденциальности
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
