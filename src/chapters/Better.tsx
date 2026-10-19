import { Zoom } from '../components/Charts';
import { Chapter, Figure, Keys, Part, V, Watch } from '../components/Blocks';
import { Flashcards } from '../components/Flashcards';
import { IconPlay } from '../components/Icons';
import { OFFICIAL_ART } from '../components/Card';
import { VIDEOS } from '../data/content';

export function BetterPart() {
  return (
    <>
      <Part id="part4" n={4} title="Get better">How to practise so the games actually teach you something.</Part>

      <Chapter id="practice" n={23} title="How to practise" summary="Play one legend for your whole first set. Daremx played about 150 matches of Viktor and 5 of anything else in his first set.">
        <Figure caption={<><b>His map analogy.</b> Playing many decks is like looking at a map of the whole world: you see landmarks, not details. One deck zooms you in until you can see individual decisions.</>}><Zoom /></Figure>
        <Keys>
          <li><b>Copy a proven list</b> (he browses tournament results on <a href="https://riftex.com" target="_blank" rel="noopener">riftex.com</a>). Then every loss is about your decisions, not the deck.</li>
          <li><b>Learn from people whose results you can see.</b> Skip random posts and unknown deck lists.</li>
          <li><b>About 20% learning, 80% playing.</b> Give each session one goal: apply point tempo, test a card, or test a matchup.</li>
          <li><b>Practice partners</b> from a bit weaker to a fair bit stronger than you. After games, ask: "What should I have played around?"</li>
          <li><b>Be patient.</b> Going from a 1/10 to a 3/10 player is real progress, even if the 5/10 players still beat you.</li>
        </Keys>
        <h4>Log every game</h4>
        <div className="tbl">
          <table>
            <thead><tr><th>Date</th><th>Me</th><th>Opponent</th><th>Result</th><th>Went first?</th><th>Note</th></tr></thead>
            <tbody>
              <tr><td className="n">Oct 18</td><td>Diana</td><td>Draven</td><td className="n">1–2</td><td>Yes, No, No</td><td>Moved Diana for an odd point in G2 and lost her.</td></tr>
              <tr><td className="n">Oct 18</td><td>Diana</td><td>Irelia</td><td className="n">2–0</td><td>No, Yes</td><td>Holding answers worked. Gear removal was dead.</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted">Example rows in the format of his tracker, not real results.</p>
        <Watch links={[{ video: V.improve, t: 227, label: 'Actually Improve · 3:47' }, { video: V.coaching, t: 45, label: 'Coaching · 0:45' }]} />
      </Chapter>

      <Chapter id="quiz" n={24} title="Flashcards" summary="Test yourself on the rules and ideas above.">
        <Flashcards />
      </Chapter>

      <Chapter id="sources" n={25} title="Videos and sources" summary="All videos by Daremx, a top-ranked player in his local scene for four straight seasons with 12 skirmish wins. The first is the coaching session this guide started from.">
        <div className="vids">
          {VIDEOS.map((v) => (
            <a key={v.id} className="vid-card" href={`https://youtu.be/${v.id}`} target="_blank" rel="noopener">
              <span className="vid-play"><IconPlay width={14} height={14} /></span>
              <span><b>{v.title}</b><span className="muted"> Daremx · {v.length}</span></span>
            </a>
          ))}
        </div>
        <h4>Official sources</h4>
        <ul className="plain">
          <li><a href="https://cmsassets.rgpub.io/sanity/files/dsfx7636/news_live/5c7946f7c3b8c6e0faff85ab6dadc6d2e721ea94.pdf" target="_blank" rel="noopener">Riftbound Core Rules (PDF, Oct 9, 2026)</a></li>
          <li><a href="https://cmsassets.rgpub.io/sanity/files/dsfx7636/news_live/861752822d217edf37d9febaeaf77a7d924c1bb6.pdf" target="_blank" rel="noopener">Tournament Rules (PDF, Oct 9, 2026)</a></li>
          <li><a href="https://playriftbound.com/en-us/rules-hub/" target="_blank" rel="noopener">Official Rules Hub and ban list</a></li>
          <li><a href="https://playriftbound.com/en-us/card-gallery/" target="_blank" rel="noopener">Official card gallery</a>, where every card in this guide links to</li>
          <li><a href="https://learnriftbound.gg" target="_blank" rel="noopener">learnriftbound.gg</a>, the interactive tutorial Daremx recommends</li>
        </ul>
        <h4>Where Daremx and the rules differ</h4>
        <ul className="plain">
          <li>He calls them the "September 14th" bans. Riot announced them Sept 15 and they took effect Sept 18.</li>
          <li>"Slow spell" and "the stack" are player slang. The rules say "spell without a timing keyword" and "the Chain".</li>
        </ul>
        <footer>
          <p>Riftbound Study Guide was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.</p>
          <p>{OFFICIAL_ART
            ? 'Card images are served by Riot Games.'
            : 'Card frames here are drawn from Riot’s official card data with short paraphrased effects; they are not Riot’s card art. Tap any card for a link to the real card in the official gallery.'}{' '}
            Strategy notes reflect the Vendetta-era meta and will change as new sets and bans land.</p>
        </footer>
      </Chapter>
    </>
  );
}
