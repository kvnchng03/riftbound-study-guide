import { Breakpoints } from '../components/Charts';
import { Chapter, CardLinks, Example, Figure, Keys, Note, Part, V, Watch } from '../components/Blocks';
import { Archetypes, FirstSecond, Ledger, RaceStepper, ValueTempo } from '../components/Figures';
import { Card } from '../components/Card';
import { LESSONS } from '../data/content';

export function ThinkingPart() {
  return (
    <>
      <Part id="part2" n={2} title="Learn to think">The ideas Daremx comes back to in every video. Start these once the rules feel automatic.</Part>

      <Chapter id="tempo" n={12} title="Point tempo: count turns, not points" summary="You can score at most 2 points a turn. So the real question is always: how many turns does each player still need?">
        <Figure caption={<><b>Only even numbers move you closer.</b> At 2 or 3 points you still need three more turns. At 6 or 7 you need one.</>}><Breakpoints /></Figure>
        <Example head="Real example from the coaching game" title={'"Should Diana walk in to go from 2 to 3?"'}>
          <p>The student was on 2 points and wanted to move Diana onto a battlefield to score a third. Daremx said no. From 2 the path is 4-6-8; from 3 it's 5-7-8. Both take three more turns, so the extra point wins nothing, and Diana, the deck's card-draw engine, would be standing where she's easy to kill.</p>
        </Example>
        <h4>Why the player going second has to hold</h4>
        <p>If both players score 2 points every turn, the player going first wins: they reach 8 on their turn 6 before the other player gets a turn 6. Step through both versions:</p>
        <RaceStepper />
        <Keys>
          <li><b>Going second, you must hold or block a score at least once</b> to "flip the point tempo".</li>
          <li><b>Before grabbing a point, ask: does it get me to an even number?</b> Units on battlefields are easier to kill than units at home.</li>
          <li>At 6 you threaten to win with two conquers. At 7 a single hold wins (see the Final Point rule in Chapter 6).</li>
          <li>Cards that say "score a point" break the pattern. Cards that only stop one early point usually don't change which turn you lose on.</li>
        </Keys>
        <div className="tbl">
          <table>
            <thead><tr><th>Deck speed</th><th>Typical score path</th><th>What it means</th></tr></thead>
            <tbody>
              <tr><td><b>Aggro</b><br /><span className="muted">Rek'Sai, Lillia</span></td><td className="n">0-1-3-5-7-8</td><td>Scores 2 every turn and doesn't care if units die. Loses when it's forced to defend.</td></tr>
              <tr><td><b>Midrange</b><br /><span className="muted">Draven, Diana, Irelia</span></td><td className="n">0-1-3-4-5-6-8</td><td>About one turn slower. Keeps units alive; can double-conquer from 6 or hold at 7.</td></tr>
              <tr><td><b>Control</b><br /><span className="muted">Ezreal, Aurora</span></td><td className="n">0-0-0-…</td><td>Happy at 0 while it locks the board. Once it starts scoring, the game is usually over.</td></tr>
            </tbody>
          </table>
        </div>
        <Watch links={[{ video: V.tempo, t: 92, label: 'Explaining Point Tempo · 1:32' }, { video: V.tempo, t: 318, label: 'Flipping the tempo · 5:18' }, { video: V.coaching, t: 4175, label: 'Coaching · 1:09:35' }]} />
      </Chapter>

      <Chapter id="first" n={13} title="Going first or going second" summary="Going first is better for almost every deck. You use your energy earlier, and you win an even race.">
        <Figure caption={<><b>Runes available each turn, in the order turns happen.</b> The second player starts with 3 runes instead of 2. The first player still draws on turn 1.</>}><FirstSecond /></Figure>
        <Example head="Real example from the coaching session">
          <div className="row" style={{ gap: 10, marginBottom: 12, containerType: 'inline-size' }}>
            <Card k="dianaLunari" size="sm" caption="their 3-cost Diana" /><Card k="flourish" size="sm" caption="your removal" />
          </div>
          <ol className="steps">
            <li>Turn 1, going first: Daremx plays a 2-cost unit.</li>
            <li>The student, going second with 3 runes, plays Diana.</li>
            <li>Daremx, now with 4 runes, walks in and removes Diana with Deadly Flourish.</li>
            <li>The student has nothing on board. Daremx scores, keeps removing whatever comes down, and the student "doesn't get to play the game".</li>
          </ol>
        </Example>
        <Keys>
          <li><b>Never waste your first two turns.</b> Turns 1 and 2 give you 6 energy combined, a big share of everything you'll have by turn 3.</li>
          <li><b>Build around 2s, 4s and 6s.</b> They still work going second (one energy spare). A deck full of 3-costs wastes energy every time it goes first.</li>
          <li>Going second, pick a battlefield that helps you stabilise (Chapter 19).</li>
        </Keys>
        <Watch links={[{ video: V.coaching, t: 2295, label: 'Coaching · 38:15' }, { video: V.refine, t: 868, label: 'Odd and even curves · 14:28' }]} />
      </Chapter>

      <Chapter id="value" n={14} title="Value and tempo" summary={<><b>Value</b> means spending now to be stronger later. <b>Tempo</b> means pressuring the board right now. Every deck balances the two.</>}>
        <Figure caption={<><b>Two real ends of the spectrum.</b> Good decks exist at every point in between.</>} cards={['pack', 'trove', 'sprite', 'lilliaL']}><ValueTempo /></Figure>
        <h4>Card advantage, the simple math</h4>
        <p>Count everything you can use: cards in hand plus units and gear on the board. Then compare what you spent with what you got.</p>
        <Figure caption={<><b>Real cards scored by card advantage.</b> Cards that replace themselves, like Scuttle Crab, quietly win long games.</>}><Ledger /></Figure>
        <Note kind="rule" title="Riftbound twist: bodies matter as much as size">
          <p>There are no life totals. A 1-might unit and a 10-might unit each score one point when they take a battlefield. Pressure = units already on battlefields plus units at home ready to move next turn.</p>
        </Note>
        <div className="tbl">
          <table>
            <thead><tr><th></th><th>Wins by</th><th>Loses by</th></tr></thead>
            <tbody>
              <tr><td><b>Value</b></td><td>Two-for-one trades; outlasting the opponent; cheating out huge threats</td><td>Dying before it stabilises; engines removed before they pay off; key spells countered</td></tr>
              <tr><td><b>Tempo</b></td><td>Fighting only on good terms; delaying threats a turn or two; winning combats</td><td>Ending a turn with a losing board; falling behind on point tempo; running out of threats</td></tr>
            </tbody>
          </table>
        </div>
        <Watch links={[{ video: V.value, t: 46, label: 'Value vs Tempo · 0:46' }, { video: V.value, t: 642, label: 'Card advantage · 10:42' }]} />
      </Chapter>

      <Chapter id="archetypes" n={15} title="Deck types" summary="Most decks sit on a line from aggro to control. Pick the speed you enjoy: there are good decks at every point.">
        <Figure caption={<><b>Real legends by deck type</b> (Vendetta-era placements from Daremx's videos). Combo (Lux) sat off this line until its key card was banned in September 2026.</>}><Archetypes /></Figure>
        <div className="tbl">
          <table>
            <thead><tr><th>Type</th><th>Plan</th><th>Good for you if…</th><th>Watch out for</th></tr></thead>
            <tbody>
              <tr><td><b>Aggro</b></td><td>Score 2 every turn, throw units away, finish with a big turn</td><td>You want clear decisions and cheap decks</td><td>Losing the die roll in mirrors; running out of steam</td></tr>
              <tr><td><b>Midrange</b><br /><span className="muted">proactive</span></td><td>Put lots of might on the board, protect it with cheap tricks</td><td>You like attacking but want options</td><td>Board-wipe style spells</td></tr>
              <tr><td><b>Midrange</b><br /><span className="muted">reactive</span></td><td>Win fights with strong spells, draw lots, keep key units alive</td><td>You like having an answer for everything</td><td>Hard to learn; long turns; expensive cards</td></tr>
              <tr><td><b>Control</b></td><td>Lock the board, then win slowly</td><td>You enjoy grinding</td><td>Untargetable units, heavy draw, "score a point" cards</td></tr>
            </tbody>
          </table>
        </div>
        <Keys>
          <li><b>Picking your first legend on vibes is fine.</b> Liking the champion is a real reason.</li>
          <li>Then weigh speed, difficulty (easy to start vs high ceiling) and raw strength. Playing the best deck is fine too.</li>
        </Keys>
        <Watch links={[{ video: V.archetypes, t: 226, label: 'Deck Archetypes · 3:46' }, { video: V.archetypes, t: 1732, label: 'Picking a legend · 28:52' }]} />
      </Chapter>

      <Chapter id="lessons" n={16} title="Lessons from the coaching game" summary="In the second half of the video, Daremx plays an open-hand game against his student's Diana deck and stops at each decision. These are the real moments.">
        {LESSONS.map((l, i) => (
          <Example key={l.title} head={`Lesson ${i + 1} · at ${l.at}`} title={l.title}>
            <div className="row" style={{ gap: 8, marginBottom: 10, containerType: 'inline-size' }}>{l.cards.map((k) => <Card key={k} k={k} size="xs" />)}</div>
            <p>{l.situation}</p>
            <div className="vs">
              <div><h5>The idea</h5><p>{l.idea}</p></div>
              <div className="yes"><h5>Daremx's call</h5><p>{l.call}</p></div>
            </div>
            <div className="cardlinks" style={{ margin: '-4px 0 14px' }}>
              <a href={`https://youtu.be/${V.coaching}?t=${l.t}`} target="_blank" rel="noopener">Watch this moment</a>
            </div>
          </Example>
        ))}
        <CardLinks cards={['porobot', 'stacked', 'gust', 'morbid', 'discipline', 'hwei', 'charm', 'eclipse', 'hardBargain', 'flash']} />
        <Watch links={[{ video: V.coaching, t: 2702, label: 'The practice game starts · 45:02' }]} />
      </Chapter>
    </>
  );
}
