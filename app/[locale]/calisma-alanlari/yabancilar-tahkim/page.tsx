import Link from 'next/link';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import type { Locale } from '@/i18n';
import { localizedHref } from '@/lib/i18n/navigation';

export const metadata = {
  title: 'Yabancılar ve Tahkim Hukuku',
  description: 'Uluslararası unsurlu uyuşmazlıklar ve tahkim süreçlerinde çok taraflı anlaşmalar, milletlerarası özel hukuk kuralları ve tahkim mevzuatına uygun hareket edilmesi gerekir.'
};

const scope = [
  'Yabancıların Türkiye\'deki hukuki statüsü ve ikamet/çalışma izinlerine ilişkin süreçler',
  'Uluslararası ticari sözleşmeler ve yabancı yatırımlara dair hukuki danışmanlık',
  'Yurtiçi ve yurtdışı tahkim yoluna başvurulması ve hakem kararlarının tenfizi',
  'Milletlerarası hukuk çatışması kurallarının uygulanması ve yabancı mahkeme kararlarının tanınması',
  'Yabancı şirketlerin Türkiye\'de şube açma ve ticari faaliyet süreçleri',
  'Uluslararası aile hukuku uyuşmazlıkları ve velayet davaları'
];

const processSteps = [
  { title: 'Sözleşme Değerlendirmesi', desc: 'Sözleşmelerin ve tahkim şartlarının detaylı değerlendirilmesi' },
  { title: 'Yetki Tespiti', desc: 'Yetkili hukuk sisteminin ve yetkili merciinin tespiti' },
  { title: 'Tahkim Başvurusu', desc: 'Tahkim veya yargı sürecinin başlatılması ve hakem heyetinin oluşturulması' },
  { title: 'Uyuşmazlık İncelemesi', desc: 'Uyuşmazlığın esasının incelenmesi, delillerin sunulması ve duruşmaların takibi' },
  { title: 'Tenfiz ve İcra', desc: 'Hakem veya mahkeme kararının tenfizi ve sonrasındaki hukuki yükümlülüklerin yerine getirilmesi' }
];

const faqs = [
  {
    q: 'Tahkim mahkeme yargılamasından nasıl farklıdır?',
    a: 'Tahkimde taraflar hakem seçer, süreç gizli ve genelde daha esnek yürür. Tahkim kararları New York Sözleşmesi çerçevesinde milletlerarası tanınmada avantajlıdır.'
  },
  {
    q: 'Yabancı mahkeme kararı Türkiye\'de tanınır mı?',
    a: 'İlgili uluslararası anlaşmalar veya karşılıklılık ilkesi çerçevesinde tanıma ve tenfiz prosedürü uygulanır. Her karar otomatik tanınmaz, özel inceleme gerekir.'
  },
  {
    q: 'Uluslararası sözleşmelerde hangi hukuk geçerli olur?',
    a: 'Tarafların seçtiği hukuk veya en yakın ilişkili hukuk sistemi uygulanır. Sözleşme hazırlığında hukuk seçimi stratejik önem taşır ve dikkatlice değerlendirilmelidir.'
  },
  {
    q: 'Yabancılar Türkiye\'de tapu edinebilir mi?',
    a: 'Karşılıklılık ilkesi ve kanuni sınırlamalar çerçevesinde yabancılar Türkiye\'de taşınmaz edinebilir. Askeri bölgeler ve özel güvenlik bölgelerinde kısıtlamalar vardır.'
  }
];

interface PageProps {
  params: { locale: Locale };
}

export default function YabancilarTahkimHukukuPage({ params }: PageProps) {
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
            <span className="text-[hsl(var(--gold))]">Yabancılar ve Tahkim Hukuku</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
                <Icons.globe className="h-8 w-8 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--fg))]">Yabancılar ve Tahkim Hukuku</h1>
                <p className="text-[hsl(var(--muted))] mt-1">Uluslararası uyuşmazlıklar ve tahkim süreçleri</p>
              </div>
            </div>
            <p className="text-base text-[hsl(var(--muted))] leading-relaxed">
              Uluslararası unsurlu uyuşmazlıklar ve tahkim süreçlerinde çok taraflı anlaşmalar, milletlerarası özel hukuk kuralları ve tahkim mevzuatına uygun hareket edilmesi gerekir.
              Yabancı yatırımlar, tahkim süreçleri ve uluslararası ticari uyuşmazlıklarda hukuki destek sunuyoruz.
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
