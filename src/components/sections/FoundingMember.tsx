import { Check, Lock } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function FoundingMember() {
  const { eyebrow, headline, lede, scarcity, plan } = site.founding;
  return (
    <section id="founding" className="relative py-24 md:py-32 bg-[var(--surface-elev)] border-y border-[var(--border)]">
      <div className="container mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="mt-4 text-section !text-[32px] sm:!text-[38px] text-ink">{headline}</h2>
          <p className="mt-5 text-[15px] leading-[1.6] text-ink-muted">{lede}</p>
        </Reveal>

        {/* Scarcity bar */}
        <Reveal delay={0.1}>
          <div className="mt-12 mx-auto max-w-2xl rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 grid grid-cols-3 gap-4">
            {scarcity.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[11px] uppercase tracking-[0.1em] text-ink-muted">{s.label}</div>
                <div className="mt-0.5 text-[14px] font-semibold tabular text-ink">{s.value}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Pricing card */}
        <Reveal delay={0.18}>
          <div className="mt-10 mx-auto max-w-md rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-card overflow-hidden">
            <div className="px-7 pt-7 pb-6 border-b border-[var(--border)]">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{plan.title}</h3>
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]">
                  <Lock className="h-3 w-3" strokeWidth={2} />
                  Locked rate
                </span>
              </div>
              <p className="mt-2 text-[13px] text-ink-muted">{plan.tagline}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-[44px] font-semibold tabular tracking-[-0.03em] text-ink">{plan.price}</span>
                <span className="text-[13px] text-ink-muted">{plan.cadence}</span>
              </div>
            </div>

            <ul className="px-7 py-6 space-y-3">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-[14px] leading-[1.5] text-ink">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--sage)]/15 text-[var(--sage)] shrink-0">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <div className="px-7 pb-7">
              <button
                type="button"
                className="w-full h-12 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[14px] font-medium hover:scale-[1.01] transition-transform"
              >
                {plan.cta}
              </button>
              <p className="mt-3 text-center text-[12px] text-ink-muted">{plan.helper}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
