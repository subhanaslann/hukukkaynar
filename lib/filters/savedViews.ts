import type { FilterState } from './urlSync';

const STORAGE_KEY = 'aktuel_saved_views';
const MAX_SAVED_VIEWS = 10;

export interface SavedView {
  id: string;
  name: string;
  filters: FilterState;
  createdAt: string;
  lastUsed?: string;
}

/**
 * Kaydedilmiş görünümleri localStorage'dan al
 */
export function getSavedViews(): SavedView[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading saved views:', error);
    return [];
  }
}

/**
 * Yeni görünüm kaydet
 */
export function saveView(name: string, filters: FilterState): SavedView {
  const views = getSavedViews();

  const newView: SavedView = {
    id: `view-${Date.now()}`,
    name,
    filters,
    createdAt: new Date().toISOString()
  };

  // En fazla MAX_SAVED_VIEWS kadar tut
  const updated = [newView, ...views].slice(0, MAX_SAVED_VIEWS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving view:', error);
  }

  return newView;
}

/**
 * Görünümü sil
 */
export function deleteView(id: string): void {
  const views = getSavedViews();
  const updated = views.filter((v) => v.id !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error deleting view:', error);
  }
}

/**
 * Görünümü güncelle (son kullanım zamanı)
 */
export function markViewAsUsed(id: string): void {
  const views = getSavedViews();
  const updated = views.map((v) => (v.id === id ? { ...v, lastUsed: new Date().toISOString() } : v));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error updating view:', error);
  }
}

/**
 * Görünüm adından kısa etiket oluştur (filtrelerden)
 */
export function generateViewName(filters: FilterState): string {
  const parts: string[] = [];

  if (filters.dateRange) {
    parts.push('Tarihli');
  }

  if (filters.categories.length > 0) {
    if (filters.categories.length === 1) {
      parts.push(filters.categories[0]);
    } else {
      parts.push(`${filters.categories.length} Alan`);
    }
  }

  if (filters.types.length > 0) {
    parts.push(filters.types.join('+'));
  }

  if (filters.search) {
    parts.push(`"${filters.search.slice(0, 20)}"`);
  }

  return parts.length > 0 ? parts.join(' • ') : 'Tüm İçerikler';
}
