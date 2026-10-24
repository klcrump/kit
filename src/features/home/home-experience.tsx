"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, CheckCheck, Clock3, CookingPot, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MemberLabel } from "@/components/ui/member-label";
import { demoDay, demoHousehold } from "@/lib/demo-household";

export function HomeExperience() {
  const [approved, setApproved] = useState(false);
  const [message, setMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [reply, setReply] = useState("");
  const [askError, setAskError] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const askPending = useRef(false);
  const user = demoHousehold.members[demoHousehold.primaryUserId];
  const cook = demoHousehold.members[demoDay.dinner.cookId];

  async function handleAsk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim() || askPending.current) return;

    const submitted = message.trim();
    askPending.current = true;
    setSubmittedMessage(submitted);
    setMessage("");
    setIsAsking(true);
    setReply("");
    setAskError("");

    try {
      const response = await fetch("/api/ask-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: submitted }),
      });
      const data: unknown = await response.json();

      if (!response.ok || !data || typeof data !== "object" ||
        !("reply" in data) || typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("Ask Kit request failed");
      }

      setReply(data.reply);
    } catch {
      setAskError("Kit couldn’t respond right now. Please try again.");
    } finally {
      askPending.current = false;
      setIsAsking(false);
    }
  }

  return (
    <main id="main" className="mx-auto max-w-5xl px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
      <header>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <p>{demoDay.label}</p>
        </div>
        <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight text-primary-dark sm:text-5xl">Good morning, {user.firstName}.</h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted">{demoDay.summary}</p>
      </header>

      <div className="mt-10 grid gap-x-12 gap-y-10 xl:grid-cols-[1.2fr_0.8fr]">
        <section aria-labelledby="today-heading">
          <h2 id="today-heading" className="font-display text-2xl text-primary-dark">Today <span className="ml-2 font-sans text-xs text-muted">Your daily brief</span></h2>
          <ol className="mt-5 divide-y divide-border border-t border-border">
            {demoDay.brief.map((item) => {
              const changed = approved && item.id === demoDay.change.itemId;
              const pending = !approved && item.id === demoDay.change.itemId;
              return (
                <li key={item.id} className="flex gap-5 py-5">
                  <p className="w-16 shrink-0 pt-0.5 text-xs leading-6 text-muted">{changed ? demoDay.change.proposedTime : item.time}{pending && <span className="block">Current</span>}</p>
                  <div>
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    {pending && <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-5 text-primary"><Clock3 aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />Proposed: {demoDay.change.proposedTime} · Awaiting your approval</p>}
                    <p className="mt-1.5 text-sm leading-6 text-muted">{changed ? demoDay.change.approvedDetail : item.detail}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">{item.members.map((id) => <MemberLabel key={id} memberId={id} />)}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section aria-labelledby="change-heading" className="self-start rounded-kit border border-border bg-surface p-6">
          <div className="flex items-center justify-between gap-4"><h2 id="change-heading" className="font-display text-2xl text-primary-dark">What changed</h2>{approved ? <Check aria-hidden="true" className="size-5 text-primary" /> : <Clock3 aria-hidden="true" className="size-5 text-primary" />}</div>
          {!approved && (
            <>
              <p className="mt-4 text-xs font-medium text-primary">One update to review</p>
              <p className="mt-3 text-base font-medium leading-7">{demoDay.change.message}</p>
              <div className="mt-3"><MemberLabel memberId={demoDay.change.memberId} /></div>
              <p className="mt-3 text-sm leading-6 text-muted">Current time: {demoDay.change.previousTime}. Approve to update your daily brief; {user.firstName} is still handling the ride.</p>
              <Button onClick={() => setApproved(true)} className="mt-5 w-full">Approve update <Check aria-hidden="true" className="size-4" /></Button>
            </>
          )}
          <p role="status" aria-live="polite" className={approved ? "mt-4 text-sm leading-7 text-muted" : "sr-only"}>{approved ? "You’re caught up. Nothing needs your attention right now." : ""}</p>
        </section>
      </div>

      <section aria-labelledby="dinner-heading" className="mt-8 border-y border-border py-6">
        <div className="flex gap-4">
          <CookingPot aria-hidden="true" strokeWidth={1.5} className="mt-1 size-5 shrink-0 text-primary" />
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h2 id="dinner-heading" className="font-display text-2xl text-primary-dark">Dinner is handled</h2>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted"><CheckCheck aria-hidden="true" className="size-4 text-primary" /> No action needed</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-sm text-muted">{demoDay.dinner.title}</p>
              <a href={demoDay.dinner.recipeUrl} target="_blank" rel="noopener noreferrer" aria-label={`View recipe for ${demoDay.dinner.title} (example link, opens in a new tab)`} className="inline-flex items-center gap-1.5 text-xs text-muted underline decoration-border underline-offset-4 hover:text-primary">
                View recipe <ArrowRight aria-hidden="true" className="size-3.5" />
              </a>
            </div>
            <p className="mt-1 text-sm leading-6 text-muted">{cook.firstName} is cooking at {demoDay.dinner.time}. {demoDay.dinner.detail}</p>
            <div className="mt-2"><MemberLabel memberId={demoDay.dinner.cookId} /></div>
          </div>
        </div>
      </section>

      <section id="ask-kit" aria-labelledby="ask-heading" className="mt-8">
        <div className="flex items-center gap-3"><MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5 text-primary" /><h2 id="ask-heading" className="font-display text-2xl text-primary-dark">Ask Kit</h2></div>
        {submittedMessage && (
          <div aria-label="Current exchange with Kit" className="mt-4 rounded-kit border border-border bg-surface p-4">
            <div>
              <p className="text-xs font-medium text-muted">You</p>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7">{submittedMessage}</p>
            </div>
            <div role="status" aria-live="polite" aria-atomic="true" className="mt-4 border-t border-border pt-4">
              <p className="text-xs font-medium text-primary">Kit</p>
              {isAsking && <p className="mt-2 text-sm leading-6 text-muted">Kit is thinking…</p>}
              {reply && <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-muted">{reply}</p>}
            </div>
            {askError && <p role="alert" className="mt-2 text-sm leading-6 text-muted">{askError}</p>}
          </div>
        )}
        <form onSubmit={handleAsk} aria-busy={isAsking} className="mt-4 flex items-center gap-3 rounded-kit border border-border bg-surface px-4 py-3">
          <label htmlFor="ask-kit-input" className="sr-only">Ask Kit a question</label>
          <input id="ask-kit-input" type="text" placeholder="What’s on your mind?" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={4000} disabled={isAsking} required className="min-h-8 min-w-0 flex-1 bg-transparent text-sm text-muted placeholder:text-muted" />
          <button type="submit" disabled={isAsking || !message.trim()} aria-label="Send to Kit" className="flex size-10 shrink-0 items-center justify-center rounded-kit bg-surface-secondary text-primary disabled:cursor-not-allowed disabled:opacity-60"><ArrowRight aria-hidden="true" className="size-4" /></button>
        </form>
      </section>

      <section aria-labelledby="upcoming-heading" className="mt-10">
        <h2 id="upcoming-heading" className="font-display text-2xl text-primary-dark">Coming up</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {demoDay.upcoming.map((item) => <div key={item.id} className="border-t border-border pt-4"><p className="text-xs text-muted">{item.when}</p><h3 className="mt-2 text-sm font-medium">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p><div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">{item.members.map((id) => <MemberLabel key={id} memberId={id} />)}</div></div>)}
        </div>
      </section>
      <p className="mt-10 flex items-start gap-2 border-t border-border pt-6 text-sm leading-6 text-muted"><CheckCheck aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />Nothing else needs your attention right now.</p>
    </main>
  );
}
