import type { Locale } from '@/i18n';

export interface AktuelPageCopy {
  subtitle: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  metaTitle: string;
  metaDescription: string;
}

export const PAGE_COPY: Record<Locale, AktuelPageCopy> = {
  tr: {
    subtitle: 'Güncel hukuk haberleri ve duyurular',
    description: 'Resmî kaynaklardan seçilen haberleri tarih, kategori, tür ve kaynağa göre filtreleyin.',
    emptyTitle: 'Sonuç bulunamadı',
    emptyDescription: 'Farklı filtre kombinasyonları deneyerek yeni içerikler keşfedebilirsiniz.',
    metaTitle: 'Aktüel Haberler',
    metaDescription: 'Güncel hukuk haberleri, duyurular ve mevzuat gelişmeleri. Filtrelenebilir aktüel listesi.'
  },
  en: {
    subtitle: 'Curated legal developments and announcements',
    description: 'Filter the latest legal headlines by date, category, content type and source.',
    emptyTitle: 'No results found',
    emptyDescription: 'Try adjusting the filters to explore different updates.',
    metaTitle: 'Legal News & Updates',
    metaDescription: 'Curated legal news, official announcements and regulatory updates with filter support.'
  },
  ar: {
    subtitle: 'أحدث المستجدات والإعلانات القانونية',
    description: 'قم بتصفية الأخبار القانونية حسب التاريخ أو التصنيف أو نوع المحتوى أو الجهة الصادرة.',
    emptyTitle: 'لا توجد نتائج',
    emptyDescription: 'جرّب تعديل عوامل التصفية للاطلاع على تحديثات أخرى.',
    metaTitle: 'آخر الأخبار القانونية',
    metaDescription: 'أخبار وإعلانات قانونية رسمية مع إمكانية التصفية حسب التصنيف والنوع والجهة.'
  }
};
