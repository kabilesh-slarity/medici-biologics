"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { StepShell } from "@/components/onboarding/StepShell";
import { Field } from "@/components/onboarding/Field";
import { OrderSummary } from "@/components/onboarding/OrderSummary";
import { Button } from "@/components/ui/Button";
import { useOnboarding, formatCardNumber, detectCardBrand } from "@/lib/onboarding";
import { useSession } from "@/lib/session";

type CardBrand = ReturnType<typeof detectCardBrand>;

export default function PaymentPage() {
  const router = useRouter();
  const { state, updatePayment, clear, hydrated } = useOnboarding();
  const { setSession } = useSession();

  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const expRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (submitted) return;
    if (!state.profile.firstName) router.replace("/start");
    if (!state.consents.tos) router.replace("/start/consents");
    setCardNumber(state.payment.cardNumber);
    setExp(state.payment.exp);
    setCvc(state.payment.cvc);
    setZip(state.payment.zip);
  }, [hydrated, state, router, submitted]);

  const brand: CardBrand = detectCardBrand(cardNumber);
  const valid =
    cardNumber.replace(/\s/g, "").length >= 15 &&
    /^\d{2}\/\d{2}$/.test(exp) &&
    cvc.length >= 3 &&
    zip.length >= 5;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    updatePayment({ cardNumber, exp, cvc, zip });

    // Simulate Stripe round-trip
    await new Promise((r) => setTimeout(r, 1200));

    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    setSession({
      mode: "demo",
      phone: state.phone,
      profile: { ...state.profile, phone: state.phone },
      paidAt: new Date().toISOString(),
      protocolStatus: "pending",
      cardLast4: last4,
      cardBrand: brand,
    });
    setSubmitted(true);
    clear();
    router.push("/start/welcome");
  };

  return (
    <OnboardingShell step={5} wide>
      <StepShell
        eyebrow="Step 5 of 5"
        title="Confirm and pay."
        subtitle="Your card is processed securely. Cancel anytime in Settings."
        back="/start/consents"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <OrderSummary />
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-7 space-y-4">
              <Field
                label="Card number"
                name="cardNumber"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  setCardNumber(formatted);
                  if (formatted.replace(/\s/g, "").length >= 16) expRef.current?.focus();
                }}
                suffix={<BrandGlyph brand={brand} />}
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  ref={expRef}
                  label="Expiry"
                  name="exp"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={exp}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                    const formatted = v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
                    setExp(formatted);
                    if (formatted.length === 5) cvcRef.current?.focus();
                  }}
                />
                <Field
                  ref={cvcRef}
                  label="CVC"
                  name="cvc"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setCvc(v);
                    if (v.length >= 3) zipRef.current?.focus();
                  }}
                />
              </div>
              <Field
                ref={zipRef}
                label="ZIP / Postal code"
                name="zip"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="78704"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              />

              <Button
                type="submit"
                size="lg"
                variant="primary"
                disabled={!valid || submitting}
                className="w-full h-14 text-[15px] mt-2"
              >
                {submitting ? (
                  <>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Loader2 className="h-4 w-4" strokeWidth={2} />
                    </motion.span>
                    Processing securely…
                  </>
                ) : (
                  <>
                    Pay $228
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-ink-soft">
                <Lock className="h-3 w-3" strokeWidth={1.75} />
                Secured by Stripe-grade encryption
              </div>
            </form>
        </div>
      </StepShell>
    </OnboardingShell>
  );
}

function BrandGlyph({ brand }: { brand: CardBrand }) {
  const map: Record<CardBrand, string> = {
    visa: "VISA",
    mastercard: "MC",
    amex: "AMEX",
    discover: "DISC",
    unknown: "•••",
  };
  return (
    <span className="inline-flex h-6 w-10 items-center justify-center rounded bg-[var(--surface-elev)] border border-[var(--border)] text-[9px] font-semibold tracking-wider text-ink">
      {map[brand]}
    </span>
  );
}
