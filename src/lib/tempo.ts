/** Points needed to win a 1v1 game. */
export const VICTORY_SCORE = 8;

/** Turns still needed to win at the maximum pace of 2 points per turn. */
export function turnsToWin(score: number): number {
  return score >= VICTORY_SCORE ? 0 : Math.ceil((VICTORY_SCORE - score) / 2);
}

export interface RaceStep { turn: number; first: number; second: number; title: string; text: string }

/** Two scripted races from Daremx's point-tempo video. Scores are after each player's turn. */
export const RACES: Record<'race' | 'flip', RaceStep[]> = {
  race: [
    { turn: 1, first: 0, second: 0, title: 'Turn 1: nobody scores', text: 'Both players play a unit. New units arrive exhausted, so they can’t move yet.' },
    { turn: 2, first: 1, second: 1, title: 'Turn 2: one point each', text: 'Each player moves a unit onto an empty battlefield and conquers it.' },
    { turn: 3, first: 3, second: 3, title: 'Turn 3: two points each', text: 'Each player scores both battlefields. Nobody manages to defend.' },
    { turn: 4, first: 5, second: 5, title: 'Turn 4: still level', text: 'Both at 5. Both need two more turns.' },
    { turn: 5, first: 7, second: 7, title: 'Turn 5: both one turn away', text: 'Both reach 7, but the first player takes their turn 6 first.' },
    { turn: 6, first: 8, second: 7, title: 'Turn 6: going first wins', text: 'The first player reaches 8 before the second player ever gets a turn 6.' }
  ],
  flip: [
    { turn: 1, first: 0, second: 0, title: 'Turn 1: nobody scores', text: 'Same start as before.' },
    { turn: 2, first: 1, second: 1, title: 'Turn 2: one point each', text: 'Each player takes an empty battlefield.' },
    { turn: 3, first: 2, second: 2, title: 'Turn 3: the second player defends', text: 'The second player keeps enough units on their battlefield that it can’t be broken. Both players can only hold their own: +1 each.' },
    { turn: 4, first: 3, second: 4, title: 'Turn 4: the flip', text: 'The second player holds (3), then moves spare units across to conquer the other battlefield (4). They now need two turns; the first player needs three.' },
    { turn: 5, first: 5, second: 6, title: 'Turn 5: second player ahead', text: 'First player 5, second player 6.' },
    { turn: 6, first: 7, second: 8, title: 'Turn 6: going second wins', text: 'The first player only reaches 7. One well-timed hold flipped the race.' }
  ]
};
