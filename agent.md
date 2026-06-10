# Product Implementation Blueprint: Flash Variant Generator
**Target Architecture:** Zero-Cost Serverless Web Application  
**Execution Context:** Production Deployment Configuration on Vercel

---

## 1. System Vision & Constraints

This document defines the architectural boundaries and product specifications for the **Flash Variant Generator**. The application is explicitly designed to operate with **exactly $0/month in recurring costs**, eliminating centralized databases, traditional hosting backends, and operational AI API keys. 

### Operational Boundaries
*   **Infrastructure:** Static client-side hosting with zero server resources.
*   **Data Tier:** Immutable state assets bundled directly into the client application binary (~400KB max); volatile states managed via client storage abstractions.
*   **Computational Weight:** Shifted entirely onto the client's browser runtimes.

---

## 2. Core Functional Requirements

### FR-1: Deterministic Feasibility (Rules Engine)
*   The system must serve valid, mathematically sound, and game-tested variations of Flash (Teen Patti / 3-Card Poker). 
*   It must completely eliminate structural logical paradoxes by using a pre-compiled, static multi-variant dataset consisting of over 500 hand-crafted variations.
*   The dataset will be provided externally and dropped into the project as a replacement for the current mock data.

### FR-2: Client-Side Deduplication & Token Invariance
*   The system must mitigate unnecessary runtime cycles and avoid data lookups by treating the frontend distribution bundle as an immutable global variation cache. 
*   The `variations.json` file (~400KB max) is bundled directly into the main chunk at build time.
*   Duplicate data structures are handled deterministically at compile time.

### FR-3: Hierarchical State Persistence (Session & Global Cache)
*   **Volatile In-Memory Cache (React State):** Current tab execution states — the active session history stack and generation state — are maintained inside reactive component states. History holds the complete list of all variants the user has seen in the current session.
*   **Persistent Device Cache (`localStorage`):** Favored variations and theme preference are automatically mirrored to `localStorage`. This eliminates authentication barriers, user tracking mechanisms, and cloud storage databases.

### FR-4: Responsive Procedural Rendering
*   Instead of making network calls to heavy external assets or media generation APIs, the user interface must dynamically construct and animate mock-ups of playing card configurations and table structures on the fly by interpreting structured strings embedded within the active variation dataset.

### FR-5: Single-Page Application Model
*   The application is a single-page app (SPA). There are no separate routes or pages.
*   Navigation between views (Generator, Daily, History, Favorites) is handled via tab switching within a single page, managed by React state.

### FR-6: Generate-Only Discovery Model
*   Users cannot browse or search the master variation list. Discovery is exclusively through:
    *   **Random generation:** One variant at a time via the Generate button.
    *   **Daily variant:** A single globally-consistent variant per day.
*   Users can only review variants they have already seen via their session History or their persisted Favorites.

### FR-7: Light & Dark Mode
*   The application supports both light and dark themes.
*   Theme defaults to the user's system preference (`prefers-color-scheme`).
*   A manual toggle persists the choice in `localStorage`.

---

## 3. System Architecture Design

### Deployment & Framework Stack
*   **Hosting Layer:** Vercel Free Tier (with `vercel.json` configuration included).
*   **Core UI Engine:** Vite + React 19 (TypeScript).
*   **Styling Layer:** TailwindCSS v4 (via `@tailwindcss/vite` plugin).
*   **State Management Layer:** React Context API (`AppContext` + `useApp` hook).

### Component Hierarchy
```
AppProvider (Context Engine)
└── AppContent
    ├── Header (Nav tabs + theme toggle)
    └── Main View (switched by viewMode state)
        ├── GeneratorView → VariationCard → CardLayout → ProceduralCard
        ├── DailyView → VariationCard → CardLayout → ProceduralCard
        ├── HistoryView → VariationList → VariationCard → CardLayout → ProceduralCard
        └── FavoritesView → VariationList → VariationCard → CardLayout → ProceduralCard
```

