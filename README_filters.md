# Aktüel Sayfası Filtre Sistemi

Bu döküman, `/aktuel` sayfasındaki yeni filtre sisteminin kullanımını, mimari yapısını ve erişilebilirlik özelliklerini açıklar.

## Genel Bakış

Aktüel sayfası, hukuk haberlerini ve gelişmelerini filtrelemek için kapsamlı, erişilebilir ve mobil-uyumlu bir "facet'li filtre" sistemi sunar.

### Özellikler

- ✅ **Hızlı Tarih Filtreleri**: Bugün, Son 7 Gün, Bu Ay, Bu Yıl, Özel Aralık
- ✅ **Hukuk Alanı Seçimi**: Multi-select chip'ler ile kategori filtreleme
- ✅ **Gelişmiş Filtreler**: İçerik türü, kaynak, arama
- ✅ **URL Senkronizasyonu**: Tüm filtreler URL'de saklanır
- ✅ **Sticky Filter Bar**: Scroll'da üstte sabit kalır
- ✅ **Erişilebilirlik**: WCAG 2.1 AA uyumlu
- ✅ **Mobil Uyumlu**: 320px'den itibaren çalışır
- ✅ **Skeleton Loading**: Filtre değişiminde loading state
- ✅ **Aktif Filtre Gösterimi**: Pill formatında tek tıkla kaldırma

## Dosya Yapısı

```
lib/filters/
├── quickRanges.ts       # Tarih aralığı hesaplamaları ve validasyon
├── urlSync.ts           # URL ↔ State senkronizasyonu
├── filterLogic.ts       # Filtreleme mantığı ve item işleme
└── savedViews.ts        # localStorage ile kaydedilmiş görünümler (opsiyonel)

components/filters/
├── FilterBar.tsx        # Üst hızlı filtre çubuğu
├── ActiveFilters.tsx    # Seçili filtrelerin pill'leri
├── CategoryChips.tsx    # Hukuk alanı chip'leri + "Daha Fazla" dialog
├── DateRangePicker.tsx  # Özel tarih aralığı seçici dialog
└── AdvancedFilters.tsx  # Gelişmiş filtreler (İçerik türü, kaynak, arama)

content/aktuel/
├── daily.json           # Günlük haberler (genişletilmiş veri yapısı)
└── weekly.json          # Haftalık haberler (genişletilmiş veri yapısı)
```

## Veri Yapısı

### NewsItem

```typescript
interface NewsItem {
  id: string;
  title: string;
  date: string; // ISO format: YYYY-MM-DD
  excerpt: string;
  url?: string;
  categories?: string[]; // Hukuk alanları (örn: ["Ceza Hukuku", "İdare Hukuku"])
  type?: string; // İçerik türü: "Haber", "Duyuru", "Analiz"
  source?: string; // Kaynak: "Resmî Gazete", "Baro", "Blog"
  tags?: string[]; // Arama için etiketler
}
```

### FilterState

```typescript
interface FilterState {
  dateRange: { start: string; end: string } | null;
  categories: string[]; // Seçili hukuk alanları
  sort: 'desc' | 'asc'; // desc = Yeni → Eski, asc = Eski → Yeni
  types: string[]; // Seçili içerik türleri
  sources: string[]; // Seçili kaynaklar
  search: string; // Arama sorgusu
}
```

## URL Şeması

Tüm filtreler query parametreleri olarak URL'de saklanır:

```
/aktuel?start=2025-10-01&end=2025-10-30&areas=ceza,aile&types=haber&sources=baro&sort=desc&q=yargıtay
```

### Query Parametreleri

| Parametre | Açıklama | Örnek |
|-----------|----------|-------|
| `start` | Başlangıç tarihi (YYYY-MM-DD) | `2025-10-01` |
| `end` | Bitiş tarihi (YYYY-MM-DD) | `2025-10-30` |
| `areas` | Hukuk alanları (virgülle ayrılmış) | `ceza,aile,idare` |
| `types` | İçerik türleri (virgülle ayrılmış) | `haber,duyuru` |
| `sources` | Kaynaklar (virgülle ayrılmış) | `baro,blog` |
| `sort` | Sıralama (`desc` veya `asc`) | `desc` |
| `q` | Arama sorgusu | `yargıtay` |

## Kullanım Örnekleri

### Programatik Filtre Uygulama

```typescript
import { useRouter } from 'next/navigation';
import { serializeFiltersToURL } from '@/lib/filters/urlSync';

// Component içinde
const router = useRouter();

// Filtreleri uygula
const filters = {
  dateRange: { start: '2025-10-01', end: '2025-10-30' },
  categories: ['Ceza Hukuku', 'İdare Hukuku'],
  sort: 'desc',
  types: ['Haber'],
  sources: [],
  search: ''
};

const queryString = serializeFiltersToURL(filters);
router.replace(`/aktuel${queryString}`, { scroll: false });
```

### URL'den Filtre Okuma

```typescript
import { parseFiltersFromURL } from '@/lib/filters/urlSync';
import { useSearchParams } from 'next/navigation';

const searchParams = useSearchParams();
const filters = parseFiltersFromURL(searchParams);
```

