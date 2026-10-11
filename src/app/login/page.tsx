import type { Metadata } from "next";
import { LoginForm } from "@/features/login/login-form";
import { Wordmark } from "@/components/ui/wordmark";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Log in · Kit" };

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10">
      <div className="flex items-center justify-between gap-6">
        <Wordmark />
        <Link href="/" className="flex min-h-11 items-center gap-2 text-sm text-muted hover:text-primary">
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to Kit
        </Link>
      </div>
      <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-2 lg:gap-24 lg:py-20">
        <div className="max-w-md">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.16em] text-primary">A little help for the life you share</p>
          <h1 className="font-display text-5xl leading-[1.08] tracking-tight text-primary-dark sm:text-6xl">Less to remember.<br /><span className="text-primary">More living.</span></h1>
          <p className="mt-6 max-w-sm text-base leading-7 text-muted">A calmer place for the moving pieces of household life.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
