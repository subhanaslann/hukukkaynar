# Kaynar Hukuk Bürosu Kurumsal Sitesi

Next.js 14 (App Router) ve TypeScript kullanılarak oluşturulmuş, TBB reklam sınırlamaları ile KVKK uyumunu gözeten bilgilendirici web sitesi projesi.

## Gereksinimler

- Node.js 18.18+ (LTS önerilir)
- npm 9+

## Kurulum

```bash
npm install
```

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Derleme almak için:

```bash
npm run build
```

## Ortam Değişkenleri

Aşağıdaki örneği `.env.local` dosyası olarak kaydedebilirsiniz (gerektiğinde değerleri güncelleyin):

```
NEXT_PUBLIC_SITE_URL=https://kaynar.av.tr
NEXT_PUBLIC_ENV=development
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMTP_TO=
```

- SMTP ayarları tanımlanmadığında iletişim formu gönderimleri kayıt altına alınır fakat e-posta gönderimi yapılmaz.
- `NEXT_PUBLIC_ENV=staging` değeri, `robots.txt` çıktısında noindex talimatı verir.

## Geliştirici Notları

- Dahili linkler `lib/i18n/navigation.ts` altındaki `localizedHref` yardımcı fonksiyonu ile locale öneki korunarak oluşturulur.
- `NEXT_PUBLIC_SITE_URL` değeri sitemap, robots ve meta etiketlerinde tek kaynak olarak kullanılır; canlı ortam alan adını burada güncelleyin.
- `/api/contact` uç noktası SMTP bilgileri sağlandığında form gönderimlerini doğrudan e-posta ile iletir; rate-limit penceresi 60 saniyedir.

## Komutlar

- `npm run dev`: Geliştirme sunucusunu başlatır.
- `npm run build`: Üretim derlemesi oluşturur.
- `npm run start`: Üretim derlemesini çalıştırır.
- `npm run lint`: ESLint denetimini çalıştırır.
- `npm run test`: Vitest ile birim/erişilebilirlik testlerini çalıştırır.
- `npm run test:e2e`: Playwright ile temel uçtan uca kontrolleri çalıştırır.
- `npm run format`: Prettier ile dosyaları biçimlendirir.

## Testler

- `tests/a11y-smoke.test.tsx`: Skip-link ve temel landmark odaklı erişilebilirlik smoke testi.
- `tests/e2e.spec.ts`: Ana, çalışma alanları, iletişim ve KVKK sayfalarının yanıt verdiğini doğrular; çerez bannerı ve analytics scripti kontrol edilir.

## Uyumluluk Kontrol Listesi

- [x] Reklam yasağına aykırı ifade kullanılmadı; pazarlama dili yok.
- [x] Genel bilgilendirme ve danışmanlık dışı uyarılar sayfalarda yer alıyor.
- [x] KVKK aydınlatma metni, çerez politikası ve veri sahibi başvuru bilgileri hazır.
- [x] Çerez bannerı ve tercihler paneli, yalnız rıza sonrası harita/analitik yükler.
- [x] İletişim formunda KVKK onayı, bülten tercihi ve uyarı metni mevcut.
- [x] Sitemap ve robots.txt dinamik olarak oluşturuluyor.
