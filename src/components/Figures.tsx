import { useState, type ReactNode } from 'react';
import { Card, DeckStack, type Badge } from './Card';
import { Stepper, type Step } from './Stepper';
import { CardLinks } from './Blocks';
import type { CardKey } from '../data/cards';
import { assignDamage } from '../lib/combat';
import { RACES, turnsToWin, type RaceStep } from '../lib/tempo';

/* ---------- Chapter 1: the game in five steps ---------- */
export function Overview() {
  const step = (n: number, title: string, body: ReactNode, sub: string) => (
    <div className="panel">
      <h5>{n}. {title}</h5>
      <p className="ps">{sub}</p>
      <div className="row c">{body}</div>
    </div>
  );
  return (
    <div className="panels" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,128px),1fr))' }}>
      {step(1, 'Bring your deck', <><Card k="kaisaL" size="sm" /><DeckStack count={40} /></>, 'Legend, 40 cards, 12 runes, 3 battlefields')}
      {step(2, 'Get runes', <><Card k="runeFury" size="xs" /><Card k="runeMind" size="xs" /></>, '2 runes come out every turn')}
      {step(3, 'Play units', <><Card k="kaisa" size="sm" /><Card k="hopeful" size="sm" exhausted /></>, 'New units arrive sideways (exhausted)')}
      {step(4, 'Move and fight', <><Card k="targon" size="sm" /></>, 'Send units onto a battlefield')}
      {step(5, 'Score to 8', <><Card k="grove" size="sm" badges={[{ value: '+1', tone: 'point' }]} /></>, 'Take battlefields or keep them')}
    </div>
  );
}

/* ---------- Chapter 2: deck parts ---------- */
export function DeckParts() {
  return (
    <>
      <div className="row" style={{ gap: 18, alignItems: 'flex-start' }}>
        <div className="group"><span className="gl">Legend · 1</span><Card k="kaisaL" size="md" /></div>
        <div className="group"><span className="gl">Chosen Champion · 1</span><Card k="kaisa" size="md" /></div>
        <div className="group"><span className="gl">Main deck · 40</span><DeckStack count={40} label="40-card main deck" /><span className="gs">units, spells, gear</span></div>
        <div className="group">
          <span className="gl">Rune deck · 12</span>
          <div className="row" style={{ gap: 4, maxWidth: 'min(100%, 300px)' }}>
            {Array.from({ length: 12 }, (_, i) => <Card key={i} k={i < 7 ? 'runeFury' : 'runeMind'} size="xs" />)}
          </div>
          <span className="gs">7 Fury + 5 Mind in this deck</span>
        </div>
        <div className="group">
          <span className="gl">Battlefields · 3</span>
          <div className="row" style={{ gap: 8 }}>
            <Card k="targon" size="sm" /><Card k="grove" size="sm" /><Card k="zaun" size="sm" />
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: 20, gap: 16 }}>
        <Card k="falling" size="sm" badges={[{ value: '✓', tone: 'buff', label: 'allowed' }]} caption="Red: allowed" />
        <Card k="stupefy" size="sm" badges={[{ value: '✓', tone: 'buff', label: 'allowed' }]} caption="Blue: allowed" />
        <Card k="discipline" size="sm" dim badges={[{ value: '✗', tone: 'damage', label: 'not allowed' }]} caption="Green: not allowed" />
      </div>
    </>
  );
}

/* ---------- Chapter 3: reading a real card ---------- */
const SPOTS: { n: number; x: number; y: number; title: string; text: string }[] = [
  { n: 1, x: 11, y: 0, title: 'Energy cost', text: 'Turn this many runes sideways to pay it. Kai’Sa costs 4.' },
  { n: 2, x: 86, y: 0, title: 'Might', text: 'Her damage and her toughness: 4.' },
  { n: 3, x: 100, y: 54, title: 'Type line', text: 'Champion unit, plus tags like her champion name.' },
  { n: 4, x: 0, y: 60, title: 'Name', text: 'The full name includes the subtitle: "Kai’Sa, Survivor".' },
  { n: 5, x: 0, y: 73, title: 'Keyword', text: 'Accelerate: pay 1 energy + 1 Fury power extra and she enters ready.' },
  { n: 6, x: 100, y: 81, title: 'Rules text', text: '"When I conquer, draw 1": when she takes a battlefield, draw a card.' }
];
export function Anatomy() {
  return (
    <div className="row" style={{ gap: 24, alignItems: 'flex-start' }}>
      <div style={{ position: 'relative' }}>
        <Card k="kaisa" size="xl" />
        {SPOTS.map((s) => <span key={s.n} className="hotspot" style={{ left: `${s.x}%`, top: `${s.y}%` }}>{s.n}</span>)}
      </div>
      <ol className="steps" style={{ flex: '1 1 260px', marginTop: 4 }}>
        {SPOTS.map((s) => <li key={s.n}><b>{s.title}.</b> {s.text}</li>)}
        <li><b>Power cost.</b> Coloured symbols under the energy cost (Kai’Sa has none). Falling Star, the first card below, needs 2 Fury power on top of 2 energy.</li>
      </ol>
    </div>
  );
}

