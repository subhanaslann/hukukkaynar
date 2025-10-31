import type { DateRange } from './quickRanges';

export interface FilterState {
  dateRange: DateRange | null;
  categories: string[];
  sort: 'desc' | 'asc'; // desc = Yeni -> Eski, asc = Eski -> Yeni
  types: string[]; // Haber, Duyuru, Analiz
  sources: string[]; // Resmî Gazete, Baro, Blog
  search: string;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  dateRange: null,
  categories: [],
  sort: 'desc',
  types: [],
  sources: [],
  search: ''
};

/**
 * URL query parametrelerinden filtre state'ini oluştur
 */
export function parseFiltersFromURL(searchParams: URLSearchParams): FilterState {
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  const dateRange = start && end ? { start, end } : null;

  const categories = searchParams.get('areas')?.split(',').filter(Boolean) || [];
  const types = searchParams.get('types')?.split(',').filter(Boolean) || [];
  const sources = searchParams.get('sources')?.split(',').filter(Boolean) || [];
  const sort = (searchParams.get('sort') || 'desc') as 'desc' | 'asc';
  const search = searchParams.get('q') || '';

  return {
    dateRange,
    categories,
    sort,
    types,
    sources,
    search
  };
}

/**
 * Filtre state'ini URL query parametrelerine çevir
 */
export function serializeFiltersToURL(filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.dateRange) {
    params.set('start', filters.dateRange.start);
    params.set('end', filters.dateRange.end);
  }

  if (filters.categories.length > 0) {
    params.set('areas', filters.categories.join(','));
  }

  if (filters.types.length > 0) {
    params.set('types', filters.types.join(','));
  }

  if (filters.sources.length > 0) {
    params.set('sources', filters.sources.join(','));
  }

  if (filters.sort !== 'desc') {
    params.set('sort', filters.sort);
  }

  if (filters.search) {
    params.set('q', filters.search);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Filtreleri URL'e yaz (tarayıcı history'ye pushlar)
 * NOT: Bu fonksiyon artık kullanılmıyor, component içinde useRouter ile yapılıyor
 * @deprecated Use router.push or router.replace in component instead
 */
export function syncFiltersToURL(filters: FilterState, replaceState = false) {
  // This function is deprecated - use router in component
  console.warn('syncFiltersToURL is deprecated, use router.push/replace in component');
}

/**
 * Aktif filtre sayısı
 */
export function getActiveFilterCount(filters: FilterState): number {
  let count = 0;

  if (filters.dateRange) count += 1;
  count += filters.categories.length;
  count += filters.types.length;
  count += filters.sources.length;
  if (filters.search) count += 1;

  return count;
}

/**
 * Filtrelerin varsayılan durumda olup olmadığını kontrol et
 */
export function isDefaultState(filters: FilterState): boolean {
  return getActiveFilterCount(filters) === 0 && filters.sort === 'desc';
}
