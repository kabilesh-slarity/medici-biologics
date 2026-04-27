import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function BetterWay() {
  const { eyebrow, headline, body } = site.betterWay;
  return (
    <section
      className="relative bg-[var(--primary)] text-[var(--bg)]"
      aria-labelledby="better-h"
    >
      <div className="container mx-auto py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <Reveal className="lg:col-span-4">
            <div className="eyebrow !text-[var(--bg)] opacity-60">{eyebrow}</div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.05}>
            <h2 id="better-h" className="text-section !text-[28px] sm:!text-[36px] !text-[var(--bg)]">
              {headline}
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-[1.6] opacity-80">{body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
