'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/lib/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { formatDate } from '@/lib/formatDate';
import { useAnimEnabled } from '@/components/AnimationProvider';
import Reveal from '@/components/Reveal';
import FilterBar from '@/components/filters/FilterBar';
import ActiveFilters from '@/components/filters/ActiveFilters';
import CategoryChips from '@/components/filters/CategoryChips';
import DateRangePicker from '@/components/filters/DateRangePicker';
import AdvancedFilters from '@/components/filters/AdvancedFilters';
import { ListSkeleton } from '@/components/shared/ListSkeleton';
import { LoadMore } from '@/components/shared/LoadMore';

// Filtre yardımcıları
import type { DateRangeOption } from '@/lib/filters/quickRanges';
import { getQuickRange } from '@/lib/filters/quickRanges';
import type { FilterState } from '@/lib/filters/urlSync';
import { DEFAULT_FILTER_STATE, parseFiltersFromURL, serializeFiltersToURL } from '@/lib/filters/urlSync';
import type { Locale } from '@/i18n';

export type Article = { slug: string; title: string; date: string; areas: string[]; excerpt: string };

const PER_PAGE = 9;

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

  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query)
    );
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
  const basePath = `/makaleler`;
  const tList = useTranslations('pages.articles.list');
  const tEmpty = useTranslations('pages.articles.empty');

  const [filters, setFilters] = useState<FilterState>(() => parseFiltersFromURL(searchParams));
  const [searchDraft, setSearchDraft] = useState(filters.search);
  const [selectedQuickRange, setSelectedQuickRange] = useState<DateRangeOption | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(() => {
    const pageParam = Number(searchParams.get('page') ?? '1');
    return Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  });

  useEffect(() => {
    setSearchDraft(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => (prev.search === searchDraft ? prev : { ...prev, search: searchDraft }));
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchDraft]);

  // Filtrelenmiş sonuçlar
  const filtered = useMemo(() => filterArticles(items, filters), [items, filters]);
  const paginated = useMemo(() => filtered.slice(0, page * PER_PAGE), [filtered, page]);
  const hasMore = paginated.length < filtered.length;
  const shouldAnimate = animEnabled && page * PER_PAGE < 160;

  // Alan meta verileri
  const allAreas = useMemo(() => extractAllAreas(items), [items]);
  const areaCounts = useMemo(() => getAreaCounts(items, filters), [items, filters]);

  // Filtre değiştiğinde URL'i güncelle
  useEffect(() => {
    const filterString = serializeFiltersToURL(filters);
    const params = new URLSearchParams(filterString ? filterString.slice(1) : '');
    if (page > 1) {
      params.set('page', String(page));
      params.set('per', String(PER_PAGE));
    } else {
      params.delete('page');
      params.delete('per');
    }
    const queryString = params.toString();
    const url = queryString ? `${basePath}?${queryString}` : basePath;

    if (typeof window !== 'undefined' && window.location.pathname + window.location.search !== url) {
      router.replace(url as any, { scroll: false });
    }
  }, [filters, page, router, basePath]);

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
      setPage(1);
      setTimeout(() => setIsLoading(false), 200);
    }
  }

  // Sıralama değiştir
  function handleSortChange(sort: 'desc' | 'asc') {
    setFilters((prev) => ({ ...prev, sort }));
    setPage(1);
  }

  // Tüm filtreleri sıfırla
  function handleReset() {
    setFilters(DEFAULT_FILTER_STATE);
    setSelectedQuickRange(null);
    setSearchDraft('');
    setPage(1);
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
    setPage(1);
  }

  function handleRemoveDateRange() {
    setFilters((prev) => ({ ...prev, dateRange: null }));
    setSelectedQuickRange(null);
    setPage(1);
  }

  function handleRemoveSearch() {
    setSearchDraft('');
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

      <div className="mt-6">
        <ActiveFilters
          filters={filters}
          onRemoveCategory={handleToggleArea}
          onRemoveType={() => {}}
          onRemoveSource={() => {}}
          onRemoveDateRange={handleRemoveDateRange}
          onRemoveSearch={handleRemoveSearch}
          onClearAll={handleReset}
        />
      </div>

      <div className="mb-6 mt-4" role="status" aria-live="polite">
        <p className="text-sm font-semibold text-[hsl(var(--muted))]">{tList('results', { count: filtered.length })}</p>
      </div>

      <div className="mb-6">
        <CategoryChips
          categories={allAreas}
          selectedCategories={filters.categories}
          onToggle={handleToggleArea}
          counts={areaCounts}
          maxVisibleChips={8}
        />
      </div>

      <AdvancedFilters
        searchQuery={searchDraft}
        onSearchChange={setSearchDraft}
        showSearch
        showTypes={false}
        showSources={false}
        searchPlaceholder={tList('searchPlaceholder')}
      />

      <div className="mt-8 content-visibility-auto">
        {isLoading ? (
          <ListSkeleton rows={3} />
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-12 text-center shadow-lg"
          >
            <svg className="mx-auto mb-4 h-16 w-16 text-[hsl(var(--muted))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mb-2 text-lg font-semibold text-[hsl(var(--fg))]">{tEmpty('title')}</h3>
            <p className="text-sm text-[hsl(var(--muted))]">{tEmpty('description')}</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.ul layout className="space-y-4" aria-label={tList('results', { count: filtered.length })}>
              {paginated.map((article, index) => {
                const href = `${basePath}/${article.slug}`;
                const animationDelay = shouldAnimate ? index * 0.04 : 0;
                return (
                  <motion.li
                    key={article.slug}
                    layout
                    initial={shouldAnimate ? { opacity: 0, y: 18 } : {}}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                    exit={shouldAnimate ? { opacity: 0, scale: 0.95 } : {}}
                    transition={{ delay: animationDelay }}
                    className="group relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <span className="absolute left-0 top-0 h-full w-1 bg-[hsl(var(--gold))] opacity-80" aria-hidden />
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                          <time className="font-semibold text-[hsl(var(--gold))]">
                            {formatDate(article.date, 'long', locale)}
                          </time>
                        </div>

                        <div className="space-y-3">
                          <Link
                            href={href}
                            className="block focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--card))]"
                          >
                            <h3 className="text-xl font-bold leading-tight text-[hsl(var(--fg))] transition-colors group-hover:text-[hsl(var(--gold))] sm:text-2xl">
                              {article.title}
                            </h3>
                          </Link>
                          <p className="text-sm leading-relaxed text-[hsl(var(--muted))] sm:text-base">{article.excerpt}</p>
                        </div>

                        {article.areas && article.areas.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {article.areas.slice(0, 4).map((area) => (
                              <span
                                key={area}
                                className="inline-flex items-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[hsl(var(--gold))]"
                              >
                                {area}
                              </span>
                            ))}
                            {article.areas.length > 4 && (
                              <span className="inline-flex items-center rounded-full border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 px-2.5 py-0.5 text-[11px] font-medium text-[hsl(var(--muted))]">
                                +{article.areas.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <Link href={href} aria-label={article.title} className="self-center md:self-start">
                        <motion.div whileHover={{ x: 4 }} className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] shadow-md transition-all hover:bg-[hsl(var(--gold))]/20">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </Link>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        )}
      </div>

      <LoadMore
        onLoadMore={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        isLoading={isLoading}
        label={tList('loadMore')}
        loadingLabel={tList('loadingMore')}
      />

      {/* Tarih Seçici Dialog */}
      <AnimatePresence>
        {showDatePicker && (
      <DateRangePicker
        value={filters.dateRange}
        onChange={(range) => {
          setFilters((prev) => ({ ...prev, dateRange: range }));
          setPage(1);
          setSelectedQuickRange(range ? 'custom' : null);
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
