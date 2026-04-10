import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Mail, BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
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
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-800 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: 'Главная', href: '/' },
                { label: 'База знаний' },
              ]}
            />
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-brand-200" />
              <p className="text-sm font-semibold text-brand-200 uppercase tracking-wider">
                Блог
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
              База знаний Clean Room System
            </h1>
            <p className="text-lg text-brand-100/80 max-w-2xl">
              Делимся экспертными знаниями о чистых помещениях: стандарты,
              оборудование, технологии проектирования и обслуживания.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  cat === 'Все статьи'
                    ? 'bg-brand-800 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-500/30 hover:text-brand-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured article */}
          <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-12 shadow-sm">
            <div className="grid md:grid-cols-2">
              <Link
                href={`/blog/${articles[0].slug}`}
                className="relative aspect-[16/10] md:aspect-auto"
              >
                <Image
                  src={articles[0].image}
                  alt={articles[0].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </Link>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded">
                    {articles[0].category}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar size={14} />
                    {formatDate(articles[0].publishedAt)}
                  </div>
                </div>
                <Link href={`/blog/${articles[0].slug}`}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-brand-700 transition-colors">
                    {articles[0].title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {articles[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/blog/${articles[0].slug}`}
                    className="inline-flex items-center gap-2 text-brand-700 font-medium hover:text-brand-600"
                  >
                    Читать полностью
                    <ArrowRight size={18} />
                  </Link>
                  <span className="text-sm text-gray-400">
                    {articles[0].readingTime} мин чтения
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* Articles grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="block relative aspect-video"
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
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-brand-700 bg-brand-50 border border-brand-200 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>
                  <Link href={`/blog/${article.slug}`}>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-brand-700 font-medium hover:text-brand-600"
                    >
                      Читать
                      <ArrowRight size={14} />
                    </Link>
                    <span className="text-xs text-gray-400">
                      {article.readingTime} мин
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <nav className="flex items-center justify-center gap-2 mt-14">
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 cursor-not-allowed">
              &larr;
            </button>
            <button className="w-10 h-10 rounded-lg bg-brand-800 text-white font-medium">
              1
            </button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 text-gray-600 hover:border-brand-500 hover:text-brand-700 transition-colors">
              2
            </button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-500 hover:text-brand-700 transition-colors">
              &rarr;
            </button>
          </nav>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-6">
              <Mail size={24} className="text-brand-700" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
              Подпишитесь на рассылку
            </h2>
            <p className="text-gray-600 mb-8">
              Получайте полезные статьи о чистых помещениях, обзоры оборудования
              и новости отрасли прямо на вашу почту. Не чаще двух раз в месяц.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:border-brand-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-white bg-brand-800 rounded-lg hover:bg-brand-700 transition-colors whitespace-nowrap"
              >
                Подписаться
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <Link
                href="/privacy"
                className="underline hover:text-gray-600"
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
