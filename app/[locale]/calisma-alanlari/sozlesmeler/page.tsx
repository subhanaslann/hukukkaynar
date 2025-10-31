import Link from 'next/link';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import type { Locale } from '@/i18n';
import { localizedHref } from '@/lib/i18n/navigation';

export const metadata = {
  title: 'Sözleşmeler Hukuku',
  description: 'Sözleşmelerin hazırlanması, revize edilmesi ve uyuşmazlık yönetiminin dengeli şekilde yapılması önem taşır.'
};

const scope = [
  'Ticari sözleşmelerin hazırlanması ve müzakeresi',
  'Distribütörlük, bayilik, hizmet ve gizlilik sözleşmeleri',
  'Sözleşmelerin mevzuata uygunluk denetimi',
  'Uygulama sırasında ortaya çıkan uyuşmazlıkların değerlendirilmesi',
  'Sözleşme feshi, tazminat ve cezai şart davalarında temsil',
  'Franchise, lisans ve ortaklık sözleşmelerine ilişkin danışmanlık'
];

const processSteps = [
  { title: 'İhtiyaç Analizi', desc: 'Taraf ihtiyaçlarının ve risklerin detaylı analiz edilmesi' },
  { title: 'Taslak Hazırlama', desc: 'Sözleşme taslağının hazırlanması veya mevcut sözleşmenin incelenmesi' },
  { title: 'Müzakere Planı', desc: 'Müzakere stratejisinin oluşturulması ve görüşmelerin yürütülmesi' },
  { title: 'Son Kontrol', desc: 'İmzalama ve uygulama öncesi kontrol listelerinin tamamlanması' },
  { title: 'Takip ve Güncelleme', desc: 'Sözleşmenin yürütümü sırasında güncelleme ve raporlama' }
];

const faqs = [
  {
    q: 'Sözleşmeye hangi maddeler eklenmeli?',
    a: 'Tarafların pozisyonu, mevzuat ve risk analizine göre belirlenir. Standart bir liste tüm durumlar için uygun olmayabilir; her sözleşme özel değerlendirme gerektirir.'
  },
  {
    q: 'Müzakere süreci nasıl planlanır?',
    a: 'Öncelikler belirlenir, karşı tarafın beklentileri analiz edilir ve toplantı notları düzenli tutulur. Profesyonel müzakere tekniklerinden yararlanılır.'
  },
  {
    q: 'Uyumsuzluk tespit edildiğinde ne yapılır?',
    a: 'İlgili maddeler revize edilir, alternatif düzenlemeler önerilir ve gerekirse ek protokoller hazırlanır. Mevzuata uygunluk sağlanması önceliklidir.'
  },
  {
    q: 'Sözleşme ihlali durumunda ne olur?',
    a: 'İhlalin niteliğine göre tazminat, fesih veya ifaya zorlama davası açılabilir. Cezai şart ve tazminat talepleri sözleşme hükümlerine göre değerlendirilir.'
  }
];

interface PageProps {
  params: { locale: Locale };
}

export default function SozlesmelerPage({ params }: PageProps) {
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
            <span className="text-[hsl(var(--gold))]">Sözleşmeler Hukuku</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
                <Icons.fileText className="h-8 w-8 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--fg))]">Sözleşmeler Hukuku</h1>
                <p className="text-[hsl(var(--muted))] mt-1">Sözleşme hazırlama ve uyuşmazlık yönetimi</p>
              </div>
            </div>
            <p className="text-base text-[hsl(var(--muted))] leading-relaxed">
              Sözleşmelerin hazırlanması, revize edilmesi ve uyuşmazlık yönetiminin dengeli şekilde yapılması önem taşır.
              Ticari sözleşmeler, hizmet sözleşmeleri ve diğer sözleşme türlerinde danışmanlık ve dava hizmeti sunuyoruz.
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
