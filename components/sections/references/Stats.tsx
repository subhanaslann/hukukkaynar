'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import Reveal, { RevealItem, RevealStagger } from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/shared/Section';
import { Icons } from '@/components/shared/Icons';
import { REFERENCE_STATS } from '@/content/references/stats';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent | MediaQueryList) => setReduced(event.matches);
    handler(query);
    if (query.addEventListener) {
      query.addEventListener('change', handler as (ev: MediaQueryListEvent) => void);
    } else {
      query.addListener(handler);
    }

    return () => {
      if (query.removeEventListener) {
        query.removeEventListener('change', handler as (ev: MediaQueryListEvent) => void);
      } else {
        query.removeListener(handler);
      }
    };
  }, []);

  return reduced;
}

export function Stats() {
  const t = useTranslations('references.stats');
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Section className="bg-[hsl(var(--bg))]">
      <Reveal>
        <SectionHeader align="center" title={t('title')} />
      </Reveal>

      <RevealStagger className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
        {REFERENCE_STATS.map((stat) => (
          <RevealItem key={stat.id}>
            <StatCard
              label={t(stat.label)}
              value={stat.value}
              suffix={stat.suffix}
              icon={stat.icon}
              reducedMotion={reducedMotion}
            />
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}

function StatCard({
  label,
  value,
  suffix,
  icon,
  reducedMotion
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: keyof typeof Icons;
  reducedMotion: boolean;
}) {
  const Icon = Icons[icon];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const target = useMemo(() => Math.max(0, value), [value]);
  const [displayValue, setDisplayValue] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (reducedMotion || !inView) {
      setDisplayValue(target);
      return;
    }

    let frame: number;
    const start = performance.now();
    const duration = 1400;

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayValue(Math.round(target * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, target]);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-sm transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
        <Icon className="h-7 w-7 text-[hsl(var(--gold))]" aria-hidden="true" />
      </div>

      <p className="mt-6 font-serif text-3xl font-bold text-[hsl(var(--fg))] sm:text-4xl">
        {displayValue.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-3 text-sm text-[hsl(var(--muted))]">{label}</p>
    </div>
  );
}
