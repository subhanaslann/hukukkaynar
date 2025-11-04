export type LegalArea =
  | 'Ceza Hukuku'
  | 'Aile Hukuku'
  | 'İş Hukuku'
  | 'Ticaret Hukuku'
  | 'İdare Hukuku'
  | 'Kira Hukuku'
  | 'İcra ve İflas Hukuku'
  | 'Sözleşmeler Hukuku'
  | 'Yabancılar ve Tahkim Hukuku'
  | 'Belediye Hukuku'
  | 'Kamulaştırma Hukuku'
  | 'Rekabet Hukuku'
  | 'Sermaye Piyasası Hukuku'
  | 'Bankacılık Hukuku'
  | 'Sigorta Hukuku';

export type PracticeAreaKey =
  | 'criminal'
  | 'family'
  | 'labor'
  | 'commercial'
  | 'competition'
  | 'enforcement'
  | 'administrative'
  | 'real_estate'
  | 'contracts'
  | 'international';

export type PracticeAreaDefinition = {
  key: PracticeAreaKey;
  segment: string;
  icon: string;
};

export const PRACTICE_AREA_DEFINITIONS: PracticeAreaDefinition[] = [
  // Öncelikli alanlar
  { key: 'labor', segment: 'is-sosyal-guvenlik', icon: 'briefcase' },
  { key: 'commercial', segment: 'ticaret-sirketler', icon: 'building' },
  { key: 'competition', segment: 'rekabet', icon: 'shield' },
  { key: 'enforcement', segment: 'icra-iflas', icon: 'gavel' },
  { key: 'administrative', segment: 'idare', icon: 'landmark' },
  { key: 'real_estate', segment: 'kira', icon: 'home' },
  { key: 'contracts', segment: 'sozlesmeler', icon: 'fileText' },
  { key: 'international', segment: 'yabancilar-tahkim', icon: 'globe' },
  // İstenen şekilde sona alınan alanlar
  { key: 'family', segment: 'aile', icon: 'heart' },
  { key: 'criminal', segment: 'ceza', icon: 'scale' }
];
