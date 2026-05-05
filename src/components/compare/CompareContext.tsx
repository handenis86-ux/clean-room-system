'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export interface CompareItem {
  sku: string;
  categorySlug: string;
  name: string;
}

interface CompareCtx {
  items: CompareItem[];
  add: (item: CompareItem) => void;
  remove: (sku: string) => void;
  clear: () => void;
  has: (sku: string) => boolean;
  forCategory: (categorySlug: string) => CompareItem[];
  hydrated: boolean;
  maxItems: number;
}

const Ctx = createContext<CompareCtx | null>(null);
const STORAGE_KEY = 'crs-compare';
export const MAX_COMPARE_ITEMS = 4;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (i): i is CompareItem =>
                i &&
                typeof i.sku === 'string' &&
                typeof i.categorySlug === 'string' &&
                typeof i.name === 'string'
            )
          );
        }
      }
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* noop */
    }
  }, [items, hydrated]);

  const add = useCallback((item: CompareItem) => {
    setItems((prev) => {
      // одна категория за раз — если категория меняется, очищаем
      const sameCategory = prev[0]?.categorySlug === item.categorySlug;
      const next = sameCategory ? prev : [];
      if (next.find((i) => i.sku === item.sku)) return next;
      if (next.length >= MAX_COMPARE_ITEMS) return next;
      return [...next, item];
    });
  }, []);

  const remove = useCallback((sku: string) => {
    setItems((prev) => prev.filter((i) => i.sku !== sku));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback(
    (sku: string) => items.some((i) => i.sku === sku),
    [items]
  );

  const forCategory = useCallback(
    (categorySlug: string) => items.filter((i) => i.categorySlug === categorySlug),
    [items]
  );

  return (
    <Ctx.Provider
      value={{
        items,
        add,
        remove,
        clear,
        has,
        forCategory,
        hydrated,
        maxItems: MAX_COMPARE_ITEMS,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
