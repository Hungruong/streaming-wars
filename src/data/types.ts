export const PLATFORMS = {
  netflix: { name: 'Netflix', color: '#E50914' },
  disney_plus: { name: 'Disney+', color: '#113CCF' },
  amazon_prime: { name: 'Prime Video', color: '#00A8E1' },
  hbo_max: { name: 'Max', color: '#B535F6' },
  hulu: { name: 'Hulu', color: '#1CE783' },
  apple_tv: { name: 'Apple TV+', color: '#555555' },
  paramount_plus: { name: 'Paramount+', color: '#0064FF' },
} as const;

export type PlatformId = keyof typeof PLATFORMS;

export interface SubscriberData {
  year: number;
  quarter: number;
  netflix: number | null;
  disney_plus: number | null;
  amazon_prime: number | null;
  hbo_max: number | null;
  hulu: number | null;
  apple_tv: number | null;
  paramount_plus: number | null;
}

export interface KeyEvent {
  date: string;
  event: string;
  platform: string;
  type: string;
  description: string;
}

export interface GeographicData {
  country_code: string;
  country_name: string;
  region: string;
  netflix: number;
  disney: number;
  prime: number;
  hbo: number;
  hulu: number;
  apple: number;
  paramount: number;
  total_services: number;
}

export interface MovieData {
  ID: number;
  Title: string;
  Year: number;
  Age: string;
  'Rotten Tomatoes': string;
  Netflix: number;
  Hulu: number;
  'Prime Video': number;
  'Disney+': number;
}