### Reuse Constraints
*   **`VariationCard`** is the single, canonical component for rendering any variation's full detail view (title, description, complexity, tags, card layout, favorite action). It is reused in every view that displays a variation. No other component may duplicate this rendering logic.
*   **`VariationList`** is the single, canonical component for rendering a filterable accordion list of variations. Both `HistoryView` and `FavoritesView` are thin wrappers that delegate entirely to `VariationList` via props.

### Source File Map
```
src/
├── App.tsx                          # Root SPA shell, view switching
├── main.tsx                         # Entry point
├── types.ts                         # Variation, VisualCues, ViewMode, ThemeMode
├── index.css                        # Tailwind imports, keyframe animations
├── context/
│   ├── context.ts                   # AppContext definition (separated for Fast Refresh)
│   ├── AppContext.tsx                # AppProvider component
│   └── useApp.ts                    # useApp hook
├── components/
│   ├── Header.tsx                   # Sticky nav bar with tab switching + theme toggle
│   ├── GeneratorView.tsx            # Generate button + shuffle animation + VariationCard
│   ├── DailyView.tsx                # Daily variant display via VariationCard
│   ├── HistoryView.tsx              # Thin wrapper around VariationList
│   ├── FavoritesView.tsx            # Thin wrapper around VariationList
│   ├── VariationList.tsx            # Reusable accordion list with TagFilter
│   ├── VariationCard.tsx            # Single canonical variation detail renderer
│   ├── CardLayout.tsx               # Layout switcher (4 layout types)
│   ├── ProceduralCard.tsx           # Individual card with highlight states
│   └── TagFilter.tsx                # Tag toggle pill bar
└── utils/
    ├── prng.ts                      # Deterministic daily variant seed (UTC)
    └── storage.ts                   # localStorage abstraction for favorites
public/
└── data/
    └── variations.json              # Mock dataset (to be replaced with full 500+)
```

---

## 4. Master Data Model: `variations.json` Schema

