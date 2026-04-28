"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

const STEPS = ["Phone", "Verify", "Profile", "Consents", "Payment"];

export function ProgressRail({ currentStep }: { currentStep: number }) {
  return (
    <ol
      className="flex items-center gap-1.5 sm:gap-2"
      aria-label={`Step ${currentStep} of ${STEPS.length}: ${STEPS[currentStep - 1]}`}
    >
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const state = idx < currentStep ? "done" : idx === currentStep ? "active" : "pending";
        return (
          <li key={label} className="flex items-center gap-1.5 sm:gap-2">
            <Dot state={state} idx={idx} />
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "h-px w-4 sm:w-7 transition-colors",
                  state === "done" ? "bg-[var(--sage)]" : "bg-[var(--border)]",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Dot({ state, idx }: { state: "done" | "active" | "pending"; idx: number }) {
  return (
    <motion.span
      layout
      className={cn(
        "inline-flex items-center justify-center rounded-full text-[10px] font-semibold tabular transition-all",
        state === "done"
          ? "h-5 w-5 bg-[var(--sage)] text-[var(--bg)]"
          : state === "active"
            ? "h-5 w-7 bg-[var(--ink)] text-[var(--bg)] px-1.5"
            : "h-5 w-5 border border-[var(--border)] text-ink-soft bg-transparent",
      )}
    >
      {state === "done" ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : idx}
    </motion.span>
  );
}
