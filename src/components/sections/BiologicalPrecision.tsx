"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function BiologicalPrecision() {
  const { eyebrow, headline, body } = site.precision;
  const reduced = useReducedMotion();
  return (
    <section
      className="relative py-28 md:py-36 bg-[var(--ink)] text-[var(--bg)] overflow-hidden"
      aria-labelledby="precision-h"
    >
      {/* Cell network */}
      <svg
        viewBox="0 0 1200 500"
        className="absolute inset-0 w-full h-full opacity-[0.18]"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        {generateNetwork().map((edge, i) => (
          <motion.line
            key={i}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="var(--bg)"
            strokeWidth="0.5"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={reduced ? undefined : { pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.01, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        ))}
        {generateNodes().map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="var(--bg)"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 0.55 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.02 }}
            viewport={{ once: true }}
          />
        ))}
      </svg>

      <div className="container mx-auto relative">
        <Reveal className="max-w-3xl">
          <div className="eyebrow !text-[var(--bg)] opacity-60">{eyebrow}</div>
          <h2 id="precision-h" className="mt-4 text-section !text-[36px] sm:!text-[44px] !text-[var(--bg)]">
            {headline}
          </h2>
          <p className="mt-6 text-[16px] leading-[1.6] opacity-75 max-w-prose">{body}</p>
        </Reveal>
      </div>
    </section>
  );
}

// Deterministic node + edge generation for SSR consistency.
// Values are rounded to integers to avoid floating-point precision
// differences between Node.js and browser V8 causing hydration mismatches.
function generateNodes() {
  const nodes: { x: number; y: number; r: number }[] = [];
  const seed = (n: number) => Math.abs(Math.sin(n * 12.9898) * 43758.5453) % 1;
  for (let i = 0; i < 36; i++) {
    nodes.push({
      x: Math.round(60 + seed(i + 1) * 1080),
      y: Math.round(40 + seed(i + 100) * 420),
      r: Math.round((1 + seed(i + 200) * 2) * 10) / 10,
    });
  }
  return nodes;
}

function generateNetwork() {
  const nodes = generateNodes();
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 180) edges.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y });
    }
  }
  return edges;
}
