"use client";

import { Clock, CheckCircle2, Activity, Truck } from "lucide-react";
import type { ProtocolStatus } from "@/lib/session";

const MAP: Record<
  ProtocolStatus,
  { label: string; icon: typeof Clock; tone: "pending" | "approved" | "active" }
> = {
  pending: { label: "Pending review", icon: Clock, tone: "pending" },
  approved: { label: "Approved", icon: CheckCircle2, tone: "approved" },
  active: { label: "Active", icon: Activity, tone: "active" },
  shipped: { label: "Shipped", icon: Truck, tone: "approved" },
};

export function StatusPill({ status }: { status: ProtocolStatus }) {
  const { label, icon: Icon, tone } = MAP[status];
  const cls =
    tone === "pending"
      ? "bg-[var(--accent)]/12 text-[color-mix(in_oklch,var(--accent)_70%,var(--ink))]"
      : tone === "active"
        ? "bg-[var(--primary)]/12 text-[var(--primary)]"
        : "bg-[var(--sage)]/15 text-[color-mix(in_oklch,var(--sage)_60%,var(--ink))]";
  return (
    <span className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[11px] font-medium ${cls}`}>
      <Icon className="h-3 w-3" strokeWidth={2} />
      {label}
    </span>
  );
}
