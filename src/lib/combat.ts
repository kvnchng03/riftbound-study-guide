export interface Combatant { id: string; might: number; tank?: boolean; backline?: boolean }
export interface Assignment { id: string; damage: number; lethal: boolean }

/**
 * Splits `total` damage across `targets` the way the Core Rules require:
 * Tank units first, Backline units last, and each unit gets full lethal damage
 * before the next one gets any. `order` is the assigning player's preference
 * within those constraints. Leftover damage goes to the last unit.
 */
export function assignDamage(total: number, targets: Combatant[], order?: string[]): { assignments: Assignment[]; spare: number } {
  const rank = (c: Combatant) => (c.tank ? 0 : c.backline ? 2 : 1);
  const pref = (c: Combatant) => (order ? order.indexOf(c.id) : 0);
  const sorted = [...targets].sort((a, b) => rank(a) - rank(b) || pref(a) - pref(b));
  let left = total;
  const assignments = sorted.map((c) => {
    const lethal = Math.max(1, c.might);
    const damage = Math.min(left, lethal);
    left -= damage;
    return { id: c.id, damage, lethal: damage >= lethal };
  });
  return { assignments, spare: left };
}
