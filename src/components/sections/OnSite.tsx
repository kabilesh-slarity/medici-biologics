"use client";

import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

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
}: {
  city: string;
  neighborhood: string;
  status: string;
  cta: string;
}) {
  const isAvailable = status.toLowerCase().includes("available");
  return (
    <article className="group flex flex-col gap-6 p-7 rounded-[24px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--ink)] transition-colors">
      <span
        className={`self-start inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-medium ${
          isAvailable
            ? "bg-[var(--sage)]/15 text-[color-mix(in_oklch,var(--sage)_60%,var(--ink))]"
            : "bg-[var(--accent)]/12 text-[color-mix(in_oklch,var(--accent)_70%,var(--ink))]"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-[var(--sage)]" : "bg-[var(--accent)]"}`}
          aria-hidden
        />
        {status}
      </span>

      <div className="flex-1">
        <h3 className="text-[28px] font-semibold tracking-[-0.022em] text-ink leading-[1.05]">
          {city}
        </h3>
        <p className="text-[13px] text-ink-muted mt-1">{neighborhood}</p>
      </div>

      <a
        href="#"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted hover:text-ink group-hover:text-[var(--primary)] transition-colors"
      >
        {cta}
        <ArrowUpRight
          className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          strokeWidth={1.75}
        />
      </a>
    </article>
  );
}
