import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonLink({ href, children, variant = "primary" }: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const style = variant === "primary"
    ? "border-primary bg-primary text-surface hover:border-primary-dark hover:bg-primary-dark"
    : "border-border bg-transparent text-primary-dark hover:bg-surface-secondary";

  return (
    <Link href={href} className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-kit border px-5 py-3 text-sm font-medium ${style}`}>
      {children}
    </Link>
  );
}
