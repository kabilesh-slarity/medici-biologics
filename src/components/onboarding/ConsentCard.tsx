"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export function ConsentCard({
  title,
  summary,
  fullText,
  checked,
  onChange,
}: {
  title: string;
  summary: string;
  fullText: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <article
      className={cn(
        "rounded-2xl border bg-[var(--surface)] transition-colors",
        checked ? "border-[var(--ink)]" : "border-[var(--border)]",
      )}
    >
      <div className="flex items-start gap-4 p-5">
        <button
          role="checkbox"
          aria-checked={checked}
          aria-label={`Agree to ${title}`}
          onClick={() => onChange(!checked)}
          className={cn(
            "mt-0.5 shrink-0 h-6 w-6 rounded-full border-2 inline-flex items-center justify-center transition-all",
            checked
              ? "border-[var(--primary)] bg-[var(--primary)]"
              : "border-[var(--border)] bg-transparent",
          )}
        >
          {checked && <Check className="h-3.5 w-3.5 text-[var(--bg)]" strokeWidth={3} />}
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
          <p className="mt-1 text-[13px] leading-[1.55] text-ink-muted">{summary}</p>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-ink-muted hover:text-ink transition-colors"
          >
            {open ? "Hide" : "Read full text"}
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
              strokeWidth={1.75}
            />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="mt-3 pt-3 border-t border-[var(--border)] text-[12.5px] leading-[1.6] text-ink-muted">
                  {fullText}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}
