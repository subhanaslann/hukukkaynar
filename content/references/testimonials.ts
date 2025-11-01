export type ReferenceTestimonial = {
  id: string;
  name: string;
  title: string;
  company: string;
  rating: number;
  text: string;
  locale?: string;
  image?: string | null;
  translationKey?: string;
};

export const REFERENCE_TESTIMONIALS: ReferenceTestimonial[] = [
  {
    id: 'ayse-demir',
    name: 'Ayşe Demir',
    title: 'Hukuk ve Uyum Direktörü',
    company: 'DEF Sigorta',
    rating: 5,
    text: 'Kaynar Hukuk, karmaşık sigorta uyuşmazlıklarımızda stratejik yaklaşımıyla kısa sürede sonuç almamızı sağladı. Her adımda kurumsal standartlarımızı gözettiler.',
    translationKey: 'ayseDemir'
  },
  {
    id: 'mert-ozkan',
    name: 'Mert Özkan',
    title: 'Genel Müdür',
    company: 'Nova İnşaat',
    rating: 5,
    text: 'İhale süreçlerinden sözleşme denetimine kadar geniş bir kapsamda destek aldık. Ekip, zaman baskısı altında dahi titiz ve çözüm odaklı çalıştı.',
    translationKey: 'mertOzkan'
  },
  {
    id: 'selin-kaya',
    name: 'Selin Kaya',
    title: 'İnsan Kaynakları Başkanı',
    company: 'Umbra Sağlık',
    rating: 5,
    text: 'Çalışma hukukuna ilişkin tüm danışmanlık ihtiyaçlarımızda doğru risk analizleri ve pratik öneriler sundular. Yönetim kurulumuzun güvenilir danışmanı oldular.',
    translationKey: 'selinKaya'
  },
  {
    id: 'levent-akar',
    name: 'Levent Akar',
    title: 'Finans Direktörü',
    company: 'Valens Finans',
    rating: 5,
    text: 'Bankacılık mevzuatına hakimiyetleri ve hızlı geri dönüşleriyle, denetim dönemlerinde bizi büyük yükten kurtardılar. Şeffaf iletişimleri takdire değer.',
    translationKey: 'leventAkar'
  },
  {
    id: 'dilara-sahin',
    name: 'Dilara Şahin',
    title: 'Kurucu Ortak',
    company: 'Quantum Yazılım',
    rating: 5,
    text: 'Start-up yatırım turlarımızda yatırımcı sözleşmelerini titizlikle yöneterek haklarımızı korudular. Teknoloji sektörünün ihtiyaçlarını anlıyorlar.',
    translationKey: 'dilaraSahin'
  },
  {
    id: 'cem-basaran',
    name: 'Cem Başaran',
    title: 'Operasyon Direktörü',
    company: 'Selene Lojistik',
    rating: 4,
    text: 'Uluslararası taşımacılıkta karşılaştığımız hukuki riskleri hızlıca analiz edip uygulanabilir aksiyon planları sundular. Süreç boyunca ulaşılabilir kaldılar.',
    translationKey: 'cemBasaran'
  }
];
