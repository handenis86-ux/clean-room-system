'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface MapEmbedProps {
  src: string;
  title: string;
}

export default function MapEmbed({ src, title }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={src}
        width="100%"
        height="100%"
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title={title}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Загрузить карту: ${title}`}
      className="group relative w-full h-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00608A]"
      style={{
        background:
          'linear-gradient(135deg, #00608A 0%, #00405E 50%, #002A3F 100%)',
      }}
    >
      {/* Decorative grid overlay to evoke a map */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Decorative pin */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] w-3 h-3 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.25)]"
      />

      {/* Center CTA */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm mb-3 transition-transform group-hover:scale-110">
          <MapPin size={28} className="text-white" />
        </div>
        <p className="text-[16px] font-semibold mb-1">Загрузить карту</p>
        <p className="text-[13px] text-white/75">
          Нажмите, чтобы открыть Яндекс Карты
        </p>
      </div>
    </button>
  );
}
