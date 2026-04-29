"use client";

import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import { SettingsDrawer } from "@/components/settings/SettingsDrawer";

const NAV_LINKS = [
  { href: "#protocol", label: "Protocol" },
  { href: "#science", label: "Science" },
  { href: "#pricing", label: "Pricing" },
  { href: "#qualify", label: "Qualify" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "border-color 0.35s ease",
          background: "#0A0A0A",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(247, 247, 243, 0.07)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 48px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          {/* Wordmark */}
          <a
            href="#"
            aria-label="Medici Mind home"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
          >
            <Wordmark />
          </a>

          {/* Nav links */}
          <nav aria-label="Primary" className="hidden md:flex" style={{ gap: 32, display: "flex", alignItems: "center" }}>
            {NAV_LINKS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                style={{
                  fontSize: 13,
                  letterSpacing: "0.01em",
                  color: "rgba(247, 247, 243, 0.65)",
                  textDecoration: "none",
                  transition: "color 0.18s ease",
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F7F7F3")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(247, 247, 243, 0.65)")}
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              aria-label="Open customization settings"
              onClick={() => setSettingsOpen(true)}
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                color: "rgba(247, 247, 243, 0.45)",
                cursor: "pointer",
                transition: "color 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "#F7F7F3";
                el.style.background = "rgba(247, 247, 243, 0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "rgba(247, 247, 243, 0.45)";
                el.style.background = "transparent";
              }}
            >
              <Settings2 style={{ width: 16, height: 16 }} strokeWidth={1.5} />
            </button>

            <a
              href="#qualify"
              style={{
                padding: "9px 20px",
                background: "#1ECD92",
                color: "#0A0A0A",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 700,
                borderRadius: 999,
                transition: "background 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2BE5A6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#1ECD92")}
            >
              Begin Intake
            </a>
          </div>
        </div>
      </header>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}

function Wordmark() {
  return (
    <span
      style={{
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: "-0.02em",
        color: "#F7F7F3",
        textTransform: "lowercase",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      medi
      <span
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          background: "#1ECD92",
          borderRadius: "50%",
          margin: "0 1px",
          transform: "translateY(-3px)",
          flexShrink: 0,
        }}
      />
      ci
    </span>
  );
}
