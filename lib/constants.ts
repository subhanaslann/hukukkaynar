import { SITE_URL } from './site-config';

export const SITE_NAME = 'Kaynar Hukuk Bürosu';
export { SITE_URL };

export const CONTACT_INFO = {
  phone: '+90-___-___-____',
  email: 'info@kaynar.av.tr',
  address: '___ Mah., ___ Sk. No: __, ___ / ___'
};

export const HEADER_LINKS = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Çalışma Alanları', href: '/calisma-alanlari' },
  { name: 'Makaleler', href: '/makaleler' },
  { name: 'Aktüel', href: '/aktuel' },
  { name: 'Ekibimiz', href: '/ekibimiz' },
  { name: 'İletişim', href: '/iletisim' }
] as const;

export const FOOTER_LINKS = [
  { name: 'KVKK Aydınlatma', href: '/kvkk/aydinlatma' },
  { name: 'Çerez Politikası', href: '/kvkk/cerez-politikasi' },
  { name: 'Veri Sahibi Başvurusu', href: '/kvkk/veri-sahibi-basvuru' },
  { name: 'Sorumluluk Reddi', href: '/hukuki/sorumluluk-reddi' },
  { name: 'Kullanım Şartları', href: '/hukuki/kullanim-sartlari' }
] as const;

export const GENERAL_DISCLAIMER =
  'Bu internet sitesindeki içerikler genel nitelikte bilgilendirme amacı taşır; hukuki danışmanlık değildir.';

export const CONTACT_NOTE =
  'Mesajınız gizlilikle ele alınır; bu iletişim avukat-müvekkil ilişkisi kurmaz.';

export const COOKIE_CATEGORY_KEYS = ['necessary', 'statistics', 'functional'] as const;
export type CookieCategoryKey = (typeof COOKIE_CATEGORY_KEYS)[number];

export const COOKIE_CATEGORIES = {
  necessary: {
    name: 'Zorunlu Çerezler',
    description: 'Bu çerezler, web sitesinin düzgün çalışması için gereklidir. Güvenlik, oturum yönetimi ve temel işlevsellik sağlar. Devre dışı bırakılamaz.'
  },
  statistics: {
    name: 'İstatistik Çerezleri',
    description: 'Ziyaretçi davranışlarını analiz eder, sayfa trafiğini izler ve site performansını ölçer. Anonim istatistikler toplar ve hizmet kalitesini artırmaya yardımcı olur.'
  },
  functional: {
    name: 'İşlevsel Çerezler',
    description: 'Dil tercihi, konum bilgisi gibi kişiselleştirmeleri saklar. Harita, video oynatıcı gibi üçüncü taraf hizmetlerin çalışmasını sağlar. Kullanıcı deneyimini geliştirir.'
  }
} as const;
