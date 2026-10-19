import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { card, cardImage, gallery, type CardKey } from '../data/cards';
import { OFFICIAL_ART } from './Card';
import { ProxyCard } from './ProxyCard';

const Ctx = createContext<(key: CardKey) => void>(() => {});
export const useLightbox = () => useContext(Ctx);

/** Tap any card to see the official card image large, with a link to Riot's card gallery. */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<CardKey | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const show = useCallback((key: CardKey) => setOpen(key), []);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const c = open ? card(open) : null;
  return (
    <Ctx.Provider value={show}>
      {children}
      {open && c && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={c.name} onClick={() => setOpen(null)}>
          <button ref={closeRef} className="close" type="button" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          <figure onClick={(e) => e.stopPropagation()}>
            {OFFICIAL_ART
              ? <img className={c.orientation === 'landscape' ? 'land' : ''} src={cardImage(open, c.orientation === 'landscape' ? 1038 : 744)} alt={`${c.name} card`} />
              : <span className={`lb-proxy${c.orientation === 'landscape' ? ' land' : ''}`}><ProxyCard k={open} detail /></span>}
            <figcaption>{c.name} · <a href={gallery(open)} target="_blank" rel="noopener">See the real card on Riot's official gallery</a></figcaption>
          </figure>
        </div>
      )}
    </Ctx.Provider>
  );
}
