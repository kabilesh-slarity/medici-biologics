"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home as HomeIcon,
  MessageSquare,
  ClipboardList,
  FolderOpen,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/cn";

const NAV: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Home", href: "/app", icon: HomeIcon },
  { label: "Chat", href: "/app/chat", icon: MessageSquare },
  { label: "Treatment Plan", href: "/app/plan", icon: ClipboardList },
  { label: "Records", href: "/app/records", icon: FolderOpen },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

export function SideRail() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, signOut } = useSession();
  const initials = session
    ? `${session.profile.firstName[0] ?? ""}${session.profile.lastName[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <>
      {/* Desktop side rail */}
      <aside className="hidden md:flex fixed top-0 bottom-0 left-0 w-[224px] flex-col border-r border-[var(--border)] bg-[var(--surface)] z-40">
        <Link href="/app" className="flex items-center gap-2.5 px-5 h-16 border-b border-[var(--border)]">
          <Logomark />
          <span className="text-[14px] font-semibold tracking-[-0.01em] text-ink">Medici</span>
        </Link>

        <nav className="flex-1 px-3 py-4" aria-label="Primary">
          <ul className="space-y-0.5">
            {NAV.map((n) => {
              const active = n.href === "/app" ? pathname === "/app" : pathname?.startsWith(n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={cn(
                      "relative flex items-center gap-3 h-11 px-3 rounded-xl text-[13.5px] transition-colors",
                      active
                        ? "bg-[var(--surface-elev)] text-ink"
                        : "text-ink-muted hover:text-ink hover:bg-[var(--surface-elev)]",
                    )}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-[var(--primary)]"
                      />
                    )}
                    <n.icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-[var(--border)] p-3">
          <Link
            href="/app/settings"
            className="flex items-center gap-3 h-12 px-2 rounded-xl hover:bg-[var(--surface-elev)] transition-colors"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--bg)] text-[12px] font-semibold">
              {initials || "M"}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-ink truncate">
                {session ? `${session.profile.firstName} ${session.profile.lastName}` : "Member"}
              </div>
              <div className="text-[11px] text-ink-soft truncate">Founding Member</div>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => { signOut(); router.push("/"); }}
            className="mt-1 flex items-center gap-2 w-full h-9 px-2 rounded-lg text-[12px] text-ink-soft hover:text-ink hover:bg-[var(--surface-elev)] transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Primary"
        className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-[var(--surface)] border-t border-[var(--border)] z-40"
      >
        <ul className="grid grid-cols-5 h-full">
          {NAV.map((n) => {
            const active = n.href === "/app" ? pathname === "/app" : pathname?.startsWith(n.href);
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={cn(
                    "h-full flex flex-col items-center justify-center gap-1 text-[10px]",
                    active ? "text-ink" : "text-ink-soft",
                  )}
                >
                  <n.icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  {n.label.split(" ")[0]}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

function Logomark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden className="text-[var(--primary)]">
      <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.25" opacity="0.6" />
      <circle cx="11" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}
