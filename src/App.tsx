import { useEffect, useState } from 'react';
import { BuildingPart } from './chapters/Building';
import { BetterPart } from './chapters/Better';
import { RulesPart } from './chapters/Rules';
import { ThinkingPart } from './chapters/Thinking';
import { Chapter } from './components/Blocks';
import { IconMenu, IconMoon, IconSun, Logo } from './components/Icons';
import { LightboxProvider } from './components/Lightbox';
import { InstallButton, UpdateToast } from './components/Pwa';
import { StudyPlan } from './components/StudyPlan';
import { PARTS, SECTION_IDS } from './data/content';
import { useActiveSection } from './lib/useActiveSection';
import { useTheme } from './lib/useTheme';

function Toc({ active, onPick }: { active: string | null; onPick?: () => void }) {
  return (
    <nav className="toc" aria-label="Chapters">
      {PARTS.map((p) => (
        <div key={p.id}>
          <h4>{p.title}</h4>
          <ol>
            {p.chapters.map((c) => (
              <li key={c.id}><a href={`#${c.id}`} className={active === c.id ? 'on' : ''} aria-current={active === c.id ? 'location' : undefined} onClick={onPick}>{c.title}</a></li>
            ))}
          </ol>
        </div>
      ))}
    </nav>
  );
}

export default function App() {
  const [theme, setTheme] = useTheme();
  const active = useActiveSection(SECTION_IDS);
  const [sheet, setSheet] = useState(false);
  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSheet(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sheet]);

  return (
    <LightboxProvider>
      <header className="topbar">
        <div className="topbar-in">
          <a className="brand" href="#top"><Logo /><span className="full">Riftbound Study Guide</span><span className="short">Riftbound</span></a>
          <InstallButton />
          <div className="seg" role="group" aria-label="Colour theme">
            <button type="button" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}><IconSun /><span className="lbl">Light</span></button>
            <button type="button" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}><IconMoon /><span className="lbl">Dark</span></button>
          </div>
          <button type="button" className="icon-btn only-mobile" aria-expanded={sheet} aria-controls="chapter-sheet" onClick={() => setSheet(true)}><IconMenu /><span className="lbl">Chapters</span></button>
        </div>
      </header>

      <div className="shell" id="top">
        <aside className="side"><Toc active={active} /></aside>
        <main>
          <div className="col">
            <section className="hero">
              <h1>Riftbound Study Guide</h1>
              <p className="lede">Learn the rules with real cards, then learn how good players think. Built from Daremx's Diana coaching session and his Riftbound 101 videos, and checked against Riot's official rules.</p>
              <div className="byline"><span>10 videos, about 7 hours</span><span>Rules as of Oct 9, 2026</span><span>Works offline once installed</span></div>
            </section>

            <Chapter id="plan" n="Start here" title="Your study plan" summary="Go in this order. Tick a step when you could explain it to a friend without looking.">
              <StudyPlan />
            </Chapter>

            <RulesPart />
            <ThinkingPart />
            <BuildingPart />
            <BetterPart />
          </div>
        </main>
      </div>

      {sheet && (
        <>
          <div className="sheet-back" onClick={() => setSheet(false)} />
          <div className="sheet" id="chapter-sheet" role="dialog" aria-modal="true" aria-label="Chapters">
            <div className="grab" />
            <Toc active={active} onPick={() => setSheet(false)} />
          </div>
        </>
      )}
      <UpdateToast />
    </LightboxProvider>
  );
}
