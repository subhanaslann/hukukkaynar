export type ReferenceBadge = {
  id: string;
  title: string;
  description: string;
  icon: 'shield' | 'scale' | 'globe' | 'fileText' | 'gavel';
};

export const REFERENCE_BADGES: ReferenceBadge[] = [
  {
    id: 'iso',
    title: 'ISO 27001 Uyum',
    description: 'references.badges.iso',
    icon: 'shield'
  },
  {
    id: 'bar',
    title: 'Türkiye Barolar Birliği',
    description: 'references.badges.bar',
    icon: 'gavel'
  },
  {
    id: 'icc',
    title: 'ICC Tahkim Deneyimi',
    description: 'references.badges.icc',
    icon: 'globe'
  },
  {
    id: 'compliance',
    title: 'Uyum Programı Denetimleri',
    description: 'references.badges.compliance',
    icon: 'fileText'
  }
];

