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
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden"
      aria-label="Introduction"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
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
              className="mt-4 text-display !text-[34px] sm:!text-[40px] lg:!text-[44px] text-ink"
            >
              {site.hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.12 }}
              className="mt-6 max-w-prose text-[16px] leading-[1.6] text-ink-muted"
            >
              {site.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="mt-9 flex items-center gap-4"
            >
              <LinkButton href={site.hero.cta.href} size="lg" variant="primary">
                {site.hero.cta.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </LinkButton>
              <div className="hidden sm:flex items-center gap-2 text-[12px] text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)]" aria-hidden />
                Reviewed by licensed physicians
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <ProcessFlow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
