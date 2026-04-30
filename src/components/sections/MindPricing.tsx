"use client";

import { useEffect } from "react";
import { CountUp } from "@/components/effects/CountUp";

const STANDARD_FEATURES = [
  "30-day Medici Mind supply",
  "Clinical intake review",
  "Dosing & protocol guidance",
  "Discreet shipping",
];

const MEMBER_FEATURES = [
  "Monthly Medici Mind supply",
  "Locked-in pricing for committed clients",
  "Priority access to Dr. Gabi guidance",
  "Quarterly clinician check-ins",
  "Early access to future protocols",
];

function CheckIcon({ tone = "emerald" }: { tone?: "emerald" | "ink" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M2.5 7.5l3 3 6-6"
        stroke={tone === "ink" ? "#0A0A0A" : "#1ECD92"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MindPricing() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".mind-price-card");
    const cleanups: (() => void)[] = [];
    cards.forEach((card) => {
      const sweep = card.querySelector<HTMLElement>(".mind-price-sweep");
      const handleMove = (e: Event) => {
        const pe = e as PointerEvent;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${pe.clientX - rect.left}px`);
        card.style.setProperty("--my", `${pe.clientY - rect.top}px`);
        if (sweep) sweep.style.opacity = "1";
      };
      const handleLeave = () => {
        if (sweep) sweep.style.opacity = "0";
      };
      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", handleLeave);
      cleanups.push(() => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", handleLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="pricing" style={{ background: "#F7F7F3", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(72px, 11vw, 140px) clamp(20px, 4vw, 48px)",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span
            style={{
              fontSize: 11,
              color: "#15A574",
              display: "block",
              marginBottom: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            No. 04
          </span>
          <h2
            style={{
              fontSize: "clamp(38px, 5.2vw, 68px)",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "#0A0A0A",
              marginBottom: 20,
            }}
          >
            Two ways
            <br />
            <em style={{ fontStyle: "italic", color: "#15A574" }}>to begin.</em>
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "#5A5A5A",
              fontWeight: 400,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Every order is reviewed by our medical team and dispensed by our licensed compounding
            partner.
          </p>
        </div>

        {/* Pricing cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            maxWidth: 960,
            margin: "0 auto",
            position: "relative",
          }}
          className="mind-pricing-grid"
        >
            {/* Standard */}
          <div
            className="mind-price-card mind-price-standard"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E8E2",
              borderRadius: 24,
              padding: "52px 44px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="mind-price-sweep"
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(800px circle at var(--mx, 50%) var(--my, 50%), rgba(30, 205, 146, 0.06), transparent 50%)",
                opacity: 0,
                transition: "opacity 400ms ease",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8C8C8C",
                marginBottom: 14,
                fontWeight: 600,
              }}
            >
              One-Time Purchase
            </div>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 600,
                marginBottom: 28,
                letterSpacing: "-0.02em",
                color: "#0A0A0A",
              }}
            >
              30-Day Protocol
            </h3>

            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#8C8C8C",
                  lineHeight: 1,
                  paddingBottom: 12,
                }}
              >
                $
              </span>
              <CountUp
                to={349}
                className="mind-price-amount"
                style={{
                  fontSize: 80,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  color: "#0A0A0A",
                  fontVariantNumeric: "tabular-nums",
                }}
              />
            </div>
            <div style={{ fontSize: 13, color: "#8C8C8C", marginBottom: 32, fontWeight: 400 }}>
              single supply &middot; no commitment
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 36px",
                borderTop: "1px solid #EFEFEF",
                paddingTop: 28,
              }}
            >
              {STANDARD_FEATURES.map((f) => (
                <li
                  key={f}
                  style={{
                    padding: "10px 0",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: "#1A1A1A",
                    fontWeight: 400,
                  }}
                >
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#qualify"
              style={{
                display: "block",
                padding: "16px",
                textAlign: "center",
                background: "transparent",
                color: "#0A0A0A",
                border: "1.5px solid #0A0A0A",
                borderRadius: 999,
                textDecoration: "none",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                transition: "background 0.2s ease, color 0.2s ease",
                position: "relative",
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#0A0A0A";
                el.style.color = "#F7F7F3";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.color = "#0A0A0A";
              }}
            >
              Order One Supply
            </a>
          </div>

          {/* Featured — Subscription */}
          <div
            className="mind-price-card mind-price-featured"
            style={{
              background: "#0A0A0A",
              border: "1px solid #0A0A0A",
              borderRadius: 24,
              padding: "0",
              position: "relative",
              color: "#F7F7F3",
              overflow: "hidden",
            }}
          >
            {/* Gradient sweep */}
            <div
              className="mind-price-sweep"
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(800px circle at var(--mx, 50%) var(--my, 50%), rgba(30, 205, 146, 0.18), transparent 50%)",
                opacity: 0,
                transition: "opacity 400ms ease",
                pointerEvents: "none",
              }}
            />

            {/* Best Value banner */}
            <div
              style={{
                background: "#1ECD92",
                color: "#0A0A0A",
                padding: "11px 20px",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
                textAlign: "center",
                position: "relative",
                zIndex: 2,
              }}
            >
              Best Value — Most Popular
            </div>

            <div className="mind-price-featured-inner" style={{ padding: "44px 44px 52px" }}>

            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1ECD92",
                marginBottom: 14,
                fontWeight: 600,
                position: "relative",
              }}
            >
              Subscription
            </div>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 600,
                marginBottom: 28,
                letterSpacing: "-0.02em",
                color: "#F7F7F3",
                position: "relative",
              }}
            >
              Locked Member Rate
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 4,
                marginBottom: 6,
                position: "relative",
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#1ECD92",
                  lineHeight: 1,
                  paddingBottom: 12,
                }}
              >
                $
              </span>
              <CountUp
                to={319}
                className="mind-price-amount"
                style={{
                  fontSize: 80,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  color: "#F7F7F3",
                  fontVariantNumeric: "tabular-nums",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(247, 247, 243, 0.5)",
                marginBottom: 16,
                position: "relative",
              }}
            >
              per month &middot; cancel anytime
            </div>

            {/* Savings callout inline */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 32,
                padding: "6px 13px",
                background: "rgba(30, 205, 146, 0.12)",
                border: "1px solid rgba(30, 205, 146, 0.28)",
                borderRadius: 999,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#1ECD92",
                position: "relative",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#1ECD92",
                  boxShadow: "0 0 8px #1ECD92",
                  flexShrink: 0,
                }}
              />
              Save $360 / yr
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 36px",
                borderTop: "1px solid rgba(247, 247, 243, 0.1)",
                paddingTop: 28,
                position: "relative",
              }}
            >
              {MEMBER_FEATURES.map((f) => (
                <li
                  key={f}
                  style={{
                    padding: "10px 0",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: "rgba(247, 247, 243, 0.82)",
                    fontWeight: 400,
                  }}
                >
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#qualify"
              style={{
                display: "block",
                padding: "16px",
                textAlign: "center",
                background: "#1ECD92",
                color: "#0A0A0A",
                border: "1.5px solid #1ECD92",
                borderRadius: 999,
                textDecoration: "none",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
                position: "relative",
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#2BE5A6";
                el.style.borderColor = "#2BE5A6";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#1ECD92";
                el.style.borderColor = "#1ECD92";
                el.style.transform = "translateY(0)";
              }}
            >
              Begin Subscription
            </a>
            </div>{/* end mind-price-featured-inner */}
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 40,
            fontSize: 13,
            color: "#8C8C8C",
            fontWeight: 400,
          }}
        >
          No payment processed until your intake is reviewed and approved by our clinical team.
        </p>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .mind-pricing-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .mind-price-standard {
            order: 1;
            padding: 36px 28px !important;
          }
          .mind-price-featured { order: 2; }
          .mind-price-featured-inner {
            padding: 32px 28px 40px !important;
          }
          .mind-price-amount {
            font-size: 64px !important;
          }
        }
      `}</style>
    </section>
  );
}
