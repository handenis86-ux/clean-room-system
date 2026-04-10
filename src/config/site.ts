import { NavItem, SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Clean Room System',
  description: 'Комплексное оснащение чистых помещений под ключ. Одежда, перчатки, дезинфектанты, салфетки и уборочное оборудование для фармацевтики, электроники и медицины.',
  url: 'https://clean-room-systems.uz',
  phone: '+998 99 821-12-22',
  email: 'info@clean-room-systems.uz',
  address: 'г. Ташкент, ул. Нукус, 85/1',
  social: {
    telegram: 'https://t.me/clean_room_systems',
    youtube: 'https://youtube.com/@clean_room_systems',
  },
};

export const mainNavigation: NavItem[] = [
  {
    label: 'О компании',
    href: '/company/about',
  },
  {
    label: 'Каталог продукции',
    href: '/catalog',
    children: [
      { label: 'Одежда для чистых помещений', href: '/catalog/clothing' },
      { label: 'Перчатки', href: '/catalog/gloves' },
      { label: 'Обувь', href: '/catalog/footwear' },
      { label: 'Очки и маски', href: '/catalog/masks' },
      { label: 'Дезинфектанты', href: '/catalog/disinfectants' },
      { label: 'Салфетки', href: '/catalog/wipes' },
      { label: 'Уборочный инвентарь', href: '/catalog/cleaning' },
      { label: 'Упаковочные материалы', href: '/catalog/packaging' },
    ],
  },
  {
    label: 'База знаний',
    href: '/blog',
  },
  {
    label: 'Контакты',
    href: '/contacts',
  },
];

export const footerNavigation = {
  catalog: [
    { label: 'Одежда для чистых помещений', href: '/catalog/clothing' },
    { label: 'Перчатки', href: '/catalog/gloves' },
    { label: 'Обувь', href: '/catalog/footwear' },
    { label: 'Дезинфектанты', href: '/catalog/disinfectants' },
    { label: 'Салфетки', href: '/catalog/wipes' },
    { label: 'Уборочный инвентарь', href: '/catalog/cleaning' },
  ],
  company: [
    { label: 'О компании', href: '/company/about' },
    { label: 'База знаний', href: '/blog' },
    { label: 'Контакты', href: '/contacts' },
  ],
  support: [
    { label: 'Доставка и оплата', href: '/delivery' },
    { label: 'Политика конфиденциальности', href: '/privacy' },
  ],
};
