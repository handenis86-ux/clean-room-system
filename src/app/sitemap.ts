import type { MetadataRoute } from 'next';
import { categories, productSlug } from '@/data/products';
import { articles } from '@/data/articles';
import { allFacets } from '@/data/category-facets';
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
      url: `${base}/resources/gmp-audit-checklist`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/resources/iso-14644-classes-spec`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/resources/disinfection-validation-protocol`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/resources/gowning-room-design-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/compliance/annex1`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/compliance/standards`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/compliance/gmp-2027-uzbekistan`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${base}/compliance/iso-13485-uzbekistan`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${base}/gmp-podgotovka`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/brands/tinman`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/locations/tashkent-cleanroom-supplier`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${base}/tools`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/tools/gloves-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/tools/gowning-room-budget`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/tools/disinfectant-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
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

  const facetUrls: MetadataRoute.Sitemap = allFacets.map((f) => ({
    url: `${base}/catalog/${f.parentCategory}/filter/${f.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

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

  // Узбекские URL — только 10 переведённых страниц (см. /uz/*).
  // Альтернаты ru/uz используются только для основных русских записей, а
  // дублирующие узбекские записи помечены как `monthly` с priority 0.7.
  const uzUrls: MetadataRoute.Sitemap = [
    {
      url: `${base}/uz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${base}/`,
          uz: `${base}/uz`,
        },
      },
    },
    {
      url: `${base}/uz/catalog`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${base}/catalog`,
          uz: `${base}/uz/catalog`,
        },
      },
    },
    {
      url: `${base}/uz/catalog/perchatki-zashchitnye`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${base}/catalog/perchatki-zashchitnye`,
          uz: `${base}/uz/catalog/perchatki-zashchitnye`,
        },
      },
    },
    {
      url: `${base}/uz/catalog/garments`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${base}/catalog/garments`,
          uz: `${base}/uz/catalog/garments`,
        },
      },
    },
    {
      url: `${base}/uz/catalog/disinfectants-and-detergents`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${base}/catalog/disinfectants-and-detergents`,
          uz: `${base}/uz/catalog/disinfectants-and-detergents`,
        },
      },
    },
    {
      url: `${base}/uz/compliance/gmp-2027-uzbekistan`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${base}/compliance/gmp-2027-uzbekistan`,
          uz: `${base}/uz/compliance/gmp-2027-uzbekistan`,
        },
      },
    },
    {
      url: `${base}/uz/gmp-podgotovka`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${base}/gmp-podgotovka`,
          uz: `${base}/uz/gmp-podgotovka`,
        },
      },
    },
    {
      url: `${base}/uz/blog/gmp-uzbekistan-2027-podgotovka`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${base}/blog/gmp-uzbekistan-2027-podgotovka`,
          uz: `${base}/uz/blog/gmp-uzbekistan-2027-podgotovka`,
        },
      },
    },
    {
      url: `${base}/uz/contacts`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${base}/contacts`,
          uz: `${base}/uz/contacts`,
        },
      },
    },
    {
      url: `${base}/uz/company/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          ru: `${base}/company/about`,
          uz: `${base}/uz/company/about`,
        },
      },
    },
  ];

  return [
    ...staticUrls,
    ...categoryUrls,
    ...productUrls,
    ...facetUrls,
    ...articleUrls,
    ...uzUrls,
  ];
}
