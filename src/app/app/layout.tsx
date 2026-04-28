import type { ReactNode } from "react";
import { SideRail } from "@/components/dashboard/SideRail";
import { RequireSession } from "@/components/dashboard/RequireSession";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <RequireSession>
      <div className="min-h-dvh bg-[var(--bg)] text-ink">
        <SideRail />
        <div className="md:pl-[224px] pb-16 md:pb-0">
          {children}
        </div>
      </div>
    </RequireSession>
  );
}
