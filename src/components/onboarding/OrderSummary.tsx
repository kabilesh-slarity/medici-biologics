"use client";

import { Check, Lock } from "lucide-react";

const PERKS = [
  "$500 in peptide credits",
  "$19/mo locked forever",
  "Founding Member Wall",
  "Priority physician access",
];

export function OrderSummary() {
  return (
    <div className="rounded-[24px] bg-[var(--surface-elev)] border border-[var(--border)] p-7">
      <div className="flex items-center justify-between">
        <span className="eyebrow">Order summary</span>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--accent)] font-medium">
          <Lock className="h-3 w-3" strokeWidth={2} />
          Rate locked
        </span>
      </div>

      <div className="mt-6 pb-6 border-b border-[var(--border)]">
        <div className="text-[14px] font-semibold text-ink">Founding Member</div>
        <p className="text-[13px] text-ink-muted mt-1">First year, paid upfront. Then $19/month, forever.</p>
      </div>

      <ul className="mt-6 space-y-3">
        {PERKS.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-[13px] text-ink">
            <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--sage)]/15 text-[var(--sage)] shrink-0">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-7 pt-6 border-t border-[var(--border)]">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] text-ink-muted">Total today</span>
          <span className="text-[28px] font-semibold tabular tracking-[-0.02em] text-ink">$228</span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="text-[13px] text-ink-muted">After year one</span>
          <span className="text-[13px] tabular text-ink">$19 / mo</span>
        </div>
      </div>
    </div>
  );
}
