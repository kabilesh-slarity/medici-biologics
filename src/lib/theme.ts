"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createElement } from "react";

export type Palette = {
  primary: string;
  accent: string;
  sage: string;
};

export type FontChoice = "inter" | "inter-tight" | "inter-display";

export type Settings = {
  palette: Palette;
  font: FontChoice;
};

export const DEFAULT_PALETTE_LIGHT: Palette = {
  primary: "#0F2A2E",
  accent: "#9B6D3F",
  sage: "#7B9080",
};

export const DEFAULT_PALETTE_DARK: Palette = {
  primary: "#7BA89C",
  accent: "#C99F73",
  sage: "#9DB5A1",
};

export const DEFAULT_SETTINGS: Settings = {
  palette: DEFAULT_PALETTE_LIGHT,
  font: "inter",
};

const STORAGE_KEY = "medici.settings";

type Ctx = {
  settings: Settings;
  setPalette: (p: Partial<Palette>) => void;
  setFont: (f: FontChoice) => void;
  reset: () => void;
};

const SettingsCtx = createContext<Ctx | null>(null);

function applyPaletteToRoot(p: Palette) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--primary", p.primary);
  // primary-soft = primary mixed with surface
  root.style.setProperty("--primary-soft", lighten(p.primary, 0.18));
  root.style.setProperty("--accent", p.accent);
  root.style.setProperty("--sage", p.sage);
}

function applyFontToRoot(f: FontChoice) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  // All Inter variants. Switch active variable referenced by --font-inter.
  // We swap the active variable referenced by --font-inter
  const map: Record<FontChoice, string> = {
    inter: "var(--font-inter-base)",
    "inter-tight": "var(--font-inter-tight)",
    "inter-display": "var(--font-inter-base)",
  };
  root.style.setProperty("--font-inter", map[f]);
}

function lighten(hex: string, amt: number): string {
  // Simple lighten in HSL space for hover/soft variant
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lr = Math.min(255, Math.round(r + (255 - r) * amt));
  const lg = Math.min(255, Math.round(g + (255 - g) * amt));
  const lb = Math.min(255, Math.round(b + (255 - b) * amt));
  return `#${[lr, lg, lb]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function isValidHex(s: string): boolean {
  return /^#?[0-9a-fA-F]{6}$/.test(s.trim());
}

export function normalizeHex(s: string): string {
  const t = s.trim().replace("#", "");
  return `#${t.toUpperCase()}`;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Settings>;
        const merged: Settings = {
          palette: { ...DEFAULT_SETTINGS.palette, ...(parsed.palette ?? {}) },
          font: parsed.font ?? DEFAULT_SETTINGS.font,
        };
        setSettings(merged);
        applyPaletteToRoot(merged.palette);
        applyFontToRoot(merged.font);
      } else {
        applyPaletteToRoot(DEFAULT_SETTINGS.palette);
        applyFontToRoot(DEFAULT_SETTINGS.font);
      }
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
    applyPaletteToRoot(settings.palette);
    applyFontToRoot(settings.font);
  }, [settings, hydrated]);

  const setPalette = (p: Partial<Palette>) =>
    setSettings((s) => ({ ...s, palette: { ...s.palette, ...p } }));
  const setFont = (f: FontChoice) => setSettings((s) => ({ ...s, font: f }));
  const reset = () => setSettings(DEFAULT_SETTINGS);

  return createElement(
    SettingsCtx.Provider,
    { value: { settings, setPalette, setFont, reset } },
    children,
  );
}

export function useSettings(): Ctx {
  const ctx = useContext(SettingsCtx);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
