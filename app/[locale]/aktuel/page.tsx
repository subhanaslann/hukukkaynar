import type { Metadata } from 'next';
import AktuelClient from './AktuelClient';
import { PAGE_COPY } from './pageCopy';
import { buildPageMetadata } from '@/lib/seo';
import { locales, type Locale } from '@/i18n';

export const dynamic = 'force-static';

interface PageProps {
  params: { locale: Locale };
}

function resolveLocale(locale: string | undefined): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : 'tr';
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = resolveLocale(params.locale);
  const copy = PAGE_COPY[locale] ?? PAGE_COPY.tr;
  return buildPageMetadata(copy.metaTitle, copy.metaDescription);
}

export default function Page({ params }: PageProps) {
  const locale = resolveLocale(params.locale);
  return <AktuelClient locale={locale} />;
}
