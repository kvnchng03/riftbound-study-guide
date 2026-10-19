import { useState, type ReactNode } from 'react';
import { card, cardImage, type CardKey } from '../data/cards';
import { useLightbox } from './Lightbox';
import { ProxyCard } from './ProxyCard';

export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * How wide each card size can get, as [cqw, max px], mirroring the `--w` clamps in global.css
 * (a test keeps them in sync). cqw never exceeds vw, so this bounds the width before layout.
 */
export const CARD_WIDTHS: Record<'portrait' | 'landscape', Record<CardSize, readonly [number, number]>> = {
  portrait: { xs: [8, 66], sm: [13, 96], md: [18, 132], lg: [34, 240], xl: [52, 320] },
  landscape: { xs: [30, 230], sm: [22, 170], md: [30, 230], lg: [46, 320], xl: [30, 230] }
};
const SOURCE_WIDTHS = { portrait: [240, 360, 480, 744], landscape: [360, 520, 720, 1038] };

/** `sizes` for a card image: the laid-out width where supported, else this size's upper bound. */
export function imageSizes(size: CardSize, land: boolean): string {
  const [cqw, max] = CARD_WIDTHS[land ? 'landscape' : 'portrait'][size];
  return `auto, (max-width: ${Math.round((max * 100) / cqw)}px) ${cqw}vw, ${max}px`;
}

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
 * A real Riftbound card: Riot's official card image, or a proxy drawn from the official card data
 * if the image can't load (offline before it was cached). Tap to enlarge.
 * Exhausted cards are rotated 90 degrees like on the table.
 */
export function Card({ k, size = 'md', exhausted, dim, dead, highlight, badges, tag, caption, style }: CardProps) {
  const open = useLightbox();
  // Keyed by card so a figure that swaps cards in place retries the new card's image.
  const [broken, setBroken] = useState<CardKey | null>(null);
  const c = card(k);
  const land = c.orientation === 'landscape';
  const cls = ['rc', size, land && 'land', exhausted && 'ex', dim && 'dim', dead && 'dead', highlight && 'hl'].filter(Boolean).join(' ');
  const state = [exhausted && 'exhausted', dead && 'dies', dim && 'not in play'].filter(Boolean).join(', ');
  return (
    <figure className={cls} style={style}>
      <button type="button" className="rc-hit" onClick={() => open(k)} aria-label={`${c.name}${state ? ` (${state})` : ''}. Tap to enlarge.`}>
        <span className="rc-frame">
          {broken !== k ? (
            <img
              src={cardImage(k, land ? 520 : 360)}
              srcSet={SOURCE_WIDTHS[land ? 'landscape' : 'portrait'].map((w) => `${cardImage(k, w)} ${w}w`).join(', ')}
              sizes={imageSizes(size, land)}
              alt=""
              loading="lazy"
              decoding="async"
              width={land ? 1038 : 744}
              height={land ? 744 : 1039}
              onError={() => setBroken(k)}
            />
          ) : (
            <ProxyCard k={k} />
          )}
        </span>
        {tag && <span className="tag">{tag}</span>}
      </button>
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
