# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Medici Biologics** landing + onboarding experience. AI + peptide science platform. Conversion-focused premium marketing site that doubles as the start of the product flow.

Stack: Next.js 15 (App Router) + TypeScript + Tailwind v3 + Framer Motion + next-themes + Lucide. Inter as the only font family (mandate, not default).

## Commands

```bash
npm run dev       # http://localhost:3000
npm run build     # production build + type check
npm run start     # serve production build
npm run lint      # next lint
```

Single-file type-check during edits: rely on `npm run build` (type errors surface during build). No vitest/jest configured.

## Architecture

Single composed route ([src/app/page.tsx](src/app/page.tsx)). Each section is its own component under [src/components/sections/](src/components/sections/). All copy lives in [src/content/site.ts](src/content/site.ts) — single source of truth. Em/en dashes are scrubbed (`grep -E "—|–" src/content/site.ts` should return empty).

```
src/
  app/layout.tsx          Inter + Inter Tight via next/font, ThemeProvider, no-FOUC inline script
  app/globals.css         CSS vars (light + dark), tile-canvas helpers, grain texture, focus rings
  app/page.tsx            Composes header → 9 sections → footer
  components/
    Providers.tsx         next-themes ThemeProvider wrapping SettingsProvider
    layout/SiteHeader     Sticky, scroll-aware, gear icon opens drawer
    layout/SiteFooter
    sections/             Hero (with ProcessFlow), Problem, BetterWay, MeetDrGabi, DrGabiHub,
                          Process, BiologicalPrecision, FoundingMember, OnSite
    settings/SettingsDrawer   Theme + 3 color pickers (hex + HSL via native picker) + font selector + reset
    motion/Reveal             Scroll-triggered fade-up; respects prefers-reduced-motion
    motion/CountUp            IntersectionObserver-driven number animation
    ui/Button                 Primary/secondary/ghost variants, pill shape
    ui/ImageUpload            Drag-and-drop image upload, persists data URL in localStorage("medici.image.<key>")
  lib/
    theme.ts              SettingsProvider context. Writes palette to :root CSS vars in real time, persists to localStorage("medici.settings")
    cn.ts                 clsx + tailwind-merge
    a11y.ts               usePrefersReducedMotion hook
  content/site.ts         All copy. Edit here, not in components.
```

### Section composition order (current)

The order is deliberate — Apple-style alternating canvases (`tile-canvas`, `tile-elev`, `tile-ink`, `tile-deep`) drive rhythm without borders. No two adjacent sections share the same canvas tone.

1. **Hero** — `tile-canvas` light. Headline left, ProcessFlow protocol card right. Trust strip beneath CTA.
2. **Problem** — `tile-elev`. Three-card grid, each with icon + numbered eyebrow.
3. **BetterWay** — `tile-ink` dark band. Editorial split (5/7) + 3-pillar grid below.
4. **MeetDrGabi** — `tile-canvas`. Centered scroll-stopper headline + 5/7 split (image upload portrait + capability stack with hover ArrowRight).
5. **DrGabiHub** — `tile-deep`. Manifesto integrated as headline (no longer hanging). Protocol card + bloodwork upload affordance.
6. **Process** — `tile-canvas`. Sticky 5/7 split. Manifesto sits inside the sticky rail, not below.
7. **BiologicalPrecision** — `tile-ink` dark. Cell-network atmosphere + editorial line.
8. **FoundingMember** — `tile-elev`. 5/7 horizontal pricing card + 4-perk grid + scarcity progress bar + trust badges row.
9. **OnSite** — `tile-canvas`. 3-card equal grid. Each card has image upload + status pill + neighborhood + CTA.

### Theming model

Two layers, both live-editable:
1. **Light/dark** via `next-themes` (`html.dark` class) reading from `localStorage("theme")`.
2. **Brand palette** via `SettingsProvider` (`lib/theme.ts`). Writes `--primary`, `--primary-soft`, `--accent`, `--sage` directly to `documentElement.style`. Persisted in `localStorage("medici.settings")`. Hydration is FOUC-free via the inline script in `app/layout.tsx` (runs before React, reads localStorage, applies vars synchronously).

When adding a new color reference in components, **always use the CSS var** (`text-[var(--primary)]` or `bg-primary` via tailwind alias). Hardcoded hex defeats the runtime customization.

### Image uploads

