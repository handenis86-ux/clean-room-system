import { siteConfig } from '@/config/site';

const TASHKENT_LAT = 41.2995;
const TASHKENT_LNG = 69.2401;

/**
 * Подробный LocalBusiness JSON-LD для Clean Room Systems / TOPAZ COMPANY.
 *
 * Используется на главной (/) и /contacts, объединён через @id —
 * Google и Yandex считают это одной сущностью с двумя страницами-проявлениями.
 *
 * Включает: legalName, расширенный address с postalCode/region,
 * GeoCoordinates + GeoCircle service area, areaServed по всем регионам
 * Узбекистана, contactPoint с языками и каналами, knowsAbout, knowsLanguage,
 * payment/currency, openingHours, hasMap, sameAs.
 */
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteConfig.url}/#localbusiness`,

  name: siteConfig.name,
  legalName: 'ООО «TOPAZ COMPANY»',
  alternateName: ['TOPAZ COMPANY', 'Клин Рум Системс', 'Cleanroom Systems'],
  description: siteConfig.description,
  slogan:
    'Расходные материалы и одежда для чистых помещений в Узбекистане — GMP, ISO 14644',

  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.webp`,
  image: [`${siteConfig.url}/og-image.png`, `${siteConfig.url}/images/logo.webp`],

  telephone: siteConfig.phone,
  email: siteConfig.email,

  // Pricing & payment for B2B
  priceRange: '$$',
  currenciesAccepted: ['UZS', 'USD', 'EUR', 'RUB'],
  paymentAccepted: ['Bank Transfer', 'Wire Transfer', 'Cash'],

  // Languages
  knowsLanguage: ['ru', 'uz', 'en'],

  // Topical authority — для E-A-T / Knowledge Graph
  knowsAbout: [
    'Чистые помещения',
    'Cleanroom consumables',
    'EU GMP Annex 1 (2022)',
    'ISO 14644',
    'ICH Q7',
    'ICH Q9',
    'ICH Q10',
    'USP <1116>',
    'Pharmaceutical manufacturing',
    'Aseptic processing',
    'Sterilization indicators',
    'Biological indicators',
    'Cleanroom garments',
    'Disinfectants for pharma',
    'Environmental monitoring',
    'Contamination control strategy',
    'GMP compliance',
    'Pharma Park Tashkent',
  ],

  // Подробный адрес
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Нукус, 85/1',
    addressLocality: 'Ташкент',
    addressRegion: 'Ташкент',
    postalCode: '100170',
    addressCountry: 'UZ',
  },

  // Точные координаты офиса (Mirzo-Ulugbek район)
  geo: {
    '@type': 'GeoCoordinates',
    latitude: TASHKENT_LAT,
    longitude: TASHKENT_LNG,
  },

  // Прямая ссылка на карту
  hasMap:
    'https://yandex.ru/maps/?ll=69.251543%2C41.310247&z=16&pt=69.251543%2C41.310247',

  // Зона обслуживания — вся территория Узбекистана
  areaServed: [
    {
      '@type': 'Country',
      name: 'Узбекистан',
      sameAs: 'https://en.wikipedia.org/wiki/Uzbekistan',
    },
    { '@type': 'AdministrativeArea', name: 'Город Ташкент' },
    { '@type': 'AdministrativeArea', name: 'Ташкентская область' },
    { '@type': 'AdministrativeArea', name: 'Андижанская область' },
    { '@type': 'AdministrativeArea', name: 'Бухарская область' },
    { '@type': 'AdministrativeArea', name: 'Джизакская область' },
    { '@type': 'AdministrativeArea', name: 'Кашкадарьинская область' },
    { '@type': 'AdministrativeArea', name: 'Навоийская область' },
    { '@type': 'AdministrativeArea', name: 'Наманганская область' },
    { '@type': 'AdministrativeArea', name: 'Самаркандская область' },
    { '@type': 'AdministrativeArea', name: 'Сурхандарьинская область' },
    { '@type': 'AdministrativeArea', name: 'Сырдарьинская область' },
    { '@type': 'AdministrativeArea', name: 'Ферганская область' },
    { '@type': 'AdministrativeArea', name: 'Хорезмская область' },
    { '@type': 'AdministrativeArea', name: 'Республика Каракалпакстан' },
  ],

  // Радиус доставки от офиса в Ташкенте — покрывает всю страну
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: TASHKENT_LAT,
      longitude: TASHKENT_LNG,
    },
    geoRadius: 700000, // 700 км — покрывает Узбекистан целиком от Ташкента
  },

  // Часы работы
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
  ],

  // Каналы связи
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'sales',
      areaServed: 'UZ',
      availableLanguage: ['Russian', 'Uzbek', 'English'],
    },
    {
      '@type': 'ContactPoint',
      email: siteConfig.email,
      contactType: 'customer service',
      areaServed: 'UZ',
      availableLanguage: ['Russian', 'Uzbek', 'English'],
    },
  ],

  // Связанные профили
  sameAs: [
    siteConfig.social.telegram,
    siteConfig.social.youtube,
  ].filter(Boolean),
};
