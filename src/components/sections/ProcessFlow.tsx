"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Brain, FileCheck2, FlaskConical, Target } from "lucide-react";
import { site } from "@/content/site";

/**
 * Hero protocol visualization. Three labeled stages stack vertically,
 * each "lighting up" in sequence as a single line traces top-to-bottom.
 * The output card is a real protocol artifact — the same shape the user
 * receives in production. Loops every 7s. Respects prefers-reduced-motion.
 */
export function ProcessFlow() {
  const reduced = useReducedMotion();
  const flow = site.hero.flow;
  const cycle = 7;

  if (reduced) return <StaticFrame />;

  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      <div className="relative rounded-[28px] bg-[var(--surface)] border border-[var(--border)] shadow-product overflow-hidden">
        {/* Soft top atmosphere */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "radial-gradient(80% 100% at 50% 0%, color-mix(in oklch, var(--sage) 18%, transparent), transparent 70%)",
          }}
        />

        {/* Header strip */}
        <div className="relative flex items-center justify-between gap-3 px-5 pt-4 pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
            <span className="text-[11px] uppercase tracking-[0.12em] text-ink-soft">Live</span>
          </div>
          <span className="text-[11px] tabular text-ink-soft">{flow.output.reviewer}</span>
        </div>

        {/* Stage 1: Inputs */}
        <Stage
          step="01"
          title="Your inputs"
          activeFrom={0}
          activeTo={0.3}
          cycle={cycle}
        >
          <div className="flex flex-wrap gap-1.5">
            {flow.input.map((label, i) => (
              <motion.span
                key={label}
                className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-[var(--surface-elev)] border border-[var(--border)] text-[11px] font-medium text-ink"
                initial={{ opacity: 0.35 }}
                animate={{
                  opacity: [0.35, 1, 1, 0.35, 0.35],
                  borderColor: [
                    "var(--border)",
                    "var(--primary-soft)",
                    "var(--primary-soft)",
                    "var(--border)",
                    "var(--border)",
                  ],
                }}
                transition={{
                  duration: cycle,
                  times: [0, 0.05 + i * 0.03, 0.28, 0.32, 1],
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                <ChipIcon i={i} />
                {label}
              </motion.span>
            ))}
          </div>
        </Stage>

        <Connector start={0.28} end={0.36} cycle={cycle} />

        {/* Stage 2: AI analysis */}
        <Stage
          step="02"
          title="Dr. Gabi reads it"
          activeFrom={0.32}
          activeTo={0.6}
          cycle={cycle}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="relative h-11 w-11 rounded-full grid place-items-center bg-[var(--primary)] text-[var(--bg)]"
              animate={{ scale: [1, 1, 1.04, 1.04, 1] }}
              transition={{ duration: cycle, times: [0, 0.32, 0.45, 0.6, 1], repeat: Infinity, ease: "easeInOut" }}
            >
              <Brain className="h-[18px] w-[18px]" strokeWidth={1.6} />
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid var(--primary)" }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 1.6, 1.6], opacity: [0, 0.5, 0] }}
                transition={{ duration: cycle, times: [0.32, 0.45, 0.6], repeat: Infinity, ease: "easeOut" }}
              />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-ink">Analyzing 50+ biomarkers</div>
              <ProgressBar cycle={cycle} startAt={0.34} endAt={0.58} />
            </div>
          </div>
        </Stage>

        <Connector start={0.58} end={0.66} cycle={cycle} />

        {/* Stage 3: Output protocol */}
        <Stage
          step="03"
          title="Your protocol"
          activeFrom={0.62}
          activeTo={0.95}
          cycle={cycle}
          last
        >
          <motion.div
            className="rounded-2xl bg-[var(--surface-elev)] border border-[var(--border)] p-3.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: [0, 0, 0, 1, 1, 1, 0],
              y: [6, 6, 6, 0, 0, 0, 6],
            }}
            transition={{
              duration: cycle,
              times: [0, 0.4, 0.62, 0.7, 0.85, 0.93, 1],
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.12em] text-ink-soft">Recommendation</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-[var(--sage)] font-medium">
                <FileCheck2 className="h-3 w-3" strokeWidth={2} />
                Approved
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <div className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{flow.output.title}</div>
              <div className="text-[12px] tabular text-ink-muted">{flow.output.spec}</div>
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center gap-2 text-[10px] text-ink-soft">
              <FlaskConical className="h-3 w-3" strokeWidth={1.5} />
              CoA included · 48 hr ship
            </div>
          </motion.div>
        </Stage>
      </div>
    </div>
  );
}

