"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function MeetDrGabi() {
  const { eyebrow, headline, sub, body, capabilities } = site.drGabi;
  return (
    <section
      id="dr-gabi"
      className="relative py-28 md:py-40"
      aria-labelledby="gabi-h"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <BiologicalPortrait />
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="eyebrow">{eyebrow}</div>
              <h2 id="gabi-h" className="mt-4 text-section !text-[36px] sm:!text-[44px] text-ink">
                {headline}
              </h2>
              <p className="mt-5 text-[18px] leading-[1.5] text-ink max-w-prose">{sub}</p>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted max-w-prose">{body}</p>
            </Reveal>

            <ul className="mt-10 space-y-4">
              {capabilities.map((c, i) => (
                <Reveal key={c} as="li" delay={0.08 + i * 0.06}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sage)]/15 text-[var(--sage)] shrink-0">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.25} />
                    </span>
                    <span className="text-[15px] leading-[1.55] text-ink">{c}</span>
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

function BiologicalPortrait() {
  const reduced = useReducedMotion();
  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--sage) 22%, transparent), transparent 70%)",
        }}
      />
      <svg viewBox="0 0 460 460" className="absolute inset-0 w-full h-full" aria-hidden>
        {/* Concentric biological rings */}
        {[210, 175, 140, 105, 70].map((r, i) => (
          <motion.circle
            key={r}
            cx="230"
            cy="230"
            r={r}
            fill="none"
            stroke="var(--primary)"
            strokeOpacity={0.12 + i * 0.05}
            strokeWidth={1}
            initial={reduced ? false : { strokeDashoffset: 1000 }}
            whileInView={reduced ? undefined : { strokeDashoffset: 0 }}
            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            strokeDasharray="1000"
          />
        ))}

        {/* Data nodes around the rings */}
        {[
          { x: 230, y: 20, label: "WBC" },
          { x: 405, y: 145, label: "T₃" },
          { x: 380, y: 320, label: "DHEA" },
          { x: 230, y: 410, label: "IGF-1" },
          { x: 80, y: 320, label: "TSH" },
          { x: 55, y: 145, label: "hsCRP" },
        ].map((n, i) => (
          <motion.g
            key={n.label}
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            viewport={{ once: true }}
          >
            <circle cx={n.x} cy={n.y} r="3" fill="var(--accent)" />
            <text
              x={n.x}
              y={n.y - 10}
              textAnchor="middle"
              fontSize="10"
              fontFamily="inherit"
              fontWeight="500"
              fill="var(--ink-muted)"
              letterSpacing="0.04em"
            >
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* Center core */}
        <circle cx="230" cy="230" r="36" fill="var(--primary)" />
        <text
          x="230"
          y="234"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.06em"
          fill="var(--bg)"
        >
          GABI
        </text>
      </svg>
    </div>
  );
}
