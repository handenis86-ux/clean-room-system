import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowRight, ArrowLeft, Phone, List } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { articles, getArticleBySlug, getRelatedArticles } from '@/data/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Статья не найдена' };
  }

  return {
    title: `${article.title} | Clean Room System`,
    description: article.excerpt,
    alternates: {
      canonical: `https://clean-room-systems.uz/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      images: [{ url: article.image }],
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Clean Room System',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Clean Room System',
      url: 'https://clean-room-systems.uz',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-800 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <Breadcrumbs
              items={[
                { label: 'Главная', href: '/' },
                { label: 'База знаний', href: '/blog' },
                { label: article.title },
              ]}
            />

            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-medium text-brand-100 bg-brand-700 border border-brand-600 px-2.5 py-1 rounded">
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-5 text-brand-200 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{article.readingTime} мин чтения</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl -mt-2">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Table of Contents - sidebar */}
              <aside className="lg:w-64 flex-shrink-0 lg:order-2">
                <div className="lg:sticky lg:top-28">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <List size={18} className="text-brand-700" />
                      <h3 className="font-semibold text-gray-900 text-sm">
                        Содержание
                      </h3>
                    </div>
                    <nav className="space-y-2">
                      {article.tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-sm text-gray-600 hover:text-brand-700 transition-colors py-1 border-l-2 border-gray-200 hover:border-brand-500 pl-3"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>

              {/* Article body */}
              <div className="flex-1 lg:order-1 min-w-0">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-heading prose-headings:text-gray-900 prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-p:text-gray-700 prose-p:leading-relaxed
                    prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900
                    prose-ul:space-y-2
                    prose-li:text-gray-700
                    prose-table:border prose-table:border-gray-200 prose-table:rounded-lg prose-table:overflow-hidden
                    prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:text-sm prose-th:font-semibold prose-th:text-gray-900 prose-th:border-b prose-th:border-gray-200
                    prose-td:px-4 prose-td:py-3 prose-td:text-sm prose-td:border-b prose-td:border-gray-100
                  "
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Back link */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-brand-700 font-medium hover:text-brand-600 transition-colors"
                  >
                    <ArrowLeft size={18} />
                    Все статьи
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-10 text-center">
              Читайте также
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedArticles.map((related) => (
                <article
                  key={related.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`/blog/${related.slug}`}
                    className="block relative aspect-video"
                  >
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-brand-700 bg-brand-50 border border-brand-200 px-2 py-1 rounded">
                        {related.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar size={12} />
                        {formatDate(related.publishedAt)}
                      </div>
                    </div>
                    <Link href={`/blog/${related.slug}`}>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
                        {related.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {related.excerpt}
                    </p>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-brand-700 font-medium hover:text-brand-600"
                    >
                      Читать
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-800 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Нужна помощь в оснащении чистого помещения?
            </h2>
            <p className="text-brand-100/80 mb-8 text-lg">
              Специалисты Clean Room System подберут оборудование и расходные
              материалы с учетом требований вашего производства и бюджета.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-brand-900 bg-white rounded-lg hover:bg-brand-50 transition-colors"
              >
                <Phone size={18} />
                Получить консультацию
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
              >
                Перейти в каталог
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
