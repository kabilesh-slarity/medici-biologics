"use client";

import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { SettingsDrawer } from "@/components/settings/SettingsDrawer";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
          scrolled
            ? "bg-[color-mix(in_oklch,var(--bg)_80%,transparent)] backdrop-blur-md border-b border-[var(--border)]"
            : "border-b border-transparent",
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2 group" aria-label="Medici Biologics home">
            <Logomark />
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
              {site.brand.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
            {site.brand.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[13px] text-ink-muted hover:text-ink transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Open customization settings"
              onClick={() => setSettingsOpen(true)}
              className="h-10 w-10 inline-flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-surface-elev transition-colors"
            >
              <Settings2 className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>

            <LinkButton
              href={site.brand.primaryCta.href}
              variant="primary"
              size="sm"
              className={cn(
                "transition-opacity duration-300",
                scrolled ? "opacity-100" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto",
              )}
            >
              {site.brand.primaryCta.label}
            </LinkButton>
          </div>
        </div>
      </header>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}

function Logomark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-[var(--primary)]"
    >
      <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.25" opacity="0.6" />
      <circle cx="11" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}
