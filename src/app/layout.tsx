import type { Metadata } from "next";
import { Inter, Inter_Tight, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-base",
  weight: ["400", "500", "600", "700"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-base",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Medici Mind — Cognitive Performance at the Cellular Level",
  description:
    "A clinically-formulated nootropic peptide protocol combining Semax, Selank, and Dihexa. Physician-guided. 503A-compounded.",
  metadataBase: new URL("https://medici.example.com"),
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : false;
    if (dark) document.documentElement.classList.add('dark');
    document.documentElement.style.setProperty('--font-inter', 'var(--font-inter-base)');

    var PRESETS = {
      'nocturne':{light:{primary:'#0A0A0A',accent:'#1ECD92',sage:'#15A574',bg:'#F7F7F3',surface:'#FFFFFF',surfaceElev:'#F0F0EC',surfaceDeep:'#E4E4E0',ink:'#0A0A0A',inkMuted:'#4F4F4F',inkSoft:'#8C8C8C',border:'#E8E8E2'},dark:{primary:'#1ECD92',accent:'#2BE5A6',sage:'#15A574',bg:'#0A0A0A',surface:'#161616',surfaceElev:'#1C1C1C',surfaceDeep:'#111111',ink:'#F7F7F3',inkMuted:'#B0B0A8',inkSoft:'#6A6A62',border:'#222220'}},
      'forest-ink':{light:{primary:'#0F2A2E',accent:'#9B6D3F',sage:'#7B9080',bg:'#F7F5F0',surface:'#FFFFFF',surfaceElev:'#FBF9F3',surfaceDeep:'#ECE7DA',ink:'#0A0E0D',inkMuted:'#5C625F',inkSoft:'#8A8F8C',border:'#E5E1D8'},dark:{primary:'#7BA89C',accent:'#C99F73',sage:'#9DB5A1',bg:'#0B0F0E',surface:'#11171A',surfaceElev:'#161D20',surfaceDeep:'#0A0D0D',ink:'#F4F1EA',inkMuted:'#B5BCB7',inkSoft:'#7F857F',border:'#2A3336'}},
      'obsidian':{light:{primary:'#0F172A',accent:'#D4AF37',sage:'#64748B',bg:'#F8FAFC',surface:'#FFFFFF',surfaceElev:'#F1F5F9',surfaceDeep:'#E2E8F0',ink:'#020617',inkMuted:'#475569',inkSoft:'#64748B',border:'#CBD5E1'},dark:{primary:'#E2E8F0',accent:'#F59E0B',sage:'#94A3B8',bg:'#050B14',surface:'#0F172A',surfaceElev:'#1A2540',surfaceDeep:'#0A0F1A',ink:'#F8FAFC',inkMuted:'#CBD5E1',inkSoft:'#94A3B8',border:'#1E293B'}},
      'mahogany':{light:{primary:'#3D2817',accent:'#A78F5A',sage:'#8B7355',bg:'#FEFAF5',surface:'#FFFFFF',surfaceElev:'#FAF5F0',surfaceDeep:'#F5EADF',ink:'#1A1008',inkMuted:'#6B5646',inkSoft:'#8A7A6C',border:'#E8D4BC'},dark:{primary:'#D4A574',accent:'#C9975A',sage:'#9D8670',bg:'#2C1810',surface:'#3F2817',surfaceElev:'#4F3620',surfaceDeep:'#240E04',ink:'#FDF6F1',inkMuted:'#D4A574',inkSoft:'#A78F5A',border:'#5C3D2A'}},
      'graphite':{light:{primary:'#1F2937',accent:'#3B82F6',sage:'#6B7280',bg:'#F9FAFB',surface:'#FFFFFF',surfaceElev:'#F3F4F6',surfaceDeep:'#E5E7EB',ink:'#111827',inkMuted:'#4B5563',inkSoft:'#6B7280',border:'#D1D5DB'},dark:{primary:'#D1D5DB',accent:'#60A5FA',sage:'#9CA3AF',bg:'#0F1117',surface:'#1F2937',surfaceElev:'#2D3748',surfaceDeep:'#111827',ink:'#F9FAFB',inkMuted:'#D1D5DB',inkSoft:'#9CA3AF',border:'#374151'}},
      'cordovan':{light:{primary:'#5C2D3B',accent:'#9F7B6D',sage:'#7A5C66',bg:'#FCF7F6',surface:'#FFFFFF',surfaceElev:'#F9F3F2',surfaceDeep:'#F0E6E2',ink:'#2D1520',inkMuted:'#6B4F5C',inkSoft:'#8B6F7A',border:'#E8D4D0'},dark:{primary:'#D4A8A0',accent:'#C9967F',sage:'#A88A97',bg:'#3D1F2B',surface:'#5C2D3B',surfaceElev:'#6F3A50',surfaceDeep:'#2D0F1F',ink:'#F5ECEA',inkMuted:'#D4A8A0',inkSoft:'#9F7B6D',border:'#774159'}}
    };

    function lighten(hex, amt) {
      var c = hex.replace('#','');
      var r = parseInt(c.slice(0,2),16);
      var g = parseInt(c.slice(2,4),16);
      var b = parseInt(c.slice(4,6),16);
      var lr = Math.min(255, Math.round(r + (255 - r) * amt));
      var lg = Math.min(255, Math.round(g + (255 - g) * amt));
      var lb = Math.min(255, Math.round(b + (255 - b) * amt));
      return '#' + [lr,lg,lb].map(function(n){return n.toString(16).padStart(2,'0');}).join('');
    }

    function applyKey(k, v) { document.documentElement.style.setProperty(k, v); }

    var settings = localStorage.getItem('medici.settings');
    var presetId = 'nocturne', overrides = {};
    if (settings) {
      var s = JSON.parse(settings);
      if (s.palette && !s.presetId) { overrides = s.palette; }
      else {
        presetId = s.presetId || 'nocturne';
        var modeOverrides = (s.overrides || {})[dark ? 'dark' : 'light'] || {};
        overrides = modeOverrides;
      }
      if (s.font === 'inter-tight') document.documentElement.style.setProperty('--font-inter', 'var(--font-inter-tight)');
    }

    var preset = PRESETS[presetId] || PRESETS['nocturne'];
    var p = preset[dark ? 'dark' : 'light'];
    var primary = overrides.primary || p.primary;
    var accent = overrides.accent || p.accent;
    var sage = overrides.sage || p.sage;
    applyKey('--primary', primary);
    applyKey('--primary-soft', lighten(primary, 0.18));
    applyKey('--accent', accent);
    applyKey('--sage', sage);
    if (p.bg) applyKey('--bg', p.bg);
    if (p.surface) applyKey('--surface', p.surface);
    if (p.surfaceElev) applyKey('--surface-elev', p.surfaceElev);
    if (p.surfaceDeep) applyKey('--surface-deep', p.surfaceDeep);
    if (p.ink) applyKey('--ink', p.ink);
    if (p.inkMuted) applyKey('--ink-muted', p.inkMuted);
    if (p.inkSoft) applyKey('--ink-soft', p.inkSoft);
    if (p.border) applyKey('--border', p.border);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${fraunces.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
