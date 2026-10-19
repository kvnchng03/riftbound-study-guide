import { useState } from 'react';
import { FLASHCARDS } from '../data/content';

/** Tap to reveal; shuffle to test yourself in a new order. */
export function Flashcards() {
  const [order, setOrder] = useState(() => FLASHCARDS.map((_, i) => i));
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const card = FLASHCARDS[order[i] ?? 0] ?? ['', ''];
  const go = (n: number) => { setI((n + FLASHCARDS.length) % FLASHCARDS.length); setShown(false); };
  const shuffle = () => {
    const o = [...order];
    for (let k = o.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [o[k], o[j]] = [o[j] as number, o[k] as number]; }
    setOrder(o); setI(0); setShown(false);
  };
  return (
    <>
      <button type="button" className="flash" aria-live="polite" onClick={() => setShown((s) => !s)}>
        <span className="q">{card[0]}</span>
        {shown && <span className="a">{card[1]}</span>}
        <span className="h">{shown ? 'Tap to hide the answer' : 'Tap to show the answer'}</span>
      </button>
      <div className="fnav">
        <button type="button" className="btn" onClick={() => go(i - 1)}>← Previous</button>
        <span>{i + 1} of {FLASHCARDS.length}</span>
        <span style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="btn" onClick={shuffle}>Shuffle</button>
          <button type="button" className="btn pri" onClick={() => go(i + 1)}>Next →</button>
        </span>
      </div>
    </>
  );
}
