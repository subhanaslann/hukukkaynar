export type ReferenceStat = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  icon: 'scale' | 'briefcase' | 'shield' | 'gavel' | 'calendar' | 'globe';
};

export const REFERENCE_STATS: ReferenceStat[] = [
  // Use relative i18n keys; component is namespaced with 'references.stats'
  { id: 'cases', value: 320, suffix: '+', label: 'cases', icon: 'gavel' },
  { id: 'satisfaction', value: 97, suffix: '%', label: 'satisfaction', icon: 'scale' },
  { id: 'industries', value: 18, suffix: '+', label: 'industries', icon: 'briefcase' },
  { id: 'years', value: 12, suffix: '+', label: 'years', icon: 'calendar' }
];
