"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { StepShell } from "@/components/onboarding/StepShell";
import { ConsentCard } from "@/components/onboarding/ConsentCard";
import { Button } from "@/components/ui/Button";
import { useOnboarding } from "@/lib/onboarding";

const CONSENTS = [
  {
    key: "hipaa" as const,
    title: "HIPAA Authorization",
    summary: "Authorizes Medici Biologics and licensed physicians to use your health information for treatment.",
    fullText:
      "I authorize Medici Biologics and its licensed clinical partners to use, disclose, and request my protected health information (PHI) for the purposes of treatment, payment, and healthcare operations as defined under HIPAA. This authorization remains in effect until revoked in writing. I understand my information is encrypted in transit and at rest and is never sold to third parties.",
  },
  {
    key: "telehealth" as const,
    title: "Telehealth Consent",
    summary: "Acknowledges that physician review may occur asynchronously over secure messaging.",
    fullText:
      "I consent to receive medical evaluation, prescription, and care via telehealth methods including secure messaging, video, and asynchronous physician review. I understand that telehealth has potential limitations, that I can withdraw consent at any time, and that I retain all rights regarding the privacy of my health information.",
  },
  {
    key: "tos" as const,
    title: "Terms of Service & Privacy Policy",
    summary: "The standard agreement for using Medici Biologics services and the Dr. Gabi platform.",
    fullText:
      "By continuing, I agree to the Medici Biologics Terms of Service and Privacy Policy. I understand that Dr. Gabi AI provides clinical decision support and that final treatment decisions are made by licensed physicians. Subscription is recurring and may be cancelled at any time per the published policy.",
  },
];

export default function ConsentsPage() {
  const router = useRouter();
  const { state, updateConsents, hydrated } = useOnboarding();

  useEffect(() => {
    if (!hydrated) return;
    if (!state.profile.firstName) router.replace("/start");
  }, [hydrated, state, router]);

  const allChecked = state.consents.hipaa && state.consents.telehealth && state.consents.tos;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allChecked) return;
    router.push("/start/payment");
  };

  return (
    <OnboardingShell step={4}>
      <StepShell
        eyebrow="Step 4 of 5"
        title="A few quick agreements."
        subtitle="Required so a licensed physician can review your protocol."
        back="/start/profile"
      >
        <form onSubmit={onSubmit} className="space-y-4">
          {CONSENTS.map((c) => (
            <ConsentCard
              key={c.key}
              title={c.title}
              summary={c.summary}
              fullText={c.fullText}
              checked={state.consents[c.key]}
              onChange={(v) => updateConsents({ [c.key]: v })}
            />
          ))}

          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[var(--surface-elev)] text-[12px] text-ink-muted">
            <Lock className="h-3.5 w-3.5 text-[var(--sage)] shrink-0" strokeWidth={1.75} />
            256-bit encrypted. Never sold. Reviewed by licensed physicians.
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={!allChecked}
            className="w-full h-14 text-[15px]"
          >
            Continue to payment
          </Button>
        </form>
      </StepShell>
    </OnboardingShell>
  );
}
