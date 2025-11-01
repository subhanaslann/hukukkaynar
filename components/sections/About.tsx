'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section, SectionHeader } from '@/components/shared/Section';
import { Icons } from '@/components/shared/Icons';

export function About() {
  const t = useTranslations('about');
  const tValues = useTranslations('about.values');

  const valueItems: Array<{ key: 'integrity' | 'discipline' | 'compliance'; icon: keyof typeof Icons }> = [
    { key: 'integrity', icon: 'check' },
    { key: 'discipline', icon: 'check' },
    { key: 'compliance', icon: 'check' }
  ];
  const paragraphs = (t.raw('paragraphs') as string[]) ?? [];

  return (
    <Section id="hakkimizda">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border gold-line shadow-lg">
            <Image
              src="/hero.jpg"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeader label={t('label')} title={t('title')} align="left" />

          <div className="space-y-4 text-base leading-relaxed text-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {valueItems.map((value) => {
              const Icon = Icons[value.icon];
              return (
                <div key={value.key} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border gold-border bg-gold/10">
                      <Icon className="h-4 w-4 gold-text" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{tValues(`${value.key}.title`)}</h3>
                    <p className="mt-1 text-sm text-muted">{tValues(`${value.key}.description`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
