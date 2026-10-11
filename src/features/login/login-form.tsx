"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoCredentials, demoHousehold } from "@/lib/demo-household";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [filled, setFilled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [accountNotice, setAccountNotice] = useState("");

  function logIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== demoCredentials.email || password !== demoCredentials.password) {
      setError("Use the demo email and password below to explore Kit.");
      return;
    }
    setError("");
    setSubmitting(true);
    router.push("/home");
  }

  function fillDemo() {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    setError("");
    setFilled(true);
    setAccountNotice("");
  }

  const fieldClass = "mt-2 min-h-12 w-full rounded-kit border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted";

  return (
    <section aria-labelledby="login-heading" className="mx-auto w-full max-w-md">
      <h2 id="login-heading" className="font-display text-4xl tracking-tight text-primary-dark">Welcome back.</h2>
      <p className="mt-3 text-sm leading-6 text-muted">Log in to your household.</p>
      <form onSubmit={logIn} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" autoComplete="username" required value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder="you@example.com" aria-invalid={Boolean(error)} aria-describedby={error ? "login-error" : undefined} className={fieldClass} />
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <button type="button" onClick={() => setAccountNotice("Password recovery isn’t available in this demonstration. You can use the demo credentials below.")} className="text-xs text-muted" aria-describedby={accountNotice ? "account-note" : undefined}>Forgot password?</button>
          </div>
          <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "login-error" : undefined} className={fieldClass} />
        </div>
        {error && <p id="login-error" role="alert" className="text-sm leading-6 text-critical">{error}</p>}
        <Button type="submit" disabled={submitting} className="w-full">{submitting ? "Opening Kit…" : "Log in"}<ArrowRight aria-hidden="true" className="size-4" /></Button>
      </form>
      <div className="mt-5 text-center">
        <button type="button" onClick={() => setAccountNotice("Account creation isn’t available in this demonstration. Explore Kit with the demo credentials below.")} aria-describedby={accountNotice ? "account-note" : undefined} className="text-sm text-muted">Create account</button>
        <p id="account-note" role="status" className="mt-2 text-xs leading-5 text-muted">{accountNotice}</p>
      </div>
      <div className="mt-8 rounded-kit border border-border bg-surface-secondary p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Explore the demo</p>
        <p className="mt-3 text-sm leading-6">Step into the {demoHousehold.name} as {demoHousehold.members.alex.name}.</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex flex-wrap justify-between gap-2"><dt className="text-muted">Email</dt><dd>{demoCredentials.email}</dd></div>
          <div className="flex flex-wrap justify-between gap-2"><dt className="text-muted">Password</dt><dd>{demoCredentials.password}</dd></div>
        </dl>
        <button type="button" onClick={fillDemo} className="mt-5 min-h-11 text-sm font-medium text-primary underline underline-offset-4">Use demo credentials</button>
        <p role="status" className="text-xs leading-5 text-muted">{filled ? "Demo credentials filled. Select Log in to enter Kit." : ""}</p>
      </div>
    </section>
  );
}
