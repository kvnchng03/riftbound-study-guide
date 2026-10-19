/**
 * Refreshes src/data/cards.json from Riot's public Riftbound card-gallery feed.
 *
 * Only stats and the official image URL are stored. Images are never copied into this repo:
 * the app loads them from Riot's CDN at runtime. Run with: npm run cards
 */
import { readFile, writeFile } from 'node:fs/promises';

const FEED =
  'https://content.publishing.riotgames.com/publishing-content/v2.0/public/channel/riftbound_website/list/riftbound_gallery_cards?locale=en_US';
const PAGE = 200;

interface Wanted { id?: string; name?: string; subtitle?: string | null; display: string }
interface RawCard {
  id: string;
  name: string;
  subtitle?: string;
  cardType: { type: { id: string }[]; superType?: { id: string }[] };
  domain?: { values: { id: string }[] };
  energy?: { value: { id: number } };
  power?: { value: { id: number } };
  might?: { value: { id: number } };
  orientation?: string;
  cardImage: { url: string; dimensions: { width: number; height: number } };
}

async function fetchAll(): Promise<RawCard[]> {
  // Pages can come back a little short, so walk by the feed's reported total and de-duplicate.
  const byId = new Map<string, RawCard>();
  let total = Infinity;
  for (let from = 0; from < total; from += PAGE) {
    const res = await fetch(`${FEED}&from=${from}&limit=${PAGE}`);
    if (!res.ok) throw new Error(`Feed request failed: ${res.status} ${res.statusText}`);
    const body = (await res.json()) as { data: RawCard[]; metadata: { totalItems: number } };
    total = body.metadata.totalItems;
    for (const card of body.data) byId.set(card.id, card);
  }
  return [...byId.values()];
}

function pick(all: RawCard[], want: Wanted, key: string): RawCard {
  if (want.id) {
    const hit = all.find((c) => c.id === want.id);
    if (!hit) throw new Error(`${key}: no card with id ${want.id}`);
    return hit;
  }
  const hits = all.filter(
    (c) => c.name === want.name && (!want.subtitle || c.subtitle === want.subtitle) && !/[a-z]$/.test(c.id.split('-')[1] ?? '')
  );
  const hit = hits[0];
  if (!hit) throw new Error(`${key}: no card named ${want.name}${want.subtitle ? `, ${want.subtitle}` : ''}`);
  return hit;
}

const wanted = JSON.parse(await readFile(new URL('../src/data/card-ids.json', import.meta.url), 'utf8')) as Record<string, Wanted>;
const all = await fetchAll();
const out: Record<string, unknown> = {};
for (const [key, want] of Object.entries(wanted)) {
  const c = pick(all, want, key);
  out[key] = {
    id: c.id,
    name: want.display,
    type: c.cardType.type.map((t) => t.id),
    supertypes: (c.cardType.superType ?? []).map((t) => t.id),
    domains: (c.domain?.values ?? []).map((d) => d.id),
    energy: c.energy?.value.id ?? null,
    power: c.power?.value.id ?? null,
    might: c.might?.value.id ?? null,
    orientation: c.cardImage.dimensions.width > c.cardImage.dimensions.height ? 'landscape' : 'portrait',
    image: c.cardImage.url
  };
}
await writeFile(new URL('../src/data/cards.json', import.meta.url), JSON.stringify(out, null, 1) + '\n');
console.log(`Wrote ${Object.keys(out).length} cards from ${all.length} in the feed.`);
