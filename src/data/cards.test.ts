import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import ids from './card-ids.json';
import notes from './card-notes.json';
import { ALL_CARD_KEYS, CARDS, cardImage, gallery } from './cards';

const SRC = join(__dirname, '..');
function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? sources(join(dir, d.name)) : /\.tsx?$/.test(d.name) && !d.name.endsWith('.test.ts') ? [join(dir, d.name)] : []));
}

describe('card data', () => {
  it('has a record, an official image URL and a note for every wanted card', () => {
    expect(ALL_CARD_KEYS.sort()).toEqual(Object.keys(ids).sort());
    for (const k of ALL_CARD_KEYS) {
      expect(CARDS[k]?.image).toMatch(/^https:\/\/cmsassets\.rgpub\.io\//);
      expect((notes as Record<string, { text: string }>)[k]?.text.length).toBeGreaterThan(0);
    }
  });
  it('builds resized image and gallery URLs', () => {
    expect(cardImage('kaisa', 360)).toMatch(/[?&]w=360&auto=format$/);
    expect(gallery('kaisa')).toBe('https://playriftbound.com/en-us/card-gallery/#card-gallery--ogn-039-298');
  });
  it('every card key referenced in the UI exists', () => {
    const known = new Set<string>(ALL_CARD_KEYS);
    const refs = new Set<string>();
    for (const file of sources(SRC)) {
      const text = readFileSync(file, 'utf8');
      for (const m of text.matchAll(/\bk="([A-Za-z]+)"/g)) refs.add(m[1] as string);
      for (const m of text.matchAll(/\b(?:example|k):\s*'([A-Za-z]+)'/g)) refs.add(m[1] as string);
    }
    const missing = [...refs].filter((r) => !known.has(r));
    expect(missing).toEqual([]);
  });
});
