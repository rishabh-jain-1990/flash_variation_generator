# Product Implementation Blueprint: Flash Variant Generator
**Target Architecture:** Zero-Cost Serverless Web Application  
**Execution Context:** Production Deployment Configuration on Vercel

---

## 1. System Vision & Constraints

This document defines the architectural boundaries and product specifications for the **Flash Variant Generator**. The application is explicitly designed to operate with **exactly $0/month in recurring costs**, eliminating centralized databases, traditional hosting backends, and operational AI API keys. 

### Operational Boundaries
*   **Infrastructure:** Static client-side hosting with zero server resources.
*   **Data Tier:** Immutable state assets bundled directly into the client application binary; volatile states managed via client storage abstractions.
*   **Computational Weight:** Shifted entirely onto the client's browser runtimes.

---

## 2. Core Functional Requirements

### FR-1: Deterministic Feasibility (Rules Engine)
*   The system must serve valid, mathematically sound, and game-tested variations of Flash (Teen Patti / 3-Card Poker). 
*   It must completely eliminate structural logical paradoxes by using a pre-compiled, static multi-variant dataset consisting of over 500 hand-crafted variations.

### FR-2: Client-Side Deduplication & Token Invariance
*   The system must mitigate unnecessary runtime cycles and avoid data lookups by treating the frontend distribution bundle as an immutable global variation cache. 
*   Duplicate data structures are handled deterministically at compile time.

### FR-3: Hierarchical State Persistence (Session & Global Cache)
*   **Volatile In-Memory Cache:** Current tab execution states (such as active history stacks) must be maintained inside reactive component states.
*   **Persistent Device Cache:** User history metrics, favored variations, and bookmarks must be automatically mirrored to browser-native persistent subsystems (`localStorage` / `IndexedDB`). This eliminates authentication barriers, user tracking mechanisms, and cloud storage databases.

### FR-4: Responsive Procedural Rendering
*   Instead of making network calls to heavy external assets or media generation APIs, the user interface must dynamically construct and animate mock-ups of playing card configurations and table structures on the fly by interpreting structured strings embedded within the active variation dataset.

---

## 3. System Architecture Design

### Deployment & Framework Stack
*   **Hosting Layer:** Vercel Free Tier.
*   **Core UI Engine:** Vite + React (TypeScript variant).
*   **Styling Layer:** TailwindCSS (utility-first composition engine).
*   **State Management Layer:** React Context API.

### Component State-Flow Topography
```
                  +-----------------------------------+
                  |        Vercel Edge Network        |
                  |     (Serves Immutable Bundle)     |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------------------------+
                  |          Client Browser           |
                  +-----------------+-----------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
+-----------------------+                       +-----------------------+
|  `variations.json`    |                       |   Browser Subsystems  |
|  (500+ Entry Array)   |                       | (`localStorage` Cache)|
+-----------+-----------+                       +-----------+-----------+
            |                                               |
            +-----------------------+-----------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |     Context Engine                |
                  |     (Core Application State)      |
                  +-----------------+-----------------+
                                    |
            +-----------------------+-----------------------+
            |                       |                       |
            v                       v                       v
+-----------------------+ +-----------------------+ +-----------------------+
|    LayoutManager      | |    VisualCueIcon      | | ProceduralCardDeck   |
| (Dynamic Table Flex)  | |   (Thematic Badges)   | | (Dynamic SVG/Classes)|
+-----------------------+ +-----------------------+ +-----------------------+
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
      "tags": { "type": "array", "items": { "type": "string" } },
      "description": { "type": "string" },
      "visual_cues": {
        "type": "object",
        "required": ["highlight_cards", "layout_type", "overlay_icon", "bg_theme"],
        "properties": {
          "highlight_cards": { "type": "array", "items": { "type": "string" } },
          "layout_type": { "type": "string", "enum": ["standard_grid", "split_hand", "community_mat", "wildcard_banner"] },
          "overlay_icon": { "type": "string" },
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

To make the app feel like a polished, premium utility, the AI Agent must follow these exact frontend implementation patterns:

### Procedural Rendering Logic
1.  **Card Target Identification:** The `ProceduralCard` components must parse the current `visual_cues.highlight_cards` array. If a component matches an entry in that array, it triggers a dynamic class layout switch:
    ```ts
    const isHighlighted = highlight_cards.includes(card.rank);
    ```
2.  **Highlight Application:** Highlighted states must not be subtle. They must add a glowing outline and append a relative badge flag:
    ```css
    .card-highlighted {
      @apply border-amber-400 ring-4 ring-amber-400/30 scale-105 shadow-lg shadow-amber-500/20;
    }
    ```
3.  **Table Grid Mapping:** The outer container wrap must use structural mapping blocks to modify how elements are laid out on screen based on the value of `layout_type`:
    *   `standard_grid` -> Standard 3-card inline display.
    *   `wildcard_banner` -> Split view featuring an isolated high-value target tray above the active card hand.
    *   `community_mat` -> Split field separating 2 private cards from an aligned central board slot.

### Retention & Engagement Features
*   **The Daily Variant Seed Engine:** Incorporate a deterministic pseudo-random number generator (PRNG) that seeds off the current system calendar timestamp (`YYYY-MM-DD`). This allows all global clients to access the exact same "Variant of the Day" simultaneously without checking a central database.
*   **Unmount-Remount Animation Cycle:** To guarantee fluid visual confirmation during rapid generation actions, cards must be explicitly assigned unique keys composed of the variation identifier combined with their card index. This approach forces React to completely unmount and remount the element, re-triggering entrance animations reliably.
*   **Local Portfolio Exporters:** Provide clear interface triggers inside the browser memory cache view to allow users to export their saved data arrays as a local file download, preventing data loss if they clear their browser cache.

---

## 6. Development Checklist for the AI Agent

- [ ] **Phase 1:** Configure a local Vite project scaffold integrated with TailwindCSS.
- [ ] **Phase 2:** Synthesize and save the 500+ valid Flash entries into `/public/data/variations.json` conforming strictly to the Draft-07 schema outline.
- [ ] **Phase 3:** Write the storage abstraction engine to handle local reading and writing cycles safely.
- [ ] **Phase 4:** Build the `ProceduralCard` component and set up its conditional CSS highlight states.
- [ ] **Phase 5:** Implement the layout switcher inside the main app view to handle the `layout_type` strings.
- [ ] **Phase 6:** Integrate the deterministic PRNG for the "Daily Variant" seed mechanism.
- [ ] **Phase 7:** Add the CSS key-switching animations to make page transitions feel fluid.
- [ ] **Phase 8:** Run final verification checks on the app bundle and execute the production deploy to Vercel.