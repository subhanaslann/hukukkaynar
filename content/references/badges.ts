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
    // Use relative i18n keys; component is namespaced with 'references.badges'
    description: 'iso',
    icon: 'shield'
  },
  {
    id: 'bar',
    title: 'Türkiye Barolar Birliği',
    description: 'bar',
    icon: 'gavel'
  },
  {
    id: 'icc',
    title: 'ICC Tahkim Deneyimi',
    description: 'icc',
    icon: 'globe'
  },
  {
    id: 'compliance',
    title: 'Uyum Programı Denetimleri',
    description: 'compliance',
    icon: 'fileText'
  }
];
