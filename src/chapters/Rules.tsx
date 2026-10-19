import { Card } from '../components/Card';
import { Chapter, Example, Figure, Keys, Note, Part, V, Watch } from '../components/Blocks';
import { Anatomy, CardTypes, ChainStepper, CombatStepper, CounterWar, DeckParts, FocusTimeline, Overview, PayRunes, ScoringPanels, TriggerOrder, TurnPhases } from '../components/Figures';
import { GLOSSARY } from '../data/content';
import { card } from '../data/cards';

export function RulesPart() {
  return (
    <>
      <Part id="part1" n={1} title="Learn the rules">
        Everything here follows Riot's official Core Rules. Every card you see is the real card: tap one to see it large, with a link to the official card gallery.
      </Part>

      <Chapter id="overview" n={1} title="The game in one minute" summary={<>Two players race to <b>8 points</b>. You score by taking battlefields and by keeping them.</>}>
        <Figure caption={<><b>A whole game in five steps.</b> Most games end around turn 5 or 6.</>}><Overview /></Figure>
        <Note kind="coach" title="Want a hands-on tutorial first?">
          <p>Daremx recommends <a href="https://learnriftbound.gg" target="_blank" rel="noopener">learnriftbound.gg</a> for learning the basics by clicking through.</p>
        </Note>
      </Chapter>

      <Chapter id="deck" n={2} title="What's in a deck" summary="A legend, its champion, 40 cards, 12 runes and 3 battlefields. Your legend's colours decide which cards you may use.">
        <Figure caption={<><b>A real example: a Kai'Sa deck.</b> The legend has Fury (red) and Mind (blue), so only red and blue cards are allowed.</>}><DeckParts /></Figure>
        <Keys>
          <li><b>Max 3 copies of any card</b> (the champion counts). Max 3 Signature cards in total. Unique cards: 1.</li>
          <li><b>Your chosen champion</b> must match your legend: a Kai'Sa legend needs a Kai'Sa unit. It waits beside the board, and you can play it like a card from your hand.</li>
          <li><b>Six colours:</b> Fury (red), Calm (green), Mind (blue), Body (orange), Chaos (purple), Order (yellow). A two-colour card needs both colours in your legend.</li>
          <li><b>Best-of-three</b> adds a sideboard of up to 10 cards you can swap in between games.</li>
        </Keys>
      </Chapter>

      <Chapter id="reading" n={3} title="Reading a card" summary="Top left is the cost, top right is might, and the text box says what the card does.">
        <Figure><Anatomy /></Figure>
        <Example head="Read it out loud">
          <p><b>Kai'Sa, Survivor:</b> "Costs 4 energy and no power. She has 4 might. If I pay 1 more energy and 1 Fury power, she enters ready and can move this turn. When she takes a battlefield, I draw a card."</p>
          <p><b>Falling Star:</b> "Costs 2 energy <i>plus</i> 2 Fury power. It has no Action or Reaction keyword, so I can only play it on my own turn when nothing else is happening."</p>
        </Example>
        <Figure caption={<><b>The other card types.</b> Units and gear stay on the board. Spells happen and go to the trash. Battlefields and runes are never played from your hand.</>}><CardTypes /></Figure>
      </Chapter>

      <Chapter id="runes" n={4} title="Paying with runes" summary={<>Every rune gives either 1 <b>energy</b> (turn it sideways) or 1 <b>power</b> of its colour (send it to the bottom of your rune deck).</>}>
        <Figure><PayRunes /></Figure>
        <Keys>
          <li><b>Energy is the number</b> in the corner. Any rune can pay it.</li>
          <li><b>Power is the coloured symbols.</b> Only runes of that colour can pay it, and paying shrinks your rune count for a while. That's why "power-hungry" cards hurt early.</li>
          <li><b>Unused energy disappears</b> at the start of your Main Phase and at the end of the turn. You can't save it.</li>
        </Keys>
      </Chapter>

      <Chapter id="turn" n={5} title="A turn, step by step" summary={'Six phases, always in the same order. Players remember the first four as "A-B-C-D".'}>
        <Figure caption={<><b>Points come in two places:</b> holding at the start of your turn (Beginning) and conquering during it (Main).</>}><TurnPhases /></Figure>
        <Example head="Example: your turn 3, going first">
          <ol className="steps">
            <li><b>Awaken:</b> your 4 runes and your units turn upright again.</li>
            <li><b>Beginning:</b> your unit is still on Grove of the God-Willow, so you <b>hold</b> it: +1 point, and Grove draws you a card.</li>
            <li><b>Channel:</b> 2 more runes come out. You now have 6.</li>
            <li><b>Draw:</b> 1 card.</li>
            <li><b>Main:</b> play a 4-cost unit, then move your other unit onto the opponent's empty battlefield and conquer it: +1 point.</li>
            <li><b>Ending:</b> damage heals and any energy you didn't use is gone.</li>
          </ol>
        </Example>
        <h4>Setting up a game</h4>
        <ol className="steps">
          <li>Legend and champion go in their zones. Each player puts one battlefield into play (random in best-of-one, your choice in best-of-three).</li>
          <li>Shuffle your main deck and rune deck. Decide who goes first.</li>
          <li><b>Draw 4.</b> You may mulligan once: set aside up to 2 cards, draw that many, and put the set-aside cards on the bottom.</li>
        </ol>
        <Note kind="rule" title="Going second"><p>The second player channels <b>3 runes</b> on their first turn instead of 2. The first player still draws a card on turn 1.</p></Note>
        <Watch links={[{ video: V.chain, t: 136, label: '"Awaken, beginning, channel, draw" · 2:16' }]} />
      </Chapter>

      <Chapter id="scoring" n={6} title="Moving and scoring" summary={<>Turn a unit sideways to move it to a battlefield. Take a battlefield to <b>conquer</b> it (+1). Still have it when your turn starts to <b>hold</b> it (+1).</>}>
        <Figure caption={<><b>Three turns of scoring.</b> Each battlefield scores only once per turn, so the most you can get in a turn is 2.</>}><ScoringPanels /></Figure>
        <Keys>
          <li><b>Moving costs exhausting the unit.</b> Base to battlefield or back. Battlefield to battlefield needs <b>Ganking</b>.</li>
          <li><b>New units arrive exhausted</b>, so they can't move the turn you play them unless you pay Accelerate.</li>
          <li>Moving onto a battlefield you don't control starts a <b>showdown</b>. The opponent gets a chance to respond. If your units are still there at the end, you take it.</li>
          <li><b>Out of cards?</b> If you need to draw from an empty deck, shuffle your trash back in and your opponent gets 1 point.</li>
        </Keys>
        <Note kind="rule" title="The Final Point rule"><p>At 7 points, a <b>conquer</b> only gives you the winning point if you've scored <b>both</b> battlefields that turn. Otherwise you draw a card instead. Holding always counts.</p></Note>
        <div className="tbl">
          <table>
            <thead><tr><th>You're at 7 and you…</th><th>Win?</th></tr></thead>
            <tbody>
              <tr><td>hold a battlefield when your turn starts</td><td className="ok">Yes</td></tr>
              <tr><td>conquer one battlefield (and didn't score the other)</td><td className="bad">No, you draw a card instead</td></tr>
              <tr><td>hold one, then conquer the other</td><td className="ok">Yes</td></tr>
              <tr><td>conquer both in the same turn</td><td className="ok">Yes</td></tr>
            </tbody>
          </table>
        </div>
      </Chapter>

      <Chapter id="combat" n={7} title="Combat" summary="Each side adds up its might, then splits that much damage across the enemy units, killing one fully before moving to the next. Step through a real fight:">
        <CombatStepper />
        <Keys>
          <li><b>The attacker assigns first, then the defender.</b> All damage happens at the same time.</li>
          <li><b>Tank</b> units must be assigned damage first. <b>Backline</b> units last.</li>
          <li><b>After combat everyone heals.</b> If any defender survives, the attackers go back to base and the defender keeps the battlefield.</li>
          <li>A unit at 0 might doesn't die on its own. It still needs at least 1 damage assigned to it.</li>
        </Keys>
        <Watch links={[{ video: V.prerift, t: 595, label: 'Assigning damage · 9:55' }]} />
      </Chapter>

      <Chapter id="chain" n={8} title="The Chain" summary={<>When someone plays a spell, the other player can respond on top of it. The pile resolves from the top down: <b>last in, first out</b>.</>}>
        <div className="tbl">
          <table>
            <thead><tr><th>Spell speed</th><th>Your turn, nothing happening</th><th>During a showdown</th><th>On top of another spell</th></tr></thead>
            <tbody>
              <tr><td><b>No keyword</b> <span className="muted">("slow")</span></td><td className="ok">Yes</td><td className="bad">No</td><td className="bad">No</td></tr>
              <tr><td><b>Action</b></td><td className="ok">Yes</td><td className="ok">Yes</td><td className="bad">No</td></tr>
              <tr><td><b>Reaction</b></td><td className="ok">Yes</td><td className="ok">Yes</td><td className="ok">Yes</td></tr>
            </tbody>
          </table>
        </div>
        <p>Daremx's tip: physically stack the cards on top of each other, then resolve from the top. Here's his example:</p>
        <ChainStepper />
        <Keys>
          <li>Units and gear land on the board as soon as they're played. Only spells and abilities wait on the chain.</li>
          <li>Before <b>each</b> item resolves, both players get a chance to add a Reaction. That's called <b>priority</b>.</li>
        </Keys>
        <Watch links={[{ video: V.chain, t: 271, label: 'Building a chain · 4:31' }, { video: V.chain, t: 501, label: 'Priority · 8:21' }]} />
      </Chapter>

      <Chapter id="focus" n={9} title="Showdowns: focus and priority" summary={<><b>Focus</b> is whose turn it is to act in a showdown. <b>Priority</b> is who can respond on the chain right now.</>}>
        <Figure caption={<><b>Daremx's focus example.</b> He has two Cleaves but can't play them back to back: after his first chain resolves, focus passes to the defender, who kills his Recruit with Void Seeker.</>} cards={['recruit', 'cleave', 'voidseeker', 'hopeful']}>
          <FocusTimeline />
        </Figure>
        <Keys>
          <li><b>The player who moved in gets focus first.</b> With focus you play an Action or Reaction, or pass.</li>
          <li><b>The showdown ends only when both players pass in a row</b>, even if one side has no units left there.</li>
        </Keys>
        <Watch links={[{ video: V.chain, t: 363, label: 'Focus · 6:03' }]} />
      </Chapter>

      <Chapter id="timing" n={10} title="Tricky timing, with real cards" summary="Three situations from the Chain video that change who wins a fight.">
        <h4>1. The defender's triggers resolve first</h4>
        <Figure cards={['yasuo', 'fan', 'forer']}><TriggerOrder /></Figure>
        <h4>2. Whose turn it is changes the result</h4>
        <div className="row" style={{ gap: 12, alignItems: 'center', containerType: 'inline-size', marginBottom: 10 }}>
          <Card k="tideturner" size="sm" /><Card k="vex" size="sm" />
        </div>
        <p>Triggers from both players at once go on the chain turn player first, so the <b>other</b> player's trigger resolves first. Tideturner swaps places with a friendly unit; Vex, Apathetic stuns units an opponent plays. Play Tideturner on your turn and Vex's stun resolves first, so Tideturner can't move. Flip it up on <i>their</i> turn and your swap resolves before the stun.</p>
        <h4>3. You can target anything on the chain</h4>
        <Figure cards={['wages', 'defy', 'lullaby', 'abandon']}><CounterWar /></Figure>
        <Note kind="coach" title="His escape trick"><p>If they counter your spell and you hold Abandon, Abandon <i>your own</i> spell. It goes back to your hand, and their counter fizzles with nothing to hit.</p></Note>
        <Watch links={[{ video: V.chain, t: 777, label: 'Triggers · 12:57' }, { video: V.chain, t: 1050, label: 'Targeting the chain · 17:30' }]} />
      </Chapter>

      <Chapter id="keywords" n={11} title="Keywords" summary="The official keywords, each with a real card that has it. Tap a card to see it.">
        {GLOSSARY.map((g) => (
          <div key={g.group}>
            <h4>{g.group}</h4>
            <div className="tbl">
              <table className="kw">
                <thead><tr><th>Keyword</th><th>What it does</th><th>Real example</th></tr></thead>
                <tbody>
                  {g.rows.map((r) => (
                    <tr key={r.name}>
                      <td><b>{r.name}</b>{r.isNew && <span className="new">NEW</span>}</td>
                      <td>{r.text}</td>
                      <td style={{ containerType: 'inline-size', minWidth: 120 }}><div className="ex"><Card k={r.example} size="xs" /><span className="muted" style={{ fontSize: 13.5 }}>{card(r.example).name}</span></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </Chapter>
    </>
  );
}
