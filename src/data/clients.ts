/**
 * Покупатели CRS для блока «Наши партнёры» (главная) и «Нам доверяют» (О компании).
 *
 * Логотипы взяты с официальных сайтов компаний (2026-10-07):
 * - ERA — era.uz (SVG из стилей сайта)
 * - Nobel Pharmsanoat — nobel.uz (логотип группы Nobel)
 * - Rompharm NS — rompharmns.uz
 * - Jurabek Laboratories — карточка поставщика на pharmaceutical-tech.com
 *   (на jurabek.uz только миниатюра 50×50); при наличии исходника — заменить
 * Река-Мед Фарм: официального логотипа в открытом доступе нет — пока текстовая
 * плитка (logo не задан). Когда появится файл, положить в /images/clients/ и
 * прописать logo/width/height.
 */
export interface Client {
  name: string;
  /** Подпись для alt и всплывающей подсказки */
  title: string;
  logo?: string;
  width?: number;
  height?: number;
  /** Высота логотипа на плитке, px — выравнивает визуальный вес разных логотипов */
  displayHeight?: number;
}

export const clients: Client[] = [
  {
    name: 'Nobel Pharmsanoat',
    title: 'Nobel Pharmsanoat — фармацевтическое производство',
    logo: '/images/clients/nobel.png',
    width: 108,
    height: 152,
    displayHeight: 64,
  },
  {
    name: 'Jurabek Laboratories',
    title: 'Jurabek Laboratories — фармацевтическое производство',
    logo: '/images/clients/jurabek-laboratories.png',
    width: 92,
    height: 84,
    displayHeight: 78,
  },
  {
    name: 'Rompharm NS',
    title: 'Rompharm NS — производство жидких лекарственных форм',
    logo: '/images/clients/rompharm-ns.png',
    width: 285,
    height: 60,
    displayHeight: 34,
  },
  {
    name: 'Река-Мед Фарм',
    title: 'Река-Мед Фарм — производство инфузионных растворов',
  },
  {
    name: 'ERA',
    title: 'ERA — решения для маркировки',
    logo: '/images/clients/era.svg',
    width: 85,
    height: 26,
    displayHeight: 34,
  },
];
