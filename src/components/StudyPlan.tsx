import { useState } from 'react';
import { store } from '../lib/storage';

const KEY = 'rb-plan-v3';
const STEPS = [
  { id: 'rules', title: 'Learn the core rules', sub: 'Deck, cards, runes, turn, scoring', href: '#overview', link: 'Chapters 1–6' },
  { id: 'combat', title: 'Learn combat and the Chain', sub: 'Damage, showdowns, focus, priority', href: '#combat', link: 'Chapters 7–11' },
  { id: 'legend', title: 'Pick one legend and copy a proven list', sub: 'Play it for your whole first set', href: '#practice', link: 'How to practise' },
  { id: 'tempo', title: 'Point tempo', sub: 'Count turns, not points', href: '#tempo', link: 'Chapter 12' },
  { id: 'first', title: 'Going first vs second, value vs tempo', sub: 'Why the first player is ahead, and how decks win', href: '#first', link: 'Chapters 13–14' },
  { id: 'arch', title: 'Deck types and the coaching lessons', sub: 'Real decisions from a real game', href: '#archetypes', link: 'Chapters 15–16' },
  { id: 'build', title: 'Deckbuilding, runes and battlefields', sub: 'Once you can pilot a deck well', href: '#build', link: 'Chapters 17–19' },
  { id: 'side', title: 'Sideboards and bans', sub: 'For best-of-three events', href: '#sideboard', link: 'Chapters 20–21' }
];

function load(): Record<string, boolean> {
  try { return JSON.parse(store.get(KEY) ?? '{}') as Record<string, boolean>; } catch { return {}; }
}

/** Tick-off study plan, remembered on this device. */
export function StudyPlan() {
  const [done, setDone] = useState<Record<string, boolean>>(load);
  const toggle = (id: string) => setDone((d) => { const n = { ...d, [id]: !d[id] }; store.set(KEY, JSON.stringify(n)); return n; });
  const count = STEPS.filter((s) => done[s.id]).length;
  return (
    <>
      <ol className="plan">
        {STEPS.map((s) => (
          <li key={s.id} className={done[s.id] ? 'done' : ''}>
            <label>
              <input type="checkbox" id={`plan-${s.id}`} checked={!!done[s.id]} onChange={() => toggle(s.id)} />
              <span><span className="pt">{s.title}</span><span className="pd">{s.sub}</span></span>
              <a href={s.href}>{s.link}</a>
            </label>
          </li>
        ))}
      </ol>
      <div className="planbar">
        <span>{count} of {STEPS.length} done · saved on this device</span>
        <button type="button" className="btn" onClick={() => { setDone({}); store.set(KEY, null); }}>Clear</button>
      </div>
    </>
  );
}
