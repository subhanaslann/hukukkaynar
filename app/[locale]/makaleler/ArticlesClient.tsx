'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { formatDate } from '@/lib/formatDate';
import { useAnimEnabled } from '@/components/AnimationProvider';
import Reveal from '@/components/Reveal';

// Filtre bileşenleri
import FilterBar from '@/components/filters/FilterBar';
import ActiveFilters from '@/components/filters/ActiveFilters';
import CategoryChips from '@/components/filters/CategoryChips';
import DateRangePicker from '@/components/filters/DateRangePicker';

// Filtre yardımcıları
import type { DateRangeOption } from '@/lib/filters/quickRanges';
import { getQuickRange } from '@/lib/filters/quickRanges';
import type { FilterState } from '@/lib/filters/urlSync';
import { DEFAULT_FILTER_STATE, parseFiltersFromURL, serializeFiltersToURL } from '@/lib/filters/urlSync';
import type { Locale } from '@/i18n';

export type Article = { slug: string; title: string; date: string; areas: string[]; excerpt: string };

// Article'ları filtrele
function filterArticles(items: Article[], filters: FilterState): Article[] {
  let filtered = [...items];

  // Tarih aralığı filtresi
  if (filters.dateRange) {
    const { start, end } = filters.dateRange;
    filtered = filtered.filter((item) => {
      const itemDate = item.date;
      return itemDate >= start && itemDate <= end;
    });
  }

  // Hukuk alanları filtresi (multi-select, OR mantığı)
  if (filters.categories.length > 0) {
    filtered = filtered.filter((item) => {
      return item.areas.some((area) => filters.categories.includes(area));
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

// Tüm hukuk alanlarını benzersiz şekilde çıkar
function extractAllAreas(items: Article[]): string[] {
  const areas = new Set<string>();
  items.forEach((item) => {
    item.areas.forEach((area) => areas.add(area));
  });
  return Array.from(areas).sort();
}

// Her alan için sonuç sayısını hesapla
function getAreaCounts(items: Article[], filters: FilterState): Record<string, number> {
  const counts: Record<string, number> = {};
  const allAreas = extractAllAreas(items);

  allAreas.forEach((area) => {
    const tempFilter = { ...filters, categories: [area] };
    const filtered = filterArticles(items, tempFilter);
    counts[area] = filtered.length;
  });

  return counts;
}

export default function ArticlesClient({ items }: { items: Article[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const animEnabled = useAnimEnabled('lite');
  const locale = useLocale() as Locale;
  const basePath = `/${locale}/makaleler`;
  const tList = useTranslations('pages.articles.list');
  const tEmpty = useTranslations('pages.articles.empty');

  // Filtre state
  const [filters, setFilters] = useState<FilterState>(() => {
    // Initial state'i URL'den yükle
    return parseFiltersFromURL(searchParams);
  });
  const [selectedQuickRange, setSelectedQuickRange] = useState<DateRangeOption | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filtrelenmiş sonuçlar
  const filtered = useMemo(() => filterArticles(items, filters), [items, filters]);

  // Alan meta verileri
  const allAreas = useMemo(() => extractAllAreas(items), [items]);
  const areaCounts = useMemo(() => getAreaCounts(items, filters), [items, filters]);

  // Filtre değiştiğinde URL'i güncelle
  useEffect(() => {
    const queryString = serializeFiltersToURL(filters);
    const url = `${basePath}${queryString}`;

    // Mevcut URL'den farklıysa güncelle
    if (window.location.pathname + window.location.search !== url) {
      router.replace(url as any, { scroll: false });
    }
  }, [filters, router, basePath]);

  // Tarih aralığı seçimi
  function handleDateRangeSelect(option: DateRangeOption) {
    setIsLoading(true);
    setSelectedQuickRange(option);

    if (option === 'custom') {
      setShowDatePicker(true);
      setIsLoading(false);
    } else {
      const range = getQuickRange(option);
      setFilters((prev) => ({ ...prev, dateRange: range }));
      setTimeout(() => setIsLoading(false), 200);
    }
  }

  // Sıralama değiştir
  function handleSortChange(sort: 'desc' | 'asc') {
    setFilters((prev) => ({ ...prev, sort }));
  }

  // Tüm filtreleri sıfırla
  function handleReset() {
    setFilters(DEFAULT_FILTER_STATE);
    setSelectedQuickRange(null);
    router.push(basePath as any);
  }

  // Alan toggle
  function handleToggleArea(area: string) {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(area)
        ? prev.categories.filter((c) => c !== area)
        : [...prev.categories, area]
    }));
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      <Reveal>
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--fg))]">{tList('heading')}</h1>
          <div className="mt-3 h-1 w-24 mx-auto gold-line"></div>
          <p className="mt-4 text-base sm:text-lg text-[hsl(var(--muted))] max-w-2xl mx-auto">
            {tList('subtitle')}
          </p>
          <p className="mt-2 text-sm sm:text-base text-[hsl(var(--muted))] max-w-2xl mx-auto">
            {tList('description')}
          </p>
        </header>
      </Reveal>

      {/* Filtre Çubuğu */}
      <FilterBar
        filters={filters}
        onDateRangeSelect={handleDateRangeSelect}
        onSortChange={handleSortChange}
        onReset={handleReset}
        selectedQuickRange={selectedQuickRange}
      />

      {/* Aktif Filtreler */}
      <div className="mt-6">
        <ActiveFilters
          filters={filters}
          onRemoveCategory={(area) => handleToggleArea(area)}
          onRemoveType={() => {}} // Tip filtresi yok
          onRemoveSource={() => {}} // Kaynak filtresi yok
          onRemoveDateRange={() => {
            setFilters((prev) => ({ ...prev, dateRange: null }));
            setSelectedQuickRange(null);
          }}
          onRemoveSearch={() => {}} // Arama filtresi yok
          onClearAll={handleReset}
        />
      </div>

      {/* Sonuç sayısı */}
      <div className="mb-6 mt-4" role="status" aria-live="polite">
        <p className="text-sm font-semibold text-[hsl(var(--muted))]">{tList('results', { count: filtered.length })}</p>
      </div>

      {/* Hukuk Alanları Chip'leri */}
      <div className="mb-6">
        <CategoryChips
          categories={allAreas}
          selectedCategories={filters.categories}
          onToggle={handleToggleArea}
          counts={areaCounts}
          maxVisibleChips={8}
        />
      </div>

      {/* Sonuç Listesi */}
      <div className="mt-8">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <div className="mb-2 h-4 w-32 rounded bg-[hsl(var(--border))]" />
                <div className="mb-2 h-6 w-3/4 rounded bg-[hsl(var(--border))]" />
                <div className="h-16 w-full rounded bg-[hsl(var(--border))]" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-12 text-center"
          >
            <svg className="mx-auto mb-4 h-16 w-16 text-[hsl(var(--muted))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mb-2 text-lg font-semibold text-[hsl(var(--fg))]">{tEmpty('title')}</h3>
            <p className="text-sm text-[hsl(var(--muted))]">{tEmpty('description')}</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.ul layout className="space-y-4">
              {filtered.map((m, index) => (
                <motion.li
                  key={m.slug}
                  layout
                  initial={animEnabled ? { opacity: 0, y: 20 } : {}}
                  animate={animEnabled ? { opacity: 1, y: 0 } : {}}
                  exit={animEnabled ? { opacity: 0, scale: 0.95 } : {}}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  {/* Gold accent bar */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-[hsl(var(--gold))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-3">
                        <time className="text-sm font-semibold text-[hsl(var(--gold))]">
                          {formatDate(m.date, 'long', locale)}
                        </time>
                        <div className="flex flex-wrap gap-1.5">
                          {m.areas.slice(0, 2).map((a) => (
                            <span
                              key={a}
                              className="rounded-full bg-[hsl(var(--gold))]/10 px-2.5 py-1 text-xs font-medium text-[hsl(var(--gold))] border border-[hsl(var(--gold))]/30"
                            >
                              {a}
                            </span>
                          ))}
                          {m.areas.length > 2 && (
                            <span className="rounded-full bg-[hsl(var(--gold))]/10 px-2.5 py-1 text-xs font-medium text-[hsl(var(--muted))] border border-[hsl(var(--gold))]/30">
                              +{m.areas.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      <Link href={`${basePath}/${m.slug}` as any}>
                        <h3 className="mb-2 text-xl font-bold leading-tight text-[hsl(var(--fg))] transition-colors group-hover:text-[hsl(var(--gold))]">
                          {m.title}
                        </h3>
                      </Link>

                      <p className="leading-relaxed text-[hsl(var(--muted))]">
                        {m.excerpt}
                      </p>
                    </div>

                    <Link href={`${basePath}/${m.slug}` as any}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex-shrink-0"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] shadow-md transition-all hover:bg-[hsl(var(--gold))]/20 border border-[hsl(var(--gold))]/30">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        )}
      </div>

      {/* Tarih Seçici Dialog */}
      <AnimatePresence>
        {showDatePicker && (
          <DateRangePicker
            value={filters.dateRange}
            onChange={(range) => {
              setFilters((prev) => ({ ...prev, dateRange: range }));
              if (!range) setSelectedQuickRange(null);
            }}
            onClose={() => {
              setShowDatePicker(false);
              if (!filters.dateRange) setSelectedQuickRange(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
