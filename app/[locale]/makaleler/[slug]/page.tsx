import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import { markdownToHtml } from '@/lib/markdown';
import { formatDate } from '@/lib/formatDate';
import { buildPageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

// Force static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

interface ArticlePageProps {
  params: { slug: string; locale: string };
}

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

  return buildPageMetadata(article.title, article.summary ?? tMetadata('description'));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = params;
  const article = await getArticleBySlug(slug).catch(() => null);
  if (!article) {
    notFound();
  }
  const html = await markdownToHtml(article.content);
  const tDetail = await getTranslations({ locale, namespace: 'pages.articles.detail' });
  const formattedDate = formatDate(article.date, 'long', locale as Locale);

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}/makaleler`} className="text-xs sm:text-sm text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          {tDetail('back')}
        </Link>
        <header className="mt-4 sm:mt-6">
          <p className="text-xs uppercase text-[hsl(var(--gold))] font-semibold tracking-wider">
            {formattedDate}
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-[hsl(var(--fg))]">{article.title}</h1>
          <p className="mt-2 text-sm sm:text-base text-[hsl(var(--muted))]">{article.summary}</p>
        </header>
        <article className="prose prose-invert prose-sm sm:prose-base mt-6 sm:mt-8 max-w-none prose-headings:text-[hsl(var(--fg))] prose-p:text-[hsl(var(--muted))] prose-a:text-[hsl(var(--gold))] prose-strong:text-[hsl(var(--fg))] prose-ul:text-[hsl(var(--muted))] prose-ol:text-[hsl(var(--muted))]" dangerouslySetInnerHTML={{ __html: html }} />
        <aside className="mt-6 sm:mt-8 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 sm:p-4 text-xs sm:text-sm text-[hsl(var(--muted))]">
          {tDetail('disclaimer')}
        </aside>
        <p className="mt-4 text-sm text-[hsl(var(--muted))]">{tDetail('generalNotice')}</p>
      </div>
    </section>
  );
}
