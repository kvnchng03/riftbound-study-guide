import { useCallback, useRef, useState, type ReactNode } from 'react';

export interface Step { title: string; text: ReactNode }

interface Props<S extends Step> {
  steps: S[];
  render: (step: S, index: number) => ReactNode;
  label: string;
  footer?: ReactNode;
}

/** Click, tap, swipe or use arrow keys to move through a worked example one step at a time. */
export function Stepper<S extends Step>({ steps, render, label, footer }: Props<S>) {
  const [i, setI] = useState(0);
  const start = useRef<number | null>(null);
  const safe = Math.min(i, steps.length - 1);
  const step = steps[safe] as S;
  const go = useCallback((n: number) => setI(Math.max(0, Math.min(steps.length - 1, n))), [steps.length]);
  return (
    <figure
      className="stage stepper"
      aria-roledescription="step-by-step example"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(safe + 1); if (e.key === 'ArrowLeft') go(safe - 1); }}
      onPointerDown={(e) => { start.current = e.clientX; }}
      onPointerUp={(e) => {
        if (start.current === null) return;
        const dx = e.clientX - start.current;
        start.current = null;
        if (Math.abs(dx) > 50) go(safe + (dx < 0 ? 1 : -1));
      }}
    >
      {render(step, safe)}
      <div className="stepcap" aria-live="polite"><b>{step.title}</b>{step.text}</div>
      <div className="controls">
        <button type="button" className="btn" onClick={() => go(safe - 1)} disabled={safe === 0}>← Back</button>
        <div>
          <div className="dots">
            {steps.map((s, n) => (
              <button key={n} type="button" aria-label={`Step ${n + 1}: ${s.title}`} aria-current={n === safe ? 'step' : undefined} onClick={() => go(n)} />
            ))}
          </div>
          <div className="stepcount" style={{ textAlign: 'center', marginTop: 4 }}>Step {safe + 1} of {steps.length}</div>
        </div>
        <button type="button" className="btn pri" onClick={() => go(safe + 1)} disabled={safe === steps.length - 1}>Next →</button>
      </div>
      {footer}
    </figure>
  );
}
