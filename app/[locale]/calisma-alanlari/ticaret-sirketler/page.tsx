import Link from 'next/link';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import type { Locale } from '@/i18n';
import { localizedHref } from '@/lib/i18n/navigation';

export const metadata = {
  title: 'Ticaret Hukuku',
  description: 'Şirketlerin kuruluşundan günlük yönetimine kadar uzanan süreçlerde hukuki risklerin belirlenmesi ve mevzuata uyum önemlidir.'
};

const scope = [
  'Şirket kuruluş işlemleri, ana sözleşme hazırlıkları ve sicil tescilleri',
  'Genel kurul, yönetim kurulu ve ortaklar kurulu toplantılarının yönetimi',
  'Pay devir işlemleri, sermaye artırımı ve azaltımı süreçleri',
  'Birleşme, bölünme ve tür değişikliği gibi yapısal işlemler',
  'Ticari sözleşmelerin hazırlanması, müzakeresi ve gözden geçirilmesi',
  'Haksız rekabet, alacak ve sorumluluk davalarında temsil'
];

const processSteps = [
  { title: 'İhtiyaç Analizi', desc: 'Şirket yapısı, ortaklar ve hedeflerin belirlenmesi, risk ve fırsat değerlendirmesi' },
  { title: 'Mevzuat İncelemesi', desc: 'İlgili kanun, tüzük ve düzenleyici işlemlerin detaylı analizi' },
  { title: 'Belge Hazırlığı', desc: 'Ana sözleşme, kurul kararları, sözleşme ve sicil başvuru belgelerinin düzenlenmesi' },
  { title: 'Tescil ve Takip', desc: 'Ticaret sicili, vergi dairesi ve diğer kurumlarla yapılacak işlemlerin koordinasyonu' },
  { title: 'Uyum ve Güncelleme', desc: 'Mevzuat değişikliklerinin takibi, sözleşme revizyonları ve şirket faaliyetlerinin kontrolü' }
];

const faqs = [
  {
    q: 'Şirket kuruluşunda hangi belgeler gerekir?',
    a: 'Şirket türüne göre değişir; genellikle ana sözleşme, kuruculara ait kimlik ve ikametgah belgeleri, sermaye taahhüt beyanları ve banka dekontları gerekir. Tam liste süreç öncesi paylaşılır.'
  },
  {
    q: 'Genel kurul kararları nasıl hazırlanır?',
    a: 'Gündem, toplantı çağrı süreci ve karar metinleri Türk Ticaret Kanunu\'na uygun şekilde düzenlenir. İlan, hazirun listesi ve karar defterleri usulüne uygun tutulmalıdır.'
  },
  {
    q: 'Pay devri işlemi nasıl yapılır?',
    a: 'Ana sözleşmeye göre değişir; anonim şirketlerde nama yazılı paylar için yönetim kurulu onayı gerekebilir. Devir sözleşmesi hazırlanıp pay defterine işlenir ve sicile tescil ettirilir.'
  },
  {
    q: 'Ticari sözleşme riskleri nasıl yönetilir?',
    a: 'Taraf yükümlülükleri, cezai şart, temerrüt ve fesih koşulları detaylı incelenir. Mevzuata uyumsuz hükümler tespit edilir ve ticari hedeflere uygun düzenleme önerilir.'
  }
];

interface PageProps {
  params: { locale: Locale };
}

export default function TicaretSirketlerPage({ params }: PageProps) {
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
            <span className="text-[hsl(var(--gold))]">Ticaret Hukuku</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
                <Icons.building className="h-8 w-8 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--fg))]">Ticaret Hukuku</h1>
                <p className="text-[hsl(var(--muted))] mt-1">Şirket işlemleri ve ticari sözleşme hizmetleri</p>
              </div>
            </div>
            <p className="text-base text-[hsl(var(--muted))] leading-relaxed">
              Şirketlerin kuruluşundan günlük yönetimine kadar uzanan süreçlerde hukuki risklerin belirlenmesi ve mevzuata uyum büyük önem taşır.
              Ticari işlemler ve uyuşmazlıklarda dava ve danışmanlık hizmeti sunuyoruz.
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
