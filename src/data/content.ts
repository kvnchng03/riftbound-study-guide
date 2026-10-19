import type { CardKey } from './cards';

export interface ChapterRef { id: string; title: string }
export interface PartRef { id: string; title: string; chapters: ChapterRef[] }

/** Single source of truth for the table of contents. */
export const PARTS: PartRef[] = [
  { id: 'start', title: 'Start', chapters: [{ id: 'plan', title: 'Your study plan' }] },
  {
    id: 'part1', title: '1 · Learn the rules', chapters: [
      { id: 'overview', title: 'The game in one minute' },
      { id: 'deck', title: "What's in a deck" },
      { id: 'reading', title: 'Reading a card' },
      { id: 'runes', title: 'Paying with runes' },
      { id: 'turn', title: 'A turn, step by step' },
      { id: 'scoring', title: 'Moving and scoring' },
      { id: 'combat', title: 'Combat' },
      { id: 'chain', title: 'The Chain' },
      { id: 'focus', title: 'Showdowns: focus and priority' },
      { id: 'timing', title: 'Tricky timing' },
      { id: 'keywords', title: 'Keywords' }
    ]
  },
  {
    id: 'part2', title: '2 · Learn to think', chapters: [
      { id: 'tempo', title: 'Point tempo' },
      { id: 'first', title: 'Going first or second' },
      { id: 'value', title: 'Value and tempo' },
      { id: 'archetypes', title: 'Deck types' },
      { id: 'lessons', title: 'Lessons from the coaching game' }
    ]
  },
  {
    id: 'part3', title: '3 · Build decks', chapters: [
      { id: 'build', title: 'Building a deck' },
      { id: 'split', title: 'Rune split' },
      { id: 'battlefields', title: 'Choosing battlefields' },
      { id: 'sideboard', title: 'Sideboarding' },
      { id: 'bans', title: 'Reading bans' },
      { id: 'prerift', title: 'Radiance pre-rift' }
    ]
  },
  {
    id: 'part4', title: '4 · Get better', chapters: [
      { id: 'practice', title: 'How to practise' },
      { id: 'quiz', title: 'Flashcards' },
      { id: 'sources', title: 'Videos and sources' }
    ]
  }
];
export const SECTION_IDS = PARTS.flatMap((p) => p.chapters.map((c) => c.id));

export const VIDEOS = [
  { id: 'gwy5KBlbfro', title: 'Improve Your Fundamentals: Diana Coaching', length: '1:51:50' },
  { id: 'm74Wm0rEdFw', title: 'The Chain & Showdowns', length: '23:57' },
  { id: 'UCczQhEiJ_I', title: 'Explaining Point Tempo', length: '26:14' },
  { id: 'SYJC5pApkOA', title: 'Value vs Tempo', length: '30:42' },
  { id: 'QBN066lsQCk', title: 'Deck Archetypes & Selecting Your Legend', length: '34:16' },
  { id: 'HxNenlw6m04', title: 'Actually Improve at Riftbound', length: '31:45' },
  { id: 'b6tSnqvHVIk', title: 'How to Build Actually Good Decks', length: '33:19' },
  { id: 'r-Ua-z1iWw0', title: 'Deckbuilding: Runes, Battlefields, Sideboard', length: '45:24' },
  { id: 'xqP5hlIUX-M', title: 'Adjusting to Bans', length: '28:14' },
  { id: 'pPLw7HycniI', title: "Full Pre-Rift Beginner's Guide: Radiance", length: '18:40' }
] as const;

