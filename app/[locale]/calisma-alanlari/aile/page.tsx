import Link from 'next/link';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import type { Locale } from '@/i18n';
import { localizedHref } from '@/lib/i18n/utils';

export const metadata = {
  title: 'Aile Hukuku',
  description: 'Boşanma, velayet, nafaka ve mal rejimi uyuşmazlıklarında hukuki süreçlerin özenle yürütülmesi gerekir.'
};

const scope = [
  'Boşanma davalarında müdafilik ve mal rejiminin tasfiyesi',
  'Velayet, kişisel ilişki düzenlenmesi ve nafaka talepleri',
  'Koruma ve uzaklaştırma tedbirlerinin talep edilmesi ve takibi',
  'Aile konutuna ilişkin uyuşmazlıkların değerlendirilmesi',
  'Nişanlanma ve evlilik ön sözleşmelerine ilişkin danışmanlık',
  'Soybağı, tanıma ve evlat edinme süreçlerinde hukuki destek'
];

const processSteps = [
  { title: 'İlk Görüşme', desc: 'Dosyanın genel çerçevesinin belirlenmesi, taleplerin ve beklentilerin analizi' },
  { title: 'Belge Toplama', desc: 'Evlilik cüzdanı, tapu, banka kayıtları ve diğer delillerin sistematik şekilde derlenmesi' },
  { title: 'Dava veya Arabuluculuk', desc: 'Anlaşmalı veya çekişmeli sürecin planlanması, dilekçelerin hazırlanması' },
  { title: 'Duruşma Takibi', desc: 'Mahkeme oturumlarında temsil, tanık dinletilmesi ve bilirkişi raporlarının sunulması' },
  { title: 'Karar ve Takip', desc: 'Kararın değerlendirilmesi, kanun yolu başvuruları ve icra takip işlemleri' }
];

const faqs = [
  {
    q: 'Boşanma davası ne kadar sürer?',
    a: 'Mahkemenin iş yükü, dosyanın kapsamı ve tarafların tutumuna göre değişir. Anlaşmalı boşanmalarda süreç daha kısa olabilir, ancak kesin süre garantisi verilemez.'
  },
  {
    q: 'Anlaşmalı boşanma için hangi belgeler gerekir?',
    a: 'Evlilik cüzdanı, kimlik belgesi, protokol ve dosyanın niteliğine göre mal varlığını gösteren belgeler gerekir. Süreç öncesi detaylı liste paylaşılır.'
  },
  {
    q: 'Velayet kararları sonradan değiştirilebilir mi?',
    a: 'Çocuğun üstün yararının gerektirdiği durumlarda, yeni olgular ortaya konarak velayet değişikliği talep edilebilir. Sosyal inceleme raporu gibi deliller önem taşır.'
  },
  {
    q: 'Nafaka miktarı nasıl belirlenir?',
    a: 'Tarafların ekonomik durumu, yaşam standardı, çocuğun ihtiyaçları ve diğer kriterler değerlendirilerek mahkeme takdiri ile belirlenir. Her dosya kendine özgüdür.'
  }
];

interface PageProps {
  params: { locale: Locale };
}

export default function AileHukukuPage({ params }: PageProps) {
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
            <span className="text-[hsl(var(--gold))]">Aile Hukuku</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
                <Icons.heart className="h-8 w-8 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--fg))]">Aile Hukuku</h1>
                <p className="text-[hsl(var(--muted))] mt-1">Boşanma, velayet ve nafaka hizmetleri</p>
              </div>
            </div>
            <p className="text-base text-[hsl(var(--muted))] leading-relaxed">
              Aile hukukuna ilişkin uyuşmazlıklarda süreçlerin dikkatle planlanması ve mevzuata uygun biçimde yürütülmesi esastır.
              Boşanma, velayet, nafaka ve mal rejimi konularında dava ve danışmanlık hizmeti sunuyoruz.
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