### Tarih Aralığı Hesaplama

```typescript
import { getQuickRange } from '@/lib/filters/quickRanges';

const last7Days = getQuickRange('last7');
// { start: '2025-10-23', end: '2025-10-30' }
```

### Item Filtreleme

```typescript
import { filterNewsItems } from '@/lib/filters/filterLogic';

const filteredItems = filterNewsItems(allItems, filters);
```

## Erişilebilirlik (A11y)

### ARIA Kullanımı

- **FilterBar**: Tarih butonları `role="group"` ve `aria-label="Tarih filtreleri"`
- **Chip'ler**: `aria-pressed` state'i ile seçim durumu
- **Diyaloglar**: `role="dialog"`, `aria-modal="true"`, `aria-label`
- **Canlı Bölge**: Sonuç sayısı `aria-live="polite"` ile bildiriliyor
- **Butonlar**: Tüm butonlarda anlamlı `aria-label`

### Klavye Navigasyonu

- **Tab**: Tüm interaktif elementler arasında gezinme
- **Enter/Space**: Buton ve chip aktivasyonu
- **Escape**: Diyalogları kapatma
- **Arrow Keys**: Segmented control'de gezinme (tarih kısa yolları)

### Odak Yönetimi

- Dialog açıldığında ilk input'a odak
- Dialog kapandığında önceki elemente geri dönüş
- Skip link: "İçeriğe atla" bağlantısı

### Kontrast

- Tüm metin/arka plan kombinasyonları min. **3:1** kontrast oranı
- Chip'ler seçili durumda **4.5:1** kontrast
- Focus ring görünürlüğü: **accentBlue-500** ile 2px

## Mobil Uyumluluk

### Responsive Breakpoints

- **< 640px (mobile)**: Filtreler tek sütun, chip'ler wrap
- **640px - 1024px (tablet)**: 2 sütun düzen
- **> 1024px (desktop)**: 3 sütun düzen

### Dokunma Hedefleri

- Minimum **44x44px** (WCAG 2.1 AA)
- Chip'ler: **min 48px** yükseklik
- Butonlar: **min 44px** yükseklik

### Sticky Filter Bar

```css
.sticky {
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
}
```

## Performans

### Optimizasyonlar

1. **useMemo**: Filtrelenmiş sonuçlar ve meta veriler memoize edilir
2. **debounce**: Arama input'u 300ms debounce (opsiyonel)
3. **Skeleton Loading**: 200ms gecikme ile loading state
4. **Lazy Dialog**: Diyaloglar sadece açıldığında render edilir

### Bundle Size

- Filter logic: ~3KB (gzipped)
- Filter components: ~8KB (gzipped)
- Toplam: ~11KB ek bundle

## Test Senaryoları

### Fonksiyonel Testler

- ✅ Tarih aralığı seçimi ve URL güncellemesi
- ✅ Multi-select kategori seçimi
- ✅ Gelişmiş filtrelerin toggle edilmesi
- ✅ "Sıfırla" butonu tüm filtreleri temizler
- ✅ Aktif filtre pill'lerinin kaldırılması
- ✅ URL'den filtre yükleme (sayfa yenileme)
- ✅ Boş sonuç durumu gösterimi

### Edge Case Testler

- ✅ Geçersiz tarih formatı → Hata mesajı
- ✅ Bitiş < Başlangıç → Hata mesajı
- ✅ Çok fazla aktif filtre → Scroll container
- ✅ URL'de geçersiz parametre → Varsayılana dön

### A11y Testler

- ✅ Sadece klavye ile tüm işlemler
- ✅ Screen reader ile navigasyon
- ✅ Focus trap diyalogda çalışıyor
- ✅ Escape ile diyalog kapatma
- ✅ aria-live sonuç sayısı güncellemesi

### Lighthouse Skoru

- **Performance**: > 90
- **Accessibility**: ≥ 90 (target: 95+)
- **Best Practices**: > 90
- **SEO**: > 90

## Gelecek Geliştirmeler

### Planlanan Özellikler

- [ ] Kaydedilmiş görünümler (localStorage)
- [ ] Filtre preset'leri (örn: "Bu Haftanın Ceza Haberleri")
- [ ] Gelişmiş tarih seçici (takvim UI)
- [ ] Kategori sayısı rozeti (API'den dinamik)
- [ ] Export filtrelenmiş sonuçlar (CSV/JSON)
- [ ] Filtre geçmişi (önceki aramalar)

## Sorun Giderme

### Filtreler URL'e yazılmıyor

- `syncFiltersToURL` fonksiyonunun çağrıldığından emin olun
- `useEffect` içinde filtre değişimini dinleyin

### Tarih validasyon hatası

- Tarih formatının `gg.aa.yyyy` olduğundan emin olun
- `parseDateTR` fonksiyonu ile parse edin

### Chip'ler seçilmiyor

- `selectedCategories` prop'unun doğru geçildiğini kontrol edin
- `onToggle` callback'inin state'i güncellendiğinden emin olun

## Lisans

Bu filtre sistemi Kaynar Hukuk Bürosu projesi için geliştirilmiştir.
