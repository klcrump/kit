"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CarFront, House, NotebookPen, PawPrint, Wrench, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { MemberAvatar } from "@/components/ui/member-avatar";
import { useHousehold } from "@/features/household/household-provider";
import { ageOnDate, demoHousehold, demoPetDetails, demoPersonProfiles, householdColors, type HouseholdMember, type MemberId } from "@/lib/demo-household";
import { formatKnowledgeDate, knowledgeToday } from "@/lib/demo-knowledge";

const homeAreas = [
  { title: "Our Home", detail: "The everyday details of where you live.", icon: House },
  { title: "Vehicles", detail: "Useful details for getting everyone around.", icon: CarFront },
  { title: "Services", detail: "The people and services your household relies on.", icon: Wrench },
];

export function HouseholdOverview() {
  const { colors, setMemberColor, memories } = useHousehold();
  const [notice, setNotice] = useState("");
  const members: HouseholdMember[] = Object.values(demoHousehold.members);
  const [selectedId, setSelectedId] = useState<MemberId | "scout" | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedPerson = selectedId && selectedId !== "scout" ? demoHousehold.members[selectedId] : null;
  const selectedPet = demoHousehold.pets.find((pet) => pet.id === selectedId);
  const profile = selectedPerson ? demoPersonProfiles[selectedPerson.id] : null;
  const rememberedFacts = memories.filter((memory) => memory.scope === selectedPerson?.id && (!memory.expiresOn || memory.expiresOn >= knowledgeToday)).slice(0, 2);

  function openDetails(id: MemberId | "scout") {
    setSelectedId(id);
    dialogRef.current?.showModal();
  }

  return (
    <main id="main" className="mx-auto max-w-5xl px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
      <header>
        <p className="text-xs text-muted">{demoHousehold.name}</p>
        <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight text-primary-dark sm:text-5xl">Household</h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted">What Kit knows about your life, and the people you share it with.</p>
      </header>

      <section aria-labelledby="knowledge-heading" className="mt-10 rounded-kit bg-surface-secondary p-6 sm:p-8">
        <NotebookPen aria-hidden="true" strokeWidth={1.5} className="size-5 text-primary" />
        <h2 id="knowledge-heading" className="mt-4 font-display text-3xl text-primary-dark">What Kit Knows</h2>
        <p className="mt-3 max-w-lg text-base leading-7 text-muted">The things Kit remembers so it can help without asking the same questions again.</p>
        <p className="mt-3 text-sm leading-6 text-muted">Preferences, rules, and what matters for now. Always yours to correct.</p>
        <div className="mt-6"><ButtonLink href="/household/knowledge">Open What Kit Knows <ArrowRight aria-hidden="true" className="size-4" /></ButtonLink></div>
      </section>

      <div className="mt-10 grid gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:gap-12">
        <section aria-labelledby="people-heading">
          <h2 id="people-heading" className="font-display text-2xl text-primary-dark">People &amp; Pets</h2>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {members.map((member) => (
              <li key={member.id}>
                <button type="button" onClick={() => openDetails(member.id)} aria-haspopup="dialog" className="flex w-full cursor-pointer items-center gap-4 py-4 text-left hover:bg-surface-secondary">
                  <MemberAvatar memberId={member.id} className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-medium text-surface" />
                  <span className="flex-1"><span className="block text-sm font-medium">{member.name}</span><span className="mt-1 block text-xs text-muted">{member.role === "Adult" ? "Adult" : `Age ${member.age}`}{member.id === demoHousehold.primaryUserId ? " · You" : ""}</span></span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                </button>
              </li>
            ))}
            {demoHousehold.pets.map((pet) => (
              <li key={pet.id}>
                <button type="button" onClick={() => openDetails(pet.id)} aria-haspopup="dialog" className="flex w-full cursor-pointer items-center gap-4 py-4 text-left hover:bg-surface-secondary">
                  <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-primary"><PawPrint className="size-4" /></span>
                  <span className="flex-1"><span className="block text-sm font-medium">{pet.name}</span><span className="mt-1 block text-xs text-muted">{pet.species}</span></span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="home-heading">
          <h2 id="home-heading" className="font-display text-2xl text-primary-dark">Household Details</h2>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {homeAreas.map(({ title, detail, icon: Icon }) => (
              <button key={title} type="button" onClick={() => setNotice(`${title} is coming soon. For now, you can explore People & Pets and What Kit Knows.`)} className="flex w-full items-start gap-4 py-5 text-left hover:text-primary">
                <Icon aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="flex-1"><span className="block text-sm font-medium">{title}</span><span className="mt-1 block text-sm leading-6 text-muted">{detail}</span></span>
                <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted" />
              </button>
            ))}
          </div>
          <p role="status" className="mt-4 text-sm leading-6 text-muted">{notice}</p>
        </section>
      </div>
      <dialog ref={dialogRef} onClose={() => setSelectedId(null)} aria-labelledby="member-details-heading" className="fixed inset-0 m-auto max-h-[calc(100dvh_-_3rem)] w-[calc(100%_-_3rem)] max-w-md overflow-y-auto rounded-kit border border-border bg-background p-6 text-foreground backdrop:bg-primary-dark/25 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="member-details-heading" className="font-display text-3xl text-primary-dark">{selectedPerson?.name ?? selectedPet?.name}</h2>
            <p className="mt-2 text-sm text-muted">{profile ? `Age ${ageOnDate(profile.birthday, knowledgeToday)} · ${formatKnowledgeDate(profile.birthday)}` : selectedPet?.species}</p>
          </div>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close member details" className="flex size-10 shrink-0 items-center justify-center rounded-kit text-muted hover:bg-surface-secondary hover:text-primary"><X aria-hidden="true" className="size-5" /></button>
        </div>
        {selectedPerson && profile ? (
          <>
            <div className="mt-6 space-y-5 border-t border-border pt-5">
              <div>
                <label htmlFor="member-color" className="block text-xs text-muted">Household color</label>
                <div className="mt-2 flex items-center gap-3">
                  <span aria-hidden="true" className={`size-3 shrink-0 rounded-full ${colors[selectedPerson.id]}`} />
                  <select id="member-color" value={colors[selectedPerson.id]} onChange={(event) => setMemberColor(selectedPerson.id, event.target.value)} className="rounded-kit border border-border bg-surface px-3 py-2 text-sm">
                    {householdColors.map((color) => <option key={color.value} value={color.value}>{color.label}</option>)}
                  </select>
                </div>
              </div>
              <dl><dt className="text-xs text-muted">Activities &amp; interests</dt><dd className="mt-2 text-sm leading-6">{profile.interests}</dd></dl>
            </div>
            <section aria-labelledby="member-knowledge-heading" className="mt-5 border-t border-border pt-5">
              <h3 id="member-knowledge-heading" className="text-sm font-medium text-primary-dark">Kit knows</h3>
              {rememberedFacts.length > 0 ? <ul className="mt-2 space-y-2 text-sm leading-6 text-muted">{rememberedFacts.map((memory) => <li key={memory.id}>{memory.statement}</li>)}</ul> : <p className="mt-2 text-sm leading-6 text-muted">Nothing remembered about {selectedPerson.firstName} right now.</p>}
              <Link href={`/household/knowledge?member=${selectedPerson.id}`} onClick={() => dialogRef.current?.close()} className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm text-primary hover:underline underline-offset-4">View what Kit knows about {selectedPerson.firstName} <ArrowRight aria-hidden="true" className="size-4 shrink-0" /></Link>
            </section>
          </>
        ) : (
          <dl className="mt-6 space-y-5 border-t border-border pt-5">
            {selectedPet && demoPetDetails[selectedPet.id].map(({ label, value }) => <div key={label}><dt className="text-xs text-muted">{label}</dt><dd className="mt-2 text-sm leading-6">{value}</dd></div>)}
          </dl>
        )}
      </dialog>
    </main>
  );
}
