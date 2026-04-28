"use client";

import { ShieldCheck, FileBadge2, Activity, BeakerIcon } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ImageUpload } from "@/components/ui/ImageUpload";

export function DrGabiHub() {
  const { eyebrow, headline, sub, preview } = site.hub;
  return (
    <section className="relative tile-deep py-28 md:py-36" aria-labelledby="hub-h">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: editorial copy + manifesto integrated, not hanging */}
          <Reveal className="lg:col-span-5">
            <div className="eyebrow">{eyebrow}</div>
            <h2
              id="hub-h"
              className="mt-4 text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] font-semibold text-ink"
            >
              {headline}
            </h2>
            <p className="mt-6 text-[17px] leading-[1.55] text-ink-muted max-w-[48ch]">
              {sub}
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              <Tag>Live with your physician</Tag>
              <Tag>Sourced & traced</Tag>
              <Tag>Reviewed before ship</Tag>
            </div>
          </Reveal>

          {/* Right: protocol approval card mock */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="relative rounded-[28px] bg-[var(--surface)] border border-[var(--border)] shadow-product overflow-hidden">
              {/* Status strip */}
              <div className="flex items-center justify-between gap-3 px-6 py-3.5 border-b border-[var(--border)] bg-[var(--surface-elev)]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--sage)] animate-pulse" />
                  <span className="text-[11px] uppercase tracking-[0.12em] text-ink-soft">Live</span>
                </div>
                <span className="text-[11px] tabular text-ink-soft">{preview.pending}</span>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <ShieldCheck className="h-[20px] w-[20px]" strokeWidth={1.6} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="text-[16px] font-semibold text-ink">{preview.title}</div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded-full">
                        Pending review
                      </span>
                    </div>
                    <p className="mt-2 text-[14px] leading-[1.55] text-ink-muted">
                      {preview.message}
                    </p>
                  </div>
                </div>

                {/* Detail rows */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <DetailRow icon={Activity} label="Biomarkers analyzed" value="50+" />
                  <DetailRow icon={BeakerIcon} label="Compounded by" value="Licensed lab" />
                </div>

                {/* Meta strip */}
                <div className="mt-6 pt-5 border-t border-[var(--border)] flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ink-soft">
                  {preview.meta.map((m) => (
                    <span key={m} className="inline-flex items-center gap-1.5">
                      <FileBadge2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {m}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    className="h-11 px-6 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[14px] font-medium hover:scale-[1.02] active:scale-[0.99] transition-transform"
                    type="button"
                  >
                    {preview.cta}
                  </button>
                  <button
                    className="h-11 px-5 rounded-full bg-transparent text-ink-muted hover:text-ink text-[14px] font-medium"
                    type="button"
                  >
                    Review details
                  </button>
                </div>
              </div>

              {/* Footer: bloodwork upload affordance */}
              <div className="border-t border-[var(--border)] bg-[var(--surface-elev)] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <ImageUpload
                    storageKey="hub-bloodwork-sample"
                    rounded="xl"
                    aspect="aspect-square"
                    className="w-20 shrink-0 shadow-product"
                    label="Upload"
                    hint=""
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] uppercase tracking-[0.12em] text-ink-soft">Try it</div>
                    <div className="mt-1 text-[14px] font-semibold text-ink">Upload your bloodwork</div>
                    <p className="mt-1 text-[12px] leading-[1.5] text-ink-muted max-w-[40ch]">
                      Drop a PDF or image. Dr. Gabi will preview the relevant biomarkers in seconds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 h-8 px-3 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[12px] font-medium text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)]" aria-hidden />
      {children}
    </span>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elev)] border border-[var(--border)] px-4 py-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--primary)]">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.12em] text-ink-soft">{label}</div>
        <div className="text-[13px] font-semibold text-ink truncate">{value}</div>
      </div>
    </div>
  );
}
