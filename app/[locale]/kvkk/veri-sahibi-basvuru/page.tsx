import Section from '@/components/Section';

export default function VeriSahibiBasvuruPage() {
  return (
    <Section
      title="Veri Sahibi Başvuru Süreci"
      description="6698 sayılı KVKK uyarınca ilgili kişi sıfatına sahip kişiler, kişisel verilerinin işlenmesine ilişkin taleplerini aşağıdaki yöntemlerle iletebilir."
    >
      <div className="space-y-8 text-sm leading-relaxed text-primary-700">
        <section>
          <h2 className="text-lg font-semibold text-primary-900">1. Başvuru Yöntemleri</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Islak imzalı dilekçe ile büromuza bizzat başvuru.</li>
            <li>Noter aracılığıyla gönderilen başvuru.</li>
            <li>Kayıtlı Elektronik Posta (KEP) adresi üzerinden güvenli elektronik imza ile başvuru.</li>
            <li>İmzalı başvurunun taranarak info@kaynar.av.tr adresine güvenli elektronik imza ile iletilmesi.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">2. Başvuruda Bulunması Gereken Bilgiler</h2>
          <p>Başvurularınızda aşağıdaki bilgilerin yer alması gerekir:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Ad, soyad ve imza.</li>
            <li>T.C. kimlik numarası veya pasaport numarası.</li>
            <li>Tebligata esas yerleşim yeri veya iş yeri adresi.</li>
            <li>Varsa bildirime esas e-posta adresi, telefon ve faks.</li>
            <li>Talep konusu ve dayanağı olan bilgi/belgeler.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">3. Yanıt Süresi</h2>
          <p>
            Başvurular, KVKK m.13 uyarınca en geç 30 gün içinde sonuçlandırılır. Talebin niteliğine göre ek bilgi talep edilebilir. Ücretlendirme, KVKK ve Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ hükümlerine göre yapılır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-primary-900">4. Başvurunun Reddedilmesi</h2>
          <p>
            Başvurunun reddedilmesi halinde gerekçeli yanıt yazılı olarak veya elektronik ortamda iletilir. Yanıt tarihinden itibaren 30 gün içinde Kişisel Verileri Koruma Kurumu&apos;na şikâyet hakkı saklıdır.
          </p>
        </section>
      </div>
    </Section>
  );
}