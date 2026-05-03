/**
 * Analytics IDs — заполни три значения и задеплой.
 * Все три можно не заполнять — компоненты сами не отрендерятся.
 *
 * GTM:    https://tagmanager.google.com  → Container → ID формата GTM-XXXXXXX
 * GA4:    https://analytics.google.com   → Property → Data Streams → ID формата G-XXXXXXXXXX
 * Yandex: https://metrika.yandex.com     → Counter ID — число, например 12345678
 */

export const analytics = {
  gtmId: 'GTM-KZFL6BZQ',
  ga4Id: '',          // 'G-XXXXXXXXXX' — можно не заполнять если используешь GTM (GTM сам подключит GA4)
  yandexMetrikaId: '', // '12345678'
};
