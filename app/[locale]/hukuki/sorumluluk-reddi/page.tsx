import Section from '@/components/Section';

export default function SorumlulukReddiPage() {
  return (
    <Section
      title="Sorumluluk Reddi"
      description="Kaynar Hukuk Bürosu internet sitesinde yayınlanan içerikler genel bilgilendirme amacı taşır."
    >
      <div className="space-y-4 text-sm leading-relaxed text-primary-700">
        <p>
          Sitede yer alan bilgiler, somut olaylara dair hukuki görüş niteliği taşımaz. İçeriklerin güncelliği ve doğruluğu için özen gösterilmekle birlikte mevzuat değişiklikleri veya yargı kararları nedeniyle farklılıklar oluşabilir.
        </p>
        <p>
          Bu bilgiler esas alınarak alınan kararlardan doğabilecek zararlardan Kaynar Hukuk Bürosu sorumlu tutulamaz. Somut hukuki meseleleriniz için doğrudan profesyonel destek almanız önerilir.
        </p>
      </div>
    </Section>
  );
}