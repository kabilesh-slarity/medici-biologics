"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createElement } from "react";
import { useTheme } from "next-themes";
import {
  THEME_PRESETS,
  DEFAULT_PRESET_ID,
  getPreset,
  type SurfacePalette,
  type ThemePreset,
} from "@/lib/themePresets";

export type Palette = {
  primary: string;
  accent: string;
  sage: string;
};

export type FontChoice = "inter" | "inter-tight" | "inter-display";

export type Settings = {
  presetId: string;
  // Per-preset overrides. If empty, the preset's defaults are used.
  // Keyed by mode so light + dark can be tweaked independently.
  overrides: { light: Partial<Palette>; dark: Partial<Palette> };
  font: FontChoice;
};

export const DEFAULT_PALETTE_LIGHT: Palette = {
  primary: THEME_PRESETS[0].light.primary,
  accent: THEME_PRESETS[0].light.accent,
  sage: THEME_PRESETS[0].light.sage,
};

export const DEFAULT_PALETTE_DARK: Palette = {
  primary: THEME_PRESETS[0].dark.primary,
  accent: THEME_PRESETS[0].dark.accent,
  sage: THEME_PRESETS[0].dark.sage,
};

export const DEFAULT_SETTINGS: Settings = {
  presetId: DEFAULT_PRESET_ID,
  overrides: { light: {}, dark: {} },
  font: "inter",
};

const STORAGE_KEY = "medici.settings";

type Ctx = {
  settings: Settings;
  preset: ThemePreset;
  effectivePalette: Palette;
  setPreset: (id: string) => void;
  setPalette: (p: Partial<Palette>) => void;
  setFont: (f: FontChoice) => void;
  resetToPreset: () => void;
};

const SettingsCtx = createContext<Ctx | null>(null);

function lighten(hex: string, amt: number): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lr = Math.min(255, Math.round(r + (255 - r) * amt));
  const lg = Math.min(255, Math.round(g + (255 - g) * amt));
  const lb = Math.min(255, Math.round(b + (255 - b) * amt));
  return `#${[lr, lg, lb].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

export function applyPreset(preset: ThemePreset, mode: "light" | "dark", overrides: Partial<Palette>) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const base = mode === "dark" ? preset.dark : preset.light;
  const palette: SurfacePalette = { ...base, ...overrides };

  root.style.setProperty("--primary", palette.primary);
  root.style.setProperty("--primary-soft", lighten(palette.primary, 0.18));
  root.style.setProperty("--accent", palette.accent);
  root.style.setProperty("--sage", palette.sage);

  // Surface overrides — only set if defined in the preset
  if (palette.bg) root.style.setProperty("--bg", palette.bg);
  if (palette.surface) root.style.setProperty("--surface", palette.surface);
  if (palette.surfaceElev) root.style.setProperty("--surface-elev", palette.surfaceElev);
  if (palette.surfaceDeep) root.style.setProperty("--surface-deep", palette.surfaceDeep);
  if (palette.ink) root.style.setProperty("--ink", palette.ink);
  if (palette.inkMuted) root.style.setProperty("--ink-muted", palette.inkMuted);
  if (palette.inkSoft) root.style.setProperty("--ink-soft", palette.inkSoft);
  if (palette.border) root.style.setProperty("--border", palette.border);
}

function applyFontToRoot(f: FontChoice) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const map: Record<FontChoice, string> = {
    inter: "var(--font-inter-base)",
    "inter-tight": "var(--font-inter-tight)",
    "inter-display": "var(--font-inter-base)",
  };
  root.style.setProperty("--font-inter", map[f]);
}

export function isValidHex(s: string): boolean {
  return /^#?[0-9a-fA-F]{6}$/.test(s.trim());
}

export function normalizeHex(s: string): string {
  const t = s.trim().replace("#", "");
  return `#${t.toUpperCase()}`;
}

function migrate(raw: unknown): Settings {
  if (typeof raw !== "object" || raw === null) return DEFAULT_SETTINGS;
  const r = raw as Record<string, unknown>;
  // v1 format had { palette, font }. Migrate to v2 with { presetId, overrides, font }.
  if ("palette" in r && !("presetId" in r)) {
    return {
      presetId: DEFAULT_PRESET_ID,
      overrides: { light: (r.palette as Partial<Palette>) ?? {}, dark: {} },
      font: ((r.font as FontChoice) ?? "inter"),
    };
  }
  return {
    presetId: (r.presetId as string) ?? DEFAULT_PRESET_ID,
    overrides: (r.overrides as Settings["overrides"]) ?? { light: {}, dark: {} },
    font: ((r.font as FontChoice) ?? "inter"),
  };
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);
  const { resolvedTheme } = useTheme();
  const mode: "light" | "dark" = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings(migrate(JSON.parse(raw)));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
    const preset = getPreset(settings.presetId);
    applyPreset(preset, mode, settings.overrides[mode]);
    applyFontToRoot(settings.font);
  }, [settings, hydrated, mode]);

  const preset = getPreset(settings.presetId);
  const baseForMode = mode === "dark" ? preset.dark : preset.light;
  const effectivePalette: Palette = {
    primary: settings.overrides[mode].primary ?? baseForMode.primary,
    accent: settings.overrides[mode].accent ?? baseForMode.accent,
    sage: settings.overrides[mode].sage ?? baseForMode.sage,
  };

  const setPreset = (id: string) => {
    setSettings((s) => ({ ...s, presetId: id, overrides: { light: {}, dark: {} } }));
  };
  const setPalette = (p: Partial<Palette>) =>
    setSettings((s) => ({
      ...s,
      overrides: { ...s.overrides, [mode]: { ...s.overrides[mode], ...p } },
    }));
  const setFont = (f: FontChoice) => setSettings((s) => ({ ...s, font: f }));
  const resetToPreset = () =>
    setSettings((s) => ({ ...s, overrides: { light: {}, dark: {} } }));

  return createElement(
    SettingsCtx.Provider,
    {
      value: { settings, preset, effectivePalette, setPreset, setPalette, setFont, resetToPreset },
    },
    children,
  );
}

export function useSettings(): Ctx {
  const ctx = useContext(SettingsCtx);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
