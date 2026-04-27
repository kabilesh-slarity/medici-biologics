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
    var prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : false; // default LIGHT per spec
    if (dark) document.documentElement.classList.add('dark');
    document.documentElement.style.setProperty('--font-inter', 'var(--font-inter-base)');

    var settings = localStorage.getItem('medici.settings');
    if (settings) {
      var s = JSON.parse(settings);
      if (s.palette) {
        if (s.palette.primary) document.documentElement.style.setProperty('--primary', s.palette.primary);
        if (s.palette.accent) document.documentElement.style.setProperty('--accent', s.palette.accent);
        if (s.palette.sage) document.documentElement.style.setProperty('--sage', s.palette.sage);
      }
    }
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
