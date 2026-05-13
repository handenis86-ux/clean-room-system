'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Debounced GTM tracker — пушит `calculator_used` событие при изменении
 * любого входного параметра. Debounce 1 сек, чтобы не спамить datalayer.
 */
export function useCalcGtm(
  calculator: 'gloves' | 'gowning' | 'disinfectant',
  deps: unknown[]
) {
  const firstRun = useRef(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const depsString = JSON.stringify(deps);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (typeof window === 'undefined') return;

    const id = window.setTimeout(() => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'calculator_used',
        calculator,
      });
    }, 1000);

    return () => window.clearTimeout(id);
  }, [depsString, calculator]);
}
