import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import { markdownToHtml } from '@/lib/markdown';
import { formatDate } from '@/lib/formatDate';
import { buildPageMetadata } from '@/lib/seo';
import articlesList from '@/content/makaleler.json';
import { SITE_URL } from '@/lib/site-config';
import type { Locale } from '@/i18n';

export const dynamic = 'force-static';
export const revalidate = 3600;

interface ArticlePageProps {
  params: { slug: string; locale: string };
}

type CatalogArticle = {
  slug: string;
  areas?: string[];
};

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug, locale } = params;
  const [article, tMetadata, tDetail] = await Promise.all([
    getArticleBySlug(slug).catch(() => null),
    getTranslations({ locale, namespace: 'pages.articles.metadata' }),
    getTranslations({ locale, namespace: 'pages.articles.detail' })
  ]);

  if (!article) {
    return buildPageMetadata(tDetail('notFoundTitle'));
  }

  const description = article.summary ?? tMetadata('description');
  return buildPageMetadata(article.title, description);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s/]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = params;
  const article = await getArticleBySlug(slug).catch(() => null);

  if (!article) {
    notFound();
  }

  const listEntry = (articlesList as CatalogArticle[]).find((item) => item.slug === slug);
  const areas = listEntry?.areas ?? [];

  const rawHtml = await markdownToHtml(article.content);
  const headingMatches: { id: string; text: string }[] = [];

  const enhancedHtml = rawHtml.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const plain = inner.replace(/<[^>]+>/g, '').trim();
    const id = slugify(plain);
    headingMatches.push({ id, text: plain });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  const tDetail = await getTranslations({ locale, namespace: 'pages.articles.detail' });
  const formattedDate = formatDate(article.date, 'long', locale as Locale);
  const canonical = `${SITE_URL}/${locale}/makaleler/${slug}`;

  const encodedUrl = encodeURIComponent(canonical);
  const encodedTitle = encodeURIComponent(article.title);
  const shareLinks = [
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
    },
    {
      name: 'Twitter / X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    }
  ];

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.date,
    dateModified: article.date,
    description: article.summary,
    articleSection: areas,
    url: canonical
  };

  return (
    <>
      <Script
        id={`article-ld-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <Topbar />
      <Navbar />

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-[hsl(var(--muted))]">
            <Link
              href={`/${locale}/makaleler`}
              className="inline-flex items-center gap-2 text-[hsl(var(--gold))] transition-colors hover:text-[hsl(var(--gold))]/80 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--bg))]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {tDetail('back')}
            </Link>
          </nav>

          <header className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-lg sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <time className="font-semibold text-[hsl(var(--gold))]">{formattedDate}</time>
            </div>
            <h1 className="mt-4 font-serif text-3xl font-bold text-[hsl(var(--fg))] sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            {article.summary && (
              <p className="mt-4 text-base leading-relaxed text-[hsl(var(--muted))] sm:text-lg">
                {article.summary}
              </p>
            )}

            {areas.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {areas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--gold))]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--muted))]">
              <span className="font-semibold uppercase tracking-wide text-[hsl(var(--gold))]">
                {tDetail('share')}
              </span>
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))] transition-colors hover:bg-[hsl(var(--gold))]/20"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </header>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
            <article className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-lg sm:p-8">
              <div
                className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-serif prose-headings:text-[hsl(var(--fg))] prose-p:text-[hsl(var(--muted))] prose-a:text-[hsl(var(--gold))] prose-strong:text-[hsl(var(--fg))]"
                dangerouslySetInnerHTML={{ __html: enhancedHtml }}
              />
            </article>

            {headingMatches.length > 0 && (
              <aside className="sticky top-32 hidden h-fit rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-lg lg:block">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--gold))]">
                  {tDetail('contents')}
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-[hsl(var(--muted))]">
                  {headingMatches.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="inline-flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:text-[hsl(var(--gold))]"
                      >
                        <span className="h-1 w-1 rounded-full bg-[hsl(var(--gold))]" aria-hidden />
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>

          <aside className="mt-10 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-sm text-[hsl(var(--muted))]">
            {tDetail('disclaimer')}
          </aside>
          <p className="mt-4 text-sm text-[hsl(var(--muted))]">{tDetail('generalNotice')}</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
