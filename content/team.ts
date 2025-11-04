import type { LegalArea } from '@/lib/areas';

export type TeamMember = {
  slug: string;
  name: string;
  university: string;
  areas: LegalArea[] | string[];
  avatar: string;
  bio?: string;
  email?: string;
  title?: string;
};

export const TEAM: TeamMember[] = [
  {
    slug: 'muhammet-kaynar',
    name: 'Muhammet Kaynar',
    university: 'İstanbul Üniversitesi',
    bio: `1972 yılında Kastamonu’nun Araç ilçesinde doğdu. 1990 yılında Kastamonu İmam Hatip Lisesinden, 1994 yılında İstanbul Üniversitesi Hukuk Fakültesinden mezun oldu. Aynı üniversitede Özel Hukuk Anabilim Dalında yüksek lisans yaptı. “Konut ve Çatılı İşyeri Kiralarında Kira Bedelinin Belirlenmesi” konulu yüksek lisans tezi kitap olarak yayımlandı.

1995 yılından itibaren avukat olarak çalışmaktadır. Zeytinburnu’nda avukatlık bürosu bulunmakta ve Zeytinburnu’nda ikamet etmektedir.

Üniversite yıllarında Milli Gençlik Vakfında çeşitli görevlerde bulundu. Siyasete 1995 yılında Refah Partisi Eminönü İlçe Başkan Yardımcısı olarak başladı. 1999-2004 ve 2004-2009 dönemlerinde Eminönü Belediyesi meclis üyeliği, belediye encümen üyeliği ve başkan danışmanlığı görevlerini yaptı.

2015-2019 dönemlerinde AK Parti İstanbul İl Disiplin Kurulu başkan vekili olarak görev yaptı. 31 Mart 2019 seçimlerinde İstanbul Büyükşehir Belediyesi ve Zeytinburnu Belediye Meclis üyesi olarak seçildi. 2019-2024 döneminde İBB meclisinde Hukuk Komisyonu başkanı, Denetim Komisyonu başkanı, İETT Araç Bakım ve Alım İhaleleri İnceleme Komisyon başkanı, İşçi Çıkartmalarını İnceleme ve Araştırma Komisyonu başkanı olarak ve Zeytinburnu Belediye meclisi AK Parti Grup Başkan vekili olarak görev yaptı. 31 Mart 2024 seçimlerinde tekrar İstanbul Büyükşehir Belediyesi ve Zeytinburnu Belediye meclis üyesi olarak seçildi.

Kastamonulular Dayanışma Derneği (KASDER) Genel Merkez Yönetim Kurulu üyesidir. Çeşitli sivil toplum kuruluşlarında görevleri bulunmaktadır. Evli ve 4 çocuk babasıdır.`,
    areas: ['Şirketler Hukuku', 'Kira Hukuku', 'İş Hukuku', 'İdare Hukuku', 'Kamulaştırma Hukuku'],
    avatar: '/team/muhammet-kaynar.jpg'
  },
  {
    slug: 'mahmut-toktas',
    name: 'Mahmut Toktaş',
    university: 'İstanbul Üniversitesi',
    bio: 'İdare hukuku ve belediye hukuku alanlarında derinlemesine bilgi sahibidir. Kamulaştırma davaları ve imar uyuşmazlıklarında geniş deneyime sahiptir. Kamu kurumları ile özel sektör arasındaki hukuki süreçlerde etkin çözümler üretmektedir.',
    areas: ['Şirketler Hukuku', 'Kira Hukuku', 'İş Hukuku', 'İdare Hukuku', 'Belediye Hukuku', 'Kamulaştırma Hukuku'],
    avatar: '/team/mahmut-toktas.jpg'
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
    avatar: '/team/huseyin-kaynar.jpg',
    title: 'Stajyer Avukat'
  }
];
