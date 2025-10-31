import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';
import { locales, defaultLocale, type Locale } from '@/i18n';
import { PRACTICE_AREA_DEFINITIONS } from '@/lib/areas';
import { getArticles } from '@/lib/articles';
import { getAllNews } from '@/lib/aktuel';

type PathConfig = {
  path: string;
  lastModified?: Date;
};

function buildUrl(locale: Locale, path: string): string {
  const cleaned = path === '/' ? '' : path.replace(/^\/+/, '');
  const pathname = cleaned ? `${locale}/${cleaned}` : locale;
  return `${SITE_URL}/${pathname}`;
}

function parseLastModified(input?: string): Date | undefined {
  if (!input) return undefined;
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function createEntry({ path, lastModified }: PathConfig): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(locales.map((locale) => [locale, buildUrl(locale, path)]));
  return {
    url: buildUrl(defaultLocale, path),
    lastModified,
    changeFrequency: 'weekly',
    alternates: { languages }
  } as any;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articleMeta = await getArticles();
  const newsItems = getAllNews();

  const staticPaths: PathConfig[] = [
    { path: '/' },
    { path: '/hakkimizda' },
    { path: '/calisma-alanlari' },
    { path: '/ekibimiz' },
    { path: '/aktuel' },
    { path: '/iletisim' },
    { path: '/makaleler' },
    { path: '/kvkk/aydinlatma' },
    { path: '/kvkk/cerez-politikasi' },
    { path: '/kvkk/veri-sahibi-basvuru' },
    { path: '/hukuki/sorumluluk-reddi' },
    { path: '/hukuki/kullanim-sartlari' },
    { path: '/sss' }
  ];

  const practiceAreaPaths: PathConfig[] = PRACTICE_AREA_DEFINITIONS.map((definition) => ({
    path: `/calisma-alanlari/${definition.segment}`
  }));

  const articlePaths: PathConfig[] = articleMeta.map((article) => ({
    path: `/makaleler/${article.slug}`,
    lastModified: parseLastModified(article.date)
  }));

  const newsPaths: PathConfig[] = newsItems.map((item) => ({
    path: `/${item.id}`,
    lastModified: parseLastModified(item.date)
  }));

  return [...staticPaths, ...practiceAreaPaths, ...articlePaths, ...newsPaths].map(createEntry);
}
