import Link from 'next/link';
import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Icons } from '@/components/shared/Icons';
import type { Locale } from '@/i18n';
import { localizedHref } from '@/lib/i18n/utils';

export const metadata = {
  title: 'İş Hukuku',
  description: 'İş ilişkilerinde tarafların hak ve yükümlülüklerinin yasal değişiklikler ışığında dikkatle takip edilmesi gerekir.'
};

const scope = [
  'İş sözleşmelerinin hazırlanması, değerlendirilmesi ve fesih süreçlerinin yönetimi',
  'İşe iade davaları ve feshin geçersizliğinin tespiti talepleri',
  'Kıdem, ihbar ve yıllık izin tazminatı alacak davaları',
  'İş sağlığı ve güvenliği mevzuatına uyum danışmanlığı',
  'Sosyal güvenlik primleri ve idari para cezalarına ilişkin uyuşmazlıklar',
  'Toplu iş sözleşmeleri ve sendika işlemlerine ilişkin değerlendirmeler'
];

const processSteps = [
  { title: 'Dosya İncelemesi', desc: 'İş sözleşmesi, bordro, yazışmalar ve fesih bildiriminin hukuki analizi' },
  { title: 'Arabuluculuk', desc: 'Zorunlu arabuluculuk başvurusunun yapılması ve müzakere sürecinin yönetimi' },
  { title: 'Dava Süreci', desc: 'İş mahkemesinde dava açılması, dilekçe ve cevap hazırlıkları' },
  { title: 'Duruşma ve Deliller', desc: 'Tanık dinletilmesi, bilirkişi incelemesi ve belgelerin sunulması' },
  { title: 'Karar ve İcra', desc: 'Mahkeme kararının değerlendirilmesi, itiraz ve icra takip işlemleri' }
];

const faqs = [
  {
    q: 'Arabuluculuk başvurusu ne zaman zorunludur?',
    a: 'İşçi alacağı ve işe iade davalarında dava açmadan önce arabuluculuğa başvurmak zorunludur. Arabuluculuk sonuçsuz kalırsa son tutanak ile dava açılabilir.'
  },
  {
    q: 'Fesih bildiriminde nelere dikkat edilmeli?',
    a: 'Fesih gerekçesinin açık ve somut şekilde belirtilmesi, ihbar sürelerine uyulması ve ilgili belgelerin (bordrolar, çalışma belgesi) teslim edilmesi gerekir.'
  },
  {
    q: 'İşe iade davası süresi nedir?',
    a: 'Fesih bildiriminin tebliğinden itibaren 1 ay içinde arabuluculuğa başvurulmalı, arabuluculuk sonuçsuz kalırsa 2 hafta içinde dava açılmalıdır. Süreler kesin ve önemlidir.'
  },
  {
    q: 'Kıdem tazminatı ne zaman hak edilir?',
    a: 'İşçinin en az 1 yıl çalışması ve belirli fesih sebepleriyle (emeklilik, ölüm, askerlik, işveren feshi vb.) iş sözleşmesinin sona ermesi durumunda kıdem tazminatı hak edilir.'
  }
];

interface PageProps {
  params: { locale: Locale };
}

export default function IsSosyalGuvenlikPage({ params }: PageProps) {
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
            <span className="text-[hsl(var(--gold))]">İş Hukuku</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10">
                <Icons.briefcase className="h-8 w-8 text-[hsl(var(--gold))]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--fg))]">İş Hukuku</h1>
                <p className="text-[hsl(var(--muted))] mt-1">İşe iade, tazminat ve sözleşme hizmetleri</p>
              </div>
            </div>
            <p className="text-base text-[hsl(var(--muted))] leading-relaxed">
              İş ilişkilerinde tarafların hak ve yükümlülüklerinin yasal değişiklikler ışığında dikkatle takip edilmesi gerekir.
              İşçi ve işveren tarafında dava ve danışmanlık hizmeti sunuyoruz.
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
