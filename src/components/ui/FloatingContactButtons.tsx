'use client';

import { MessageCircle, Send, Phone } from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';
import { trackEvent } from '@/lib/track';

const whatsappUrl = siteConfig.social.whatsapp ?? 'https://wa.me/998998211222';
const telegramUrl = siteConfig.social.telegram ?? 'https://t.me/khan_denis';

function trackClick(method: 'whatsapp' | 'telegram' | 'phone') {
  trackEvent('messenger_click', { method });
}

export default function FloatingContactButtons() {
  return (
    <>
      {/* Desktop: vertical floating stack (lg+) — left side, Tawk chat lives on the right */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-40 flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          onClick={() => trackClick('whatsapp')}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
        >
          <MessageCircle className="h-7 w-7" strokeWidth={2} />
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
            Написать в WhatsApp
          </span>
        </a>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в Telegram"
          onClick={() => trackClick('telegram')}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
        >
          <Send className="h-6 w-6" strokeWidth={2} />
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
            Написать в Telegram
          </span>
        </a>
      </div>

      {/* Mobile: sticky bottom bar (<lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex h-16 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          onClick={() => trackClick('whatsapp')}
          className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-base active:opacity-90"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={2.25} />
          WhatsApp
        </a>
        <a
          href={`tel:${phoneTel}`}
          aria-label="Позвонить"
          onClick={() => trackClick('phone')}
          className="flex flex-1 items-center justify-center gap-2 bg-[#00608A] text-white font-semibold text-base active:opacity-90"
        >
          <Phone className="h-5 w-5" strokeWidth={2.25} />
          Позвонить
        </a>
      </div>
    </>
  );
}
