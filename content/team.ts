import type { LegalArea } from '@/lib/areas';

export type TeamMember = {
  slug: string;
  name: string;
  university: string;
  areas: LegalArea[] | string[];
  avatar: string;
  bio?: string;
  email?: string;
};

export const TEAM: TeamMember[] = [
  {
    slug: 'muhammet-kaynar',
    name: 'Muhammet Kaynar',
    university: 'İstanbul Üniversitesi',
    bio: '15 yılı aşkın deneyimi ile şirketler hukuku, iş hukuku ve idare hukuku alanlarında uzmanlaşmıştır. Özellikle karmaşık ticari uyuşmazlıklar ve kamu ihalelerinde geniş tecrübeye sahiptir. Müvekkillerine çözüm odaklı ve pragmatik hukuki danışmanlık sunmaktadır.',
    areas: ['Şirketler Hukuku', 'Kira Hukuku', 'İş Hukuku', 'İdare Hukuku', 'Belediye Hukuku', 'Kamulaştırma Hukuku'],
    avatar: '/team/muhammet-kaynar.jpg'
  },
  {
    slug: 'ahmet-karakus',
    name: 'Ahmet Karakuş',
    university: 'Fatih Sultan Mehmet Üniversitesi',
    bio: 'Sigorta hukuku ve iş hukuku alanında uzman avukat. İş kazaları, meslek hastalıkları ve sigorta tazminat davalarında yüzlerce başarılı dosya yönetmiştir. İcra ve iflas hukuku konusunda da derin bilgi ve tecrübeye sahiptir.',
    areas: ['Sigorta Hukuku', 'İş Hukuku', 'İcra ve İflas Hukuku'],
    avatar: '/team/ahmet-karakus.jpg'
  },
  {
    slug: 'mahmut-toktas',
    name: 'Mahmut Toktaş',
    university: 'İstanbul Üniversitesi',
    bio: 'İdare hukuku ve belediye hukuku alanlarında derinlemesine bilgi sahibidir. Kamulaştırma davaları ve imar uyuşmazlıklarında geniş deneyime sahiptir. Kamu kurumları ile özel sektör arasındaki hukuki süreçlerde etkin çözümler üretmektedir.',
    areas: ['Şirketler Hukuku', 'Kira Hukuku', 'İş Hukuku', 'İdare Hukuku', 'Belediye Hukuku', 'Kamulaştırma Hukuku'],
    avatar: '/team/placeholder.jpg'
  },
  {
    slug: 'muhammed-ihsan-kaynar',
    name: 'Muhammed İhsan Kaynar',
    university: 'İstanbul Üniversitesi',
    bio: 'Sermaye piyasası ve bankacılık hukuku konularında uzmanlaşmış genç ve dinamik avukat. Ticari sözleşmeler, şirket birleşmeleri ve finansal uyuşmazlıklarda danışmanlık vermektedir. Güncel ekonomik gelişmeleri yakından takip ederek müvekkillerine stratejik çözümler sunmaktadır.',
    areas: ['Kira Hukuku', 'Ticaret Hukuku', 'Sermaye Piyasası Hukuku', 'Bankacılık Hukuku'],
    avatar: '/team/muhammed-ihsan-kaynar.jpg'
  },
  {
    slug: 'huseyin-kaynar',
    name: 'Hüseyin Kaynar',
    university: 'İstanbul Üniversitesi',
    bio: 'Rekabet hukuku ve uluslararası tahkim alanlarında uzman. Ceza hukuku davalarında da geniş tecrübeye sahiptir. Yabancılar hukuku konusunda danışmanlık vererek uluslararası müvekkillerle çalışmaktadır. İngilizce dilinde hukuki hizmet sunabilmektedir.',
    areas: ['Rekabet Hukuku', 'Şirketler Hukuku', 'Ceza Hukuku', 'Yabancılar ve Tahkim Hukuku'],
    avatar: '/team/huseyin-kaynar.jpg'
  }
];
