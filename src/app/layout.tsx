import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Medici Biologics. Personalized peptide protocols, reviewed by physicians.",
  description:
    "Peptide science and AI, precisely matched to your biology. Dr. Gabi reads your bloodwork, designs your protocol, and a licensed physician approves every order.",
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
      'forest-ink':{light:{primary:'#0F2A2E',accent:'#9B6D3F',sage:'#7B9080',bg:'#F7F5F0',surface:'#FFFFFF',surfaceElev:'#FBF9F3',surfaceDeep:'#ECE7DA',ink:'#0A0E0D',inkMuted:'#5C625F',inkSoft:'#8A8F8C',border:'#E5E1D8'},dark:{primary:'#7BA89C',accent:'#C99F73',sage:'#9DB5A1',bg:'#0B0F0E',surface:'#11171A',surfaceElev:'#161D20',surfaceDeep:'#0A0D0D',ink:'#F4F1EA',inkMuted:'#B5BCB7',inkSoft:'#7F857F',border:'#2A3336'}},
      'clinical':{light:{primary:'#2C3E5C',accent:'#B89968',sage:'#7B9080',bg:'#FAFBFC',surface:'#FFFFFF',surfaceElev:'#F2F5F8',surfaceDeep:'#E5EAEF',ink:'#0F1B2C',inkMuted:'#4A5568',inkSoft:'#7A8595',border:'#DEE3E9'},dark:{primary:'#9BB5DB',accent:'#D5B888',sage:'#A8BFB1',bg:'#0E1117',surface:'#161B22',surfaceElev:'#1C2230',surfaceDeep:'#0A0D14',ink:'#F0F3F8',inkMuted:'#B8C2D0',inkSoft:'#7A8595',border:'#252D3A'}},
      'apothecary':{light:{primary:'#6B3A2E',accent:'#7B9080',sage:'#B89968',bg:'#F4ECDF',surface:'#FBF6EC',surfaceElev:'#EDE2D2',surfaceDeep:'#E0D2BD',ink:'#1F1209',inkMuted:'#5A4838',inkSoft:'#8A786A',border:'#D9C9B0'},dark:{primary:'#D4927F',accent:'#9DB5A1',sage:'#D5B888',bg:'#1F1612',surface:'#291D17',surfaceElev:'#33251D',surfaceDeep:'#15100C',ink:'#F4ECDF',inkMuted:'#C2A892',inkSoft:'#8A786A',border:'#3D2D24'}},
      'midnight':{light:{primary:'#0E5560',accent:'#C97A60',sage:'#5A8B85',bg:'#F4F7F8',surface:'#FFFFFF',surfaceElev:'#EAF1F3',surfaceDeep:'#D8E3E6',ink:'#091921',inkMuted:'#3F5A66',inkSoft:'#76909A',border:'#D0DDE2'},dark:{primary:'#4FB8C0',accent:'#E8B4A2',sage:'#7BAFA8',bg:'#0A1418',surface:'#0F1B20',surfaceElev:'#152128',surfaceDeep:'#060D10',ink:'#E8F4F6',inkMuted:'#A5BFC4',inkSoft:'#6B8189',border:'#1F2C32'}}
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
    var presetId = 'forest-ink', overrides = {};
    if (settings) {
      var s = JSON.parse(settings);
      // v1 -> v2 migration
      if (s.palette && !s.presetId) { overrides = s.palette; }
      else {
        presetId = s.presetId || 'forest-ink';
        var modeOverrides = (s.overrides || {})[dark ? 'dark' : 'light'] || {};
        overrides = modeOverrides;
      }
      if (s.font === 'inter-tight') document.documentElement.style.setProperty('--font-inter', 'var(--font-inter-tight)');
    }

    var preset = PRESETS[presetId] || PRESETS['forest-ink'];
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${interTight.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
