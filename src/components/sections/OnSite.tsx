"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ImageUpload } from "@/components/ui/ImageUpload";

export function OnSite() {
  const { eyebrow, headline, lede, cities } = site.onSite;

  return (
    <section
      id="on-site"
      className="relative tile-canvas py-28 md:py-36"
      aria-labelledby="onsite-h"
    >
      <div className="container mx-auto">
        <Reveal className="max-w-3xl">
          <div className="eyebrow">{eyebrow}</div>
          <h2
            id="onsite-h"
            className="mt-4 text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.05] tracking-[-0.025em] font-semibold text-ink"
          >
            {headline}
          </h2>
          <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.55] text-ink-muted">{lede}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((c, i) => (
            <Reveal key={c.city} delay={0.06 * i}>
              <CityCard
                city={c.city}
                neighborhood={c.neighborhood}
                status={c.status}
                cta={c.cta}
                imageKey={c.imageKey}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CityCard({
  city,
  neighborhood,
  status,
  cta,
  imageKey,
}: {
  city: string;
  neighborhood: string;
  status: string;
  cta: string;
  imageKey: string;
}) {
  const isAvailable = status.toLowerCase().includes("available");
  return (
    <article className="group relative flex flex-col rounded-[24px] bg-[var(--surface)] border border-[var(--border)] overflow-hidden transition-colors hover:border-[var(--ink)]">
      {/* Image / upload slot */}
      <ImageUpload
        storageKey={imageKey}
        rounded="lg"
        aspect="aspect-[4/3]"
        className="!rounded-none border-0 border-b border-[var(--border)]"
        label={`Upload ${city} photo`}
        hint="A photo of the neighborhood or clinic"
        fallback={<DefaultMap city={city} />}
      />

      <div className="flex flex-col p-6 gap-3 flex-1">
        <div className="flex items-center justify-between gap-3">
          <span className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[11px] font-medium ${
            isAvailable
              ? "bg-[var(--sage)]/15 text-[color-mix(in_oklch,var(--sage)_60%,var(--ink))]"
              : "bg-[var(--accent)]/12 text-[color-mix(in_oklch,var(--accent)_70%,var(--ink))]"
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-[var(--sage)]" : "bg-[var(--accent)]"}`} aria-hidden />
            {status}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-ink-soft">
            <MapPin className="h-3 w-3" strokeWidth={1.5} aria-hidden />
            {neighborhood}
          </span>
        </div>

        <h3 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.022em] text-ink leading-[1.05]">
          {city}
        </h3>

        <a
          href="#"
          className="mt-auto inline-flex items-center justify-between gap-2 text-[14px] font-medium text-ink hover:text-[var(--primary)] transition-colors"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.75} />
        </a>
      </div>
    </article>
  );
}

function DefaultMap({ city }: { city: string }) {
  // Deterministic abstract grid — kept simple and consistent across cities.
  const hash = city.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return (
    <div className="absolute inset-0 bg-[var(--surface-elev)]">
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={`bg-${city}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--surface)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--surface-elev)" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Soft grid */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 40}
            x2="400"
            y2={i * 40}
            stroke="var(--ink)"
            strokeOpacity="0.04"
          />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 40}
            y1="0"
            x2={i * 40}
            y2="300"
            stroke="var(--ink)"
            strokeOpacity="0.04"
          />
        ))}
        {/* Pin */}
        <circle cx={200 + (hash % 60) - 30} cy={150 + (hash % 40) - 20} r="20" fill="var(--primary)" fillOpacity="0.12" />
        <circle cx={200 + (hash % 60) - 30} cy={150 + (hash % 40) - 20} r="5" fill="var(--primary)" />
        <rect width="400" height="300" fill={`url(#bg-${city})`} opacity="0.4" />
      </svg>
      <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
        <MapPin className="h-3 w-3" strokeWidth={1.5} />
        Approximate
      </div>
    </div>
  );
}
