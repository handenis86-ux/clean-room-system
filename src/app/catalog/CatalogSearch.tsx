'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { categories, productSlug } from '@/data/products';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

interface SearchResult {
  name: string;
  sku: string;
  description?: string;
  categorySlug: string;
  categoryTitle: string;
}

export default function CatalogSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const allProducts = useMemo<SearchResult[]>(() => {
    const items: SearchResult[] = [];
    for (const cat of categories) {
      for (const p of cat.products) {
        items.push({
          name: p.name,
          sku: p.sku,
          description: p.description,
          categorySlug: cat.slug,
          categoryTitle: cat.title,
        });
      }
    }
    return items;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return allProducts
      .filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.description ? p.description.toLowerCase().includes(q) : false)
        );
      })
      .slice(0, 10);
  }, [allProducts, query]);

  // Close on outside click / ESC
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Push internal site_search events to dataLayer (debounced 600ms after typing
  // stops). GA4 + Yandex.Metrika pick this up via GTM. Tracks what users
  // actually look for in the catalog — direct demand signal.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) return;
    const timer = setTimeout(() => {
      if (typeof window === 'undefined') return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'site_search',
        search_term: q.toLowerCase(),
        results_count: results.length,
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [query, results.length]);

  return (
    <div ref={ref} className="relative w-full max-w-[600px]">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Поиск по каталогу: SKU, название…"
          className="w-full h-[44px] pl-11 pr-10 text-[15px] text-text-dark bg-white border border-surface-input rounded-lg focus:border-brand focus:ring-1 focus:ring-brand/20 outline-none transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
            aria-label="Очистить"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {open && query.trim().length >= 2 && (
        <div className="absolute z-30 top-full left-0 right-0 mt-2 bg-white rounded-xl border border-surface-input shadow-lg overflow-hidden max-h-[400px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-4 text-[14px] text-text-muted text-center">
              Ничего не найдено по запросу «{query}»
            </div>
          ) : (
            <ul>
              {results.map((r) => (
                <li
                  key={`${r.categorySlug}-${r.sku}`}
                  className="border-b border-surface-input last:border-b-0"
                >
                  <Link
                    href={`/catalog/${r.categorySlug}/${productSlug(r.sku)}`}
                    onClick={() => setOpen(false)}
                    className="block p-3 hover:bg-brand-light/30 transition-colors"
                  >
                    <p className="text-[14px] font-semibold text-text-dark line-clamp-1">
                      {r.name}
                    </p>
                    <p className="text-[12px] text-text-muted mt-0.5">
                      Арт. {r.sku} · {r.categoryTitle}
                    </p>
                  </Link>
                </li>
              ))}
              {results.length === 10 && (
                <li className="p-3 text-[12px] text-text-muted text-center bg-surface">
                  Показаны первые 10 совпадений — уточните запрос
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
