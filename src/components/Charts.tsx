import { useState } from 'react';

/** Points grouped by turns still needed to win. */
export function Breakpoints() {
  const groups = [[0, 1, 4], [2, 3, 3], [4, 5, 2], [6, 7, 1]] as const;
  return (
    <div className="svgfig">
      <svg viewBox="0 0 760 140" role="img" aria-label="0 or 1 points need four turns, 2 or 3 need three, 4 or 5 need two, 6 or 7 need one.">
        {groups.map(([a, b, t], i) => {
          const x0 = 20 + i * 184;
          const last = i === 3;
          return (
            <g key={i}>
              <rect x={x0} y={14} width={168} height={62} rx={10} fill={last ? 'var(--gold-soft)' : 'var(--paper)'} stroke={last ? 'var(--gold)' : 'var(--rule)'} />
              {[a, b].map((v, j) => (
                <g key={v}>
                  <circle cx={x0 + 50 + j * 70} cy={45} r={19} fill="var(--paper)" stroke={j === 0 ? 'var(--ink)' : 'var(--ink-3)'} strokeWidth={j === 0 ? 2 : 1.2} />
                  <text x={x0 + 50 + j * 70} y={51.5} textAnchor="middle" fontSize={18} fontWeight={700} style={{ fill: j === 0 ? 'var(--ink)' : 'var(--ink-3)' }}>{v}</text>
                </g>
              ))}
              <text x={x0 + 84} y={104} textAnchor="middle" className={last ? 'tl-g' : 'tl-b'}>{t} {t === 1 ? 'turn' : 'turns'} to win</text>
            </g>
          );
        })}
        <text x={380} y={132} textAnchor="middle" className="tl-s">At 2 points a turn, only reaching an even number gets you a turn closer.</text>
      </svg>
    </div>
  );
}

const SB = [
  { group: 'Even meta (each matchup 20%)', values: [47, 52, 51] },
  { group: 'Bad matchup is 60% of the field', values: [33.5, 38.5, 45.5] }
];
const SERIES = [
  { name: 'No plan', color: 'var(--s0)' },
  { name: 'A: +5% everywhere', color: 'var(--s1)' },
  { name: 'B: fix the worst matchup', color: 'var(--s2)' }
];

/** Daremx's sideboard math as grouped bars, with a tap/hover readout. */
export function SideboardChart() {
  const [tip, setTip] = useState<string | null>(null);
  const L = 48, R = 710, T = 24, B = 236;
  const y = (v: number) => B - ((B - T) * v) / 60;
  const gw = (R - L) / 2, bw = 62, gap = 2;
  return (
    <div>
      <div className="row" style={{ gap: 16, fontSize: 14, color: 'var(--ink-2)', marginBottom: 6 }}>
        {SERIES.map((s) => <span key={s.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><i style={{ width: 11, height: 11, borderRadius: 3, background: s.color, display: 'inline-block' }} />{s.name}</span>)}
      </div>
      <div className="svgfig" style={{ overflowX: 'auto' }}>
        <svg viewBox="0 0 720 290" role="img" aria-label="Even meta: no plan 47%, A 52%, B 51%. Meta where the bad matchup is 60% of the field: no plan 33.5%, A 38.5%, B 45.5%." style={{ minWidth: 460 }}>
          {[0, 20, 40, 60].map((v) => (
            <g key={v}>
              <line x1={L} x2={R} y1={y(v)} y2={y(v)} stroke="var(--rule)" />
              <text x={L - 8} y={y(v) + 4} textAnchor="end" className="tl-s">{v}%</text>
            </g>
          ))}
          {SB.map((g, gi) => {
            const gx = L + gw * gi + gw / 2;
            const start = gx - (3 * bw + 2 * gap) / 2;
            return (
              <g key={g.group}>
                {g.values.map((v, bi) => {
                  const x = start + bi * (bw + gap), yy = y(v);
                  const label = `${SERIES[bi]?.name}: ${v}% overall (${g.group})`;
                  return (
                    <g key={bi} tabIndex={0} role="button" aria-label={label} onMouseEnter={() => setTip(label)} onFocus={() => setTip(label)} onClick={() => setTip(label)} onMouseLeave={() => setTip(null)}>
                      <path d={`M${x},${B} V${yy + 4} Q${x},${yy} ${x + 4},${yy} H${x + bw - 4} Q${x + bw},${yy} ${x + bw},${yy + 4} V${B} Z`} fill={SERIES[bi]?.color} />
                      <text x={x + bw / 2} y={yy - 7} textAnchor="middle" fontSize={13} fontWeight={700} style={{ fill: 'var(--ink)' }}>{v}%</text>
                      <rect x={x} y={T} width={bw} height={B - T} fill="transparent" />
                    </g>
                  );
                })}
                <text x={gx} y={B + 26} textAnchor="middle" className="tl">{g.group}</text>
              </g>
            );
          })}
          <line x1={L} x2={R} y1={B} y2={B} stroke="var(--ink-3)" />
        </svg>
      </div>
      <p className="muted" aria-live="polite" style={{ minHeight: 22, margin: '4px 0 0' }}>{tip ?? 'Tap or hover a bar for its value.'}</p>
    </div>
  );
}

/** The three rings of reading a ban, with the September 2026 example. */
export function BanRings() {
  const rows = [
    ['Level 0 · direct hits', 'Which decks played the banned card, and how badly does losing it hurt?', 'Ekko ban: the Lux infinite combo stops working.'],
    ['Level 1 · matchup ripples', 'Which decks improve because their bad matchups got hit?', 'Decks that lost to Lux and Kennen (LeBlanc, Jayce Aurora) rise.'],
    ['Level 2 · where it settles', 'Counter-decks rise, then the decks that beat those.', 'Expect more anti-Aurora and anti-LeBlanc decks next.']
  ];
  return (
    <div className="row" style={{ gap: 20, alignItems: 'center' }}>
      <div className="svgfig" style={{ width: 'min(100%, 220px)', flex: 'none' }}>
        <svg viewBox="0 0 220 220" role="img" aria-label="Three rings: the ban at the centre, level 1 around it, level 2 outside.">
          <circle cx="110" cy="110" r="104" fill="none" stroke="var(--rule)" strokeWidth="1.4" />
          <circle cx="110" cy="110" r="70" fill="none" stroke="var(--ink-3)" strokeWidth="1.4" />
          <circle cx="110" cy="110" r="36" fill="var(--red-soft)" stroke="var(--red)" strokeWidth="1.6" />
          <text x="110" y="115" textAnchor="middle" className="tl-r">Ban</text>
          <text x="110" y="62" textAnchor="middle" className="tl-b">Level 1</text>
          <text x="110" y="26" textAnchor="middle" className="tl-b">Level 2</text>
        </svg>
      </div>
      <ol className="steps" style={{ flex: '1 1 280px', margin: 0 }}>
        {rows.map(([t, d, e]) => <li key={t}><b>{t}.</b> {d} <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{e}</span></li>)}
      </ol>
    </div>
  );
}

/** Filling 40 slots, in Daremx's order. */
export function BuildSteps() {
  const stages: [string, string, (i: number) => string][] = [
    ['1. Skeleton', 'core package · ~20', (i) => (i < 20 ? 'u' : 'e')],
    ['2. + Staples', 'cards every deck plays · ~35', (i) => (i < 20 ? 'u' : i < 35 ? 's' : 'e')],
    ['3. Balance', 'curve and unit count · 40', (i) => (i < 20 ? 'u' : i < 35 ? 's' : 'g')],
    ['4. Refine', 'keep testing the flex slots', (i) => (i < 20 ? 'u' : i < 35 ? 's' : 'f')]
  ];
  return (
    <>
      <div className="panels" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,160px),1fr))' }}>
        {stages.map(([t, sub, kind]) => (
          <div className="panel" key={t}>
            <h5>{t}</h5><p className="ps">{sub}</p>
            <div className="slots">{Array.from({ length: 40 }, (_, i) => <i key={i} className={kind(i)} />)}</div>
          </div>
        ))}
      </div>
      <SlotLegend items={[['u', 'Core package'], ['s', 'Staples'], ['g', 'Balancing picks'], ['f', 'Flexible slots']]} />
    </>
  );
}

