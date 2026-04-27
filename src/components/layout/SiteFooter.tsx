import { site } from "@/content/site";

export function SiteFooter() {
  const { name, disclaimer, columns, legal, copyright } = site.footer;
  return (
    <footer className="relative mt-12 border-t border-[var(--border)] bg-[var(--surface-elev)]">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{name}</div>
            <p className="mt-4 text-[12px] leading-[1.6] text-ink-muted max-w-md">{disclaimer}</p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-8">
            {columns.map((col) => (
              <div key={col.label}>
                <div className="eyebrow !text-[11px]">{col.label}</div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[13px] text-ink-muted hover:text-ink transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="hairline mt-14 mb-6" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[12px] text-ink-muted">{copyright}</span>
          <div className="flex gap-5">
            {legal.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[12px] text-ink-muted hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
