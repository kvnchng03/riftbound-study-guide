import type { ReactNode } from 'react';
import { card, gallery, type CardKey } from '../data/cards';
import { IconCard, IconCoach, IconPlay, IconRule, IconWarn } from './Icons';

export function Part({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <div className="part" id={id}>
      <div className="kicker">Part {n}</div>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

export function Chapter({ id, n, title, summary, children }: { id: string; n: number | string; title: string; summary?: ReactNode; children: ReactNode }) {
  return (
    <section className="chapter" id={id} aria-labelledby={`${id}-h`}>
      <div className="num">{typeof n === 'number' ? `Chapter ${n}` : n}</div>
      <h3 id={`${id}-h`}>{title}</h3>
      {summary && <p className="summary">{summary}</p>}
      {children}
    </section>
  );
}

export function Note({ kind, title, children }: { kind: 'rule' | 'coach' | 'warn'; title: string; children: ReactNode }) {
  const Icon = kind === 'rule' ? IconRule : kind === 'coach' ? IconCoach : IconWarn;
  return (
    <div className={`note ${kind}`}>
      <Icon />
      <div><b className="t">{title}</b>{children}</div>
    </div>
  );
}

export function Example({ head, title, children }: { head: string; title?: string; children: ReactNode }) {
  return (
    <div className="example">
      <div className="eh"><IconCard width={16} height={16} />{head}</div>
      {title && <p className="et">{title}</p>}
      {children}
    </div>
  );
}

export function Keys({ children }: { children: ReactNode }) {
  return <ul className="keys">{children}</ul>;
}

export interface WatchLink { video: string; t: number; label: string }
export function Watch({ links }: { links: WatchLink[] }) {
  return (
    <div className="watch">
      <span>Watch</span>
      {links.map((l) => (
        <a key={l.label} href={`https://youtu.be/${l.video}?t=${l.t}`} target="_blank" rel="noopener"><IconPlay />{l.label}</a>
      ))}
    </div>
  );
}

export function Figure({ caption, cards, children, className = '' }: { caption?: ReactNode; cards?: CardKey[]; children: ReactNode; className?: string }) {
  return (
    <figure className={`stage ${className}`}>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
      {cards && <CardLinks cards={cards} />}
    </figure>
  );
}

export function CardLinks({ cards, label = 'Official card pages' }: { cards: CardKey[]; label?: string }) {
  return (
    <div className="cardlinks">
      {label}:{' '}
      {cards.map((k, i) => (
        <span key={k}>{i > 0 && ' · '}<a href={gallery(k)} target="_blank" rel="noopener">{card(k).name}</a></span>
      ))}
    </div>
  );
}

export const V = {
  coaching: 'gwy5KBlbfro', chain: 'm74Wm0rEdFw', tempo: 'UCczQhEiJ_I', value: 'SYJC5pApkOA', archetypes: 'QBN066lsQCk',
  improve: 'HxNenlw6m04', build: 'b6tSnqvHVIk', refine: 'r-Ua-z1iWw0', bans: 'xqP5hlIUX-M', prerift: 'pPLw7HycniI'
} as const;
