"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function Process() {
  const { eyebrow, headline, lede, phases } = site.process;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative tile-canvas py-28 md:py-36"
      aria-labelledby="process-h"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="eyebrow">{eyebrow}</div>
              <h2
                id="process-h"
                className="mt-4 text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.05] tracking-[-0.025em] font-semibold text-ink"
              >
                {headline}
              </h2>
              <p className="mt-6 text-[16px] leading-[1.55] text-ink-muted max-w-[48ch]">{lede}</p>

            </div>
          </Reveal>

          <div ref={ref} className="lg:col-span-7 relative">
            <div
              className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--border)]"
              aria-hidden
            />
            {!reduced && (
              <motion.div
                className="absolute left-[15px] top-2 w-px bg-[var(--primary)] origin-top"
                style={{ height: lineHeight }}
                aria-hidden
              />
            )}

            <ol className="space-y-10">
              {phases.map((p, i) => (
                <Reveal key={p.phase} as="li" delay={i * 0.05}>
                  <div className="relative pl-12">
                    <span
                      className="absolute left-0 top-0 grid place-items-center h-8 w-8 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[11px] tabular font-semibold text-ink"
                      aria-hidden
                    >
                      {p.phase}
                    </span>
                    <h3 className="text-[22px] font-semibold tracking-[-0.012em] text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.6] text-ink-muted">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
