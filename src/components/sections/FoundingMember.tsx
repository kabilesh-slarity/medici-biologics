"use client";

import { Check, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function FoundingMember() {
  const { eyebrow, headline, lede, plan, scarcity, badges } = site.founding;
  const claimedPct = Math.min(100, Math.round((scarcity.claimed / scarcity.total) * 100));

  return (
    <section
      id="founding"
      className="relative tile-elev py-28 md:py-36"
      aria-labelledby="founding-h"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, color-mix(in oklch, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative container mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">{eyebrow}</div>
          <h2
            id="founding-h"
            className="mt-4 text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.04] tracking-[-0.028em] font-semibold text-ink"
          >
            {headline}
          </h2>
          <p className="mt-6 text-[17px] leading-[1.55] text-ink-muted">{lede}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 mx-auto max-w-2xl rounded-full bg-[var(--surface)] border border-[var(--border)] px-2 py-2 flex items-center gap-3">
            <div className="flex-1 px-4">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-1.5">
                <span>{scarcity.claimed} of {scarcity.total} claimed</span>
                <span className="tabular text-ink">{claimedPct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: claimedPct / 100 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="h-full origin-left rounded-full bg-[var(--primary)]"
                />
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-[var(--surface-elev)] text-[12px] font-medium text-ink">
              <Lock className="h-3 w-3 text-[var(--accent)]" strokeWidth={2} />
              Rate locked forever
            </span>
          </div>
        </Reveal>

        {/* Pricing card */}
        <Reveal delay={0.18}>
          <div className="mt-10 mx-auto max-w-3xl rounded-[28px] bg-[var(--surface)] border border-[var(--border)] shadow-product overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: price + CTA */}
              <div className="lg:col-span-5 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--surface-elev)] flex flex-col">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                  Founding Member
                </div>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-[64px] sm:text-[72px] leading-[0.95] font-semibold tabular tracking-[-0.035em] text-ink">
                    {plan.price}
                  </span>
                </div>
                <div className="mt-1 text-[13px] text-ink-muted">{plan.cadence}</div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                  <Lock className="h-3 w-3 text-[var(--accent)]" strokeWidth={2} />
                  {plan.lockedAt}
                </div>

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    className="w-full h-12 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[15px] font-medium hover:scale-[1.01] active:scale-[0.99] transition-transform"
                  >
                    {plan.cta}
                  </button>
                  <p className="mt-3 text-center text-[12px] text-ink-muted">{plan.helper}</p>
                </div>
              </div>

              {/* Right: perks */}
              <div className="lg:col-span-7 p-8 lg:p-10">
                <div className="text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                  Included from day one
                </div>
                <ul className="mt-5 space-y-5">
                  {plan.perks.map((perk) => (
                    <li key={perk.label} className="flex items-start gap-4">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sage)]/15 text-[var(--sage)] shrink-0">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <div>
                        <div className="text-[15px] font-semibold text-ink">{perk.label}</div>
                        <p className="mt-1 text-[13.5px] leading-[1.55] text-ink-muted max-w-[42ch]">
                          {perk.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Trust badges */}
        <Reveal delay={0.25}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-ink-soft">
            {badges.map((b) => (
              <li key={b.label} className="inline-flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--sage)]" strokeWidth={1.75} />
                {b.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