export function DeckShapes() {
  const decks: [string, number, number, number][] = [['Aggressive deck (Rek’Sai style)', 25, 12, 3], ['Reactive deck (Diana style)', 17, 20, 3]];
  return (
    <>
      {decks.map(([t, u, s, g]) => (
        <div key={t} style={{ marginBottom: 14 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}><b>{t}</b><span className="muted">{u} units · {s} spells · {g} gear</span></div>
          <div className="slots wide">{Array.from({ length: 40 }, (_, i) => <i key={i} className={i < u ? 'u' : i < u + s ? 's' : 'g'} />)}</div>
        </div>
      ))}
      <SlotLegend items={[['u', 'Units'], ['s', 'Spells and tricks'], ['g', 'Gear']]} />
    </>
  );
}

export function SealedShape() {
  const groups: [string, number, string][] = [['2-cost units', 5, 'u'], ['3–4 cost units', 8, 'u'], ['Big units', 4, 'u'], ['Combat tricks', 5, 's'], ['Value card', 1, 'g'], ['Other', 2, 'g']];
  return (
    <div className="row" style={{ gap: 16, alignItems: 'flex-start' }}>
      {groups.map(([t, n, k]) => (
        <div key={t} className="group" style={{ alignItems: 'center' }}>
          <div className="slots" style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, width: `calc(${n} * 18px)` }}>{Array.from({ length: n }, (_, i) => <i key={i} className={k} />)}</div>
          <b>{n}×</b><span className="gs" style={{ textAlign: 'center', maxWidth: 90 }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

function SlotLegend({ items }: { items: [string, string][] }) {
  return (
    <div className="row" style={{ gap: 16, marginTop: 10, fontSize: 14, color: 'var(--ink-2)' }}>
      {items.map(([k, t]) => <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span className="slots" style={{ width: 13 }}><i className={k} /></span>{t}</span>)}
    </div>
  );
}

/** Daremx's map analogy for sticking to one legend. */
export function Zoom() {
  const lv = [['All of Riftbound', 'many decks: you only see landmarks'], ['One legend', 'its plan, strengths and weaknesses'], ['One matchup', 'how it plays against one opponent'], ['One decision', 'should I move this unit right now?']];
  return (
    <div className="row" style={{ gap: 20, alignItems: 'center' }}>
      <div className="zoom" aria-hidden="true"><div><div><div><div /></div></div></div></div>
      <ol className="steps" style={{ flex: '1 1 260px', margin: 0 }}>
        {lv.map(([t, d]) => <li key={t}><b>{t}</b> · <span className="muted">{d}</span></li>)}
      </ol>
    </div>
  );
}
