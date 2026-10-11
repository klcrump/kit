"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ClipboardList, CookingPot, House, MessageCircle, Settings, Users } from "lucide-react";

const destinations = [
  { label: "Home", icon: House, href: "/home" },
  { label: "Calendar", icon: CalendarDays },
  { label: "Meals", icon: CookingPot },
  { label: "Lists & Tasks", icon: ClipboardList },
  { label: "Household", icon: Users, href: "/household" },
  { label: "Kit", icon: MessageCircle, href: "/home#ask-kit" },
  { label: "Settings", icon: Settings },
];

export function AppNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Application navigation" className="flex flex-wrap gap-1 px-4 pb-5 lg:flex-col lg:px-4 lg:py-6">
      {destinations.map(({ label, icon: Icon, href }) => {
        const active = Boolean(href && !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`)));
        const className = `flex min-h-11 items-center gap-3 rounded-kit px-3 py-3 text-sm ${active ? "bg-surface-secondary font-medium text-primary" : href ? "text-muted hover:bg-background hover:text-primary" : "cursor-not-allowed text-muted"}`;
        const content = <><Icon aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0" /><span>{label}</span>{!href && <span className="ml-auto text-[10px] lg:ml-1">Soon</span>}</>;
        return href
          ? <Link key={label} href={href} aria-current={active ? (pathname === href ? "page" : "location") : undefined} className={className}>{content}</Link>
          : <button key={label} type="button" disabled title={`${label} is not available in this demo`} className={className}>{content}</button>;
      })}
    </nav>
  );
}
