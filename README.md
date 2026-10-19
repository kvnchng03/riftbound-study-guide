# Riftbound Study Guide

An installable, offline-capable study guide for **Riftbound**, Riot's League of Legends trading card game.
It teaches the rules with real cards and step-through diagrams, then the strategy ideas from Daremx's Diana coaching session and his *Riftbound 101* videos, checked against Riot's official Core Rules (Oct 9, 2026).

**Live site:** https://kvnchng03.github.io/riftbound-study-guide/

## What's inside

- 25 chapters in four parts: learn the rules, learn to think, build decks, get better.
- Step-through examples you can tap, swipe or arrow-key through: a real combat, the Chain resolving, the point-tempo race.
- Every card shown is a real card with its official image, and a link to it in the official card gallery.
- Study plan with saved progress, flashcards, and timestamped links into each video.
- Light and dark themes, a phone-first layout, and a PWA you can install and use offline.

## Card art and Riot's policy

Every card shows Riot's official card image, loaded from Riot's CDN (the same source as the official card gallery) at the size each layout needs and cached for offline use.
No card art is copied into this repository.
If an image can't load, for example offline before it was ever viewed, the card falls back to a **proxy**: an original frame filled with the real name, costs, might and colours from Riot's public card data, plus a short paraphrase of the effect from `src/data/card-notes.json`.

Riot's [Riftbound developer policy](https://developer.riotgames.com/policies/riftbound) asks fan apps to register with Riot and to use only card assets provided by the Riot API.

Riftbound Study Guide was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.

## Development

Requires Node 22.6 or newer.

```sh
npm install
npm run dev        # local dev server
npm test           # unit tests (card data integrity, combat damage rules, point tempo)
npm run lint
npm run typecheck
npm run build      # production build + service worker into dist/
npm run cards      # refresh src/data/cards.json from Riot's public card feed
```

The cards the guide uses are listed in `src/data/card-ids.json`.
`npm run cards` looks each one up in Riot's public card-gallery feed and writes `src/data/cards.json` (stats and official image URL only).
Short effect paraphrases live in `src/data/card-notes.json`.

## Deploy

Every push to `main` runs lint, typecheck, tests and the build, then publishes `dist/` to GitHub Pages (`.github/workflows/deploy.yml`).
Pull requests run the same checks without deploying.

## Credits

Strategy content summarises videos by [Daremx](https://www.youtube.com/channel/UCQuktggUvXsbOyt8xh0FaeA).
Rules follow Riot's official [Core Rules and Tournament Rules](https://playriftbound.com/en-us/rules-hub/).
Code is MIT licensed (see `LICENSE`); Riftbound names, card data and art belong to Riot Games.
