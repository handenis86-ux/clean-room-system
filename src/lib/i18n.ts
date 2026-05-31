/**
 * Утилиты для работы с локалями: разбор/построение URL, hreflang-альтернаты
 * для metadata.alternates.languages.
 *
 * Архитектура: русский — корень (`/catalog`), узбекский — префикс `/uz/`
 * (`/uz/catalog`). Эта структура совместима с Next.js `output: 'export'`,
 * потому что не требует middleware / rewrites.
 */

import { siteConfig } from '@/config/site';
import {
  DEFAULT_LOCALE,
  LOCALES,
  UZ_AVAILABLE_PATHS,
  type Locale,
} from '@/data/i18n/locales';

const UZ_PREFIX = '/uz';

/**
 * Извлечь локаль из URL-пути.
 * `/uz` или `/uz/...` → `uz`, иначе → `ru`.
 */
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === UZ_PREFIX || pathname.startsWith(`${UZ_PREFIX}/`)) {
    return 'uz';
  }
  return 'ru';
}

/**
 * Убрать локаль-префикс. Если уже без префикса — вернуть как есть.
 * `/uz/catalog` → `/catalog`, `/catalog` → `/catalog`, `/uz` → `/`.
 */
export function stripLocale(pathname: string): string {
  if (pathname === UZ_PREFIX) return '/';
  if (pathname.startsWith(`${UZ_PREFIX}/`)) {
    return pathname.slice(UZ_PREFIX.length);
  }
  return pathname;
}

/**
 * Построить путь под нужную локаль.
 * - `ru`: возвращает «голый» путь без префикса.
 * - `uz`: добавляет `/uz` префикс, кроме случая отсутствия перевода
 *   страницы (graceful degradation → возвращает `/uz`, главная UZ).
 */
export function localizePath(pathname: string, locale: Locale): string {
  const stripped = stripLocale(pathname);
  if (locale === 'ru') {
    return stripped;
  }
  // uz
  if (UZ_AVAILABLE_PATHS.has(stripped)) {
    return stripped === '/' ? UZ_PREFIX : `${UZ_PREFIX}${stripped}`;
  }
  // Перевода для конкретной страницы нет — возвращаем главную UZ.
  return UZ_PREFIX;
}

/**
 * Сформировать объект `languages` для `metadata.alternates.languages`.
 * Параметр `pathname` — «канонический» путь без префикса локали
 * (например, `/catalog/perchatki-zashchitnye` или `/`).
 *
 * Возвращает:
 * - `ru` → абсолютный URL русской версии
 * - `uz` → абсолютный URL узбекской версии (или `/uz` если страница без перевода)
 * - `x-default` → русская версия (основной язык сайта)
 */
export function getAlternateLanguagesMeta(
  pathname: string,
): Record<'ru' | 'uz' | 'x-default', string> {
  const ruPath = stripLocale(pathname);
  const uzPath = localizePath(pathname, 'uz');
  const baseRu = ruPath === '/' ? '' : ruPath;
  const baseUz = uzPath === UZ_PREFIX ? UZ_PREFIX : uzPath;
  return {
    ru: `${siteConfig.url}${baseRu || '/'}`.replace(/\/$/, baseRu ? '' : '/'),
    uz: `${siteConfig.url}${baseUz}`,
    'x-default': `${siteConfig.url}${baseRu || '/'}`.replace(/\/$/, baseRu ? '' : '/'),
  };
}

/**
 * Удобная обёртка для генерации блока `alternates` целиком, c canonical-URL.
 * @param locale — текущая локаль страницы
 * @param pathname — «канонический» путь без префикса локали (например, `/catalog`)
 */
export function buildAlternates(locale: Locale, pathname: string) {
  const canonical =
    locale === 'ru'
      ? `${siteConfig.url}${stripLocale(pathname) === '/' ? '' : stripLocale(pathname)}`
      : `${siteConfig.url}${localizePath(pathname, 'uz')}`;
  return {
    canonical: canonical || siteConfig.url,
    languages: getAlternateLanguagesMeta(pathname),
  };
}

export { DEFAULT_LOCALE, LOCALES, UZ_AVAILABLE_PATHS };
export type { Locale };
