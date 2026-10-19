import raw from './cards.json';

export type Domain = 'fury' | 'calm' | 'mind' | 'body' | 'chaos' | 'order' | 'colorless';

export interface CardData {
  id: string;
  name: string;
  type: string[];
  supertypes: string[];
  domains: Domain[];
  energy: number | null;
  power: number | null;
  might: number | null;
  orientation: 'portrait' | 'landscape';
  /** Official image URL on Riot's CDN. Never copied into this repo. */
  image: string;
}

export const CARDS = raw as Record<string, CardData>;
export type CardKey = keyof typeof raw;

export function card(key: CardKey): CardData {
  return CARDS[key] as CardData;
}

/** Resized, format-negotiated (WebP/AVIF) URL for an official card image. */
export function cardImage(key: CardKey, width: number): string {
  const { image } = card(key);
  return `${image}${image.includes('?') ? '&' : '?'}w=${width}&auto=format`;
}

export function gallery(key: CardKey): string {
  return `https://playriftbound.com/en-us/card-gallery/#card-gallery--${card(key).id}`;
}

export const ALL_CARD_KEYS = Object.keys(raw) as CardKey[];
