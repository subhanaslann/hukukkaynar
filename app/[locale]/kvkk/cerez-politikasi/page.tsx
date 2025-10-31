import Section from '@/components/Section';
import { COOKIE_CATEGORIES } from '@/lib/constants';

export default function CerezPolitikasiPage() {
  return (
    <Section
      title="Çerez Politikası"
      description="Kaynar Hukuk Bürosu internet sitesinde kullanılan çerez kategorileri, amaçları ve yönetim yöntemleri aşağıda açıklanmaktadır."
    >
      <div className="space-y-8 text-sm leading-relaxed text-primary-700">
        <section>
          <h2 className="text-lg font-semibold text-primary-900">1. Çerez Nedir?</h2>
          <p>
            Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcıya kaydedilen küçük metin dosyalarıdır. Site performansını iyileştirmek, güvenlik sağlamak ve tercihlerinizi hatırlamak için kullanılabilirler.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">2. Kullanılan Çerez Kategorileri</h2>
          <ul className="mt-3 space-y-4">
            <li className="rounded-lg border border-primary-100 bg-white p-4">
              <h3 className="font-semibold text-primary-900">{COOKIE_CATEGORIES.necessary.name}</h3>
              <p className="mt-2 text-primary-700">{COOKIE_CATEGORIES.necessary.description}</p>
            </li>
            <li className="rounded-lg border border-primary-100 bg-white p-4">
              <h3 className="font-semibold text-primary-900">{COOKIE_CATEGORIES.statistics.name}</h3>
              <p className="mt-2 text-primary-700">{COOKIE_CATEGORIES.statistics.description}</p>
              <p className="mt-2 text-xs text-primary-500">Varsayılan: Kapalı. Onay verilmedikçe yüklenmez.</p>
            </li>
            <li className="rounded-lg border border-primary-100 bg-white p-4">
              <h3 className="font-semibold text-primary-900">{COOKIE_CATEGORIES.functional.name}</h3>
              <p className="mt-2 text-primary-700">{COOKIE_CATEGORIES.functional.description}</p>
              <p className="mt-2 text-xs text-primary-500">Varsayılan: Kapalı. Harita gibi dış servisler onay sonrası çalışır.</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">3. Yönetim</h2>
          <p>
            İlk ziyaretinizde çerez tercihlerinizi seçebilirsiniz. Daha sonra sayfanın altındaki &quot;Çerez Tercihleri&quot; bağlantısından tercihlerinizi değiştirebilirsiniz. Tarayıcı ayarlarınız üzerinden de çerezleri engelleyebilir veya silebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">4. Saklama Süresi</h2>
          <p>
            Çerez tercih kayıtları, seçiminizden itibaren 12 ay boyunca saklanır ve süre sonunda tekrar onayınız istenir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">5. Güncellemeler</h2>
          <p>
            Politika, yasal veya teknik zorunluluklar doğrultusunda güncellenebilir. Güncellemeler internet sitemizde yayınlandığı tarihten itibaren geçerlidir.
          </p>
        </section>
      </div>
    </Section>
  );
}