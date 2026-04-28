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
    id: "clinical",
    name: "Clinical",
    description: "Sterile lab. Indigo on white.",
    light: {
      primary: "#2C3E5C",
      accent: "#B89968",
      sage: "#7B9080",
      bg: "#FAFBFC",
      surface: "#FFFFFF",
      surfaceElev: "#F2F5F8",
      surfaceDeep: "#E5EAEF",
      ink: "#0F1B2C",
      inkMuted: "#4A5568",
      inkSoft: "#7A8595",
      border: "#DEE3E9",
    },
    dark: {
      primary: "#9BB5DB",
      accent: "#D5B888",
      sage: "#A8BFB1",
      bg: "#0E1117",
      surface: "#161B22",
      surfaceElev: "#1C2230",
      surfaceDeep: "#0A0D14",
      ink: "#F0F3F8",
      inkMuted: "#B8C2D0",
      inkSoft: "#7A8595",
      border: "#252D3A",
    },
  },
  {
    id: "apothecary",
    name: "Apothecary",
    description: "Heritage herbal. Terracotta and sage on bone.",
    light: {
      primary: "#6B3A2E",
      accent: "#7B9080",
      sage: "#B89968",
      bg: "#F4ECDF",
      surface: "#FBF6EC",
      surfaceElev: "#EDE2D2",
      surfaceDeep: "#E0D2BD",
      ink: "#1F1209",
      inkMuted: "#5A4838",
      inkSoft: "#8A786A",
      border: "#D9C9B0",
    },
    dark: {
      primary: "#D4927F",
      accent: "#9DB5A1",
      sage: "#D5B888",
      bg: "#1F1612",
      surface: "#291D17",
      surfaceElev: "#33251D",
      surfaceDeep: "#15100C",
      ink: "#F4ECDF",
      inkMuted: "#C2A892",
      inkSoft: "#8A786A",
      border: "#3D2D24",
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Research mode. Cyan glow on deep navy.",
    light: {
      primary: "#0E5560",
      accent: "#C97A60",
      sage: "#5A8B85",
      bg: "#F4F7F8",
      surface: "#FFFFFF",
      surfaceElev: "#EAF1F3",
      surfaceDeep: "#D8E3E6",
      ink: "#091921",
      inkMuted: "#3F5A66",
      inkSoft: "#76909A",
      border: "#D0DDE2",
    },
    dark: {
      primary: "#4FB8C0",
      accent: "#E8B4A2",
      sage: "#7BAFA8",
      bg: "#0A1418",
      surface: "#0F1B20",
      surfaceElev: "#152128",
      surfaceDeep: "#060D10",
      ink: "#E8F4F6",
      inkMuted: "#A5BFC4",
      inkSoft: "#6B8189",
      border: "#1F2C32",
    },
  },
];

export const DEFAULT_PRESET_ID = "forest-ink";

export function getPreset(id: string): ThemePreset {
  return THEME_PRESETS.find((p) => p.id === id) ?? THEME_PRESETS[0];
}
