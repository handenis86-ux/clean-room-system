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
      { label: 'Индикаторы стерилизации', href: '/catalog/sterilization-indicators' },
      { label: 'Дезинфицирующие средства', href: '/catalog/disinfectants' },
      { label: 'Одноразовая одежда', href: '/catalog/disposable-garments' },
      { label: 'Многоразовая одежда', href: '/catalog/reusable-garments' },
      { label: 'Перчатки защитные', href: '/catalog/gloves' },
      { label: 'Салфетки', href: '/catalog/cleanroom-wipes' },
      { label: 'Уборочные тележки', href: '/catalog/cleaning-trolleys' },
      { label: 'Стулья для чистых помещений', href: '/catalog/chairs' },
      { label: 'Очки защитные', href: '/catalog/goggles' },
      { label: 'Обувь', href: '/catalog/shoes' },
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
    { label: 'Индикаторы стерилизации', href: '/catalog/sterilization-indicators' },
    { label: 'Дезинфицирующие средства', href: '/catalog/disinfectants' },
    { label: 'Защитная одежда', href: '/catalog/disposable-garments' },
    { label: 'Перчатки', href: '/catalog/gloves' },
    { label: 'Салфетки', href: '/catalog/cleanroom-wipes' },
    { label: 'Стулья', href: '/catalog/chairs' },
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
