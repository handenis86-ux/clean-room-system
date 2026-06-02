'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/track';

export type CalcKind = 'gloves' | 'gowning' | 'disinfectant';

/**
 * Map internal calculator id → GA4-friendly type string used as `calculator_type`
 * dimension in the dataLayer event payload.
 */
export const CALCULATOR_TYPE: Record<CalcKind, 'gloves' | 'gowning_room' | 'disinfectant'> = {
  gloves: 'gloves',
  gowning: 'gowning_room',
  disinfectant: 'disinfectant',
};

/**
 * Пушит `calculator_used` событие в dataLayer — один раз за визит страницы,
 * после первого значимого изменения входных параметров (debounce 800 мс).
 *
 * Назначение: даём аналитике сигнал «пользователь реально работал с
 * калькулятором», но не спамим dataLayer на каждое нажатие клавиши.
 */
export function useCalcGtm(calculator: CalcKind, deps: unknown[]) {
  const firstRun = useRef(true);
  const fired = useRef(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const depsString = JSON.stringify(deps);

  useEffect(() => {
    // Skip the initial mount — we only fire on real user interaction.
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    // Fire-once-per-page-visit guard.
    if (fired.current) return;
    if (typeof window === 'undefined') return;

    const id = window.setTimeout(() => {
      if (fired.current) return;
      fired.current = true;
      trackEvent('calculator_used', {
        calculator_type: CALCULATOR_TYPE[calculator],
        // Keep legacy field for backwards-compat with existing GA4 reports.
        calculator,
      });
    }, 800);

    return () => window.clearTimeout(id);
  }, [depsString, calculator]);
}
