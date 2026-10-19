import { BanRings, BuildSteps, DeckShapes, SealedShape, SideboardChart } from '../components/Charts';
import { Chapter, Figure, Keys, Note, Part, V, Watch } from '../components/Blocks';
import { BannedGallery, BattlefieldRoles, Bo3Flow, RadianceMechanics, RuneSplit } from '../components/Figures';

export function BuildingPart() {
  return (
    <>
      <Part id="part3" n={3} title="Build decks">His first rule: <b>copy a proven list while you learn to play.</b> Building is a separate skill, and it matters less than piloting well.</Part>

      <Chapter id="build" n={17} title="Building a deck" summary="Start from what excites you, add the cards every deck in your colours plays, then balance the numbers.">
        <Figure caption={<><b>Filling 40 slots, in Daremx's order.</b> Core package first, then staples; the last slots fix whatever the deck still lacks.</>}><BuildSteps /></Figure>
        <ol className="steps">
          <li><b>Inspiration.</b> A legend, champion, signature spell or package of cards you want to play.</li>
          <li><b>Skeleton.</b> 15 to 25 cards of that core package.</li>
          <li><b>Staples.</b> Cards nearly every deck in your colours plays. You need a reason <i>not</i> to play them.</li>
          <li><b>Balance.</b> 8–10 good 2-cost cards for turn 1. 15–25 units. The rest is interaction for winning fights.</li>
          <li><b>Narrative.</b> Can you explain how it wins? His Draven: "Develop might, force my opponent to fight me, and win with card advantage."</li>
        </ol>
        <Figure caption={<><b>Two very different 40s.</b> An aggressive deck runs about 25 units it's happy to lose. A reactive deck like Diana runs about 17 and wins fights with spells.</>}><DeckShapes /></Figure>
        <Note kind="coach" title="Testing a card"><p>Every time you draw the card you're unsure about, ask: "Would I rather this be card X right now?" He marks the copy he's testing with a different art or foil, so he notices exactly when <i>that</i> copy mattered.</p></Note>
        <Watch links={[{ video: V.build, t: 136, label: 'How to Build · 2:16' }, { video: V.build, t: 1009, label: 'Balancing · 16:49' }, { video: V.refine, t: 1815, label: 'Refining a list · 30:15' }]} />
      </Chapter>

      <Chapter id="split" n={18} title="Choosing a rune split" summary={<>Split your 12 runes by how much <b>power</b> of each colour your cards need, especially cards needing 2 of the same colour.</>}>
        <Figure caption={<><b>The four splits you'll actually see.</b> 10/2 and 11/1 make no sense: go 9/3, or play one colour.</>} cards={['runeChaos', 'runeMind']}><RuneSplit /></Figure>
        <div className="tbl">
          <table>
            <thead><tr><th>Split</th><th>Use it when</th><th>Daremx's real example</th></tr></thead>
            <tbody>
              <tr><td className="n"><b>6 / 6</b></td><td>Both colours have cards needing 2 power</td><td>His Draven: 8 cards needing red power, 8 needing purple</td></tr>
              <tr><td className="n"><b>7 / 5</b></td><td>The 2-power cards are all one colour</td><td>Top Diana list: 7 purple, 5 blue; the blue cards come down mid-game</td></tr>
              <tr><td className="n"><b>8 / 4</b></td><td>Minor colour only for mid/late threats</td><td>Top Rengar list: orange-heavy, no red card needs 2 power</td></tr>
              <tr><td className="n"><b>9 / 3</b></td><td>Almost one colour</td><td>Top Kennen list: 9 purple, 3 yellow for one yellow card</td></tr>
            </tbody>
          </table>
        </div>
        <Watch links={[{ video: V.refine, t: 181, label: 'Rune splits · 3:01' }]} />
      </Chapter>

      <Chapter id="battlefields" n={19} title="Choosing battlefields" summary="In best-of-three, give your three battlefields three jobs: one for game 1, one for when you go first, one for when you go second.">
        <Note kind="rule" title="The rule that makes this work">
          <p>In best-of-three, a battlefield used in a finished game can't be used again that match, and the loser of each game picks who goes first. Follow the games below: the battlefield left for game 3 always fits your seat.</p>
        </Note>
        <Figure caption={<><b>Follow a match</b> with the battlefields from Daremx's Shen deck.</>} cards={['kinkou', 'grove', 'starspring']}><Bo3Flow /></Figure>
        <Figure caption={<><b>Real battlefields for each job,</b> with the reasons Daremx gives.</>} cards={['kinkou', 'sigil', 'grove', 'targon', 'vilemaw', 'hoard']}><BattlefieldRoles /></Figure>
        <Note kind="warn" title="His own mistake">
          <p>He once ran Targon's Peak as his going-second battlefield. Opponents just walked onto it, built up, and passed with energy open, and he couldn't safely attack anything. If your opponent would rather take <i>your</i> battlefield than their own, it gives them too much.</p>
        </Note>
        <p className="muted">In best-of-one the battlefield is picked at random from your three, so use three all-rounders there.</p>
        <Watch links={[{ video: V.coaching, t: 1563, label: 'Coaching · 26:03' }, { video: V.refine, t: 545, label: 'Battlefield choices · 9:05' }]} />
      </Chapter>

      <Chapter id="sideboard" n={20} title="Sideboarding" summary="Up to 10 cards you can swap in between games. Decide most swaps before the event, not at the table.">
        <Keys>
          <li><b>About 90% is planned in advance.</b> Strong players keep a sheet: for each matchup, which cards come in and which go out.</li>
          <li><b>The other 10% reacts to this opponent.</b> His real example: an Irelia player never moved forward to score, so he took out the removal he'd planned to bring in.</li>
          <li><b>Sideboard cards are great in some matchups and useless in others.</b> If a card is good everywhere, it belongs in the main deck.</li>
          <li><b>New players:</b> copy a proven sideboard and learn why each card is there.</li>
        </Keys>
        <h4>Fix the worst matchup, or improve everything a little?</h4>
        <p>His worked example: five matchups at 55, 45, 65, 20 and 50% win rate. Plan A adds 5% to every matchup. Plan B lifts only the 20% matchup to 40%.</p>
        <Figure caption={<><b>It depends on what you'll face.</b> If every deck is equally common, small gains everywhere win (52% vs 51%). If your bad matchup is 60% of the room, fixing it wins by far (45.5% vs 38.5%).</>}><SideboardChart /></Figure>
        <Watch links={[{ video: V.coaching, t: 968, label: 'Coaching · 16:08' }, { video: V.refine, t: 1315, label: 'Sideboards · 21:55' }, { video: V.refine, t: 2458, label: 'The math · 40:58' }]} />
      </Chapter>

      <Chapter id="bans" n={21} title="Reading bans" summary="When cards get banned, think in three rings: who lost the card, who benefits, and where the meta settles.">
        <Figure caption={<><b>Real example: the September 2026 bans</b> (Ekko, Recurrent and Stacked Deck, in effect Sept 18), as Daremx read them before the LA regional.</>}><BanRings /></Figure>
        <Keys>
          <li><b>If you lost a card,</b> don't grab a weaker 1-for-1 replacement: there's a reason you weren't playing it. Daremx filled his Draven slots with extra copies of strong cards he was already running.</li>
          <li>Right before a big event, stick with the version you have the most practice with.</li>
        </Keys>
        <h4>Banned in Standard right now</h4>
        <Figure caption={<>Seven cards and five battlefields. Check the <a href="https://playriftbound.com/en-us/rules-hub/" target="_blank" rel="noopener">official Rules Hub</a> before any event.</>}><BannedGallery /></Figure>
        <Watch links={[{ video: V.bans, t: 45, label: 'Adjusting to Bans · 0:45' }]} />
      </Chapter>

      <Chapter id="prerift" n={22} title="Radiance pre-rift (this week)" summary="A pre-rift is a sealed event at your game store: you open packs there and build a 25-card deck on the spot. It's Daremx's top pick for a first event.">
        <div className="tbl">
          <table>
            <tbody>
              <tr><td><b>When</b></td><td>Oct 16–22, 2026 at local stores. Radiance releases Oct 23.</td></tr>
              <tr><td><b>You get</b></td><td>A pre-rift kit (choose 1 of 9 legends, 15 cards), 5 Radiance packs, a promo. The store provides runes.</td></tr>
              <tr><td><b>Bring</b></td><td>Nothing is required. Nice to have: sleeves (26 + 12 + 3), dice for points, a playmat, water.</td></tr>
              <tr><td><b>Format</b></td><td>30–60 minutes to build, then usually 3 rounds of best-of-one. About 3–4 hours.</td></tr>
            </tbody>
          </table>
        </div>
        <Figure caption={<><b>A good 25-card sealed deck, by his numbers.</b> Mostly cheap units, a few big ones, and as many combat tricks as you have. Radiance has almost no removal, so tricks <i>are</i> your removal.</>}><SealedShape /></Figure>
        <Keys>
          <li><b>Deck rules:</b> at least 25 cards, up to 3 colours, no copy limit. Legend and champion are optional (skip one and you draw an extra card at the start). You still need 3 battlefields; blank ones are allowed.</li>
          <li><b>Start from your kit's two colours.</b> Prefer units whose might is about equal to their cost and that cost no power on turns 1–2.</li>
          <li><b>Skip cute synergies.</b> A pile of good cards is a good sealed deck.</li>
        </Keys>
        <h4>Radiance's new mechanics</h4>
        <RadianceMechanics />
        <Watch links={[{ video: V.prerift, t: 229, label: 'Pre-rift Guide · 3:49' }, { video: V.prerift, t: 412, label: 'New mechanics · 6:52' }]} />
      </Chapter>
    </>
  );
}