export interface KeywordRow { name: string; text: string; example: CardKey; isNew?: boolean }
export const GLOSSARY: { group: string; rows: KeywordRow[] }[] = [
  {
    group: 'Timing', rows: [
      { name: 'Action', text: "Can also be played during showdowns, on either player's turn.", example: 'cleave' },
      { name: 'Reaction', text: 'Can be played any time, even on top of another spell on the chain.', example: 'discipline' },
      { name: 'Hidden', text: 'Pay 1 power to place it face-down at a battlefield you control. From next turn, play it free at Reaction speed there.', example: 'pakaa' },
      { name: 'Ambush', text: 'Can be played straight to a battlefield where you have units, at Reaction speed.', example: 'soulspinner' }
    ]
  },
  {
    group: 'Combat', rows: [
      { name: 'Assault', text: '+1 might (or +X) while attacking.', example: 'daring' },
      { name: 'Shield', text: '+1 might (or +X) while defending.', example: 'stalwart' },
      { name: 'Tank', text: "Must be assigned damage before its side's other units.", example: 'shen' },
      { name: 'Backline', text: "Assigned damage last, after its side's other units.", example: 'promoter' },
      { name: 'Disarm', text: 'When it attacks, an enemy unit there gets -1 might (or -X) this turn.', example: 'peddler', isNew: true },
      { name: 'Ganking', text: 'Can move from one battlefield straight to another.', example: 'revna' },
      { name: 'Deflect', text: 'Opponents pay 1 extra power to target it with a spell or ability.', example: 'pouty' }
    ]
  },
  {
    group: 'Costs and upgrades', rows: [
      { name: 'Accelerate', text: 'Pay 1 energy + 1 power more and the unit enters ready, so it can move right away.', example: 'kaisa' },
      { name: 'Repeat', text: 'Pay an extra cost to do the effect a second time.', example: 'feral' },
      { name: 'Flow', text: "Can be played again from your trash for its Flow cost, then it's removed from the game.", example: 'dredge' },
      { name: 'Show Off', text: 'As you play it, reveal a card from hand or point to one you control. The card checks what you showed.', example: 'construct', isNew: true },
      { name: 'Empower', text: 'Pay a one-time cost to upgrade it. While Empowered it has extra text.', example: 'punching' }
    ]
  },
  {
    group: 'When something happens', rows: [
      { name: 'Deathknell', text: 'Does something when it dies.', example: 'sentry' },
      { name: 'Vision', text: 'When played, look at your top card; you may put it on the bottom.', example: 'mystic' },
      { name: 'Temporary', text: 'Dies at the start of your next turn, before scoring.', example: 'spriteBurst' },
      { name: 'Hunt', text: 'Gain XP when it conquers or holds.', example: 'gromp' },
      { name: 'Level', text: 'Gets extra text once you have enough XP.', example: 'gemhand' },
      { name: 'Legion', text: 'Gets a bonus if you already played another card this turn.', example: 'gloryseeker' }
    ]
  },
  {
    group: 'Gear', rows: [
      { name: 'Equip', text: 'Pay the cost to attach this equipment to one of your units.', example: 'dorans' },
      { name: 'Quick-Draw', text: "Equipment you can play at Reaction speed; it attaches as it's played.", example: 'cloth' },
      { name: 'Weaponmaster', text: 'When played, attach one of your equipment to it at a discount.', example: 'veteran' },
      { name: 'Deploy', text: 'Gear played straight onto any battlefield. Destroyed when an opponent holds there.', example: 'banner', isNew: true },
      { name: 'Unique', text: 'Only 1 copy allowed in your deck.', example: 'rabadon' }
    ]
  }
];

