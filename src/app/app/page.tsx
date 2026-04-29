"use client";

import Link from "next/link";
import { ArrowRight, FileText, ClipboardList, Send } from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { useSession } from "@/lib/session";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NEXT_STEPS = [
  { label: "Upload your latest bloodwork", href: "/app/records", done: false },
  { label: "Confirm shipping address", href: "/app/settings", done: false },
  { label: "Schedule first telehealth check-in", href: "#", done: false },
];

const RECENT_RECORDS = [
  { name: "CBC Panel · Jan 2026", type: "Bloodwork", date: "1d ago" },
  { name: "Hormone Panel · Dec 2025", type: "Bloodwork", date: "3w ago" },
  { name: "Intake Questionnaire", type: "Document", date: "Last month" },
];

export default function HomePage() {
  const { session } = useSession();
  const router = useRouter();
  const [draft, setDraft] = useState("");

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const askGabi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    router.push(`/app/chat?q=${encodeURIComponent(draft)}`);
  };

  return (
    <>
      <Topbar title="Home" />

      <div className="px-6 sm:px-8 py-10 max-w-5xl mx-auto">
        {/* Hero greeting */}
        <section className="relative">
          <div
            aria-hidden
            className="absolute -inset-x-4 -top-4 -z-10 h-64 pointer-events-none rounded-[32px]"
            style={{
              background:
                "radial-gradient(60% 80% at 80% 0%, color-mix(in oklch, var(--sage) 18%, transparent), transparent 70%)",
            }}
          />
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="eyebrow">Welcome back</p>
              <h2 className="mt-2 text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.025em] font-semibold text-ink">
                {greet()}, {session?.profile.firstName}.
              </h2>
              <p className="mt-3 text-[16px] leading-[1.55] text-ink-muted max-w-[58ch]">
                Your protocol is being prepared. We'll notify you the moment a physician approves it.
              </p>
            </div>
            {session && <StatusPill status={session.protocolStatus} />}
          </div>
        </section>

        {/* Two-card row */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <article className="rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-7 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Current protocol</span>
            </div>
            <h3 className="mt-4 text-[28px] font-semibold tracking-[-0.018em] text-ink">BPC-157</h3>
            <p className="mt-1 text-[13px] text-ink-muted">Recommended starter protocol</p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { l: "Dose", v: "250 mcg" },
                { l: "Frequency", v: "2× daily" },
                { l: "Length", v: "8 weeks" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-[var(--surface-elev)] border border-[var(--border)] px-3 py-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-ink-soft">{s.l}</div>
                  <div className="mt-1 text-[14px] font-semibold tabular text-ink">{s.v}</div>
                </div>
              ))}
            </div>

            <Link
              href="/app/plan"
              className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink hover:text-[var(--primary)] transition-colors"
            >
              View full plan
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </article>

          <article className="rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-7">
            <span className="eyebrow">Next steps</span>
            <ul className="mt-5 space-y-3">
              {NEXT_STEPS.map((s, i) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-3 group"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] text-[10px] font-semibold tabular text-ink-muted bg-[var(--surface-elev)]">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-[14px] text-ink group-hover:text-[var(--primary)] transition-colors">
                      {s.label}
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-ink-soft group-hover:translate-x-0.5 group-hover:text-[var(--primary)] transition-all"
                      strokeWidth={1.75}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* Ask Dr. Gabi */}
        <section className="mt-5 rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-7">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <span className="eyebrow">Ask Dr. Gabi</span>
              <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.012em] text-ink">
                Have a question? Get a personalized answer.
              </h3>
            </div>
            <ClipboardList className="hidden sm:block h-7 w-7 text-[var(--primary)]" strokeWidth={1.25} />
          </div>
          <form onSubmit={askGabi} className="mt-5 flex items-center gap-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Try: How long until I notice effects?"
              className="flex-1 h-12 px-4 rounded-full bg-[var(--surface-elev)] border border-[var(--border)] text-[14px] text-ink placeholder:text-ink-soft focus:border-[var(--ink)] focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 px-5 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[13px] font-medium hover:scale-[1.02] active:scale-[0.99] transition-transform disabled:opacity-50"
              disabled={!draft.trim()}
            >
              <Send className="h-3.5 w-3.5" strokeWidth={2} />
              Ask
            </button>
          </form>
        </section>

        {/* Recent records */}
        <section className="mt-5 rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-7">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Recent records</span>
            <Link href="/app/records" className="text-[12px] text-ink-muted hover:text-ink transition-colors">
              View all
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-[var(--border)]">
            {RECENT_RECORDS.map((r) => (
              <li key={r.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface-elev)] text-[var(--primary)]">
                  <FileText className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-medium text-ink truncate">{r.name}</div>
                  <div className="text-[11px] text-ink-soft">{r.type} · {r.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
