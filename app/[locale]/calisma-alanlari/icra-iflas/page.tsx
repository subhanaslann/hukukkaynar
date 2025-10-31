import Link from 'next/link';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import type { Locale } from '@/i18n';
import { localizedHref } from '@/lib/i18n/navigation';

export const metadata = {
  title: 'İcra ve İflas Hukuku',
  description: 'Alacak ve borç ilişkilerinde icra-iflas süreçlerinin mevzuata uygun biçimde yürütülmesi önemlidir.'
};

const scope = [
  'İlamsız ve ilamlı icra takiplerinin başlatılması ve takibi',
  'Haciz işlemleri, sıra cetveli ve paylaştırma süreçleri',
  'İflas, iflasın ertelenmesi ve konkordato süreçlerinin planlanması',
  'Alacaklı-borçlu uzlaşmaları ve yeniden yapılandırma görüşmeleri',
  'İtiraz, şikayet ve menfi tespit davalarının yürütülmesi',
  'İcra inkar tazminatı ve istihkak davalarında hukuki destek'
];

const processSteps = [
  { title: 'Alacak Değerlendirmesi', desc: 'Alacak veya borç durumunun belgeleriyle değerlendirilmesi ve hukuki analizi' },
  { title: 'Takip Başlatma', desc: 'Uygun takip türünün seçilmesi ve gerekli başvuruların yapılması' },
  { title: 'Haciz ve Satış', desc: 'Haciz işlemlerinin planlanması ve satış süreçlerinin takibi' },
  { title: 'İtiraz Süreci', desc: 'İtiraz ve şikayet süreçlerinin yürütülmesi, duruşmalarda temsil' },
  { title: 'Sonuç ve Takip', desc: 'Sonuçların uygulanması, icra dosyasının takibi ve raporlanması' }
];

const faqs = [
  {
    q: 'İcra takibi ne kadar sürer?',
    a: 'Takibin niteliği, borçlunun tutumu ve icra dairesinin iş yüküne göre süre değişebilir. Süreç hakkında kesin süre garantisi verilemez ancak dosya düzenli takip edilir.'
  },
  {
    q: 'Konkordato süreci nasıl işler?',
    a: 'Başvuru dilekçesi ve proje sunulur, mahkeme geçici mühlet kararı verir ve konkordato komiseri süreci denetler. Alacaklıların onayı ve mahkeme tasdiki gerekir.'
  },
  {
    q: 'Borçlunun malvarlığı nasıl tespit edilir?',
    a: 'Resmi kayıtlar, sorgular ve gerektiğinde keşif gibi usullerden yararlanılır. Hukuka aykırı yöntemler kesinlikle kullanılmaz, yasal çerçevede hareket edilir.'
  },
  {
    q: 'İcra takibine itiraz edilebilir mi?',
    a: 'Borçlu, takibe tebliğ tarihinden itibaren 7 gün içinde itiraz edebilir. İtiraz üzerine alacaklı, itirazın kaldırılması veya alacak davası açabilir.'
  }
];

interface PageProps {
  params: { locale: Locale };
}

export default function IcraIflasPage({ params }: PageProps) {
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
            <span className="text-[hsl(var(--gold))]">İcra ve İflas Hukuku</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
                <Icons.gavel className="h-8 w-8 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--fg))]">İcra ve İflas Hukuku</h1>
                <p className="text-[hsl(var(--muted))] mt-1">Alacak takibi ve iflas süreçleri</p>
              </div>
            </div>
            <p className="text-base text-[hsl(var(--muted))] leading-relaxed">
              Alacak ve borç ilişkilerinde icra-iflas süreçlerinin mevzuata uygun biçimde yürütülmesi önemlidir.
              İcra takipleri, haciz işlemleri, iflas ve konkordato süreçlerinde hukuki destek sunuyoruz.
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
