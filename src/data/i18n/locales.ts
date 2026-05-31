/**
 * Локали сайта.
 * - `ru` — основной язык (русский, корневые URL `/...`)
 * - `uz` — узбекский (латиница), под префиксом `/uz/...`
 *
 * Только 10 ключевых страниц переведены на узбекский (см. `src/app/uz/*`).
 * Остальные страницы остаются только на русском. Узбекская версия — для
 * QA-инспекторов Pharma Park и B2B-аудитории, использующей официальный
 * узбекский на латинице (стандарт 2023 года).
 */

export type Locale = 'ru' | 'uz';

export const DEFAULT_LOCALE: Locale = 'ru';
export const LOCALES: readonly Locale[] = ['ru', 'uz'] as const;

/**
 * Список путей (без локального префикса), для которых существует узбекская
 * версия страницы. Используется языковым переключателем в Header, чтобы
 * понять, переключаться на конкретный URL или на корневую `/uz` (graceful
 * degradation для страниц без перевода).
 */
export const UZ_AVAILABLE_PATHS: ReadonlySet<string> = new Set<string>([
  '/',
  '/catalog',
  '/catalog/perchatki-zashchitnye',
  '/catalog/garments',
  '/catalog/disinfectants-and-detergents',
  '/compliance/gmp-2027-uzbekistan',
  '/gmp-podgotovka',
  '/blog/gmp-uzbekistan-2027-podgotovka',
  '/contacts',
  '/company/about',
]);
