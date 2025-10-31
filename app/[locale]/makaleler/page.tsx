import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import data from '@/content/makaleler.json';
import { buildPageMetadata } from '@/lib/seo';
import ArticlesClient, { type Article } from './ArticlesClient';

interface ArticlesPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.articles.metadata' });
  return buildPageMetadata(t('title'), t('description'));
}

export default function Page() {
  const items = data as Article[];
  return <ArticlesClient items={items} />;
}
