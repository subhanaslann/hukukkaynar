export type ReferenceStat = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  icon: 'scale' | 'briefcase' | 'shield' | 'gavel' | 'calendar' | 'globe';
};

export const REFERENCE_STATS: ReferenceStat[] = [
  { id: 'cases', value: 320, suffix: '+', label: 'references.stats.cases', icon: 'gavel' },
  { id: 'satisfaction', value: 97, suffix: '%', label: 'references.stats.satisfaction', icon: 'scale' },
  { id: 'industries', value: 18, suffix: '+', label: 'references.stats.industries', icon: 'briefcase' },
  { id: 'years', value: 12, suffix: '+', label: 'references.stats.years', icon: 'calendar' }
];

