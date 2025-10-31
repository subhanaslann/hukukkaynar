import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsById, getAllNewsIds } from '@/lib/aktuel';
import { formatDate, getRelativeTime } from '@/lib/formatDate';
import { buildPageMetadata } from '@/lib/seo';
import { localizedHref } from '@/lib/i18n/navigation';
import { locales, type Locale } from '@/i18n';

// Force static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

interface NewsPageProps {
  params: { locale: Locale; id: string };
}

export async function generateStaticParams() {
  const ids = getAllNewsIds();
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const news = getNewsById(params.id);
  if (!news) {
    return buildPageMetadata('Haber bulunamadı');
  }
  return buildPageMetadata(news.title, news.excerpt);
}

export default function NewsPage({ params }: NewsPageProps) {
  const news = getNewsById(params.id);
  const { locale } = params;

  if (!news) {
    notFound();
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href={localizedHref(locale, '/aktuel') as any}
          className="text-xs sm:text-sm text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Aktüel listesine dön
        </Link>

        <header className="mt-4 sm:mt-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <time className="text-sm font-semibold text-[hsl(var(--gold))]">
              {formatDate(news.date, 'short')}
            </time>
            <span className="text-sm text-[hsl(var(--muted))]">•</span>
            <span className="text-sm text-[hsl(var(--muted))]">
              {getRelativeTime(news.date)}
            </span>
            {news.type && (
              <>
                <span className="text-sm text-[hsl(var(--muted))]">•</span>
                <span className="rounded-md bg-[hsl(var(--gold))]/10 px-2 py-0.5 text-xs font-bold text-[hsl(var(--gold))]">
                  {news.type}
                </span>
              </>
            )}
            {news.source && (
              <>
                <span className="text-sm text-[hsl(var(--muted))]">•</span>
                <span className="text-sm font-medium text-[hsl(var(--muted))]">
                  {news.source}
                </span>
              </>
            )}
          </div>

          <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-[hsl(var(--fg))]">{news.title}</h1>

          {news.categories && news.categories.length > 0 && (
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
              {news.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-md bg-[hsl(var(--gold))]/10 px-3 py-1 text-sm font-medium text-[hsl(var(--gold))] border border-[hsl(var(--gold))]/30"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className="mt-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-[hsl(var(--muted))]">
              {news.excerpt}
            </p>

            {news.url && news.url !== '#' && (
              <div className="mt-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <h3 className="mb-3 text-lg font-semibold text-[hsl(var(--fg))]">Kaynak</h3>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80 hover:underline"
                >
                  <span>Haberin tamamını oku</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {news.tags && news.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[hsl(var(--muted))]">
                Etiketler
              </h3>
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[hsl(var(--gold))]/10 px-3 py-1 text-sm text-[hsl(var(--gold))]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="mt-8 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-sm text-[hsl(var(--muted))]">
          Bu haber özet bilgi amaçlıdır. Detaylı ve güncel bilgi için ilgili resmi kaynakları kontrol ediniz.
        </aside>
      </div>
    </section>
  );
}
