import { describe, expect, it } from 'vitest';
import { RACES, turnsToWin } from './tempo';

describe('turnsToWin', () => {
  it('groups scores into even breakpoints', () => {
    expect([0, 1, 2, 3, 4, 5, 6, 7, 8].map(turnsToWin)).toEqual([4, 4, 3, 3, 2, 2, 1, 1, 0]);
  });
});

describe('scripted races', () => {
  for (const [name, steps] of Object.entries(RACES)) {
    it(`${name}: scores never drop and never jump more than 2 a turn`, () => {
      steps.forEach((s, i) => {
        const prev = steps[i - 1] ?? { first: 0, second: 0 };
        expect(s.first - prev.first).toBeGreaterThanOrEqual(0);
        expect(s.first - prev.first).toBeLessThanOrEqual(2);
        expect(s.second - prev.second).toBeGreaterThanOrEqual(0);
        expect(s.second - prev.second).toBeLessThanOrEqual(2);
      });
    });
  }
  it('going first wins an even race; one hold flips it', () => {
    expect(RACES.race.at(-1)).toMatchObject({ first: 8, second: 7 });
    expect(RACES.flip.at(-1)).toMatchObject({ first: 7, second: 8 });
  });
});
