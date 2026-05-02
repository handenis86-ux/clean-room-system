import type { MetadataRoute } from 'next';
import { categories, productSlug } from '@/data/products';
import { articles } from '@/data/articles';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${base}/catalog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/company/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/contacts`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}/catalog/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productUrls: MetadataRoute.Sitemap = categories.flatMap((category) =>
    category.products.map((product) => ({
      url: `${base}/catalog/${category.slug}/${productSlug(product.sku)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => {
    const parsed = article.publishedAt ? new Date(article.publishedAt) : null;
    const lastModified =
      parsed && !Number.isNaN(parsed.getTime()) ? parsed : now;
    return {
      url: `${base}/blog/${article.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    };
  });

  return [...staticUrls, ...categoryUrls, ...productUrls, ...articleUrls];
}
