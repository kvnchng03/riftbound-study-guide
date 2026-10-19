import { card, type CardKey, type Domain } from '../data/cards';
import notesRaw from '../data/card-notes.json';
import { DomainGlyph } from './DomainGlyph';

const NOTES = notesRaw as Record<string, { kw: string | null; text: string }>;

const TYPE_LABEL: Record<string, string> = { unit: 'Unit', spell: 'Spell', gear: 'Gear', legend: 'Legend', battlefield: 'Battlefield', rune: 'Rune' };

function typeLine(key: CardKey): string {
  const c = card(key);
  const sup = c.supertypes.filter((s) => s !== 'basic').map((s) => s[0]?.toUpperCase() + s.slice(1));
  return [...sup, ...c.type.map((t) => TYPE_LABEL[t] ?? t)].join(' ');
}

function splitName(name: string): [string, string | null] {
  const i = name.indexOf(', ');
  return i > 0 ? [name.slice(0, i), name.slice(i + 2)] : [name, null];
}

/**
 * A card drawn from Riot's real card data (name, costs, might, colours) with a short
 * paraphrase of its effect. Stands in for the official card image when it can't load.
 */
export function ProxyCard({ k, detail = false }: { k: CardKey; detail?: boolean }) {
  const c = card(k);
  const note = NOTES[k] ?? { kw: null, text: '' };
  const doms = (c.domains.length ? c.domains : ['colorless']) as Domain[];
  const main = doms[0] as Domain;
  const [name, sub] = splitName(c.name);
  const land = c.orientation === 'landscape';
  const isRune = c.type.includes('rune');
  const style = { '--d1': `var(--d-${main})`, '--d2': `var(--d-${doms[1] ?? main})` } as React.CSSProperties;
  return (
    <span className={`px${land ? ' px-land' : ''}${isRune ? ' px-rune' : ''}${detail ? ' px-detail' : ''}`} style={style}>
      <span className="px-art"><DomainGlyph domain={main} className="px-glyph" /></span>
      {c.energy !== null && (
        <span className="px-cost">
          <b>{c.energy}</b>
          {Array.from({ length: c.power ?? 0 }, (_, i) => <i key={i} className="px-pip" />)}
        </span>
      )}
      {c.might !== null && <span className="px-might">{c.might}</span>}
      <span className="px-body">
        {!isRune && <span className="px-type">{typeLine(k)}</span>}
        <span className="px-name">{name}{sub && <small>{sub}</small>}</span>
        {(note.kw || note.text) && !isRune && (
          <span className="px-text">{note.kw && <em>{note.kw}</em>} {note.text}</span>
        )}
      </span>
    </span>
  );
}
