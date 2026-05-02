import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowRight, ArrowLeft, Phone, List } from 'lucide-react';
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
      canonical: `https://cleanroom.uz/blog/${article.slug}`,
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
      url: 'https://cleanroom.uz',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs + Header */}
      <section className="bg-white pt-28 pb-0">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-[800px]">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-[13px] text-text mb-6">
              <Link href="/" className="hover:text-brand transition-colors">
                Главная
              </Link>
              <span className="text-text-muted">/</span>
              <Link href="/blog" className="hover:text-brand transition-colors">
                Блог
              </Link>
              <span className="text-text-muted">/</span>
              <span className="text-text-muted">{article.category}</span>
            </nav>

            {/* Category tag */}
            <span className="inline-block text-[11px] font-semibold text-white bg-brand-dark px-2.5 py-1 rounded-full mb-4">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-[28px] md:text-[34px] lg:text-[36px] font-extrabold text-text-dark leading-tight mb-4">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-[13px] text-text-muted mb-8">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{article.readingTime} мин чтения</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="max-w-[800px]">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="bg-white py-10 md:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 max-w-[1100px]">
            {/* Article body */}
            <div className="flex-1 min-w-0 max-w-[800px]">
              <div
                className="
                  [&_h2]:text-[22px] [&_h2]:md:text-[24px] [&_h2]:font-bold [&_h2]:text-text-dark [&_h2]:mt-10 [&_h2]:mb-4
                  [&_p]:text-base [&_p]:text-[#333] [&_p]:leading-[1.7] [&_p]:mb-4
                  [&_a]:text-brand [&_a]:underline [&_a]:hover:text-brand-dark
                  [&_strong]:text-text-dark [&_strong]:font-semibold
                  [&_ul]:space-y-2 [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc
                  [&_li]:text-base [&_li]:text-[#333] [&_li]:leading-[1.6]
                  [&_table]:w-full [&_table]:border-collapse [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:mb-6 [&_table]:border [&_table]:border-surface-border
                  [&_thead]:bg-brand-dark
                  [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-white
                  [&_tbody_tr:nth-child(even)]:bg-surface
                  [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-text-dark [&_td]:border-b [&_td]:border-[#EEE]
                "
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Inline CTA */}
              <div className="bg-brand-dark rounded-xl p-8 md:p-10 mt-12">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Нужна помощь в оснащении чистого помещения?
                </h3>
                <p className="text-white/70 text-sm mb-6 max-w-lg">
                  Специалисты Clean Room System подберут расходные материалы и одежду
                  с учетом требований вашего производства.
                </p>
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-brand-dark bg-white rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone size={16} />
                  Получить консультацию
                </Link>
              </div>

              {/* Tags */}
              <div className="mt-10 flex flex-wrap gap-2">
                {article.tableOfContents.map((item) => (
                  <span
                    key={item.id}
                    className="text-xs text-text bg-surface px-3 py-1.5 rounded-full border border-surface-border"
                  >
                    {item.title}
                  </span>
                ))}
              </div>

              {/* Back link */}
              <div className="mt-8 pt-8 border-t border-surface-border">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-brand font-medium text-sm hover:text-brand-dark transition-colors"
                >
                  <ArrowLeft size={16} />
                  Все статьи
                </Link>
              </div>
            </div>

            {/* Table of Contents - sidebar */}
            <aside className="lg:w-60 flex-shrink-0">
              <div className="lg:sticky lg:top-28">
                <div className="bg-surface rounded-xl p-5 border border-surface-border">
                  <div className="flex items-center gap-2 mb-4">
                    <List size={16} className="text-brand" />
                    <h3 className="font-semibold text-text-dark text-sm">
                      Содержание
                    </h3>
                  </div>
                  <nav className="space-y-1">
                    {article.tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-[13px] text-text hover:text-brand transition-colors py-1.5 border-l-2 border-surface-border hover:border-brand pl-3"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-surface py-14 md:py-16 border-t border-surface-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-text-dark mb-8 text-center">
              Читайте также
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedArticles.map((related) => (
                <article
                  key={related.id}
                  className="rounded-xl bg-white border border-surface-stroke shadow hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <Link
                    href={`/blog/${related.slug}`}
                    className="block relative aspect-[3/2]"
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
                    <span className="inline-block text-[11px] font-semibold text-white bg-brand-dark px-2.5 py-1 rounded-full mb-3">
                      {related.category}
                    </span>
                    <Link href={`/blog/${related.slug}`}>
                      <h3 className="text-base font-bold text-text-dark mb-2 line-clamp-2 group-hover:text-brand transition-colors leading-snug">
                        {related.title}
                      </h3>
                    </Link>
                    <p className="text-[13px] text-text line-clamp-3 mb-4">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span>{formatDate(related.publishedAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-text-muted" />
                      <span>{related.readingTime} мин чтения</span>
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
