import type { ReactNode } from 'react';
import { card, cardImage, type CardKey } from '../data/cards';
import { useLightbox } from './Lightbox';
import { ProxyCard } from './ProxyCard';

/** Riot's card art is only shown when the build is authorised to use it (see README). */
export const OFFICIAL_ART = import.meta.env.VITE_CARD_ART === 'official';

export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface Badge { value: ReactNode; tone?: 'buff' | 'damage' | 'point' | 'info'; label?: string }

export interface CardProps {
  k: CardKey;
  size?: CardSize;
  /** Turned sideways, the way exhausted cards sit on the table. */
  exhausted?: boolean;
  dim?: boolean;
  dead?: boolean;
  highlight?: boolean;
  badges?: Badge[];
  tag?: string;
  caption?: ReactNode;
  style?: React.CSSProperties;
}

/**
 * A real Riftbound card: a proxy drawn from the official card data, or Riot's official art
 * when the build is authorised. Tap to enlarge. Exhausted cards are rotated 90 degrees like on the table.
 */
export function Card({ k, size = 'md', exhausted, dim, dead, highlight, badges, tag, caption, style }: CardProps) {
  const open = useLightbox();
  const c = card(k);
  const land = c.orientation === 'landscape';
  const cls = ['rc', size, land && 'land', exhausted && 'ex', dim && 'dim', dead && 'dead', highlight && 'hl'].filter(Boolean).join(' ');
  const state = [exhausted && 'exhausted', dead && 'dies', dim && 'not in play'].filter(Boolean).join(', ');
  return (
    <figure className={cls} style={style}>
      <button type="button" className="rc-hit" onClick={() => open(k)} aria-label={`${c.name}${state ? ` (${state})` : ''}. Tap to enlarge.`}>
        <span className="rc-frame">
          {OFFICIAL_ART ? (
            <img
              src={cardImage(k, land ? 520 : 360)}
              srcSet={land ? `${cardImage(k, 360)} 360w, ${cardImage(k, 720)} 720w` : `${cardImage(k, 240)} 240w, ${cardImage(k, 360)} 360w, ${cardImage(k, 560)} 560w`}
              sizes={land ? '(max-width: 600px) 45vw, 320px' : '(max-width: 600px) 30vw, 200px'}
              alt=""
              loading="lazy"
              decoding="async"
              width={land ? 1038 : 744}
              height={land ? 744 : 1039}
            />
          ) : (
            <ProxyCard k={k} />
          )}
        </span>
      </button>
      {tag && <span className="tag">{tag}</span>}
      {badges && badges.length > 0 && (
        <span className="badges">
          {badges.map((b, i) => <span key={i} className={`badge ${b.tone ?? 'info'}`} aria-label={b.label}>{b.value}</span>)}
        </span>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** A face-down pile, for decks that aren't a single card. */
export function DeckStack({ count, label }: { count: number | string; label?: string }) {
  return (
    <div className="deckstack" role="img" aria-label={label ?? `${count} cards`}>
      <i style={{ transform: 'translate(6px,-6px)' }} />
      <i style={{ transform: 'translate(3px,-3px)' }} />
      <i />
      <b>{count}</b>
    </div>
  );
}
