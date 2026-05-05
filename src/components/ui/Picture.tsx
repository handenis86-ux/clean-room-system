import { CSSProperties } from 'react';

interface PictureProps {
  src: string; // example: '/images/hero/hero-bg.webp'
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * <picture> wrapper that serves AVIF when available, falls back to WebP.
 * Works with our static export setup (next.config.js: images.unoptimized = true).
 *
 * Expects src to point to a .webp file. Auto-derives the .avif counterpart.
 * If the .avif doesn't exist, browser silently falls back — no error.
 */
export default function Picture({
  src,
  alt,
  width,
  height,
  className,
  style,
  sizes,
  priority,
  fill,
}: PictureProps) {
  const avifSrc = src.replace(/\.webp$/i, '.avif');

  if (fill) {
    return (
      <picture>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={src} type="image/webp" />
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className={`${className ?? ''} absolute inset-0 w-full h-full`}
          style={{ objectFit: 'cover', ...style }}
          sizes={sizes}
        />
      </picture>
    );
  }

  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={src} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
        style={style}
        sizes={sizes}
      />
    </picture>
  );
}
