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

The page is a single composed route (`src/app/page.tsx`). Each section is its own component under `src/components/sections/`. All copy lives in [src/content/site.ts](src/content/site.ts) — single source of truth. Em/en dashes are scrubbed from content (verify with `grep -E "—|–" src/content/site.ts` returning empty).

```
src/
  app/layout.tsx          Inter + Inter Tight via next/font, ThemeProvider, no-FOUC inline script
  app/globals.css         CSS vars (light + dark), grain texture, focus rings, skip-link
  app/page.tsx            Composes header → 9 sections → footer
  components/
    Providers.tsx         next-themes ThemeProvider wrapping SettingsProvider
    layout/SiteHeader     Sticky, scroll-aware, gear icon opens drawer
    layout/SiteFooter
    sections/             Hero (with ProcessFlow), Problem, BetterWay, MeetDrGabi, DrGabiHub, Process, FoundingMember, BiologicalPrecision, OnSite
    settings/SettingsDrawer   Theme + 3 color pickers (hex + HSL via native picker) + font selector + reset
    motion/Reveal             Scroll-triggered fade-up; respects prefers-reduced-motion
    motion/CountUp            IntersectionObserver-driven number animation
    ui/Button                 Primary/secondary/ghost variants, pill shape
  lib/
    theme.ts              SettingsProvider context. Writes palette to :root CSS vars in real time, persists to localStorage("medici.settings")
    cn.ts                 clsx + tailwind-merge
    a11y.ts               usePrefersReducedMotion hook
  content/site.ts         All copy. Edit here, not in components.
```

### Theming model

Two layers, both live-editable:
1. **Light/dark** via `next-themes` (`html.dark` class) reading from `localStorage("theme")`.
2. **Brand palette** via `SettingsProvider` (`lib/theme.ts`). Writes `--primary`, `--primary-soft`, `--accent`, `--sage` directly to `documentElement.style`. Persisted in `localStorage("medici.settings")`. Hydration is FOUC-free via the inline script in `app/layout.tsx` (runs before React, reads localStorage, applies vars synchronously).

When adding a new color reference in components, **always use the CSS var** (`text-[var(--primary)]` or `bg-primary` via tailwind alias). Hardcoded hex defeats the runtime customization.

### Motion

- All scroll reveals go through `<Reveal>` so `prefers-reduced-motion` is respected uniformly.
- Hero ProcessFlow loops on a 6-second cycle. The reduced-motion fallback is a static final-frame composition rendered from the same data.
- Use `transform`/`opacity` only — never animate `width`/`height`/`top`/`left`. This is a hard rule from `.design-guides/ui-ux-pro-max/SKILL.md` (rule `transform-performance`).

### Section variation rule

No two adjacent sections share the same layout. Splits alternate 7/5 and 5/7; full-bleed bands break rhythm; `DrGabiHub` overlaps `MeetDrGabi` with a `-mt-12 md:-mt-16`. If you add a new section, check the neighbors and pick a different rhythm.

## Design Resources

`.design-guides/` (3 reference packs, treat as authoritative):
- **ui-ux-pro-max** — priority rule set (accessibility, motion, color, typography). [SKILL.md](.design-guides/ui-ux-pro-max/SKILL.md). Data CSVs in `data/` (colors, fonts, landing patterns).
- **frontend-design** — aesthetic philosophy. Bold direction over generic. [SKILL.md](.design-guides/frontend-design/SKILL.md).
- **web-design-guidelines** — Vercel audit tool. Run via the skill to audit `.tsx` files against `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`. [SKILL.md](.design-guides/web-design-guidelines/SKILL.md).

The current palette is custom (forest ink primary `#0F2A2E` light / `#7BA89C` dark, aged bronze accent `#9B6D3F` / `#C99F73`, sage `#7B9080` / `#9DB5A1`). It is **not** a guide preset — derived from but distinct from healthcare/luxury rows in `data/colors.csv`.

## Content rules

1. **No em/en dashes** in copy (`—` `–`). Use commas, periods, or split into eyebrow + subhead.
2. Eyebrows are uppercase, 12px, tracked `0.12em`. **No leading dash, no leading "—"**.
3. No serif fonts ever. Inter only.
4. Single primary CTA per viewport.

## Implementation plan

Approved plan at `/Users/kabi/.claude/plans/design-and-revamp-a-swirling-cat.md` — read for context on design rationale, palette derivation, and the conflict resolution between `frontend-design`'s "avoid Inter" guidance and the user's Inter-only mandate.
