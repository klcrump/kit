import Link from "next/link";
import type { ReactNode } from "react";
import { CalendarDays, ClipboardList, CookingPot, House, MessageCircle, Settings, Users } from "lucide-react";
import { Wordmark } from "@/components/ui/wordmark";
import { demoHousehold } from "@/lib/demo-household";

const destinations = [
  { label: "Home", icon: House, href: "/home" },
  { label: "Calendar", icon: CalendarDays },
  { label: "Meals", icon: CookingPot },
  { label: "Lists & Tasks", icon: ClipboardList },
  { label: "Household", icon: Users },
  { label: "Kit", icon: MessageCircle, href: "/home#ask-kit" },
  { label: "Settings", icon: Settings },
];

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
        <nav aria-label="Application navigation" className="flex flex-wrap gap-1 px-4 pb-5 lg:flex-col lg:px-4 lg:py-6">
          {destinations.map(({ label, icon: Icon, href }) => {
            const active = label === "Home";
            const className = `flex min-h-11 items-center gap-3 rounded-kit px-3 py-3 text-sm ${active ? "bg-surface-secondary font-medium text-primary" : href ? "text-muted hover:bg-background hover:text-primary" : "cursor-not-allowed text-muted"}`;
            const content = <><Icon aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0" /><span>{label}</span>{!href && <span className="ml-auto text-[10px] lg:ml-1">Soon</span>}</>;
            return href ? <Link key={label} href={href} aria-current={active ? "page" : undefined} className={className}>{content}</Link> : <button key={label} type="button" disabled title={`${label} is not available in this demo`} className={className}>{content}</button>;
          })}
        </nav>
        <div className="hidden border-t border-border px-6 py-6 lg:mt-auto lg:block">
          <div className="flex items-center gap-3"><span aria-hidden="true" className={`flex size-8 items-center justify-center rounded-full text-xs font-medium text-surface ${user.color}`}>{user.firstName[0]}</span><div><p className="text-sm">{user.name}</p><p className="mt-1 text-xs text-muted">Demo household</p></div></div>
          <Link href="/login" className="mt-4 inline-flex min-h-10 items-center text-xs text-muted hover:text-primary">Back to login</Link>
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
