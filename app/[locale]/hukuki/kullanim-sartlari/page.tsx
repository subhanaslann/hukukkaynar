import Section from '@/components/Section';

export default function KullanimSartlariPage() {
  return (
    <Section
      title="Kullanım Şartları"
      description="Kaynar Hukuk Bürosu internet sitesini kullanırken geçerli olan temel şartlar aşağıda yer almaktadır."
    >
      <div className="space-y-6 text-sm leading-relaxed text-primary-700">
        <section>
          <h2 className="text-lg font-semibold text-primary-900">1. Bilgilendirme Amaçlı İçerik</h2>
          <p>Sitede yer alan metinler ve açıklamalar yalnız bilgilendirme sağlar. Hukuki danışmanlık niteliğinde değildir.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-primary-900">2. Telif Hakları</h2>
          <p>Site içeriği ve tasarımları Kaynar Hukuk Bürosu&apos;na aittir. İzinsiz kopyalanamaz, çoğaltılamaz veya dağıtılamaz.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-primary-900">3. Sorumluluk</h2>
          <p>İnternet sitesine erişim veya kullanım sırasında oluşabilecek teknik arızalar nedeniyle veri kaybından sorumluluk kabul edilmez.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-primary-900">4. Değişiklikler</h2>
          <p>Kullanım şartları, gerektiğinde güncellenebilir. Güncel sürüm bu sayfada yayınlandığı anda yürürlüğe girer.</p>
        </section>
      </div>
    </Section>
  );
}