import { ShieldCheck, FileBadge2 } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function DrGabiHub() {
  const { eyebrow, headline, preview } = site.hub;
  return (
    <section className="relative -mt-12 md:-mt-16 pb-24 md:pb-32" aria-labelledby="hub-h">
      <div className="container mx-auto">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-card p-6 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <div className="eyebrow">{eyebrow}</div>
                <h2 id="hub-h" className="mt-3 text-[20px] sm:text-[22px] font-semibold tracking-[-0.01em] text-ink">
                  {headline}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)] animate-pulse" aria-hidden />
                Live with your physician
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--surface-elev)] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold text-ink">{preview.title}</div>
                    <div className="text-[12px] text-ink-muted">{preview.pending}</div>
                  </div>
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--accent)]">
                  Pending
                </span>
              </div>

              <p className="mt-4 text-[14px] leading-[1.55] text-ink max-w-prose">
                {preview.message}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ink-muted">
                {preview.meta.map((m) => (
                  <span key={m} className="inline-flex items-center gap-1.5">
                    <FileBadge2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {m}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  className="h-10 px-5 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[13px] font-medium hover:scale-[1.02] transition-transform"
                  type="button"
                >
                  {preview.cta}
                </button>
                <button
                  className="h-10 px-5 rounded-full bg-transparent text-ink-muted hover:text-ink text-[13px] font-medium"
                  type="button"
                >
                  Review details
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-16 mx-auto max-w-3xl text-center text-[22px] sm:text-[28px] font-semibold tracking-[-0.02em] text-ink">
            {site.manifesto1}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