function Stage({
  step,
  title,
  activeFrom,
  activeTo,
  cycle,
  last,
  children,
}: {
  step: string;
  title: string;
  activeFrom: number;
  activeTo: number;
  cycle: number;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative px-5 py-4 ${last ? "" : "border-b border-[var(--border)]"}`}>
      <div className="flex items-start gap-3">
        <motion.span
          className="shrink-0 mt-0.5 h-6 w-6 rounded-full grid place-items-center text-[10px] font-semibold tabular"
          initial={{
            backgroundColor: "var(--surface-elev)",
            color: "var(--ink-soft)",
          }}
          animate={{
            backgroundColor: [
              "var(--surface-elev)",
              "var(--ink)",
              "var(--ink)",
              "var(--surface-elev)",
              "var(--surface-elev)",
            ],
            color: [
              "var(--ink-soft)",
              "var(--bg)",
              "var(--bg)",
              "var(--ink-soft)",
              "var(--ink-soft)",
            ],
          }}
          transition={{
            duration: cycle,
            times: [0, activeFrom, activeTo - 0.05, activeTo, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {step}
        </motion.span>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold text-ink mb-2">{title}</div>
          {children}
        </div>
      </div>
    </div>
  );
}

function Connector({ start, end, cycle }: { start: number; end: number; cycle: number }) {
  return (
    <div className="relative h-0">
      <motion.div
        aria-hidden
        className="absolute left-[35px] -top-px h-2 w-px bg-[var(--primary)] origin-top"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{
          scaleY: [0, 0, 1, 1, 0],
          opacity: [0, 0, 1, 1, 0],
        }}
        transition={{
          duration: cycle,
          times: [0, start, start + 0.04, end, end + 0.04],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function ProgressBar({ cycle, startAt, endAt }: { cycle: number; startAt: number; endAt: number }) {
  return (
    <div className="mt-1.5 h-1 w-full rounded-full bg-[var(--border)] overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-[var(--primary)] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 0, 1, 1, 0] }}
        transition={{
          duration: cycle,
          times: [0, startAt, endAt, 0.93, 1],
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </div>
  );
}

function ChipIcon({ i }: { i: number }) {
  const Icon = [Activity, Target, FlaskConical][i] ?? Activity;
  return <Icon className="h-3 w-3 text-[var(--primary)]" strokeWidth={1.75} />;
}

function StaticFrame() {
  const flow = site.hero.flow;
  return (
    <div className="relative w-full max-w-[460px] mx-auto">
      <div className="relative rounded-[28px] bg-[var(--surface)] border border-[var(--border)] shadow-product overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
            <span className="text-[11px] uppercase tracking-[0.12em] text-ink-soft">Live</span>
          </div>
          <span className="text-[11px] tabular text-ink-soft">{flow.output.reviewer}</span>
        </div>

        <div className="px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-start gap-3">
            <span className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-[var(--ink)] text-[var(--bg)] grid place-items-center text-[10px] font-semibold tabular">01</span>
            <div className="flex-1">
              <div className="text-[12px] font-semibold text-ink mb-2">Your inputs</div>
              <div className="flex flex-wrap gap-1.5">
                {flow.input.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-[var(--surface-elev)] border border-[var(--border)] text-[11px] font-medium text-ink"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-start gap-3">
            <span className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-[var(--ink)] text-[var(--bg)] grid place-items-center text-[10px] font-semibold tabular">02</span>
            <div className="flex-1">
              <div className="text-[12px] font-semibold text-ink mb-2">Dr. Gabi reads it</div>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-[var(--primary)] text-[var(--bg)] grid place-items-center">
                  <Brain className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </div>
                <div className="text-[12px] font-semibold text-ink">Analyzes 50+ biomarkers</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-[var(--ink)] text-[var(--bg)] grid place-items-center text-[10px] font-semibold tabular">03</span>
            <div className="flex-1">
              <div className="text-[12px] font-semibold text-ink mb-2">Your protocol</div>
              <div className="rounded-2xl bg-[var(--surface-elev)] border border-[var(--border)] p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-ink-soft">Recommendation</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[var(--sage)] font-medium">
                    <FileCheck2 className="h-3 w-3" strokeWidth={2} />
                    Approved
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-[18px] font-semibold text-ink">{flow.output.title}</div>
                  <div className="text-[12px] tabular text-ink-muted">{flow.output.spec}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
