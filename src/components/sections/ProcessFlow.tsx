"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, FlaskConical, Target } from "lucide-react";
import { site } from "@/content/site";

/**
 * Hero process visualization: Input → AI analysis → Protocol output.
 * Loops every 6s. Respects prefers-reduced-motion (shows final state).
 */
export function ProcessFlow() {
  const reduced = useReducedMotion();
  const flow = site.hero.flow;
  const cycle = 6; // seconds

  // Static frame for reduced-motion users
  if (reduced) {
    return <StaticFrame />;
  }

  return (
    <div className="relative w-full max-w-[520px] aspect-[4/3] mx-auto select-none">
      {/* Soft mesh backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 35%, color-mix(in oklch, var(--sage) 18%, transparent), transparent 70%), radial-gradient(50% 40% at 25% 70%, color-mix(in oklch, var(--accent) 10%, transparent), transparent 70%)",
        }}
      />

      {/* Connection lines (SVG) */}
      <svg
        viewBox="0 0 520 390"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="line" x1="0" x2="1">
            <stop offset="0" stopColor="var(--ink-muted)" stopOpacity="0.0" />
            <stop offset="0.4" stopColor="var(--primary)" stopOpacity="0.7" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {[80, 195, 310].map((y, i) => (
          <motion.path
            key={i}
            d={`M 70 ${y} Q 175 ${y}, 240 195`}
            stroke="url(#line)"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 1, 0],
              opacity: [0, 0.9, 0.9, 0.9, 0],
            }}
            transition={{
              duration: cycle,
              times: [0, 0.25, 0.55, 0.85, 1],
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.path
          d="M 280 195 Q 360 195, 440 195"
          stroke="url(#line)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 0, 0, 1, 0],
            opacity: [0, 0, 0.7, 0.9, 0],
          }}
          transition={{
            duration: cycle,
            times: [0, 0.5, 0.55, 0.85, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Input chips (left) */}
      <div className="absolute left-0 top-[10%] space-y-3 w-[140px]">
        {flow.input.map((label, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-2 h-9 px-3 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-card text-[12px] font-medium text-ink"
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              x: [-8, 0, 0, 0, -8],
            }}
            transition={{
              duration: cycle,
              times: [0, 0.18, 0.55, 0.85, 1],
              delay: i * 0.12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChipIcon i={i} />
            {label}
          </motion.div>
        ))}
      </div>

      {/* Central node (AI) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative h-[88px] w-[88px] rounded-full grid place-items-center"
          animate={{ scale: [1, 1.04, 1, 1.06, 1] }}
          transition={{ duration: cycle, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full bg-[var(--primary)]" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid var(--primary)" }}
            animate={{ scale: [1, 1.6], opacity: [0.45, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            aria-hidden
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid var(--primary)" }}
            animate={{ scale: [1, 1.9], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            aria-hidden
          />
          <span className="relative text-[11px] font-semibold tracking-[0.04em] text-[var(--bg)]">
            {flow.analysis}
          </span>
        </motion.div>
      </div>

      {/* Output card (right) */}
      <motion.div
        className="absolute right-0 top-[34%] w-[170px] rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-card p-3.5"
        initial={{ opacity: 0, x: 8 }}
        animate={{
          opacity: [0, 0, 0, 1, 0],
          x: [8, 8, 8, 0, 8],
        }}
        transition={{
          duration: cycle,
          times: [0, 0.55, 0.62, 0.78, 1],
          repeat: Infinity,
          ease: "easeOut",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="eyebrow !text-[10px]">Protocol</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)]" aria-hidden />
        </div>
        <div className="text-[14px] font-semibold text-ink mb-1">{flow.output.title}</div>
        <div className="text-[11px] text-ink-muted tabular">{flow.output.spec}</div>
        <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-[10px] text-ink-muted uppercase tracking-wider">Approved</span>
          <span className="text-[10px] text-[var(--sage)] font-medium">Dr. Jenkins</span>
        </div>
      </motion.div>
    </div>
  );
}

function ChipIcon({ i }: { i: number }) {
  const Icon = [Activity, Target, FlaskConical][i] ?? Activity;
  return <Icon className="h-3.5 w-3.5 text-[var(--primary)]" strokeWidth={1.5} />;
}

function StaticFrame() {
  const flow = site.hero.flow;
  return (
    <div className="relative w-full max-w-[520px] aspect-[4/3] mx-auto">
      <div className="absolute left-0 top-[10%] space-y-3 w-[140px]">
        {flow.input.map((label, i) => (
          <div
            key={label}
            className="flex items-center gap-2 h-9 px-3 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-card text-[12px] font-medium text-ink"
          >
            <ChipIcon i={i} />
            {label}
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[88px] w-[88px] rounded-full grid place-items-center bg-[var(--primary)] text-[var(--bg)] text-[11px] font-semibold tracking-wider">
        {flow.analysis}
      </div>
      <div className="absolute right-0 top-[34%] w-[170px] rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-card p-3.5">
        <div className="eyebrow !text-[10px] mb-2">Protocol</div>
        <div className="text-[14px] font-semibold text-ink mb-1">{flow.output.title}</div>
        <div className="text-[11px] text-ink-muted tabular">{flow.output.spec}</div>
      </div>
    </div>
  );
}
