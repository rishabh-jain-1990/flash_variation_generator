# Flash Variant Generator

A zero-cost, fully client-side web application for discovering and exploring Flash (Teen Patti / 3-Card Poker) game variations. Built with Vite, React, TypeScript, and TailwindCSS.

## Features

- **Random Generator** — Generate random Flash variants one at a time with card shuffle animations
- **Daily Variant** — A deterministic "Variant of the Day" seeded from the UTC date, consistent globally
- **Session History** — Browse all variants generated during the current session
- **Favorites** — Save variants to localStorage for persistent access across sessions
- **Tag Filtering** — Filter history and favorites by tags
- **Light/Dark Mode** — Theme toggle with system preference detection
- **Procedural Card Rendering** — Dynamic card layouts that adapt to each variant's `layout_type`

## Layout Types

| Type | Description |
|------|-------------|
| `standard_grid` | Standard 3-card inline display |
| `wildcard_banner` | Split view with wildcards isolated above the hand |
| `community_mat` | 2 private cards + 1 shared community card |
| `split_hand` | Vertical split-tier for keep/discard multi-stage variants |

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Configured for Vercel free tier. Push to deploy.
