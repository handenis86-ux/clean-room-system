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
    label: 'Каталог продукции',
    href: '/catalog',
    children: [
      { label: 'Индикаторы стерилизации', href: '/catalog/indicators' },
      { label: 'Дезинфицирующие средства', href: '/catalog/disinfectants-and-detergents' },
      { label: 'Одежда одноразовая', href: '/catalog/garments' },
      { label: 'Одежда многоразовая', href: '/catalog/reusable-garm' },
      { label: 'Перчатки защитные', href: '/catalog/perchatki-zashchitnye' },
      { label: 'Салфетки', href: '/catalog/cleanroom-wipes' },
      { label: 'Уборочные тележки', href: '/catalog/cleaning-trolleys-systems' },
      { label: 'Очки защитные', href: '/catalog/goggles' },
      { label: 'Стулья', href: '/catalog/cleanroom-chairs' },
      { label: 'Обувь', href: '/catalog/cleanroom-shoes' },
    ],
  },
  {
    label: 'О компании',
    href: '/company/about',
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
    { label: 'Индикаторы стерилизации', href: '/catalog/indicators' },
    { label: 'Дезинфицирующие средства', href: '/catalog/disinfectants-and-detergents' },
    { label: 'Защитная одежда', href: '/catalog/garments' },
    { label: 'Перчатки', href: '/catalog/perchatki-zashchitnye' },
    { label: 'Салфетки', href: '/catalog/cleanroom-wipes' },
    { label: 'Стулья', href: '/catalog/cleanroom-chairs' },
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
