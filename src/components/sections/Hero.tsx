"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { ProcessFlow } from "./ProcessFlow";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  const ease = [0.16, 1, 0.3, 1] as const;
  return (
    <section
      id="hero"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Soft mesh atmosphere — Apple-style atmosphere via photography surrogate */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 20%, color-mix(in oklch, var(--sage) 16%, transparent), transparent 60%), radial-gradient(50% 40% at 10% 75%, color-mix(in oklch, var(--accent) 10%, transparent), transparent 65%)",
        }}
      />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="eyebrow"
            >
              {site.hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
              className="mt-5 text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.04] tracking-[-0.028em] font-semibold text-ink max-w-[14ch]"
            >
              {site.hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.12 }}
              className="mt-6 max-w-[52ch] text-[17px] leading-[1.55] text-ink-muted"
            >
              {site.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <LinkButton href={site.hero.cta.href} size="lg" variant="primary">
                {site.hero.cta.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </LinkButton>
              <LinkButton href={site.hero.secondary.href} size="lg" variant="ghost">
                {site.hero.secondary.label}
              </LinkButton>
            </motion.div>

            {/* Trust strip — keeps text-density low, inline with spec */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.32 }}
              className="mt-14 grid grid-cols-3 gap-6 max-w-md"
            >
              {site.hero.proof.map((p) => (
                <div key={p.label}>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                    {p.label}
                  </div>
                  <div className="mt-1 text-[14px] font-semibold text-ink">{p.value}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.18 }}
            className="lg:col-span-6"
          >
            <ProcessFlow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
