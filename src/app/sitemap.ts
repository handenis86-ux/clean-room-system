import { MetadataRoute } from 'next';

const BASE_URL = 'https://clean-room-systems.uz';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/catalog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...[
      'clothing',
      'gloves',
      'footwear',
      'masks',
      'disinfectants',
      'wipes',
      'cleaning',
      'packaging',
    ].map((slug) => ({
      url: `${BASE_URL}/catalog/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${BASE_URL}/company/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contacts`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/delivery`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
