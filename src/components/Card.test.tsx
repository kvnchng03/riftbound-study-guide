import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { cardImage } from '../data/cards';
import { CARD_WIDTHS, Card, imageSizes } from './Card';
import { LightboxProvider } from './Lightbox';

afterEach(cleanup);

describe('Card', () => {
  it("shows Riot's official card image", () => {
    const { container } = render(<Card k="kaisa" />);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(cardImage('kaisa', 360));
    expect(container.querySelector('.px')).toBeNull();
  });

  it('falls back to the proxy when the image cannot load, and retries when the card changes', () => {
    const { container, rerender } = render(<Card k="kaisa" />);
    fireEvent.error(container.querySelector('img') as HTMLImageElement);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('.px-name')?.textContent).toBe("Kai'SaSurvivor");
    rerender(<Card k="hopeful" />);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(cardImage('hopeful', 360));
  });

  it('enlarges to the full-size official image, with the same fallback', () => {
    const { getByRole } = render(<LightboxProvider><Card k="targon" /></LightboxProvider>);
    fireEvent.click(getByRole('button', { name: /Targon's Peak/ }));
    const big = getByRole('dialog').querySelector('img') as HTMLImageElement;
    expect(big.getAttribute('src')).toBe(cardImage('targon', 1038));
    fireEvent.error(big);
    expect(getByRole('dialog').querySelector('img')).toBeNull();
    expect(getByRole('dialog').querySelector('.lb-proxy .px')).not.toBeNull();
  });
});

describe('card image sizes', () => {
  it('match the card widths in global.css, so the browser picks a sharp image', () => {
    const css = readFileSync(join(__dirname, '../styles/global.css'), 'utf8');
    const clamp = (sel: string) => {
      const m = css.match(new RegExp(`${sel.replace(/\./g, '\\.')}\\{--w:clamp\\(\\d+px,(\\d+)cqw,(\\d+)px\\)\\}`));
      if (!m) throw new Error(`no --w clamp for ${sel}`);
      return [Number(m[1]), Number(m[2])];
    };
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl'] as const) expect(CARD_WIDTHS.portrait[size]).toEqual(clamp(`.rc.${size}`));
    for (const size of ['xs', 'md', 'xl'] as const) expect(CARD_WIDTHS.landscape[size]).toEqual(clamp('.rc.land'));
    for (const size of ['sm', 'lg'] as const) expect(CARD_WIDTHS.landscape[size]).toEqual(clamp(`.rc.land.${size}`));
    expect(imageSizes('xl', false)).toBe('auto, (max-width: 615px) 52vw, 320px');
  });
});
