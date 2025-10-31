import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export interface ArticleMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

const articlesDir = path.join(process.cwd(), 'content', 'makaleler');

// Cache for articles (performance optimization)
const articleCache = new Map<string, Article>();
const articleMetaCache = new Map<string, ArticleMeta[]>();

export async function getArticleSlugs(): Promise<string[]> {
  const entries = await fs.readdir(articlesDir);
  return entries
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export async function getArticles(): Promise<ArticleMeta[]> {
  // Check cache first
  if (articleMetaCache.has('all')) {
    return articleMetaCache.get('all')!;
  }

  const slugs = await getArticleSlugs();
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await fs.readFile(path.join(articlesDir, `${slug}.md`), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        summary: data.summary as string,
        date: data.date as string
      } satisfies ArticleMeta;
    })
  );

  const sorted = articles.sort((a, b) => (a.date < b.date ? 1 : -1));

  // Cache the result
  articleMetaCache.set('all', sorted);

  return sorted;
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  // Check cache first
  if (articleCache.has(slug)) {
    return articleCache.get(slug)!;
  }

  const raw = await fs.readFile(path.join(articlesDir, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);

  const article = {
    slug,
    title: data.title as string,
    summary: data.summary as string,
    date: data.date as string,
    content
  } satisfies Article;

  // Cache the result
  articleCache.set(slug, article);

  return article;
}
