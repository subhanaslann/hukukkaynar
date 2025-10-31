import Link from 'next/link';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import type { Locale } from '@/i18n';
import { localizedHref } from '@/lib/i18n/navigation';

export const metadata = {
  title: 'İdare Hukuku',
  description: 'İdari işlem ve eylemlerden kaynaklanan uyuşmazlıklarda sürecin doğru değerlendirilmesi ve idari yargıda mevzuata uygun hareket edilmesi gerekir.'
};

const scope = [
  'İdari işlemlere karşı iptal ve tam yargı davalarının planlanması ve takibi',
  'Yürütmenin durdurulması ve ihtiyati tedbir başvurularının değerlendirilmesi',
  'Kamu ihaleleri, itirazlar ve sözleşme uyuşmazlıklarının yönetimi',
  'Disiplin işlemleri, kadro-memur davalarında savunma ve müdafilik',
  'İmar uygulamaları, kamulaştırma ve belediye hukuku süreçleri',
  'İdari para cezalarına itiraz, vergi ve gümrük uyuşmazlıkları'
];

const processSteps = [
  { title: 'Tebliğ ve Süre Analizi', desc: 'İdari işlemin tebliğ tarihinin tespiti ve dava açma süresinin hesaplanması' },
  { title: 'İdari Başvuru', desc: 'Gerekli hallerde üst makama şikayet veya sulh uzlaşma yollarının değerlendirilmesi' },
  { title: 'Dava Açma', desc: 'İdari yargıda iptal veya tam yargı davası dilekçesinin hazırlanması ve sunulması' },
  { title: 'Duruşma Süreci', desc: 'Bilirkişi talepleri, keşif ve tanık dinletilmesi, yazılı savunmaların sunulması' },
  { title: 'İstinaf ve Temyiz', desc: 'Karar sonrası bölge idare mahkemesi ve Danıştay başvurularının planlanması' }
];

const faqs = [
  {
    q: 'İdari davada süre ne kadar önemlidir?',
    a: 'İdari Yargılama Usulü Kanunu katı süreler öngörür. Genellikle tebliğ tarihinden itibaren 60 veya 30 gün içinde dava açılmalıdır. Süreye uyum kritik öneme sahiptir, süre kaçırıldığında dava esastan reddedilebilir.'
  },
  {
    q: 'Yürütmenin durdurulması ne anlama gelir?',
    a: 'İdari işlemin uygulanmasının geçici olarak durdurulmasıdır. Telafisi güç zararlar ve ciddi delillerin varlığı halinde mahkeme tarafından verilebilir. Karar kesinleşene kadar işlemin icra edilmesi engellenir.'
  },
  {
    q: 'İdari dava açmadan önce idareye başvuru zorunlu mu?',
    a: 'Bazı işlem türlerinde (örneğin bazı vergi ve gümrük işlemlerinde) zorunlu idari başvuru prosedürü bulunur. Dosya özelinde mevzuat değerlendirmesi yapılmalıdır.'
  },
  {
    q: 'İhale kararlarına ne sürede itiraz edilir?',
    a: 'Kamu İhale Kanunu\'na göre ihale işlemlerine itiraz süreleri 10 gün ile sınırlıdır. İhale İtiraz Komisyonu kararlarına karşı da 30 gün içinde idari yargıya başvurulabilir.'
  }
];

interface PageProps {
  params: { locale: Locale };
}

export default function IdareHukukuPage({ params }: PageProps) {
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
            <span className="text-[hsl(var(--gold))]">İdare Hukuku</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
                <Icons.landmark className="h-8 w-8 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--fg))]">İdare Hukuku</h1>
                <p className="text-[hsl(var(--muted))] mt-1">İptal, tam yargı ve idari işlem davaları</p>
              </div>
            </div>
            <p className="text-base text-[hsl(var(--muted))] leading-relaxed">
              İdari işlem ve eylemlerden kaynaklanan uyuşmazlıklarda sürecin doğru değerlendirilmesi ve idari yargıda mevzuata uygun hareket edilmesi esastır.
              Kamu kurumlarıyla olan uyuşmazlıklarda dava ve danışmanlık hizmeti sunuyoruz.
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
