'use client';

import { Download } from 'lucide-react';
import { trackEvent } from '@/lib/track';

export default function PrintProductButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.print();
          trackEvent('product_pdf_download');
        }
      }}
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-medium text-brand-dark bg-white border border-brand rounded-lg hover:bg-brand-light transition-colors no-print"
    >
      <Download size={16} />
      Скачать карточку (PDF)
    </button>
  );
}
