export type ReferenceCompany = {
  id: string;
  name: string;
  logo?: string | null;
  href?: string;
};

export const REFERENCE_COMPANIES: ReferenceCompany[] = [
  { id: 'istanbul-barosu', name: 'İstanbul Barosu' },
  { id: 'turkiye-barolar-birligi', name: 'Türkiye Barolar Birliği' },
  { id: 'ankara-barosu', name: 'Ankara Barosu' },
  { id: 'anatolia-bank', name: 'Anatolia Bankası' },
  { id: 'def-insurance', name: 'DEF Sigorta' },
  { id: 'eurotech', name: 'EuroTech Enerji' },
  { id: 'halley', name: 'Halley Holding' },
  { id: 'nova', name: 'Nova İnşaat' },
  { id: 'orion', name: 'Orion Telekom' },
  { id: 'pioneer', name: 'Pioneer Gıda' },
  { id: 'quantum', name: 'Quantum Yazılım' },
  { id: 'rosea', name: 'Rosea Kozmetik' },
  { id: 'selene', name: 'Selene Lojistik' },
  { id: 'terra', name: 'Terra Enerji' },
  { id: 'umbra', name: 'Umbra Sağlık' },
  { id: 'valens', name: 'Valens Finans' },
  { id: 'westbridge', name: 'Westbridge Danışmanlık' },
  { id: 'yaprak', name: 'Yaprak Mobilya' },
  { id: 'zenon', name: 'Zenon Teknoloji' }
];
