import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/shared/Section';
import { localizedHref } from '@/lib/i18n/utils';
import { getAllNews } from '@/lib/aktuel';
import { formatDate, getRelativeTime } from '@/lib/formatDate';
import type { Locale } from '@/i18n';

interface LatestNewsProps {
  locale: Locale;
}

export default async function LatestNews({ locale }: LatestNewsProps) {
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const items = getAllNews();
  const latest = items
    .slice()
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))[0];

  if (!latest) return null;

  const href = localizedHref(locale, `/aktuel/${latest.id}`);
  const dateLabel = `${formatDate(latest.date, 'short', locale)} • ${getRelativeTime(latest.date, locale)}`;

  return (
    <Section className="py-10 sm:py-12 bg-[hsl(var(--card))]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 text-sm font-semibold uppercase tracking-wide gold-text">{tNav('news')}</div>
        <div className="flex flex-col gap-4 rounded-2xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs text-[hsl(var(--muted))]">{dateLabel}</div>
            <h3 className="mt-1 text-xl font-serif font-bold text-[hsl(var(--fg))] sm:text-2xl">{latest.title}</h3>
            {latest.excerpt && (
              <p className="mt-2 line-clamp-2 text-sm text-[hsl(var(--muted))]">{latest.excerpt}</p>
            )}
          </div>
          <div className="flex-shrink-0">
            <a
              href={href}
              className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 px-4 py-2 text-sm font-semibold text-[hsl(var(--gold))] transition-colors hover:bg-[hsl(var(--gold))]/20 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--card))]"
            >
              {tCommon('viewDetails')}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

