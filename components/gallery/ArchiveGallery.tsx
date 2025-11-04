'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type GalleryItem = { src: string; alt: string };

interface ArchiveGalleryProps {
  items: GalleryItem[];
}

export default function ArchiveGallery({ items }: ArchiveGalleryProps) {
  const tCommon = useTranslations('common');
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const close = React.useCallback(() => setOpenIndex(null), []);
  const showPrev = React.useCallback(() => {
    setOpenIndex((idx) => (idx === null ? null : (idx + items.length - 1) % items.length));
  }, [items.length]);
  const showNext = React.useCallback(() => {
    setOpenIndex((idx) => (idx === null ? null : (idx + 1) % items.length));
  }, [items.length]);

  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, close, showPrev, showNext]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((img, i) => (
          <figure key={img.src} className="overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
            <button
              type="button"
              className="group block w-full"
              aria-label={img.alt}
              onClick={() => setOpenIndex(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={1600}
                height={900}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                className="h-auto w-full cursor-zoom-in object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                priority={false}
              />
            </button>
          </figure>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(var(--bg))]/90 backdrop-blur-sm"
          onClick={close}
          aria-modal="true"
          role="dialog"
        >
          <div className="relative mx-auto max-h-[90vh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[openIndex].src}
              alt={items[openIndex].alt}
              width={1920}
              height={1080}
              sizes="100vw"
              className="h-auto w-full object-contain"
              priority
            />

            <button
              type="button"
              onClick={close}
              className="absolute right-2 top-2 rounded-full border gold-border bg-[hsl(var(--card))] px-3 py-1 text-sm font-semibold text-[hsl(var(--gold))]"
            >
              {tCommon('close')}
            </button>

            {items.length > 1 && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
                <button
                  type="button"
                  onClick={showPrev}
                  className="pointer-events-auto rounded-full border gold-border bg-[hsl(var(--card))]/80 px-3 py-2 text-[hsl(var(--gold))]"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="pointer-events-auto rounded-full border gold-border bg-[hsl(var(--card))]/80 px-3 py-2 text-[hsl(var(--gold))]"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

