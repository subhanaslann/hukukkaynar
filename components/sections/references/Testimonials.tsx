'use client';

import Reveal, { RevealItem, RevealStagger } from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/shared/Section';
import { Icons } from '@/components/shared/Icons';
import { REFERENCE_TESTIMONIALS } from '@/content/references/testimonials';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const MAX_STARS = 5;

export function Testimonials() {
  const t = useTranslations('references.testimonials');

  return (
    <Section className="bg-[hsl(var(--bg))]">
      <Reveal>
        <SectionHeader align="center" title={t('title')} description={t('subtitle')} />
      </Reveal>

      <RevealStagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {REFERENCE_TESTIMONIALS.map((testimonial) => {
          const text =
            testimonial.translationKey != null
              ? translateWithFallback(t, `items.${testimonial.translationKey}`, testimonial.text)
              : testimonial.text;

          return (
            <RevealItem key={testimonial.id}>
              <article className="relative flex h-full flex-col rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-all duration-200 hover:shadow-lg">
                <Icons.quote className="h-6 w-6 text-[hsl(var(--gold))]" aria-hidden="true" />

                <blockquote className="mt-4 flex-1 text-base italic text-[hsl(var(--muted))]">
                  “{text}”
                </blockquote>

                <div
                  className="mt-5 flex items-center gap-1 text-[hsl(var(--gold))]"
                  aria-label={`${testimonial.rating}/${MAX_STARS}`}
                >
                  {Array.from({ length: MAX_STARS }).map((_, index) => (
                    <Icons.star
                      key={index}
                      className={cn(
                        'h-4 w-4',
                        index < testimonial.rating ? 'fill-[hsl(var(--gold))] text-[hsl(var(--gold))]' : 'text-[hsl(var(--gold))]/30'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <footer className="mt-4">
                  <p className="font-semibold text-[hsl(var(--fg))]">{testimonial.name}</p>
                  <p className="text-sm text-[hsl(var(--muted))]">
                    {testimonial.title} · {testimonial.company}
                  </p>
                </footer>
              </article>
            </RevealItem>
          );
        })}
      </RevealStagger>
    </Section>
  );
}

function translateWithFallback(
  t: ReturnType<typeof useTranslations>,
  key: string,
  fallback: string
) {
  const optional = (t as unknown as { optional?: (key: string) => string | undefined }).optional;
  if (optional) {
    const result = optional(key);
    if (result) return result;
  }

  try {
    return t(key);
  } catch {
    return fallback;
  }
}
