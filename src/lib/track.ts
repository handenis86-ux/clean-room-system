/**
 * Единая точка отправки аналитических событий.
 *
 * На сайте GA4 загружается напрямую через gtag.js (см. GoogleAnalytics.tsx),
 * а GTM-контейнер — отдельно. «Голый» `dataLayer.push({event})` доходит до GA4
 * ТОЛЬКО если в GTM-контейнере настроен Custom Event триггер + GA4 Event тег.
 * Если их нет — событие теряется (так и было: 0 событий в GA4).
 *
 * Поэтому шлём событие двумя путями сразу:
 *   1) dataLayer.push — для GTM (если/когда триггеры настроят);
 *   2) gtag('event')  — напрямую в GA4, без зависимости от конфигурации GTM.
 *
 * Используй этот хелпер для ВСЕХ кастомных событий вместо ручного dataLayer.push.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  event: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') return;

  // 1) GTM path
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  // 2) Direct GA4 path (gtag.js loaded standalone)
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}
