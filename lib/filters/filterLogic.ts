import type { FilterState } from './urlSync';

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

/**
 * Haber öğelerini filtrelere göre filtrele
 */
export function filterNewsItems(items: NewsItem[], filters: FilterState): NewsItem[] {
  let filtered = [...items];

  // Tarih aralığı filtresi
  if (filters.dateRange) {
    const { start, end } = filters.dateRange;
    filtered = filtered.filter((item) => {
      const itemDate = item.date;
      return itemDate >= start && itemDate <= end;
    });
  }

  // Kategori filtresi (multi-select, OR mantığı)
  if (filters.categories.length > 0) {
    filtered = filtered.filter((item) => {
      if (!item.categories) return false;
      return item.categories.some((cat) => filters.categories.includes(cat));
    });
  }

  // İçerik türü filtresi
  if (filters.types.length > 0) {
    filtered = filtered.filter((item) => {
      if (!item.type) return false;
      return filters.types.includes(item.type);
    });
  }

  // Kaynak filtresi
  if (filters.sources.length > 0) {
    filtered = filtered.filter((item) => {
      if (!item.source) return false;
      return filters.sources.includes(item.source);
    });
  }

  // Arama filtresi (başlık, özet, etiketlerde ara)
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchLower);
      const excerptMatch = item.excerpt.toLowerCase().includes(searchLower);
      const tagsMatch = item.tags?.some((tag) => tag.toLowerCase().includes(searchLower));
      return titleMatch || excerptMatch || tagsMatch;
    });
  }

  // Sıralama
  filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return filters.sort === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return filtered;
}

/**
 * Tüm kategorileri benzersiz şekilde çıkar
 */
export function extractAllCategories(items: NewsItem[]): string[] {
  const categories = new Set<string>();
  items.forEach((item) => {
    item.categories?.forEach((cat) => categories.add(cat));
  });
  return Array.from(categories).sort();
}

/**
 * Tüm içerik türlerini çıkar
 */
export function extractAllTypes(items: NewsItem[]): string[] {
  const types = new Set<string>();
  items.forEach((item) => {
    if (item.type) types.add(item.type);
  });
  return Array.from(types).sort();
}

/**
 * Tüm kaynakları çıkar
 */
export function extractAllSources(items: NewsItem[]): string[] {
  const sources = new Set<string>();
  items.forEach((item) => {
    if (item.source) sources.add(item.source);
  });
  return Array.from(sources).sort();
}

/**
 * Her kategori için sonuç sayısını hesapla
 */
export function getCategoryCounts(items: NewsItem[], filters: FilterState): Record<string, number> {
  const counts: Record<string, number> = {};
  const allCategories = extractAllCategories(items);

  allCategories.forEach((cat) => {
    const tempFilter = { ...filters, categories: [cat] };
    const filtered = filterNewsItems(items, tempFilter);
    counts[cat] = filtered.length;
  });

  return counts;
}
