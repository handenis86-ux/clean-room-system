'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') window.print();
      }}
      className="no-print inline-flex items-center gap-2 px-5 h-[44px] text-[14px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors"
    >
      <Printer size={16} />
      Скачать PDF
    </button>
  );
}
