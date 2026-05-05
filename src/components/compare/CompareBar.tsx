'use client';

import Link from 'next/link';
import { GitCompare, X } from 'lucide-react';
import { useCompare } from './CompareContext';

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

export default function CompareBar() {
  const { items, clear, hydrated } = useCompare();

  if (!hydrated || items.length === 0) return null;

  const categorySlug = items[0].categorySlug;
  const word = pluralize(items.length, ['товар', 'товара', 'товаров']);

  return (
    <div
      role="region"
      aria-label="Панель сравнения"
      className="fixed z-50 right-4 lg:right-24 bottom-20 lg:bottom-6 max-w-[calc(100vw-2rem)]"
    >
      <div className="flex items-center gap-2 sm:gap-3 rounded-xl bg-brand-dark text-white shadow-2xl px-3 py-2.5 sm:px-4 sm:py-3 border border-brand-dark/40">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
          <GitCompare size={18} />
        </div>
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-[11px] uppercase tracking-wider text-white/70">
            Сравнение
          </span>
          <span className="text-[14px] font-semibold truncate">
            {items.length} {word}
          </span>
        </div>
        <Link
          href={`/compare/${categorySlug}`}
          className="ml-1 inline-flex items-center rounded-lg bg-white px-3 sm:px-4 py-2 text-[13px] font-semibold text-brand-dark hover:bg-brand-light transition-colors whitespace-nowrap"
        >
          Открыть
        </Link>
        <button
          type="button"
          onClick={clear}
          aria-label="Очистить сравнение"
          title="Очистить сравнение"
          className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