export interface Lesson { title: string; at: string; t: number; situation: string; idea: string; call: string; cards: CardKey[] }
export const LESSONS: Lesson[] = [
  {
    title: 'What to keep in your opening hand', at: '45:49', t: 2749,
    situation: "The student's opening hand: Stacked Deck, Gust, Patched Porobot and Morbid Return.",
    idea: 'Keep the 2-cost Patched Porobot, Stacked Deck and Gust. Send Morbid Return back, since it only matters for a late combo.',
    call: "Correct. A turn-1 play matters most. Gust depends on the matchup, but it's very good against decks that must walk onto battlefields to score.",
    cards: ['porobot', 'stacked', 'gust', 'morbid']
  },
  {
    title: 'What is the real worst case?', at: '51:13', t: 3073,
    situation: 'The student held energy back, worried Daremx would gang up on Patched Porobot.',
    idea: "The worst case is losing my unit, so I'll keep energy open.",
    call: 'The real worst case is Daremx ignoring you, spending everything on new units, and walking onto both battlefields next turn. And if he spends two Disciplines to kill a 2-drop, that trade is good for you.',
    cards: ['porobot', 'discipline']
  },
  {
    title: 'Bring a unit home once it has scored', at: '1:11:06', t: 4266,
    situation: 'Patched Porobot already scored this turn. Stay on the battlefield, or go home?',
    idea: "I'd rather keep a body than deny one point, so I'll bring it home.",
    call: "Right. Staying adds no points and leaves it open to a two-card kill plus a look at your hand. At home it's safe and still threatens next turn.",
    cards: ['porobot']
  },
  {
    title: 'Respect the biggest version of a threat', at: '1:01:07', t: 3667,
    situation: "Daremx, playing Shen, thinks aloud about killing the student's Hwei, Brooding Painter.",
    idea: "(Daremx's side) Could I Charm Hwei into a fight and kill him?",
    call: 'Charm moves Hwei, which triggers his ability, and the student can discard a unit to make him +3. So Daremx must treat a 5-might Hwei as 8 and needs several exact cards. Too risky: Hwei is safe, and the student can build up freely.',
    cards: ['hwei', 'charm']
  },
  {
    title: "Don't spend your best answer on a small threat", at: '1:18:50', t: 4730,
    situation: 'Daremx is tapped out and has a hidden card on a battlefield the student wants.',
    idea: 'Use Eclipse (-4 might) to make sure I win the fight.',
    call: 'Eclipse is overkill. Daremx has no energy left, so Hard Bargain (counter unless they pay 2) is a full counter on his hidden card. Keep Eclipse for later.',
    cards: ['eclipse', 'hardBargain']
  },
  {
    title: "Know what you're digging for", at: '1:28:41', t: 5321,
    situation: 'The student plays Stacked Deck (look at 3, keep 1).',
    idea: 'Take whatever looks good.',
    call: "Look for a specific card. Here it's Flash: score to 4, then on Daremx's turn Flash your units home so they can't be punished.",
    cards: ['stacked', 'flash']
  }
];

export const FLASHCARDS: [string, string][] = [
  ['How many points win a 1v1 game?', '8. You need at least 8 and more than your opponent.'],
  ['What are the two ways to score a battlefield?', 'Conquer it (take control during your turn) or hold it (still control it when your turn starts). Each battlefield scores once per turn.'],
  ["You're at 7 and conquer one battlefield without scoring the other. Do you win?", 'No. You draw a card instead (the Final Point rule). A hold would have won.'],
  ['How does a rune pay energy, and how does it pay power?', 'Energy: turn it sideways. Power: send it to the bottom of your rune deck (only runes of that colour).'],
  ['What does Falling Star cost?', '2 energy plus 2 Fury power.'],
  ['Who gets 3 runes on their first turn?', 'The player going second. The first player still draws on turn 1.'],
  ["Can Kai'Sa, Survivor move the turn you play her?", 'Only if you pay Accelerate (1 energy + 1 Fury power extra). Otherwise she enters exhausted.'],
  ['What can you play during a showdown?', 'Action and Reaction cards. Not spells without a timing keyword.'],
  ['Once a spell is on the chain, what can respond?', 'Only Reactions.'],
  ['Shen, Kinkou (Tank) defends next to another unit. Which must you damage first?', 'Shen. Tank units must be assigned lethal damage first.'],
  ['Stalwart Poro has 2 might and Shield. How big is it when defending?', '3. Shield gives +1 while defending.'],
  ['Gust bounces a unit with 3 or less might. Your Recruit is pumped to 5 before Gust resolves. What happens?', 'Gust has no legal target and does nothing.'],
  ['Yasuo attacks into Overzealous Fan. Whose trigger resolves first?', "The Fan's (the defender's). Attacker triggers go on the chain first, so defender triggers resolve first."],
  ['Can you target a spell lower down the chain?', 'Yes. Any item on the chain can be targeted.'],
  ['When does a showdown end?', 'When both players pass focus in a row.'],
  ['What happens to attackers if a defender survives?', 'Everyone heals, then the attackers go back to base.'],
  ['What happens when you must draw from an empty deck?', 'Shuffle your trash into your deck, your opponent gains 1 point, then draw.'],
  ["Why are 2 and 3 points 'the same'?", 'From either you need three more turns at 2 points a turn.'],
  ['If nobody ever defends, who wins?', 'The player going first.'],
  ['What is a good going-second battlefield?', "One that helps you stabilise, like Vilemaw's Lair (their units can't go home) or Treasure Hoard (spends your spare energy)."],
  ['What rune split for an almost one-colour deck?', '9 / 3.'],
  ['What belongs in a sideboard?', 'Cards that are great in some matchups and useless in others.'],
  ["Daremx's number-one tip for improving?", 'Play one legend for your whole first set, from a proven list.']
];
