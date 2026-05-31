'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

interface Props {
  productName: string;
  sku: string;
  category: string;
}

/**
 * Sticky mobile-only "Получить КП" CTA for product detail pages.
 *
 * Sits at bottom-16 (64px) so it stacks ABOVE the global
 * FloatingContactButtons bar (which is fixed at bottom-0, h-16).
 *
 * Hidden on lg+ desktop where the global desktop floating buttons
 * are vertical icons on the left and don't compete for space.
 *
 * Pushes a `generate_lead` GTM event before navigating to /contacts
 * with the SKU prefilled as a URL param.
 */
export default function StickyKpCTA({ productName, sku, category }: Props) {
  // Short label fallback: full product name can easily overflow a single
  // button row on small screens. Anything beyond ~28 chars switches to a
  // generic "Запросить КП" label.
  const longLabel = `Получить КП на ${productName}`;
  const label = longLabel.length <= 32 ? longLabel : 'Запросить КП';

  const handleClick = () => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      method: 'product_kp_cta',
      sku,
      category,
    });
  };

  const href = `/contacts?product=${encodeURIComponent(sku)}`;

  return (
    <div
      className="lg:hidden fixed left-0 right-0 z-40 bg-white border-t border-surface-stroke px-3 py-2 no-print"
      style={{ bottom: '64px' }}
    >
      <Link
        href={href}
        onClick={handleClick}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-[15px] font-semibold text-white bg-[#00608A] rounded-lg active:opacity-90 transition-opacity"
      >
        <FileText size={18} strokeWidth={2.25} />
        <span className="truncate">{label}</span>
      </Link>
    </div>
  );
}
