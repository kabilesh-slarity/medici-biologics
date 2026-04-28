# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Medici Biologics** end-to-end product experience. AI + peptide science platform. The landing page, onboarding flow, payment, and member dashboard are one continuous experience that share theme tokens, font, and atmosphere.

Stack: Next.js 15 (App Router) + TypeScript + Tailwind v3 + Framer Motion + next-themes + Lucide. Inter as the only font family (mandate, not default). UI-only mocks (no backend).

## Commands

```bash
npm run dev       # http://localhost:3000
npm run build     # production build + type check
npm run start     # serve production build
npm run lint      # next lint
```

Single-file type-check during edits: rely on `npm run build` (type errors surface during build). No vitest/jest configured.

## Architecture

Three layouts, one shared theme system:

- `/` — landing page ([src/app/page.tsx](src/app/page.tsx)). Marketing chrome.
- `/start/*` — 5-step guided onboarding (phone → verify → profile → consents → payment → welcome). Minimal chrome (logo + progress rail + theme gear).
- `/app/*` — member dashboard (Home / Chat / Plan / Records / Settings). Left rail + topbar.

All copy lives in [src/content/site.ts](src/content/site.ts). Em/en dashes are scrubbed (`grep -E "—|–" src/content/site.ts` should return empty).

```
src/
  app/
    layout.tsx                ThemeProvider, FOUC inline script (applies preset surfaces synchronously)
    globals.css               CSS vars (light + dark), tile-canvas helpers, grain, focus rings
    page.tsx                  Landing (composes header → 9 sections → footer)
    start/
      layout.tsx              OnboardingProvider wrapper
      page.tsx                Step 1 — phone
      verify/page.tsx         Step 2 — OTP (auto-advance, paste support, returning-user → /app)
      profile/page.tsx        Step 3 — name / email / DOB segmented input
      consents/page.tsx       Step 4 — HIPAA / telehealth / ToS with inline disclosure
      payment/page.tsx        Step 5 — Stripe-style mock checkout
      welcome/page.tsx        Success celebration → auto-redirect to /app
    app/
      layout.tsx              SideRail + RequireSession gate
      page.tsx                Home (greeting, protocol summary, next steps, ask Gabi, recent records)
      chat/page.tsx           Chat with Dr. Gabi (history rail, suggested prompts, save messages)
      plan/page.tsx           Treatment Plan (hero card, schedule timeline, physician note)
      records/page.tsx        Bloodwork / Reports / Documents (drag-drop upload, grid + timeline view)
      settings/page.tsx       Profile, Subscription, Billing, Privacy, Appearance (presets), Sign out
  components/
    Providers.tsx             ThemeProvider → SettingsProvider → SessionProvider
    layout/SiteHeader, SiteFooter
    sections/                 9 landing sections (unchanged)
    onboarding/
      OnboardingShell         Shared chrome wrapper (logo + ProgressRail + theme gear)
      ProgressRail            5-dot horizontal step tracker
      StepShell               Center column — eyebrow + headline + subtitle + content + back link
      Field                   Hairline-bordered input with label, error, prefix/suffix
      ConsentCard             Title + summary + inline-disclosure full text + custom checkbox
      OrderSummary            Reused on payment screen
    dashboard/
      SideRail                224px desktop rail / mobile bottom-tab; active route uses --primary edge bar
      Topbar                  Page title + bell + theme gear (opens SettingsDrawer)
      StatusPill              Pending / Approved / Active / Shipped — icon + label + tone
      RequireSession          Gate that redirects to /start if no session
    settings/SettingsDrawer   Theme presets grid + custom color pickers + font + reset
    motion/Reveal, CountUp
    ui/Button, ImageUpload
  lib/
    theme.ts                  SettingsProvider. presetId + per-mode color overrides. Writes :root vars.
    themePresets.ts           4 presets — Forest Ink, Clinical, Apothecary, Midnight (each light + dark)
    session.ts                SessionProvider. localStorage('medici.session'). Mock-only.
    onboarding.ts             OnboardingProvider. localStorage('medici.onboarding'). Format/validate helpers.
    chat.ts                   ChatProvider. localStorage('medici.chat'). Mock Dr. Gabi reply generator.
    records.ts                RecordsProvider. localStorage('medici.records'). File data URLs.
    cn.ts, a11y.ts
  content/site.ts             All landing copy. CTAs route to /start.
```

### Flow

```
Landing  ──[CTA href="/start"]──►  /start (Phone)
                                     ├─► /start/verify (OTP — returning user goes straight to /app)
                                     ├─► /start/profile
                                     ├─► /start/consents
                                     ├─► /start/payment (sets session + clears onboarding state)
                                     └─► /start/welcome ──[1.8s]──►  /app
                                                                        ├─► /app/chat
                                                                        ├─► /app/plan
                                                                        ├─► /app/records
                                                                        └─► /app/settings
```

State libs are localStorage-backed and survive refresh. Onboarding state is cleared on payment success; session remains until Sign out.

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

Three layers, all live-editable:
1. **Light/dark** via `next-themes` (`html.dark` class) reading from `localStorage("theme")`.
2. **Theme preset** via `SettingsProvider` (`lib/theme.ts`) — one of 4 in [lib/themePresets.ts](src/lib/themePresets.ts): `forest-ink` (default), `clinical`, `apothecary`, `midnight`. Each preset defines BOTH light + dark surface colors. Selecting a preset writes 12 CSS vars: `--primary/--accent/--sage/--bg/--surface/--surface-elev/--surface-deep/--ink/--ink-muted/--ink-soft/--border` plus a derived `--primary-soft`.
3. **Per-preset color overrides** — the user can nudge primary/accent/sage with the color picker; overrides are stored per-mode (light vs dark) so the same preset can have different custom tweaks in each. Reset clears overrides for the active mode only.

Settings persisted in `localStorage("medici.settings")` schema:
```ts
{ presetId: string, overrides: { light: Partial<Palette>, dark: Partial<Palette> }, font: FontChoice }
```
A v1→v2 migrator handles old `{ palette, font }` payloads.

Hydration is FOUC-free via the inline script in [app/layout.tsx](src/app/layout.tsx) — it knows all 4 presets and applies the full surface palette synchronously before React mounts.

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
