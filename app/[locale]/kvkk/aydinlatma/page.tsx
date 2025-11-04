import Link from 'next/link';
import Section from '@/components/Section';
import { SITE_URL } from '@/lib/constants';
import type { Locale } from '@/i18n';
import { localizedHref } from '@/lib/i18n/utils';

interface PageProps {
  params: { locale: Locale };
}

export default function KvkkAydinlatmaPage({ params }: PageProps) {
  const { locale } = params;
  return (
    <Section
      title="Kişisel Verilerin Korunması Aydınlatma Metni"
      description="Kaynar Hukuk Bürosu olarak, 6698 sayılı KVKK uyarınca kişisel verilerinizin güvenliğini önemsiyoruz. Aşağıda, internet sitemizi ziyaret edenler, iletişim formunu kullananlar ve iş başvurusu yapanlar için bilgilendirme yer almaktadır."
    >
      <div className="space-y-8 text-sm leading-relaxed text-primary-700">
        <section>
          <h2 className="text-lg font-semibold text-primary-900">1. Veri Sorumlusu</h2>
          <p>
            Veri sorumlusu: Kaynar Hukuk Bürosu. İletişim: contact@kaynarhukuk.com, +905369495345. Adres: Merkezefendi Mah. Mevlana Cad. A-8 Blok Kat:11 Daire:47, 34040 İstanbul.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">2. Ziyaretçi Verileri</h2>
          <p>İnternet sitesi ziyaretçilerinden aşağıdaki veriler işlenebilir:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>IP adresi, tarayıcı bilgileri ve günlük kayıtları.</li>
            <li>Çerez tercihleri ve oturum bilgileri.</li>
          </ul>
          <p className="mt-3">
            Amaçlar: Site güvenliğinin sağlanması, performans ölçümü ve tercih yönetimi. Hukuki sebepler: 5651 sayılı Kanun, meşru menfaat, açık rıza (istatistik/işlevsel çerezler).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">3. İletişim Formu Verileri</h2>
          <p>Form aracılığıyla iletilen ad, soyad, telefon, e-posta ve mesaj içeriği yalnız talebinize dönüş yapmak amacıyla işlenir.</p>
          <p className="mt-3">
            Hukuki sebepler: Avukatlık Kanunu, KVKK m.5/2-c (sözleşmenin kurulması veya ifası) ve m.5/2-f (meşru menfaat). Gerekirse açık rıza alınır. Veriler sistemlerimizde şifreli olarak saklanır ve üçüncü kişilerle paylaşılmaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">4. İş Başvurusu Verileri</h2>
          <p>Özgeçmiş ve başvuru belgeleri, değerlendirme süresi boyunca saklanır. Rıza çerçevesinde paylaşılmış veriler haricen üçüncü kişilerle paylaşılmaz.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">5. Saklama Süresi ve Aktarımlar</h2>
          <p>
            Ziyaretçi kayıtları 5651 sayılı Kanun kapsamında 2 yıl, iletişim talep kayıtları makul cevap süresi + 3 yıl, iş başvurusu kayıtları ise en fazla 2 yıl saklanır. Yasal zorunluluk bulunmadıkça yurtdışına aktarım yapılmaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">6. İlgili Kişi Hakları</h2>
          <p>
            KVKK m.11 kapsamında veri işlenip işlenmediğini öğrenme, veriye erişim, düzeltme, silme ve itiraz haklarınız bulunmaktadır. Başvurularınızı{' '}
            <Link href={localizedHref(locale, '/kvkk/veri-sahibi-basvuru') as any} className="text-primary-600 hover:text-primary-900">
              Veri Sahibi Başvurusu
            </Link>{' '}
            sayfasındaki yöntemlerle iletebilirsiniz. Başvurularınız en geç 30 gün içinde yanıtlanacaktır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">7. Güncellemeler</h2>
          <p>
            Bu metin gerektiğinde güncellenebilir. Güncel sürüme {SITE_URL}/kvkk/aydinlatma adresinden ulaşabilirsiniz.
          </p>
        </section>
      </div>
    </Section>
  );
}
