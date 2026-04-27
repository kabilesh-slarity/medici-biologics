import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

export function Problem() {
  const { eyebrow, stat, headline, lede, cards } = site.problem;
  return (
    <section
      id="problem"
      className="relative py-24 md:py-32 border-t border-[var(--border)]"
      aria-labelledby="problem-h"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="eyebrow">{eyebrow}</div>
            <h2 id="problem-h" className="mt-4 text-section text-ink !text-[28px] sm:!text-[32px]">
              {headline}
            </h2>
            <p className="mt-5 max-w-prose text-[16px] leading-[1.6] text-ink-muted">{lede}</p>

            <div className="mt-10 flex items-baseline gap-4">
              <span className="text-[80px] sm:text-[112px] leading-[0.9] font-semibold tracking-[-0.04em] text-[var(--primary)]">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </span>
              <p className="max-w-[14rem] text-[13px] text-ink-muted leading-[1.5]">{stat.label}</p>
            </div>
          </Reveal>

          <div className="lg:col-span-7 flex flex-col gap-3">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <article className="group relative rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-7 transition-colors hover:border-[var(--ink)]">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="eyebrow !text-[11px]">{c.title}</div>
                      <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.01em] text-ink">
                        {c.subtitle}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.6] text-ink-muted max-w-prose">
                        {c.body}
                      </p>
                    </div>
                    <span
                      className="shrink-0 mt-1 h-8 w-8 rounded-full bg-[var(--surface-elev)] border border-[var(--border)] grid place-items-center text-[11px] tabular text-ink-muted"
                      aria-hidden
                    >
                      0{i + 1}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
