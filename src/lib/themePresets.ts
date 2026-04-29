// Theme presets for Medici Biologics.
// Each preset defines light + dark surfaces. The currently-active preset
// drives :root CSS variables; the user can still nudge primary/accent/sage
// per-preset via the SettingsDrawer pickers (those overrides are stored
// alongside presetId in localStorage("medici.settings")).

export type SurfacePalette = {
  primary: string;
  accent: string;
  sage: string;
  bg?: string;
  surface?: string;
  surfaceElev?: string;
  surfaceDeep?: string;
  ink?: string;
  inkMuted?: string;
  inkSoft?: string;
  border?: string;
};

export type ThemePreset = {
  id: string;
  name: string;
  description: string;
  light: SurfacePalette;
  dark: SurfacePalette;
};

export const THEME_PRESETS: readonly ThemePreset[] = [
  {
    id: "forest-ink",
    name: "Forest Ink",
    description: "Forest, bone, aged bronze. The Medici default.",
    light: {
      primary: "#0F2A2E",
      accent: "#9B6D3F",
      sage: "#7B9080",
      bg: "#F7F5F0",
      surface: "#FFFFFF",
      surfaceElev: "#FBF9F3",
      surfaceDeep: "#ECE7DA",
      ink: "#0A0E0D",
      inkMuted: "#5C625F",
      inkSoft: "#8A8F8C",
      border: "#E5E1D8",
    },
    dark: {
      primary: "#7BA89C",
      accent: "#C99F73",
      sage: "#9DB5A1",
      bg: "#0B0F0E",
      surface: "#11171A",
      surfaceElev: "#161D20",
      surfaceDeep: "#0A0D0D",
      ink: "#F4F1EA",
      inkMuted: "#B5BCB7",
      inkSoft: "#7F857F",
      border: "#2A3336",
    },
  },
  {
    id: "obsidian",
    name: "Obsidian",
    description: "Deep navy with genuine gold. Timeless luxury.",
    light: {
      primary: "#0F172A",
      accent: "#D4AF37",
      sage: "#64748B",
      bg: "#F8FAFC",
      surface: "#FFFFFF",
      surfaceElev: "#F1F5F9",
      surfaceDeep: "#E2E8F0",
      ink: "#020617",
      inkMuted: "#475569",
      inkSoft: "#64748B",
      border: "#CBD5E1",
    },
    dark: {
      primary: "#E2E8F0",
      accent: "#F59E0B",
      sage: "#94A3B8",
      bg: "#050B14",
      surface: "#0F172A",
      surfaceElev: "#1A2540",
      surfaceDeep: "#0A0F1A",
      ink: "#F8FAFC",
      inkMuted: "#CBD5E1",
      inkSoft: "#94A3B8",
      border: "#1E293B",
    },
  },
  {
    id: "mahogany",
    name: "Mahogany",
    description: "Rich warm brown with bronze. Sophisticated warmth.",
    light: {
      primary: "#3D2817",
      accent: "#A78F5A",
      sage: "#8B7355",
      bg: "#FEFAF5",
      surface: "#FFFFFF",
      surfaceElev: "#FAF5F0",
      surfaceDeep: "#F5EADF",
      ink: "#1A1008",
      inkMuted: "#6B5646",
      inkSoft: "#8A7A6C",
      border: "#E8D4BC",
    },
    dark: {
      primary: "#D4A574",
      accent: "#C9975A",
      sage: "#9D8670",
      bg: "#2C1810",
      surface: "#3F2817",
      surfaceElev: "#4F3620",
      surfaceDeep: "#240E04",
      ink: "#FDF6F1",
      inkMuted: "#D4A574",
      inkSoft: "#A78F5A",
      border: "#5C3D2A",
    },
  },
  {
    id: "graphite",
    name: "Graphite",
    description: "Charcoal with refined blue. Modern precision.",
    light: {
      primary: "#1F2937",
      accent: "#3B82F6",
      sage: "#6B7280",
      bg: "#F9FAFB",
      surface: "#FFFFFF",
      surfaceElev: "#F3F4F6",
      surfaceDeep: "#E5E7EB",
      ink: "#111827",
      inkMuted: "#4B5563",
      inkSoft: "#6B7280",
      border: "#D1D5DB",
    },
    dark: {
      primary: "#D1D5DB",
      accent: "#60A5FA",
      sage: "#9CA3AF",
      bg: "#0F1117",
      surface: "#1F2937",
      surfaceElev: "#2D3748",
      surfaceDeep: "#111827",
      ink: "#F9FAFB",
      inkMuted: "#D1D5DB",
      inkSoft: "#9CA3AF",
      border: "#374151",
    },
  },
  {
    id: "cordovan",
    name: "Cordovan",
    description: "Deep burgundy with rose gold. Sophisticated refinement.",
    light: {
      primary: "#5C2D3B",
      accent: "#9F7B6D",
      sage: "#7A5C66",
      bg: "#FCF7F6",
      surface: "#FFFFFF",
      surfaceElev: "#F9F3F2",
      surfaceDeep: "#F0E6E2",
      ink: "#2D1520",
      inkMuted: "#6B4F5C",
      inkSoft: "#8B6F7A",
      border: "#E8D4D0",
    },
    dark: {
      primary: "#D4A8A0",
      accent: "#C9967F",
      sage: "#A88A97",
      bg: "#3D1F2B",
      surface: "#5C2D3B",
      surfaceElev: "#6F3A50",
      surfaceDeep: "#2D0F1F",
      ink: "#F5ECEA",
      inkMuted: "#D4A8A0",
      inkSoft: "#9F7B6D",
      border: "#774159",
    },
  },
];

export const DEFAULT_PRESET_ID = "forest-ink";

export function getPreset(id: string): ThemePreset {
  return THEME_PRESETS.find((p) => p.id === id) ?? THEME_PRESETS[0];
}
