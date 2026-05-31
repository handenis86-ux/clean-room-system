'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath } from '@/lib/i18n';

/**
 * Клиентский компонент, обновляющий `<html lang>` на основании
 * текущего pathname. Нужен для статического экспорта, где
 * Next.js рендерит единый shell с `lang="ru"` в `app/layout.tsx`,
 * но для страниц `/uz/*` SEO требует `lang="uz"`.
 *
 * Работает на гидратации (after-mount). Для бот-краулеров, которые
 * рендерят клиентский JS (Google, Bing, Yandex с заголовком), это
 * срабатывает; для тех, кто читает только статический HTML — атрибут
 * остаётся `ru`. Компенсируется корректным `hreflang` в metadata.
 */
export default function LangAttributeSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = getLocaleFromPath(pathname || '/');
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [pathname]);

  return null;
}
