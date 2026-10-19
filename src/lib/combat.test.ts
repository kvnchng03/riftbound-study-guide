import { describe, expect, it } from 'vitest';
import { assignDamage } from './combat';

describe('assignDamage', () => {
  it('assigns Tank first and full lethal before moving on', () => {
    const r = assignDamage(10, [{ id: 'poro', might: 3 }, { id: 'shen', might: 5, tank: true }]);
    expect(r.assignments).toEqual([{ id: 'shen', damage: 5, lethal: true }, { id: 'poro', damage: 3, lethal: true }]);
    expect(r.spare).toBe(2);
  });
  it('follows the assigning player preference among equals', () => {
    const r = assignDamage(8, [{ id: 'kaisa', might: 4 }, { id: 'forer', might: 6 }], ['forer', 'kaisa']);
    expect(r.assignments).toEqual([{ id: 'forer', damage: 6, lethal: true }, { id: 'kaisa', damage: 2, lethal: false }]);
  });
  it('puts Backline last and treats 0 might as needing 1 damage', () => {
    const r = assignDamage(1, [{ id: 'back', might: 1, backline: true }, { id: 'zero', might: 0 }]);
    expect(r.assignments[0]).toEqual({ id: 'zero', damage: 1, lethal: true });
    expect(r.assignments[1]).toEqual({ id: 'back', damage: 0, lethal: false });
  });
});