Wherever a photographic surface exists (Dr. Gabi portrait, OnSite city tiles, Hub bloodwork sample), use `<ImageUpload storageKey="..." />`. The component:
- Accepts drag-and-drop or click-to-browse
- Persists the data URL under `localStorage("medici.image.<storageKey>")`
- Renders a `fallback` ReactNode when no image is present (used for the SVG abstract default)
- Provides hover-only Replace / Remove controls once an image is set

Storage keys currently in use: `dr-gabi-portrait`, `hub-bloodwork-sample`, `city-austin`, `city-nashville`, `city-dallas`.

### Motion rules

- All scroll reveals go through `<Reveal>` so `prefers-reduced-motion` is respected uniformly.
- Hero ProcessFlow loops on a 7-second cycle. Three numbered stages light up in sequence with a connector line tracing between them. Reduced-motion fallback is a static composition built from the same content.
- Use `transform`/`opacity` only — never animate `width`/`height`/`top`/`left`. Hard rule from `.design-guides/ui-ux-pro-max/SKILL.md` (rule `transform-performance`).
- For deterministic SSR-safe SVG generation, **always round seeded coordinates** (`Math.round(...)`). `Math.sin()` produces different floating-point precision between Node and browser V8, causing hydration mismatches.

### Visual hierarchy patterns (Apple/Airbnb-inspired)

- **Display headlines**: 36–60px, weight 600, tracking `-0.025em` to `-0.028em`. Never weight 700 unless mass demands it.
- **Body copy**: 17px / 1.55 line-height for primary reads (Apple's "reading not scanning" pace). 14–15px / 1.6 for card body.
- **Eyebrows**: 12px uppercase, weight 500, tracked `0.12em`, color `--ink-soft` (lighter than `--ink-muted`). No leading dash.
- **Tile canvases** (`globals.css`): `tile-canvas`, `tile-elev`, `tile-deep`, `tile-ink`, `tile-primary`, `tile-surface`. Switch tone between sections — color change IS the divider.
- **Single elevation**: `.shadow-product` reserved for product/UI imagery (protocol cards, portraits, pricing card). Never apply to plain content cards.
- **Pill CTAs**: `<Button variant="primary">` is full-pill (`rounded-full`). Reserved for "click me" actions.
- **Card radii**: `rounded-[24px]` to `rounded-[28px]` for content cards (Airbnb-soft). Smaller chips at `rounded-2xl`.

### Section variation rule

No two adjacent sections share the same canvas. If you add a new section, check the neighbors and alternate canvas tone (light → dark → light, or canvas → elev → deep). Avoid duplicate splits — alternate 7/5 and 5/7, mix in centered and full-bleed.

## Design Resources

`.design-guides/` (3 reference packs, treat as authoritative):
- **ui-ux-pro-max** — priority rule set (accessibility, motion, color, typography). [SKILL.md](.design-guides/ui-ux-pro-max/SKILL.md). Data CSVs in `data/` (colors, fonts, landing patterns).
- **frontend-design** — aesthetic philosophy. Bold direction over generic. [SKILL.md](.design-guides/frontend-design/SKILL.md).
- **web-design-guidelines** — Vercel audit tool. Run via the skill to audit `.tsx` files against `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`. [SKILL.md](.design-guides/web-design-guidelines/SKILL.md).

The current palette is custom (forest ink primary `#0F2A2E` light / `#7BA89C` dark, aged bronze accent `#9B6D3F` / `#C99F73`, sage `#7B9080` / `#9DB5A1`). It is **not** a guide preset — derived from but distinct from healthcare/luxury rows in `data/colors.csv`.

External design system references used as inspiration (not copied):
- **Apple** — alternating tile canvases, single drop-shadow on product imagery only, modest display weights (600 not 700), 17px body, pill CTAs.
- **Airbnb** — soft 18–24px card radii, generous whitespace, photography-first surfaces, single accent color.

## Content rules

1. **No em/en dashes** in copy (`—` `–`). Use commas, periods, or split into eyebrow + subhead.
2. Eyebrows are uppercase, 12px, tracked `0.12em`. **No leading dash, no leading "—"**.
3. No serif fonts ever. Inter only.
4. Single primary CTA per viewport.
5. Trust signals integrated inline (header trust strip, footer disclaimer, scarcity bar). Not popups.

## Implementation plan

Approved plan at `/Users/kabi/.claude/plans/design-and-revamp-a-swirling-cat.md` — read for context on initial design rationale, palette derivation, and the conflict resolution between `frontend-design`'s "avoid Inter" guidance and the user's Inter-only mandate.
