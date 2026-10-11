import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-kit bg-primary px-5 py-3 text-sm font-medium text-surface hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
