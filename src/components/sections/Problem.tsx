import { AlertCircle, Crosshair, ShieldOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

const ICONS: LucideIcon[] = [ShieldOff, Crosshair, AlertCircle];

export function Problem() {
  const { eyebrow, headline, lede, cards } = site.problem;
  return (
    <section
      id="problem"
      className="relative tile-elev py-28 md:py-36"
      aria-labelledby="problem-h"
    >
      <div className="container mx-auto">
        <Reveal className="max-w-3xl">
          <div className="eyebrow">{eyebrow}</div>
          <h2
            id="problem-h"
            className="mt-4 text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] font-semibold text-ink"
          >
            {headline}
          </h2>
          <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.55] text-ink-muted">{lede}</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c, i) => {
            const Icon = ICONS[i] ?? AlertCircle;
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                <article className="group relative h-full rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-7 transition-colors hover:border-[var(--ink)]">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-elev)] text-[var(--primary)] mb-6"
                    aria-hidden
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </span>
                  <div className="text-[10px] font-semibold tabular tracking-[0.16em] text-ink-soft uppercase">
                    0{i + 1}
                  </div>
                  <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.01em] text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-muted">{c.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
