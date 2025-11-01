import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SourceBadge } from '@/components/news/SourceBadge';
import { TypeBadge } from '@/components/news/TypeBadge';
import { formatDate, getRelativeTime } from '@/lib/formatDate';
import { buildPageMetadata } from '@/lib/seo';
import { localizedHref } from '@/lib/i18n/utils';
import { getAllNewsIds, getNewsById } from '@/lib/aktuel';
import { SITE_URL } from '@/lib/site-config';
import { locales, type Locale } from '@/i18n';

export const dynamic = 'force-static';
export const revalidate = 3600;

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
    return buildPageMetadata('Aktüel içerik bulunamadı');
  }

  const canonical = `${SITE_URL}/${params.locale}/aktuel/${params.id}`;
  const description = news.excerpt ?? '';
  const title = `${news.title} | Kaynar Hukuk Bürosu`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      publishedTime: news.date,
      section: news.categories?.[0]
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { id, locale } = params;
  const news = getNewsById(id);

  if (!news) {
    notFound();
  }

  const tNews = await getTranslations({ locale, namespace: 'news' });
  const backHref = localizedHref(locale, '/aktuel');
  const canonical = `${SITE_URL}/${locale}/aktuel/${id}`;

  const newsLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    datePublished: news.date,
    dateModified: news.date,
    description: news.excerpt,
    articleSection: news.categories,
    keywords: news.tags,
    publisher: {
      '@type': 'Organization',
      name: news.source ?? 'Kaynar Hukuk Bürosu'
    },
    url: canonical,
    mainEntityOfPage: canonical
  };

  return (
    <>
      <Script
        id={`news-ld-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsLd) }}
      />
      <Topbar />
      <Navbar />

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-[hsl(var(--muted))]">
            <Link
              href={backHref as any}
              className="inline-flex items-center gap-2 text-[hsl(var(--gold))] transition-colors hover:text-[hsl(var(--gold))]/80 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--bg))]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {tNews('backToList')}
            </Link>
          </nav>

          <header className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-lg sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <time className="font-semibold text-[hsl(var(--gold))]">{formatDate(news.date, 'long', locale)}</time>
              <span className="text-[hsl(var(--muted))]">{getRelativeTime(news.date, locale)}</span>
              {news.type && <TypeBadge type={news.type} size="sm" />}
              {news.source && <SourceBadge source={news.source} size="sm" />}
            </div>

            <h1 className="mt-4 font-serif text-3xl font-bold text-[hsl(var(--fg))] sm:text-4xl lg:text-5xl">
              {news.title}
            </h1>

            {news.excerpt && (
              <p className="mt-4 text-base leading-relaxed text-[hsl(var(--muted))] sm:text-lg">{news.excerpt}</p>
            )}

            {news.categories && news.categories.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {news.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--gold))]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </header>

          <article className="mt-8 space-y-6 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-lg sm:p-8">
            <div className="prose prose-invert max-w-none text-[hsl(var(--muted))]">
              <p className="text-base leading-relaxed sm:text-lg">{news.excerpt}</p>
            </div>

            {news.url && news.url !== '#' && (
              <aside className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/70 p-4 sm:p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--gold))]">
                  {tNews('source')}
                </h2>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80"
                >
                  <span>{tNews('readFull')}</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h8v8m0-8L5 19" />
                  </svg>
                </a>
              </aside>
            )}

            {news.tags && news.tags.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--gold))]">
                  {tNews('tags')}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs font-medium text-[hsl(var(--muted))]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="mt-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-sm text-[hsl(var(--muted))]">
            {tNews('disclaimer')}
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
}
