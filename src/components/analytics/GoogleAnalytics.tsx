import Script from 'next/script';
import { analytics } from '@/config/analytics';

export function GoogleAnalytics() {
  if (!analytics.ga4Id) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analytics.ga4Id}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${analytics.ga4Id}', { anonymize_ip: true });`,
        }}
      />
    </>
  );
}
