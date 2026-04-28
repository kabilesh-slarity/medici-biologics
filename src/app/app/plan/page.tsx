"use client";

import { Activity, FileBadge2, ShieldCheck, Beaker, Clock, Check, Calendar, Repeat } from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { useSession } from "@/lib/session";

const PROTOCOL = {
  name: "BPC-157",
  full: "Body Protection Compound 157",
  dose: "250 mcg",
  cadence: "2× daily",
  route: "Subcutaneous",
  duration: "8 weeks",
  startDate: "Awaiting approval",
  reviewer: "Dr. Sarah Jenkins, MD",
  reviewedAt: "Today, 9:32 AM",
};

const TIMELINE = [
  { week: "Week 1–2", title: "Adaptation", body: "Begin daily injections. Subjective sleep + gut signal often appears.", state: "upcoming" },
  { week: "Week 3–4", title: "Inflammation reduction", body: "hsCRP, ESR begin shifting. First scheduled physician check-in.", state: "upcoming" },
  { week: "Week 5–6", title: "Tissue recovery", body: "Soft tissue and joint markers improve. Optional stack consideration.", state: "upcoming" },
  { week: "Week 7–8", title: "Recalibration", body: "Bloodwork redraw. Decide continuation, stack, or taper with physician.", state: "upcoming" },
] as const;

export default function PlanPage() {
  const { session } = useSession();
  return (
    <>
      <Topbar title="Treatment Plan" />
      <div className="px-6 sm:px-8 py-10 max-w-5xl mx-auto">
        {/* Hero card */}
        <article className="rounded-[28px] bg-[var(--surface)] border border-[var(--border)] shadow-product overflow-hidden">
          <div className="relative px-7 sm:px-9 py-8">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-32 pointer-events-none"
              style={{
                background:
                  "radial-gradient(80% 100% at 50% 0%, color-mix(in oklch, var(--sage) 18%, transparent), transparent 70%)",
              }}
            />
            <div className="relative flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="eyebrow">Active protocol</span>
                <h2 className="mt-2 text-[40px] sm:text-[52px] leading-[1.04] tracking-[-0.025em] font-semibold text-ink">
                  {PROTOCOL.name}
                </h2>
                <p className="mt-1 text-[14px] text-ink-muted">{PROTOCOL.full}</p>
              </div>
              {session && <StatusPill status={session.protocolStatus} />}
            </div>

            <div className="relative mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat icon={Activity} label="Dose" value={PROTOCOL.dose} />
              <Stat icon={Repeat} label="Frequency" value={PROTOCOL.cadence} />
              <Stat icon={Beaker} label="Route" value={PROTOCOL.route} />
              <Stat icon={Calendar} label="Duration" value={PROTOCOL.duration} />
            </div>
          </div>
        </article>

        {/* Timeline + Side panel */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <section className="lg:col-span-8 rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-7">
            <span className="eyebrow">Schedule</span>
            <ol className="mt-6 relative">
              <span aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--border)]" />
              {TIMELINE.map((t, i) => (
                <li key={t.week} className="relative pl-12 pb-7 last:pb-0">
                  <span className="absolute left-0 top-0 grid place-items-center h-8 w-8 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[10px] font-semibold tabular text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="text-[18px] font-semibold tracking-[-0.012em] text-ink">{t.title}</h3>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-ink-soft">{t.week}</span>
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.55] text-ink-muted max-w-[60ch]">{t.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <aside className="lg:col-span-4 space-y-5">
            <section className="rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-6">
              <div className="flex items-center gap-2 text-[11px] text-ink-soft uppercase tracking-[0.12em]">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--sage)]" strokeWidth={1.75} />
                Physician
              </div>
              <div className="mt-3 text-[14px] font-semibold text-ink">{PROTOCOL.reviewer}</div>
              <div className="text-[12px] text-ink-soft">Reviewed {PROTOCOL.reviewedAt}</div>
              <p className="mt-4 pt-4 border-t border-[var(--border)] text-[13px] leading-[1.6] text-ink-muted">
                Starter protocol. Conservative dose given current baseline. Reassess at week 4 with redrawn labs.
              </p>
            </section>

            <section className="rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-6">
              <div className="flex items-center gap-2 text-[11px] text-ink-soft uppercase tracking-[0.12em]">
                <FileBadge2 className="h-3.5 w-3.5 text-[var(--primary)]" strokeWidth={1.75} />
                Documentation
              </div>
              <ul className="mt-4 space-y-3 text-[13px]">
                <li className="flex items-center gap-2 text-ink">
                  <Check className="h-3 w-3 text-[var(--sage)]" strokeWidth={2.5} />
                  Certificate of Analysis
                </li>
                <li className="flex items-center gap-2 text-ink">
                  <Check className="h-3 w-3 text-[var(--sage)]" strokeWidth={2.5} />
                  Compounding lab report
                </li>
                <li className="flex items-center gap-2 text-ink-muted">
                  <Clock className="h-3 w-3 text-ink-soft" strokeWidth={2.5} />
                  Shipping confirmation (after approval)
                </li>
              </ul>
              <button
                type="button"
                className="mt-5 w-full h-10 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[13px] font-medium hover:scale-[1.01] active:scale-[0.99] transition-transform"
              >
                Download CoA
              </button>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[var(--surface-elev)] border border-[var(--border)] px-4 py-3.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
        <Icon className="h-3 w-3" strokeWidth={1.75} />
        {label}
      </div>
      <div className="mt-1.5 text-[16px] font-semibold tabular text-ink">{value}</div>
    </div>
  );
}
