import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cleanroom.uz' },
    update: {},
    create: {
      email: 'admin@cleanroom.uz',
      name: 'Администратор',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log('Created admin user:', admin.email);

  // Create categories
  const categories = [
    {
      name: 'Одежда для чистых помещений',
      slug: 'clothing',
      description: 'Многоразовая и одноразовая спецодежда для работы в чистых помещениях различных классов.',
      image: '/images/categories/clothing.webp',
      metaTitle: 'Одежда для чистых помещений | Clean Room Systems',
      metaDescription: 'Профессиональная одежда для чистых помещений: комбинезоны, халаты, шапочки, бахилы. Доставка по России.',
    },
    {
      name: 'Перчатки',
      slug: 'gloves',
      description: 'Широкий выбор перчаток для чистых помещений: нитриловые, латексные, виниловые.',
      image: '/images/categories/gloves.webp',
      metaTitle: 'Перчатки для чистых помещений | Clean Room Systems',
      metaDescription: 'Нитриловые, латексные и виниловые перчатки для чистых помещений. Стерильные и нестерильные варианты.',
    },
    {
      name: 'Обувь',
      slug: 'footwear',
      description: 'Специализированная обувь для чистых помещений: сабо, ботинки, бахилы.',
      image: '/images/categories/footwear.webp',
      metaTitle: 'Обувь для чистых помещений | Clean Room Systems',
      metaDescription: 'Антистатическая обувь и бахилы для чистых помещений. Сабо, ботинки, ESD обувь.',
    },
    {
      name: 'Очки и маски',
      slug: 'masks',
      description: 'Средства защиты органов дыхания и зрения: респираторы, маски, защитные очки.',
      image: '/images/categories/masks.webp',
      metaTitle: 'Маски и очки для чистых помещений | Clean Room Systems',
      metaDescription: 'Защитные маски, респираторы и очки для работы в чистых помещениях.',
    },
    {
      name: 'Дезинфектанты',
      slug: 'disinfectants',
      description: 'Профессиональные дезинфицирующие средства для чистых помещений.',
      image: '/images/categories/disinfectants.webp',
      metaTitle: 'Дезинфектанты для чистых помещений | Clean Room Systems',
      metaDescription: 'Профессиональные дезинфицирующие средства: спиртовые растворы, биоциды, дезинфектанты поверхностей.',
    },
    {
      name: 'Салфетки',
      slug: 'wipes',
      description: 'Безворсовые и пропитанные салфетки для чистых помещений.',
      image: '/images/categories/wipes.webp',
      metaTitle: 'Салфетки для чистых помещений | Clean Room Systems',
      metaDescription: 'Безворсовые и пропитанные салфетки для протирки поверхностей в чистых помещениях.',
    },
    {
      name: 'Уборочный инвентарь',
      slug: 'cleaning',
      description: 'Оборудование для уборки чистых помещений: мопы, швабры, ведра, тележки.',
      image: '/images/categories/cleaning.webp',
      metaTitle: 'Уборочный инвентарь для чистых помещений | Clean Room Systems',
      metaDescription: 'Профессиональный уборочный инвентарь: мопы, швабры, ведра и тележки для чистых помещений.',
    },
    {
      name: 'Упаковка',
      slug: 'packaging',
      description: 'Упаковочные материалы для чистых помещений: пакеты, контейнеры, стерильная упаковка.',
      image: '/images/categories/packaging.webp',
      metaTitle: 'Упаковочные материалы для чистых помещений | Clean Room Systems',
      metaDescription: 'Пакеты, контейнеры и стерильная упаковка для чистых помещений.',
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log('Created categories:', categories.length);

  // Create sample products
  const clothingCategory = await prisma.category.findUnique({ where: { slug: 'clothing' } });
  const glovesCategory = await prisma.category.findUnique({ where: { slug: 'gloves' } });

  if (clothingCategory) {
    const products = [
      {
        name: 'Комбинезон для чистых помещений Tyvek Classic',
        slug: 'kombinezon-tyvek-classic',
        description: 'Одноразовый комбинезон из материала Tyvek для защиты в чистых помещениях класса ISO 5-8.',
        price: 2500,
        sku: 'TVK-001',
        categoryId: clothingCategory.id,
        inStock: true,
        isFeatured: true,
        metaTitle: 'Комбинезон Tyvek Classic | Clean Room Systems',
        metaDescription: 'Купить комбинезон Tyvek Classic для чистых помещений. Защита ISO 5-8. Доставка по России.',
      },
      {
        name: 'Халат лабораторный многоразовый',
        slug: 'halat-laboratornyj-mnogorazovyj',
        description: 'Многоразовый лабораторный халат из антистатической ткани для работы в чистых помещениях.',
        price: 3200,
        sku: 'CLT-003',
        categoryId: clothingCategory.id,
        inStock: true,
        isFeatured: false,
        metaTitle: 'Лабораторный халат многоразовый | Clean Room Systems',
        metaDescription: 'Многоразовый лабораторный халат для чистых помещений. Антистатическая ткань.',
      },
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      });
    }
    console.log('Created clothing products:', products.length);
  }

  if (glovesCategory) {
    const products = [
      {
        name: 'Перчатки нитриловые стерильные Ansell',
        slug: 'perchatki-nitrilovye-ansell',
        description: 'Стерильные нитриловые перчатки Ansell для работы в чистых помещениях класса ISO 5 и выше.',
        price: 1800,
        sku: 'GLV-002',
        categoryId: glovesCategory.id,
        inStock: true,
        isFeatured: true,
        metaTitle: 'Перчатки нитриловые Ansell | Clean Room Systems',
        metaDescription: 'Стерильные нитриловые перчатки Ansell. Для чистых помещений ISO 5+.',
      },
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      });
    }
    console.log('Created gloves products:', products.length);
  }

  // Create articles
  const articles = [
    {
      title: 'Новые стандарты ISO 14644 для чистых помещений: что изменилось в 2024 году',
      slug: 'new-iso-standards-2024',
      excerpt: 'Подробный обзор ключевых изменений в международных стандартах ISO 14644.',
      content: `
# Новые стандарты ISO 14644 для чистых помещений

В 2024 году вступили в силу обновленные версии стандартов ISO 14644, которые определяют требования к чистым помещениям.

## Основные изменения

1. Уточнены методы измерения концентрации частиц
2. Добавлены новые классы чистоты для наноразмерных частиц
3. Усилены требования к документированию

## Влияние на производство

Предприятия должны пересмотреть свои процедуры контроля качества...
      `,
      image: '/images/news/news-1.jpg',
      isPublished: true,
      publishedAt: new Date('2024-03-15'),
      metaTitle: 'Новые стандарты ISO 14644 в 2024 году | Clean Room Systems',
      metaDescription: 'Обзор изменений в стандартах ISO 14644 для чистых помещений в 2024 году.',
    },
    {
      title: 'Как правильно выбрать одежду для чистых помещений',
      slug: 'how-to-choose-cleanroom-clothing',
      excerpt: 'Экспертное руководство по выбору спецодежды для работы в контролируемых средах.',
      content: `
# Выбор одежды для чистых помещений

Правильный выбор одежды для чистых помещений — ключевой фактор поддержания требуемого класса чистоты.

## Критерии выбора

1. Класс чистоты помещения
2. Тип производственного процесса
3. Требования к ESD защите
4. Бюджет

## Рекомендации по материалам

Для помещений класса ISO 5 и выше рекомендуется использовать...
      `,
      image: '/images/news/news-2.jpg',
      isPublished: true,
      publishedAt: new Date('2024-03-10'),
      metaTitle: 'Как выбрать одежду для чистых помещений | Clean Room Systems',
      metaDescription: 'Руководство по выбору спецодежды для чистых помещений разных классов.',
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
  }
  console.log('Created articles:', articles.length);

  // Create partners
  const partners = [
    { name: 'Ansell', logo: '/images/partners/ansell.png', type: 'supplier', order: 1 },
    { name: 'Kimberly-Clark', logo: '/images/partners/kimberly.png', type: 'supplier', order: 2 },
    { name: 'DuPont', logo: '/images/partners/dupont.png', type: 'supplier', order: 3 },
    { name: '3M', logo: '/images/partners/3m.png', type: 'supplier', order: 4 },
    { name: 'Texwipe', logo: '/images/partners/texwipe.png', type: 'supplier', order: 5 },
  ];

  for (const partner of partners) {
    await prisma.partner.create({
      data: partner,
    });
  }
  console.log('Created partners:', partners.length);

  // Create settings
  const settings = [
    { key: 'site_name', value: 'Clean Room Systems', type: 'text', group: 'general' },
    { key: 'site_description', value: 'Профессиональное оборудование для чистых помещений', type: 'text', group: 'general' },
    { key: 'contact_phone', value: '+998 99 821-12-22', type: 'text', group: 'contacts' },
    { key: 'contact_email', value: 'info@cleanroom.uz', type: 'text', group: 'contacts' },
    { key: 'contact_address', value: 'г. Ташкент, ул. Нукус, 85/1', type: 'text', group: 'contacts' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }
  console.log('Created settings:', settings.length);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
