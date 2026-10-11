import Link from "next/link";
import type { ReactNode } from "react";
import { AppNavigation } from "@/components/layout/app-navigation";
import { Wordmark } from "@/components/ui/wordmark";
import { MemberAvatar } from "@/components/ui/member-avatar";
import { demoHousehold } from "@/lib/demo-household";

export function AppShell({ children }: { children: ReactNode }) {
  const user = demoHousehold.members[demoHousehold.primaryUserId];
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[224px_1fr]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-10 focus:rounded-kit focus:bg-surface focus:px-4 focus:py-3">Skip to content</a>
      <aside className="border-b border-border bg-surface lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between px-6 py-7 lg:block lg:px-8 lg:pt-10">
          <Wordmark />
          <p className="text-xs text-muted lg:mt-5">{demoHousehold.name}</p>
        </div>
        <AppNavigation />
        <div className="hidden border-t border-border px-6 py-6 lg:mt-auto lg:block">
          <div className="flex items-center gap-3"><MemberAvatar memberId={user.id} className="flex size-8 items-center justify-center rounded-full text-xs font-medium text-surface" /><div><p className="text-sm">{user.name}</p><p className="mt-1 text-xs text-muted">Demo household</p></div></div>
          <Link href="/login" className="mt-4 inline-flex min-h-10 items-center text-xs text-muted hover:text-primary">Back to login</Link>
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