export function CardTypes() {
  return (
    <div className="row" style={{ gap: 18 }}>
      <Card k="falling" size="md" caption={<><b>Spell</b><br />one-time effect</>} />
      <Card k="discipline" size="md" caption={<><b>Reaction spell</b><br />any time, even on the chain</>} />
      <Card k="zhonya" size="md" caption={<><b>Gear</b><br />stays on the board</>} />
      <Card k="targon" size="md" caption={<><b>Battlefield</b><br />where units fight</>} />
      <Card k="runeFury" size="sm" caption={<><b>Rune</b><br />pays for everything</>} />
    </div>
  );
}

/* ---------- Chapter 4: paying with runes ---------- */
export function PayRunes() {
  const before: { k: CardKey; used?: 'power' | 'energy' }[] = [
    { k: 'runeFury', used: 'power' }, { k: 'runeFury', used: 'power' }, { k: 'runeFury' }, { k: 'runeFury' },
    { k: 'runeMind', used: 'energy' }, { k: 'runeMind', used: 'energy' }
  ];
  return (
    <div className="row" style={{ gap: 16, alignItems: 'stretch' }}>
      <div className="group"><span className="gl">You want to play</span><Card k="falling" size="md" caption={<b>2 energy + 2 Fury power</b>} /></div>
      <div className="zone" style={{ flex: '1 1 220px' }}>
        <span className="zt">Before: 6 ready runes</span>
        <div className="row" style={{ gap: 8 }}>{before.map((r, i) => <Card key={i} k={r.k} size="sm" highlight={!!r.used} />)}</div>
        <p className="muted" style={{ margin: '8px 0 0' }}>Highlighted: the runes you'll use.</p>
      </div>
      <span className="arrow">→</span>
      <div className="zone hl" style={{ flex: '1 1 260px' }}>
        <span className="zt">After paying</span>
        <div className="row" style={{ gap: 8 }}>
          <Card k="runeFury" size="sm" /><Card k="runeFury" size="sm" />
          <Card k="runeMind" size="sm" exhausted /><Card k="runeMind" size="sm" exhausted />
        </div>
        <p className="muted" style={{ margin: '8px 0 0' }}><span className="pill no">2 Fury recycled</span> to the bottom of the rune deck = 2 Fury power. <span className="pill pt">2 turned sideways</span> = 2 energy.</p>
      </div>
    </div>
  );
}

