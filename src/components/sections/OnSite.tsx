import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function OnSite() {
  const { eyebrow, headline, lede, cities } = site.onSite;
  const featured = cities.find((c) => "featured" in c && c.featured) ?? cities[0];
  const others = cities.filter((c) => c !== featured);

  return (
    <section
      id="on-site"
      className="relative py-24 md:py-32 border-t border-[var(--border)]"
      aria-labelledby="onsite-h"
    >
      <div className="container mx-auto">
        <Reveal className="max-w-2xl">
          <div className="eyebrow">{eyebrow}</div>
          <h2 id="onsite-h" className="mt-4 text-section !text-[28px] sm:!text-[32px] text-ink">
            {headline}
          </h2>
          <p className="mt-5 text-[15px] leading-[1.6] text-ink-muted">{lede}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <CityCard city={featured.city} neighborhood={featured.neighborhood} status={featured.status} large />
          </Reveal>
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {others.map((c, i) => (
              <Reveal key={c.city} delay={0.1 + i * 0.06}>
                <CityCard city={c.city} neighborhood={c.neighborhood} status={c.status} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CityCard({
  city,
  neighborhood,
  status,
  large,
}: {
  city: string;
  neighborhood: string;
  status: string;
  large?: boolean;
}) {
  const isAvailable = status.toLowerCase().includes("available");
  return (
    <article
      className={`group relative rounded-3xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden hover:border-[var(--ink)] transition-colors ${large ? "min-h-[360px]" : "min-h-[200px]"}`}
    >
      {/* Abstract map fragment */}
      <MapFragment large={large} city={city} />

      <div className={`relative p-6 ${large ? "sm:p-8" : ""} flex flex-col h-full justify-end`}>
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-3.5 w-3.5 text-ink-muted" strokeWidth={1.5} />
          <span className="eyebrow !text-[10px]">{neighborhood}</span>
        </div>
        <h3 className={`font-semibold tracking-[-0.02em] text-ink ${large ? "text-[40px] sm:text-[56px]" : "text-[28px]"}`}>
          {city}
        </h3>
        <div className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-[var(--border)] bg-[var(--surface-elev)] px-3 py-1">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-[var(--sage)]" : "bg-[var(--accent)]"}`}
            aria-hidden
          />
          <span className="text-[11px] font-medium text-ink">{status}</span>
        </div>
      </div>
    </article>
  );
}

function MapFragment({ large, city }: { large?: boolean; city: string }) {
  // Deterministic mock map by city name hash
  const hash = city.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const seed = (n: number) => Math.abs(Math.sin((n + hash) * 12.9898) * 43758.5453) % 1;
  const lines = Array.from({ length: large ? 22 : 14 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 400 280"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={`fade-${city}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--surface)" stopOpacity="0" />
          <stop offset="0.7" stopColor="var(--surface)" stopOpacity="0.6" />
          <stop offset="1" stopColor="var(--surface)" stopOpacity="1" />
        </linearGradient>
      </defs>
      {lines.map((i) => {
        const x1 = seed(i * 2) * 400;
        const y1 = seed(i * 2 + 1) * 280;
        const x2 = x1 + (seed(i * 3) - 0.5) * 220;
        const y2 = y1 + (seed(i * 3 + 1) - 0.5) * 80;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--ink)"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        );
      })}
      <rect width="400" height="280" fill={`url(#fade-${city})`} />
    </svg>
  );
}
