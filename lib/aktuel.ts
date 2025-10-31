import dailyData from '@/content/aktuel/daily.json';
import weeklyData from '@/content/aktuel/weekly.json';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  url?: string;
  categories?: string[];
  type?: string;
  source?: string;
  tags?: string[];
}

// Cache for all news (performance optimization)
let cachedAllNews: NewsItem[] | null = null;

// Tüm haberleri getir
export function getAllNews(): NewsItem[] {
  if (cachedAllNews) {
    return cachedAllNews;
  }
  cachedAllNews = [...dailyData, ...weeklyData] as NewsItem[];
  return cachedAllNews;
}

// ID'ye göre haber getir
export function getNewsById(id: string): NewsItem | null {
  const allNews = getAllNews();
  return allNews.find((news) => news.id === id) || null;
}

// Tüm haber ID'lerini getir (static generation için)
export function getAllNewsIds(): string[] {
  const allNews = getAllNews();
  return allNews.map((news) => news.id);
}
