import { redirect } from 'next/navigation';
import { getNewsById, getAllNewsIds } from '@/lib/aktuel';
import { buildPageMetadata } from '@/lib/seo';
import { localizedHref } from '@/lib/i18n/navigation';
import { locales, type Locale } from '@/i18n';

export const dynamic = 'force-static';
export const revalidate = 3600;

interface LegacyNewsPageProps {
  params: { locale: Locale; id: string };
}

export async function generateStaticParams() {
  const ids = getAllNewsIds();
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

export async function generateMetadata({ params }: LegacyNewsPageProps) {
  const news = getNewsById(params.id);
  if (!news) {
    return buildPageMetadata('Aktüel içerik bulunamadı');
  }
  return buildPageMetadata(news.title, news.excerpt);
}

export default function LegacyNewsPage({ params }: LegacyNewsPageProps) {
  const { locale, id } = params;
  const target = localizedHref(locale, `/aktuel/${id}`);
  redirect(target as string);
}
