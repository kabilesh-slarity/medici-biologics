import type { ReactNode } from "react";
import { OnboardingProvider } from "@/lib/onboarding";

export default function StartLayout({ children }: { children: ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