Every variation inside the primary generation dictionary must conform to the strict JSON schema defined below. This consistency allows the rendering code to interpret structural strings reliably without error.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "FlashVariationArray",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["id", "title", "complexity", "tags", "description", "visual_cues"],
    "properties": {
      "id": { "type": "string", "pattern": "^v-[0-9]{3,4}$" },
      "title": { "type": "string" },
      "complexity": { "type": "string", "enum": ["easy", "intermediate", "hard"] },
      "tags": { "type": "array", "items": { "type": "string" }, "description": "Filterable tag labels. Tags are extracted at build time to populate the tag filter UI." },
      "description": { "type": "string" },
      "visual_cues": {
        "type": "object",
        "required": ["highlight_cards", "layout_type", "overlay_icon", "bg_theme"],
        "properties": {
          "highlight_cards": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Cards to highlight. Can be ranks (e.g. 'A', 'K'), suits (e.g. '♥', '♠'), or specific cards (e.g. 'J♠', 'J♥'). Jokers are never highlighted."
          },
          "layout_type": { "type": "string", "enum": ["standard_grid", "split_hand", "community_mat", "wildcard_banner"] },
          "overlay_icon": { "type": "string", "description": "Emoji only. No icon library references." },
          "bg_theme": { "type": "string", "description": "Tailwind CSS explicit gradient utility string" }
        }
      }
    }
  }
}
```

### Production Example Block
```json
[
  {
    "id": "v-102",
    "title": "AK47 Jackpot",
    "complexity": "hard",
    "tags": ["Wildcard", "High-Volatility", "Classic"],
    "description": "All Aces, Kings, 4s, and 7s are universal wildcards. These cards can represent any suit or rank to form the best possible hand. If you hold multiple jokers, they combine sequentially.",
    "visual_cues": {
      "highlight_cards": ["A", "K", "4", "7"],
      "layout_type": "wildcard_banner",
      "overlay_icon": "🃏",
      "bg_theme": "from-purple-950 to-slate-900"
    }
  }
]
```

---

## 5. UI & UX Core Specifications

### Application Structure
*   **Single-page app** with four tab views: Generator (default), Daily, History, Favorites.
*   On first load, the user sees the **Generator view** with a prominent "Generate Variant" button and a prompt to click it.
*   The **Daily view** is accessible via a nav tab and shows a single variant determined by the UTC date.

### Interaction Model
*   **No browsing of the master list.** Users generate one variant at a time. The generation includes a simulated shuffle delay (0.8s) with a skeleton shimmer animation to create the feel that the variant is being randomly generated.
*   **History** shows the complete list of variants seen in the current session, displayed as an accordion list. Clicking a row expands it to show the full `VariationCard`.
*   **Favorites** shows persisted favorites in the same accordion format, with a ★ badge on each row.
*   Both History and Favorites support **tag filtering** via `TagFilter` pills.

### Variation Detail Display
Every variation is rendered by the single `VariationCard` component showing:
*   Title with emoji overlay icon
*   Complexity badge (easy/intermediate/hard with color coding)
*   Variation ID
*   Procedural card layout (determined by `layout_type`)
*   Full description text
*   Tag pills
*   Save/unsave to Favorites action button

### Procedural Rendering Logic
1.  **Card Highlight Matching:** The `ProceduralCard` component checks the current `visual_cues.highlight_cards` array. Entries can match by rank (`"A"`), by suit (`"♥"`), or by specific card (`"J♠"`). Jokers are never highlighted.
2.  **Highlight Application:** Highlighted states use a glowing amber outline:
    ```css
    border-amber-400 ring-4 ring-amber-400/30 scale-105 shadow-lg shadow-amber-500/20
    ```
3.  **Table Grid Mapping:** The `CardLayout` component switches rendering based on `layout_type`:
    *   `standard_grid` → Standard 3-card inline display.
    *   `wildcard_banner` → Split view featuring an isolated high-value wildcard tray labeled "Wild" above the remaining hand, separated by a dashed divider.
    *   `community_mat` → Split field with 1 community card labeled "Community" at top, a dashed divider, then 2 private cards labeled "Your Hand" below. This represents variants where the player gets 2 cards + 1 community card placed in the center common to all players.
    *   `split_hand` → Vertical split-tier presentation framework mapping standard hands into distinct high/low tiers or discard buffers. Shows a "Keep" tier and a "Discard" tier separated by a "vs" divider, to visually support combinatorial multi-stage variant groupings.

### Retention & Engagement Features
*   **The Daily Variant Seed Engine:** A deterministic PRNG seeded from the current UTC date string (`YYYY-MM-DD`). All global clients see the exact same "Variant of the Day" without a central database. One variant per day.
*   **Unmount-Remount Animation Cycle:** Cards are assigned unique keys composed of the variation identifier combined with a render counter. This forces React to completely unmount and remount the element on each generation, re-triggering entrance animations (`card-enter` keyframe: scale + rotateY).
*   **Export (Phase 2):** PDF export of saved favorites. Import is not supported.

---

## 6. Development Checklist for the AI Agent

- [x] **Phase 1:** Configure Vite + React + TypeScript project scaffold with TailwindCSS v4 (via `@tailwindcss/vite`).
- [ ] **Phase 2:** Drop in the full 500+ valid Flash entries into `/public/data/variations.json` (awaiting provided JSON). Current mock has 20 entries conforming to the Draft-07 schema.
- [x] **Phase 3:** Write the storage abstraction engine (`localStorage` for favorites, React state for session history).
- [x] **Phase 4:** Build the `ProceduralCard` component with conditional CSS highlight states (rank, suit, and specific card matching).
- [x] **Phase 5:** Implement the `CardLayout` switcher for all four `layout_type` values (`standard_grid`, `wildcard_banner`, `community_mat`, `split_hand`).
- [x] **Phase 6:** Integrate the deterministic PRNG for the "Daily Variant" seed mechanism (UTC timezone, one per day).
- [x] **Phase 7:** Add entrance animations with unmount-remount key switching for fluid generation transitions.
- [x] **Phase 8:** Light/dark mode support, `vercel.json` deployment config, production build verification.
- [x] **Phase 9:** Extract `VariationList` component to enforce single-component reuse for variation display — no duplicated rendering code.

### Remaining Work
- [ ] Replace mock `variations.json` with full 500+ entry dataset when provided.
- [ ] Implement PDF export of favorites (Phase 2 feature).