/* ---------- Chapter 5: the turn ---------- */
export function TurnPhases() {
  const P: [string, string, ReactNode, boolean?][] = [
    ['A · Awaken', 'Turn everything upright.', <><Card k="runeFury" size="xs" exhausted /><span className="arrow">→</span><Card k="runeFury" size="xs" /></>],
    ['B · Beginning', 'Score 1 for each battlefield you still hold.', <Card k="grove" size="sm" badges={[{ value: '+1', tone: 'point' }]} />, true],
    ['C · Channel', 'Put 2 runes from your rune deck into your base.', <><Card k="runeFury" size="xs" /><Card k="runeMind" size="xs" /></>],
    ['D · Draw', 'Draw 1 card.', <Card k="discipline" size="xs" />],
    ['Main', 'Play cards, move, fight. Conquer here.', <><Card k="kaisa" size="xs" /><span className="arrow">→</span><Card k="zaun" size="xs" /></>, true],
    ['Ending', 'All damage heals. Unused energy is lost.', <Card k="hopeful" size="xs" badges={[{ value: '0', tone: 'buff', label: 'healed' }]} />]
  ];
  return (
    <div className="panels">
      {P.map(([t, d, body, hl]) => (
        <div key={t} className={`panel${hl ? ' hl' : ''}`}>
          <h5>{t}</h5><p className="ps">{d}</p>
          <div className="row">{body}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Chapter 6: scoring over three turns ---------- */
export function ScoringPanels() {
  const panel = (title: string, score: number, note: string, yours: ReactNode, theirs: ReactNode, base: ReactNode, hl?: boolean) => (
    <div className={`panel${hl ? ' hl' : ''}`}>
      <h5 style={{ display: 'flex', justifyContent: 'space-between' }}><span>{title}</span><span className="pill pt">Score {score}</span></h5>
      <p className="ps">{note}</p>
      <div className="row" style={{ gap: 8 }}>
        <div className="group"><span className="gs">Your battlefield</span>{yours}</div>
        <div className="group"><span className="gs">Theirs</span>{theirs}</div>
      </div>
      <div className="zone" style={{ marginTop: 10, padding: 8 }}><span className="zt">Your base</span><div className="row" style={{ gap: 6, minHeight: 30 }}>{base}</div></div>
    </div>
  );
  return (
    <div className="panels">
      {panel('Your turn 2', 1, 'A unit moves onto your empty battlefield: conquer, +1.',
        <Card k="grove" size="sm" badges={[{ value: '+1', tone: 'point' }]} />, <Card k="zaun" size="sm" />,
        <Card k="hopeful" size="xs" exhausted caption="new unit" />, true)}
      {panel("Opponent's turn", 1, 'They don’t attack. Your unit is still on Grove.', <Card k="grove" size="sm" />, <Card k="zaun" size="sm" />, <Card k="hopeful" size="xs" />)}
      {panel('Your turn 3', 3, 'Hold Grove (+1), then a second unit conquers theirs (+1).',
        <Card k="grove" size="sm" badges={[{ value: '+1', tone: 'point' }]} />, <Card k="zaun" size="sm" badges={[{ value: '+1', tone: 'point' }]} />,
        <span className="muted">moved out</span>, true)}
    </div>
  );
}

/* ---------- Chapter 7: combat stepper ---------- */
interface CombatState { at: 'base' | 'bf'; shield?: boolean; atk?: boolean; def?: boolean; dead?: boolean; won?: boolean }
type CombatStep = Step & { s: CombatState };
const ATTACK = assignDamage(10, [{ id: 'shen', might: 5, tank: true }, { id: 'stalwart', might: 3 }]);
const DEFEND = assignDamage(8, [{ id: 'kaisa', might: 4 }, { id: 'forer', might: 6 }], ['forer', 'kaisa']);
const dmg = (list: typeof ATTACK.assignments, id: string) => list.find((a) => a.id === id)?.damage ?? 0;
const COMBAT: CombatStep[] = [
  { title: 'The board', text: 'The opponent controls this battlefield with Shen, Kinkou (3 might, Tank, Shield 2) and Stalwart Poro (2 might, Shield). You have Kai’Sa, Survivor (4) and Ferrous Forerunner (6) ready at home.', s: { at: 'base' } },
  { title: 'Move in', text: 'You exhaust both units to move them onto the opponent’s battlefield, so they turn sideways. It is now contested, so a combat starts.', s: { at: 'bf' } },
  { title: 'Shield counts when defending', text: 'Shield adds might while defending: Shen is now 5 and Stalwart Poro 3. Defenders total 8; you total 10.', s: { at: 'bf', shield: true } },
  { title: 'Showdown', text: 'You get focus first, then the opponent. Nobody plays a trick and both pass in a row, so the showdown ends and damage happens.', s: { at: 'bf', shield: true } },
  { title: 'You assign 10 damage', text: `Tank must be assigned first: ${dmg(ATTACK.assignments, 'shen')} to Shen (lethal). Then ${dmg(ATTACK.assignments, 'stalwart')} to Stalwart Poro (lethal). ${ATTACK.spare} left over.`, s: { at: 'bf', shield: true, atk: true } },
  { title: 'They assign 8 damage', text: `The defender chooses: ${dmg(DEFEND.assignments, 'forer')} to Ferrous Forerunner (lethal), ${dmg(DEFEND.assignments, 'kaisa')} to Kai’Sa (not lethal). All damage lands at once.`, s: { at: 'bf', shield: true, atk: true, def: true } },
  { title: 'Clean-up', text: 'Shen, Stalwart Poro and Ferrous Forerunner die. Forerunner’s Deathknell makes two 3-might Mech tokens in your base. Survivors heal, so Kai’Sa is back to full.', s: { at: 'bf', dead: true } },
  { title: 'You conquer', text: 'Only your unit is left, so you take the battlefield: +1 point. Kai’Sa’s "when she conquers" triggers too: draw 1.', s: { at: 'bf', dead: true, won: true } }
];

function CombatBoard({ s }: { s: CombatState }) {
  const defBadges = (k: 'shen' | 'stalwart', shielded: number): Badge[] => {
    const b: Badge[] = [];
    if (s.shield && !s.dead) b.push({ value: shielded, tone: 'buff', label: `${shielded} might while defending` });
    if (s.atk && !s.dead) b.push({ value: `-${dmg(ATTACK.assignments, k)}`, tone: 'damage', label: 'damage' });
    return b;
  };
  const atkBadges = (k: 'kaisa' | 'forer'): Badge[] => (s.def && !s.dead ? [{ value: `-${dmg(DEFEND.assignments, k)}`, tone: 'damage', label: 'damage' }] : []);
  return (
    <div className="mat">
      <div className={`bf${s.won ? ' won' : ''}`}>
        <div className="group">
          <Card k="rockfall" size="md" />
          <span className="gs">{s.won ? 'Now yours' : "Opponent's battlefield"}</span>
          {s.won && <span className="pill pt">+1 point, draw 1</span>}
        </div>
        <div className="side-units">
          <span className="ul">Defenders</span>
          <div className="units">
            <Card k="shen" size="sm" tag={s.dead ? undefined : 'TANK'} dead={s.dead} badges={defBadges('shen', 5)} />
            <Card k="stalwart" size="sm" dead={s.dead} badges={defBadges('stalwart', 3)} />
          </div>
          <span className="ul">Attackers</span>
          <div className="units">
            {s.at === 'bf' ? (
              <>
                <Card k="kaisa" size="sm" exhausted badges={atkBadges('kaisa')} />
                <Card k="forer" size="sm" exhausted dead={s.dead} badges={atkBadges('forer')} />
              </>
            ) : <span className="muted">none yet</span>}
          </div>
        </div>
      </div>
      <div className="zone" style={{ background: 'var(--paper)' }}>
        <span className="zt">Your base</span>
        <div className="row">
          {s.at === 'base' && <><Card k="kaisa" size="sm" /><Card k="forer" size="sm" /></>}
          {s.dead && <span className="pill ok">+ two 3-might Mech tokens (Deathknell)</span>}
          {s.at === 'bf' && !s.dead && <span className="muted">empty</span>}
        </div>
      </div>
    </div>
  );
}
export function CombatStepper() {
  return (
    <Stepper
      label="A real combat, step by step"
      steps={COMBAT}
      render={(st) => <CombatBoard s={st.s} />}
      footer={<CardLinks cards={['kaisa', 'forer', 'shen', 'stalwart', 'rockfall']} />}
    />
  );
}

/* ---------- Chapter 8: chain stepper ---------- */
type ChainKey = 'cleave' | 'gust' | 'odds';
type ChainStep = Step & { chain: ChainKey[]; might: number; target?: boolean; fizz?: boolean; done: ChainKey[] };
const CHAIN: ChainStep[] = [
  { title: 'The situation', text: 'Your Recruit (1 might) attacks a battlefield with two enemy Recruits. A showdown starts and you have focus.', chain: [], might: 1, done: [] },
  { title: 'You start a chain: Cleave', text: 'Cleave is an Action, so you can play it in a showdown. It goes on the chain and waits.', chain: ['cleave'], might: 1, done: [] },
  { title: 'They respond: Gust', text: 'Gust is a Reaction, so it can go on top. It bounces a unit with 3 or less might. Target: your Recruit.', chain: ['cleave', 'gust'], might: 1, target: true, done: [] },
  { title: 'You respond: Against the Odds', text: 'Another Reaction on top: your unit gets +2 might for each enemy unit there.', chain: ['cleave', 'gust', 'odds'], might: 1, target: true, done: [] },
  { title: 'Top resolves first: Against the Odds', text: 'Everyone passes, so the newest item resolves. Two enemy units = +4. Your Recruit is now 5.', chain: ['cleave', 'gust'], might: 5, done: ['odds'] },
  { title: 'Next: Gust has no legal target', text: 'Gust only hits a unit with 3 or less might. Your Recruit is 5, so Gust does nothing.', chain: ['cleave'], might: 5, fizz: true, done: ['odds', 'gust'] },
  { title: 'Last: Cleave resolves', text: 'Assault 3 adds +3 while attacking. Your Recruit fights at 8 and beats both enemy Recruits.', chain: [], might: 8, done: ['odds', 'gust', 'cleave'] }
];
const CHAIN_ORDER: ChainKey[] = ['cleave', 'gust', 'odds'];
const OWNER: Record<ChainKey, string> = { cleave: 'yours', gust: 'theirs', odds: 'yours' };
export function ChainStepper() {
  return (
    <Stepper
      label="Daremx's chain example, step by step"
      steps={CHAIN}
      render={(st) => (
        <div className="row" style={{ alignItems: 'stretch', gap: 14 }}>
          <div className="zone" style={{ flex: '1 1 220px', background: 'var(--paper)' }}>
            <span className="zt">Battlefield</span>
            <div className="row c" style={{ gap: 10 }}><Card k="recruit" size="sm" caption="enemy" /><Card k="recruit" size="sm" caption="enemy" /></div>
            <div className="row c" style={{ marginTop: 18 }}>
              <Card k="recruit" size="sm" exhausted highlight badges={[{ value: st.might, tone: st.might > 1 ? 'buff' : 'point', label: `${st.might} might` }]} caption={st.target ? <span className="bad">targeted by Gust</span> : 'your Recruit'} />
            </div>
          </div>
          <div className="zone" style={{ flex: '1 1 260px' }}>
            <span className="zt">The Chain · newest on top</span>
            <div className="chainpile">
              {st.chain.length === 0 && <p className="muted">Empty.</p>}
              {CHAIN_ORDER.filter((k) => st.chain.includes(k)).map((k, i) => (
                <Card key={k} k={k} size="sm" highlight={i === st.chain.length - 1} caption={OWNER[k]} style={{ left: `${i * 26}%`, top: `${(2 - i) * 14}%`, zIndex: i }} />
              ))}
            </div>
            {st.fizz && <p className="bad" style={{ margin: 0 }}>Gust fizzles: no legal target.</p>}
            {st.done.length > 0 && <p className="muted" style={{ margin: '4px 0 0' }}>Resolved: {st.done.map((k) => ({ cleave: 'Cleave', gust: 'Gust', odds: 'Against the Odds' })[k]).join(', ')}</p>}
          </div>
        </div>
      )}
      footer={<CardLinks cards={['cleave', 'gust', 'odds', 'recruit']} />}
    />
  );
}

/* ---------- Chapter 9: focus timeline ---------- */
export function FocusTimeline() {
  const ev: { who: 'a' | 'd'; k: CardKey | null; title: string; sub: string }[] = [
    { who: 'a', k: 'recruit', title: 'Move Recruit in', sub: 'vs their Noxus Hopeful (4)' },
    { who: 'a', k: 'cleave', title: 'Play Cleave', sub: 'Recruit becomes 4' },
    { who: 'd', k: 'voidseeker', title: 'Play Void Seeker', sub: '4 damage: Recruit dies' },
    { who: 'a', k: null, title: 'Pass', sub: 'second Cleave is useless now' },
    { who: 'd', k: null, title: 'Pass', sub: 'both passed: showdown ends' }
  ];
  return (
    <ol className="steps" style={{ margin: 0 }}>
      {ev.map((e, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', paddingLeft: 38 }}>
          {e.k ? <Card k={e.k} size="xs" /> : <span style={{ width: 'clamp(34px,9cqw,66px)' }} />}
          <span>
            <span className={`pill ${e.who === 'a' ? 'pt' : 'no'}`}>{e.who === 'a' ? 'You (attacker)' : 'Defender'} has focus</span><br />
            <b>{e.title}</b> <span className="muted">· {e.sub}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Chapter 10: tricky timing ---------- */
export function TriggerOrder() {
  return (
    <div className="row" style={{ gap: 16, alignItems: 'flex-start' }}>
      <div className="zone" style={{ background: 'var(--paper)' }}>
        <span className="zt">Their battlefield</span>
        <div className="row"><Card k="fan" size="sm" caption="defends" /><Card k="forer" size="sm" caption="defends" /></div>
        <div className="row" style={{ marginTop: 12 }}><Card k="yasuo" size="sm" exhausted highlight caption="attacks" /></div>
      </div>
      <ol className="steps" style={{ flex: '1 1 240px' }}>
        <li>Yasuo's attack trigger goes on the chain first: <i>deal 6 to Ferrous Forerunner</i>.</li>
        <li>The Fan's defend trigger goes on top: <i>kill me, send Yasuo home</i>.</li>
        <li><b>Top resolves first:</b> the Fan dies and Yasuo goes back to base.</li>
        <li>Yasuo's trigger resolves, but he is no longer there, so no damage. <b>Forerunner survives.</b></li>
      </ol>
    </div>
  );
}

export function CounterWar() {
  const items: { k: CardKey; who: string; what: string }[] = [
    { k: 'wages', who: 'You', what: 'deal 3 to their unit' },
    { k: 'defy', who: 'Them', what: 'counter Wages of Pain' },
    { k: 'lullaby', who: 'You', what: 'counter that Defy' },
    { k: 'defy', who: 'Them', what: 'second Defy: counter Wages of Pain directly' }
  ];
  return (
    <div className="row" style={{ gap: 16, alignItems: 'flex-start' }}>
      <div className="chainpile" style={{ flex: '1 1 260px', minHeight: 'clamp(190px,50cqw,320px)' }}>
        {items.map((it, i) => (
          <Card key={i} k={it.k} size="sm" highlight={i === 3} caption={`${i + 1}. ${it.who}`} style={{ left: `${i * 20}%`, top: `${(3 - i) * 10}%`, zIndex: i }} />
        ))}
      </div>
      <ol className="steps" style={{ flex: '1 1 260px' }}>
        {items.map((it, i) => <li key={i}><b>{it.who}:</b> {it.what}</li>)}
        <li><b>Resolving from the top:</b> 4 counters Wages of Pain. 3 counters the first Defy. Wages of Pain is countered anyway.</li>
      </ol>
    </div>
  );
}

/* ---------- Chapter 12: point-tempo race ---------- */
function Track({ score, label, color, won }: { score: number; label: string; color: string; won: boolean }) {
  return (
    <g>
      <text x="0" y="-6" className="tl-b">{label}</text>
      <text x="0" y="14" className={won ? 'tl-g' : 'tl-s'}>{won ? 'Wins!' : `${turnsToWin(score)} ${turnsToWin(score) === 1 ? 'turn' : 'turns'} to win`}</text>
      {Array.from({ length: 9 }, (_, k) => {
        const x = 150 + k * 68;
        const filled = k > 0 && k <= score;
        return (
          <g key={k}>
            {k > 0 && <line x1={x - 53} y1={0} x2={x - 15} y2={0} stroke={k <= score ? color : 'var(--rule)'} strokeWidth={3} strokeLinecap="round" />}
            <circle cx={x} cy={0} r={k === 8 ? 15 : 12} fill={filled ? color : 'var(--paper)'} stroke={k === 8 ? 'var(--gold)' : k <= score ? color : 'var(--ink-3)'} strokeWidth={k === 8 ? 2.2 : 1.4} />
            <text x={x} y={4.5} textAnchor="middle" fontSize={12.5} fontWeight={700} style={{ fill: filled ? 'var(--paper)' : 'var(--ink-3)' }}>{k}</text>
            {k === score && <circle cx={x} cy={0} r={k === 8 ? 21 : 18} fill="none" stroke={color} strokeWidth={2} />}
          </g>
        );
      })}
    </g>
  );
}
export function RaceStepper() {
  const [scn, setScn] = useState<'race' | 'flip'>('race');
  const steps = RACES[scn].map((r) => ({ ...r }));
  return (
    <div>
      <div className="tabs" role="group" aria-label="Scenario">
        <button type="button" aria-pressed={scn === 'race'} onClick={() => setScn('race')}>Nobody defends</button>
        <button type="button" aria-pressed={scn === 'flip'} onClick={() => setScn('flip')}>Second player holds once</button>
      </div>
      <Stepper<RaceStep>
        key={scn}
        label="Point-tempo race, turn by turn"
        steps={steps}
        render={(st) => (
          <div className="svgfig" style={{ overflowX: 'auto' }}>
            <svg viewBox="0 0 740 230" role="img" aria-label={`After turn ${st.turn}: going first ${st.first} points, going second ${st.second} points.`} style={{ minWidth: 520 }}>
              <text x="150" y="26" className="tl-t">Turn {st.turn}</text>
              {[2, 4, 6].map((b) => <line key={b} x1={150 + b * 68} y1={44} x2={150 + b * 68} y2={206} stroke="var(--rule)" strokeDasharray="3 4" />)}
              <g transform="translate(0,90)"><Track score={st.first} label="Going first" color="var(--s1)" won={st.first >= 8} /></g>
              <g transform="translate(0,170)"><Track score={st.second} label="Going second" color="var(--s2)" won={st.second >= 8} /></g>
              <text x="422" y="226" textAnchor="middle" className="tl-s">dashed lines = even breakpoints (2, 4, 6)</text>
            </svg>
          </div>
        )}
      />
    </div>
  );
}

/* ---------- Chapter 13: runes per turn ---------- */
export function FirstSecond() {
  const seq: [string, number, number][] = [['Going first', 1, 2], ['Going second', 1, 3], ['Going first', 2, 4], ['Going second', 2, 5], ['Going first', 3, 6], ['Going second', 3, 7]];
  return (
    <div className="panels" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,150px),1fr))' }}>
      {seq.map(([who, turn, n], i) => (
        <div className="panel" key={i}>
          <h5 style={{ color: who === 'Going first' ? 'var(--s1)' : 'var(--s2)' }}>{who}</h5>
          <p className="ps">Turn {turn} · <b style={{ color: 'var(--ink)' }}>{n} runes</b></p>
          <div className="row" style={{ gap: 3 }}>{Array.from({ length: n }, (_, k) => <Card key={k} k={who === 'Going first' ? 'runeMind' : 'runeBody'} size="xs" />)}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Chapter 14 ---------- */
export function ValueTempo() {
  return (
    <div className="panels">
      <div className="panel">
        <h5>Value: invest now, pay off later</h5>
        <p className="ps">Return Treasure Trove with Pack of Wonders and replay it: each loop draws a card and adds a rune. Slow to start, but it never stops.</p>
        <div className="row"><Card k="pack" size="md" /><Card k="trove" size="md" /></div>
      </div>
      <div className="panel">
        <h5>Tempo: hit now, gone next turn</h5>
        <p className="ps">A Sprite arrives ready with 3 might, scores this turn, then dies before your next scoring. Lillia decks make these every turn.</p>
        <div className="row"><Card k="sprite" size="md" /><Card k="lilliaL" size="md" /></div>
      </div>
    </div>
  );
}

export function Ledger() {
  const rows: { k: CardKey; what: string; why: string; net: string; tone: 'ok' | 'bad' | 'even' }[] = [
    { k: 'progress', what: 'Draw 4', why: 'spend 1 card, get 4', net: '+3', tone: 'ok' },
    { k: 'singularity', what: '6 damage to up to two units', why: 'spend 1 card, they lose 2', net: '+1', tone: 'ok' },
    { k: 'scuttle', what: 'Unit that draws a card when played', why: 'body on board and a new card', net: '+1', tone: 'ok' },
    { k: 'ray', what: '3 damage to one unit', why: 'one for one', net: '0', tone: 'even' },
    { k: 'dredge', what: 'Draw 1', why: 'card for a card (+1 if replayed with Flow)', net: '0', tone: 'even' },
    { k: 'gust', what: "Bounce a unit to its owner's hand", why: 'they keep the card; you bought time', net: '−1', tone: 'bad' }
  ];
  return (
    <div className="tbl" style={{ margin: 0 }}>
      <table className="kw">
        <thead><tr><th>Card</th><th>What happens</th><th>Card advantage</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.k}>
              <td><div className="ex"><Card k={r.k} size="xs" /></div></td>
              <td><b>{r.what}</b><br /><span className="muted">{r.why}</span></td>
              <td><span className={`pill ${r.tone === 'ok' ? 'ok' : r.tone === 'bad' ? 'no' : ''}`} style={{ fontSize: 15 }}>{r.net}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Chapter 15 ---------- */
export function Archetypes() {
  const groups: { title: string; sub: string; legends: CardKey[] }[] = [
    { title: 'Aggro', sub: 'Score 2 every turn', legends: ['reksaiL', 'lilliaL', 'dariusL'] },
    { title: 'Proactive midrange', sub: 'Lots of might, cheap tricks', legends: ['dravenL', 'azirL', 'yiL'] },
    { title: 'Reactive midrange', sub: 'Strong spells, lots of draw', legends: ['dianaL', 'ireliaL'] },
    { title: 'Control', sub: 'Lock the board, win slowly', legends: ['ezrealL', 'aurora'] }
  ];
  return (
    <>
      <div className="panels">
        {groups.map((g) => (
          <div className="panel" key={g.title}>
            <h5>{g.title}</h5><p className="ps">{g.sub}</p>
            <div className="row" style={{ gap: 6 }}>{g.legends.map((l) => <Card key={l} k={l} size="sm" />)}</div>
          </div>
        ))}
      </div>
      <p className="muted" style={{ margin: '12px 0 0' }}>← faster games, fewer decisions · more decisions, longer games →</p>
    </>
  );
}

/* ---------- Chapter 18: rune splits ---------- */
export function RuneSplit() {
  const rows: [number, number, string][] = [[6, 6, 'Even split'], [7, 5, 'Slight lean'], [8, 4, 'Heavy lean'], [9, 3, 'Nearly one colour']];
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      {rows.map(([a, b, label]) => (
        <div key={label} className="row nowrap" style={{ gap: 10, alignItems: 'center' }}>
          <div style={{ width: 'clamp(70px,16cqw,110px)', flex: 'none' }}><b style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>{a} / {b}</b><br /><span className="muted" style={{ fontSize: 13 }}>{label}</span></div>
          <div className="runerow">
            {Array.from({ length: 12 }, (_, i) => <Card key={i} k={i < a ? 'runeChaos' : 'runeMind'} size="xs" style={i === a ? { marginLeft: 6 } : undefined} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Chapter 19: battlefields ---------- */
export function Bo3Flow() {
  return (
    <div className="panels" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))' }}>
      <div className="panel"><h5>Game 1</h5><p className="ps">Seats unknown: blind pick</p><Card k="kinkou" size="md" /></div>
      <div className="panel">
        <h5>Game 2</h5>
        <p className="ps">Lost game 1 → you go first</p><Card k="grove" size="md" />
        <p className="ps" style={{ marginTop: 12 }}>Won game 1 → you go second</p><Card k="starspring" size="md" />
      </div>
      <div className="panel">
        <h5>Game 3 (if needed)</h5>
        <p className="ps">You won game 2 → you go second</p><Card k="starspring" size="md" />
        <p className="ps" style={{ marginTop: 12 }}>You lost game 2 → you go first</p><Card k="grove" size="md" />
      </div>
    </div>
  );
}

export function BattlefieldRoles() {
  const cols: { title: string; sub: string; cards: [CardKey, string][] }[] = [
    { title: 'Blind', sub: 'Good whether you go first or second', cards: [['kinkou', 'His Shen deck is all Tank units, so only he gets the bonus.'], ['sigil', 'Costs whoever conquers it a rune. A control deck that never conquers doesn’t care.']] },
    { title: 'Going first', sub: 'Huge if you get there first', cards: [['grove', 'Take it first, sit on it, draw every turn. They must come to you.'], ['targon', 'Conquer it and get 2 runes back to hold up tricks.']] },
    { title: 'Going second', sub: 'Helps you stabilise', cards: [['vilemaw', 'Units here can’t go home, so overextended units get stuck.'], ['hoard', 'Spends your odd spare energy on a Gold token.']] }
  ];
  return (
    <div className="panels">
      {cols.map((c) => (
        <div className="panel" key={c.title}>
          <h5>{c.title}</h5><p className="ps">{c.sub}</p>
          {c.cards.map(([k, why]) => (
            <div key={k} style={{ marginBottom: 12 }}><Card k={k} size="md" /><p className="muted" style={{ margin: '6px 0 0', fontSize: 14 }}>{why}</p></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function BannedGallery() {
  const cards: CardKey[] = ['banCalledShot', 'banDraven', 'banFightFlight', 'banScrapheap', 'banPursuer', 'banEkko', 'stacked'];
  const fields: CardKey[] = ['banReavers', 'banDreaming', 'banObelisk', 'banArena', 'banClimb'];
  return (
    <>
      <div className="row" style={{ gap: 8 }}>{cards.map((k) => <Card key={k} k={k} size="sm" />)}</div>
      <div className="row" style={{ gap: 8, marginTop: 12 }}>{fields.map((k) => <Card key={k} k={k} size="sm" />)}</div>
    </>
  );
}

export function RadianceMechanics() {
  const items: [CardKey | null, string, string][] = [
    ['banner', 'Deploy', 'Gear you play straight onto a battlefield, yours or not. It’s destroyed when an opponent holds there.'],
    ['peddler', 'Disarm', 'When it attacks, an enemy unit gets -1 might with no minimum. Shrinking a unit to 0 doesn’t kill it; it still needs damage.'],
    ['construct', 'Show Off', 'Reveal a card from hand or point at one you control as you play this. It’s part of the cost, so it can’t be answered on its own.']
  ];
  return (
    <div className="panels">
      {items.map(([k, t, d]) => (
        <div className="panel" key={t}><h5>{t}</h5><p className="ps">{d}</p>{k && <Card k={k} size="md" />}</div>
      ))}
      <div className="panel"><h5>Bomb tokens</h5><p className="ps">Deploy gear. When one is destroyed it deals 2 damage to an enemy unit there and sets off the other bombs there. A red, Ziggs-style mechanic.</p></div>
    </div>
  );
}
