'use client';

import { useTranslations } from 'next-intl';
import { Section, SectionHeader } from '@/components/shared/Section';

export function Testimonials() {
  const t = useTranslations('testimonials');
  const items = (t.raw('items') as Array<{quote: string; author: string; location: string}>) ?? [];

  return (
    <Section id="gorusler">
      <SectionHeader label={t('label')} title={t('title')} description={t('description')} />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((testimonial, index) => (
          <div
            key={`${testimonial.author}-${index}`}
            className="relative rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-all duration-200 hover:border-gold/50 hover:shadow-md"
          >
            <div className="mb-4">
              <svg className="h-8 w-8 gold-text opacity-50" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <blockquote className="text-sm leading-relaxed text-muted italic">
              {testimonial.quote}
            </blockquote>

            <div className="mt-6 border-t gold-line pt-4">
              <div className="font-semibold text-foreground">{testimonial.author}</div>
              <div className="text-xs text-muted">{testimonial.location}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
