import { Dna, Stethoscope, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

const ICONS: LucideIcon[] = [Dna, Stethoscope, ScrollText];

export function BetterWay() {
  const { eyebrow, headline, body, pillars } = site.betterWay;
  return (
    <section
      className="relative tile-ink py-28 md:py-36 overflow-hidden"
      aria-labelledby="better-h"
    >
      {/* Subtle off-axis halo for atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 -z-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 80% 0%, color-mix(in oklch, var(--sage) 50%, transparent), transparent 70%)",
        }}
      />

      <div className="relative container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-5">
            <div className="eyebrow !text-[var(--bg)] opacity-60">{eyebrow}</div>
            <h2
              id="better-h"
              className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.05] tracking-[-0.025em] font-semibold !text-[var(--bg)]"
            >
              {headline}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:pl-8" delay={0.06}>
            <p className="text-[17px] leading-[1.55] !text-[var(--bg)] opacity-80 max-w-[55ch]">
              {body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-[color-mix(in_oklch,var(--bg)_18%,transparent)] rounded-[24px] overflow-hidden border border-[color-mix(in_oklch,var(--bg)_15%,transparent)]">
          {pillars.map((p, i) => {
            const Icon = ICONS[i] ?? Dna;
            return (
              <Reveal key={p.label} delay={0.08 + i * 0.06}>
                <div className="relative h-full p-7 md:p-8 bg-[var(--ink)]">
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full mb-6"
                    style={{
                      backgroundColor: "color-mix(in oklch, var(--bg) 12%, transparent)",
                      color: "var(--bg)",
                    }}
                  >
                    <Icon className="h-[16px] w-[16px]" strokeWidth={1.5} />
                  </span>
                  <div className="text-[18px] font-semibold tracking-[-0.01em] !text-[var(--bg)]">
                    {p.label}
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.55] !text-[var(--bg)] opacity-65">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
