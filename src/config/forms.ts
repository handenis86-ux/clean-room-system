/**
 * Web3Forms access key.
 * Получить: https://web3forms.com/ → ввести email → получить ключ → вставить сюда.
 * Пока ключ пустой, форма выводит сообщение "Форма не настроена".
 */
export const formsConfig = {
  web3formsAccessKey: 'd7b0d571-cbb5-4612-b8ca-de3d37ad2efa',
  /**
   * Cloudflare Turnstile Site Key.
   * Получить: https://dash.cloudflare.com → Turnstile → Add Site → Domain: cleanroom.uz
   * Затем: в Web3Forms dashboard включить Turnstile для access key и вставить Secret Key туда.
   * Пока ключ пустой — Turnstile не показывается, форма работает на одном honeypot.
   */
  turnstileSiteKey: '',
};
