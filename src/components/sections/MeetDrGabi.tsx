"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ImageUpload } from "@/components/ui/ImageUpload";

export function MeetDrGabi() {
  const { eyebrow, headline, sub, capabilities, biomarkers } = site.drGabi;
  return (
    <section
      id="dr-gabi"
      className="relative tile-canvas py-32 md:py-44 overflow-hidden"
      aria-labelledby="gabi-h"
    >
      {/* Atmospheric backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-0 pointer-events-none opacity-90"
        style={{
          background:
            "radial-gradient(40% 50% at 30% 30%, color-mix(in oklch, var(--sage) 22%, transparent), transparent 70%), radial-gradient(40% 40% at 80% 70%, color-mix(in oklch, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative container mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="eyebrow">{eyebrow}</div>
          <h2
            id="gabi-h"
            className="mt-4 text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.04] tracking-[-0.028em] font-semibold text-ink"
          >
            {headline}
          </h2>
          <p className="mt-6 text-[18px] leading-[1.5] text-ink-muted max-w-[60ch] mx-auto">
            {sub}
          </p>
        </Reveal>

        <div className="mt-20 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual: portrait with biomarker constellation */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <ImageUpload
                storageKey="dr-gabi-portrait"
                rounded="3xl"
                aspect="aspect-[4/5]"
                label="Upload portrait"
                hint="Drag-and-drop or click. Replaces the abstract default."
                className="shadow-product"
                fallback={<DefaultPortrait />}
              />
              <BiomarkerOverlay markers={biomarkers} />
            </div>
          </Reveal>

          {/* Capabilities — Apple-style stack with strong type hierarchy */}
          <div className="lg:col-span-7">
            <ul className="space-y-1">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} as="li" delay={0.1 + i * 0.08}>
                  <div className="group relative py-7 border-t border-[var(--border)] last:border-b">
                    <div className="grid grid-cols-[auto_1fr_auto] items-start gap-5">
                      <span className="mt-1 text-[12px] font-semibold tabular tracking-[0.14em] text-ink-soft">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.018em] text-ink">
                          {c.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted max-w-[52ch]">
                          {c.body}
                        </p>
                      </div>
                      <ArrowRight
                        className="hidden md:block mt-2 h-5 w-5 text-ink-soft group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const BIOMARKER_ROWS = [
  { name: "IGF-1", value: "182", unit: "ng/mL", status: "optimal" as const, bar: 0.72 },
  { name: "DHEA-S", value: "284", unit: "µg/dL", status: "low" as const, bar: 0.38 },
  { name: "hsCRP", value: "0.4", unit: "mg/L", status: "optimal" as const, bar: 0.15 },
  { name: "TSH", value: "1.8", unit: "mIU/L", status: "optimal" as const, bar: 0.55 },
  { name: "Free T3", value: "2.9", unit: "pg/mL", status: "borderline" as const, bar: 0.48 },
  { name: "Vit D", value: "38", unit: "ng/mL", status: "low" as const, bar: 0.42 },
];

function DefaultPortrait() {
  const reduced = useReducedMotion();
  return (
    <div className="relative w-full h-full bg-[var(--surface)] overflow-hidden rounded-[inherit]">
      {/* Header bar */}
      <div className="px-5 pt-5 pb-4 border-b border-[var(--border)]">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft">Biomarker Analysis</div>
        <div className="mt-1 text-[14px] font-semibold text-ink">CBC + Hormone Panel</div>
      </div>

      {/* Biomarker rows */}
      <div className="px-5 py-4 space-y-4">
        {BIOMARKER_ROWS.map((m, i) => (
          <motion.div
            key={m.name}
            initial={reduced ? false : { opacity: 0, x: -8 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                    m.status === "optimal"
                      ? "bg-[var(--sage)]"
                      : m.status === "low"
                      ? "bg-[var(--accent)]"
                      : "bg-[var(--primary)]"
                  }`}
                />
                <span className="text-[12px] font-medium text-ink">{m.name}</span>
              </div>
              <span className="text-[11px] tabular text-ink-muted">{m.value} {m.unit}</span>
            </div>
            <div className="h-1 rounded-full bg-[var(--border)] overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  m.status === "optimal"
                    ? "bg-[var(--sage)]"
                    : m.status === "low"
                    ? "bg-[var(--accent)]"
                    : "bg-[var(--primary)]"
                }`}
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={reduced ? undefined : { scaleX: m.bar }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer label */}
      <div className="absolute inset-x-0 bottom-0 px-5 py-4 bg-gradient-to-t from-[var(--surface)] to-transparent">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-soft">Clinical Intelligence</div>
        <div className="text-[13px] font-semibold text-ink">Dr. Gabi</div>
      </div>
    </div>
  );
}

function BiomarkerOverlay({ markers }: { markers: readonly string[] }) {
  const reduced = useReducedMotion();
  // Floating data chips around the portrait — biology made visible.
  // Positions are deterministic and integer-based to avoid SSR drift.
  const positions = [
    { x: -8, y: 8, side: "left" as const },
    { x: 92, y: 16, side: "right" as const },
    { x: -6, y: 38, side: "left" as const },
    { x: 94, y: 48, side: "right" as const },
    { x: -10, y: 70, side: "left" as const },
    { x: 92, y: 78, side: "right" as const },
    { x: -4, y: 92, side: "left" as const },
    { x: 90, y: 92, side: "right" as const },
  ];
  return (
    <div className="pointer-events-none absolute inset-0">
      {markers.slice(0, positions.length).map((m, i) => {
        const p = positions[i];
        return (
          <motion.span
            key={m}
            className="absolute inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-[var(--surface)]/95 backdrop-blur-sm border border-[var(--border)] shadow-product text-[10px] font-medium text-ink"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={reduced ? false : { opacity: 0, x: p.side === "left" ? -10 : 10 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)]" />
            {m}
          </motion.span>
        );
      })}
    </div>
  );
}
