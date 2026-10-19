import type { Domain } from '../data/cards';

/** Simple original glyphs for the six colours (not Riot's symbols). */
const PATHS: Record<Domain, string> = {
  fury: 'M12 3c1 3 4 4.5 4 8.5a4 4 0 0 1-8 0c0-2 1-3 1-3 .3 1.6 1.5 2 1.5 2C10 8 12 6 12 3z',
  calm: 'M5 17c0-7 5-12 13-12 0 8-5 13-12 13M5 17l7-7',
  mind: 'M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z',
  body: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z',
  chaos: 'M12 12m-1.5 0a1.5 1.5 0 1 0 3 0a3.5 3.5 0 1 0-7 0a5.5 5.5 0 1 0 11 0a7.5 7.5 0 1 0-15 0',
  order: 'M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
  colorless: 'M12 4l8 8-8 8-8-8z'
};

export function DomainGlyph({ domain, size = 24, className }: { domain: Domain; size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[domain] ?? PATHS.colorless} />
    </svg>
  );
}
