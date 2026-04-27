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
      className="relative py-24 md:py-32 border-t border-[var(--border)]"
      aria-labelledby="process-h"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="eyebrow">{eyebrow}</div>
              <h2 id="process-h" className="mt-4 text-section !text-[28px] sm:!text-[32px] text-ink">
                {headline}
              </h2>
              <p className="mt-5 text-[15px] leading-[1.6] text-ink-muted max-w-prose">{lede}</p>
            </div>
          </Reveal>

          <div ref={ref} className="lg:col-span-8 relative">
            {/* Vertical rail */}
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

            <ol className="space-y-12">
              {phases.map((p, i) => (
                <Reveal key={p.phase} as="li" delay={i * 0.05}>
                  <div className="relative pl-12">
                    <span
                      className="absolute left-0 top-0 grid place-items-center h-8 w-8 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[11px] tabular font-semibold text-ink"
                      aria-hidden
                    >
                      {p.phase}
                    </span>
                    <h3 className="text-[20px] font-semibold tracking-[-0.01em] text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-prose text-[15px] leading-[1.6] text-ink-muted">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <Reveal>
          <p className="mt-24 mx-auto max-w-3xl text-center text-[22px] sm:text-[28px] font-semibold tracking-[-0.02em] text-ink">
            {site.manifesto2}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
