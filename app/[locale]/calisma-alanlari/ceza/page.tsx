import Link from 'next/link';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import type { Locale } from '@/i18n';
import { localizedHref } from '@/lib/i18n/utils';

export const metadata = {
  title: 'Ceza Hukuku',
  description: 'Ceza yargılamasında hakların korunması için süreçlerin her aşamasında dikkatli planlama ve mevzuata uygun hareket edilmesi gerekir.'
};

const scope = [
  'Soruşturma aşamasında ifade alma ve kolluk işlemlerinin takibi',
  'Kovuşturma sürecinde savunma stratejisinin oluşturulması',
  'Tutuklama, adli kontrol ve koruma tedbirlerine ilişkin başvurular',
  'İstinaf, temyiz ve olağanüstü kanun yolları için değerlendirmeler',
  'Uzlaşma ve hükmün açıklanmasının geri bırakılması talepleri',
  'Hapis cezalarının ertelenmesi ve seçenek yaptırımların uygulanması'
];

const processSteps = [
  { title: 'Ön Değerlendirme', desc: 'Dosyanın hukuki ve fiili yönden analizi, delillerin değerlendirilmesi' },
  { title: 'Strateji Belirleme', desc: 'Savunma yaklaşımının planlanması, hukuki dayanakların tespiti' },
  { title: 'Duruşma Süreci', desc: 'Duruşmalarda temsil, tanık ve bilirkişi sorguları, delillerin sunumu' },
  { title: 'Karar Değerlendirme', desc: 'Mahkeme kararının analizi ve kanun yolu başvurusu planlaması' },
  { title: 'Takip', desc: 'Karar sonrası işlemler, infaz ve uyarlama taleplerinin yönetimi' }
];

const faqs = [
  {
    q: 'Soruşturma aşamasında avukat ne yapar?',
    a: 'İfade alımında hazır bulunur, dosyayı inceler ve hakların korunması için gerekli başvuruları yapar. Müvekkil ile sürekli iletişim halinde olur ve sürecin her aşamasında bilgilendirme sağlar.'
  },
  {
    q: 'Tutuklamaya itiraz süresi nedir?',
    a: 'Ceza Muhakemesi Kanunu\'nda öngörülen süreler içinde itiraz yapılır. Sürelere uyum için dosya özelinde planlama gerekir ve acil durumlarda hızlı hareket edilmesi önemlidir.'
  },
  {
    q: 'Temyiz süreci ne kadar sürer?',
    a: 'Temyiz süreci, Yargıtay\'ın iş yoğunluğuna ve dosyanın özelliklerine göre değişkenlik gösterir. Ortalama süreçler hakkında önceden net bilgi vermek mümkün olmayabilir.'
  },
  {
    q: 'Sonuç garanti edilir mi?',
    a: 'Ceza yargılaması çok sayıda değişkene bağlıdır; sonuç veya süre garantisi verilemez. Ancak mevzuata uygun en etkili savunma sunulur.'
  }
];

interface PageProps {
  params: { locale: Locale };
}

export default function CezaHukukuPage({ params }: PageProps) {
  const { locale } = params;
  return (
    <>
      <Topbar />
      <Navbar />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-[hsl(var(--muted))]">
            <Link
              href={localizedHref(locale, '/calisma-alanlari') as any}
              className="hover:text-[hsl(var(--gold))] transition-colors flex items-center gap-2"
            >
              <Icons.arrowLeft className="h-4 w-4" />
              Çalışma Alanları
            </Link>
            <span>/</span>
            <span className="text-[hsl(var(--gold))]">Ceza Hukuku</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
                <Icons.scale className="h-8 w-8 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--fg))]">Ceza Hukuku</h1>
                <p className="text-[hsl(var(--muted))] mt-1">Savunma ve müdafilik hizmetleri</p>
              </div>
            </div>
            <p className="text-base text-[hsl(var(--muted))] leading-relaxed">
              Ceza yargılamasında hakların korunması için süreçlerin her aşamasında dikkatli planlama ve mevzuata uygun hareket edilmesi gerekir.
              Soruşturma ve kovuşturma aşamalarında müdafilik hizmeti sunuyoruz.
            </p>
          </header>

          {/* Scope */}
          <div className="mb-12">
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
              <h2 className="text-2xl font-bold text-[hsl(var(--fg))] mb-6">Hizmet Kapsamı</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {scope.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--gold))]/20">
                        <Icons.check className="h-4 w-4 text-[hsl(var(--gold))]" />
                      </div>
                    </div>
                    <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[hsl(var(--fg))] mb-6">Süreç Adımları</h2>
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div key={index} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 hover:border-[hsl(var(--gold))]/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/30">
                        <span className="text-lg font-bold text-[hsl(var(--gold))]">{index + 1}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[hsl(var(--fg))] mb-1">{step.title}</h3>
                      <p className="text-sm text-[hsl(var(--muted))]">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[hsl(var(--fg))] mb-6">Sık Sorulan Sorular</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                  <h3 className="font-semibold text-[hsl(var(--fg))] mb-2 flex items-start gap-2">
                    <Icons.helpCircle className="h-5 w-5 text-[hsl(var(--gold))] flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted))] leading-relaxed ml-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-6">
            <div className="flex items-start gap-3">
              <Icons.alertCircle className="h-5 w-5 text-[hsl(var(--gold))] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[hsl(var(--muted))]">
                Bu sayfa genel bilgilendirme amaçlıdır; hukuki görüş değildir. Her dosya kendine özgü koşullara sahip olduğundan,
                somut durum değerlendirmesi için lütfen bizimle iletişime geçin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
