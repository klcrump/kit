import { ArrowDown, ArrowRight, CalendarDays, Check, ClipboardList, CookingPot, Eye, FileText, NotebookPen, MessageCircle, ScanLine, Users, Waypoints } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { ButtonLink } from "@/components/ui/button-link";
import { Wordmark } from "@/components/ui/wordmark";

const invisibleLabor = [
  { title: "Remembering", description: "The permission slip. The appointment. The thing you said you’d do.", icon: NotebookPen },
  { title: "Noticing", description: "The nearly empty fridge. The shoes that no longer fit. The little things.", icon: Eye },
  { title: "Coordinating", description: "Who’s going where, when they need to be there, and how they’ll get home.", icon: Users },
  { title: "Anticipating", description: "What next week needs from you, before next week arrives.", icon: ScanLine },
  { title: "Planning", description: "Meals, weekends, and all the decisions that make a day work.", icon: Waypoints },
  { title: "Household administration", description: "Forms, renewals, school notes, and the details behind the scenes.", icon: FileText },
];

const capabilities = [
  { title: "A clearer household calendar", description: "A place to see the week together and make sense of overlapping plans.", icon: CalendarDays },
  { title: "Meals that fit real life", description: "Plan around busy evenings, household preferences, and what’s already on hand.", icon: CookingPot },
  { title: "Tasks and lists, shared", description: "Turn loose ends into a clear next step, with less back-and-forth.", icon: ClipboardList },
  { title: "A memory for your household", description: "Keep useful details in one place, so they don’t have to live in one person’s head.", icon: NotebookPen },
  { title: "Help you can simply ask for", description: "A conversational way to think through a plan or find the detail you need.", icon: MessageCircle },
];

export function LandingPage() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-10 focus:rounded-kit focus:bg-surface focus:px-4 focus:py-3">Skip to content</a>
      <header>
        <PageContainer className="flex min-h-24 items-center justify-between gap-6 border-b border-border">
          <Wordmark />
          <nav aria-label="Main navigation" className="flex items-center gap-8">
            <a href="#how-kit-helps" className="hidden text-sm text-muted hover:text-primary sm:block">How Kit helps</a>
            <ButtonLink href="/login">Try the demo <ArrowRight aria-hidden="true" className="size-4" /></ButtonLink>
          </nav>
        </PageContainer>
      </header>

      <main id="main">
        <section aria-labelledby="hero-heading">
          <PageContainer className="grid items-center gap-14 py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:py-28">
            <div>
              <p className="mb-7 text-xs font-medium uppercase tracking-[0.18em] text-primary">A little help for the life you share</p>
              <h1 id="hero-heading" className="font-display text-[3.5rem] leading-[1.05] tracking-[-0.035em] text-primary-dark sm:text-[4.25rem] lg:text-[4.75rem]">Less to remember.<br /><span className="text-primary">More living.</span></h1>
              <p className="mt-7 max-w-md text-lg leading-8 text-muted">Kit takes care of the invisible labor behind family life, so your household runs more smoothly.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/login">Try the demo <ArrowRight aria-hidden="true" className="size-4" /></ButtonLink>
                <ButtonLink href="#how-kit-helps" variant="secondary">See how Kit helps <ArrowDown aria-hidden="true" className="size-4" /></ButtonLink>
              </div>
              <p className="mt-4 text-xs leading-5 text-muted">Explore the Kit demo. A quieter way to manage the everyday.</p>
            </div>
            <aside aria-label="Examples of everyday household mental load" className="rounded-kit bg-surface-secondary px-7 py-9 sm:px-10 sm:py-11">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">An ordinary Tuesday</p>
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              </div>
              <p className="mt-7 font-display text-3xl leading-tight text-primary-dark">It’s the little things.<br />And all of them at once.</p>
              <ul className="mt-8 space-y-5 text-sm leading-6 text-foreground">
                <li className="flex gap-3"><CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" /><span>Remember the early school pickup.</span></li>
                <li className="flex gap-3"><CookingPot aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" /><span>Figure out dinner before practice.</span></li>
                <li className="flex gap-3"><ClipboardList aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" /><span>Find the form. Add milk to the list.</span></li>
              </ul>
              <div className="mt-9 border-t border-border pt-6">
                <p className="flex items-center gap-2 text-sm font-medium text-primary"><Check aria-hidden="true" className="size-4" /> A little less to carry.</p>
                <p className="mt-2 text-xs leading-5 text-muted">That’s the idea behind Kit.</p>
              </div>
            </aside>
          </PageContainer>
        </section>

        <section id="invisible-labor" aria-labelledby="labor-heading" className="border-y border-border bg-surface">
          <PageContainer className="py-20 lg:py-24">
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-20">
              <div><p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">The work behind the everyday</p><h2 id="labor-heading" className="mt-5 max-w-md font-display text-4xl leading-[1.15] tracking-tight text-primary-dark sm:text-5xl">A lot goes into<br />a day that runs smoothly.</h2></div>
              <p className="max-w-md text-base leading-8 text-muted lg:pt-10">Before something gets done, someone has to notice it, remember it, and make a plan. That quiet, constant work is at the heart of Kit — and deserves to be easier to share.</p>
            </div>
            <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {invisibleLabor.map(({ title, description, icon: Icon }) => (
                <div key={title} className="border-t border-border pt-5">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="mb-4 size-5 text-primary" />
                  <h3 className="text-base font-medium">{title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-muted">{description}</p>
                </div>
              ))}
            </div>
          </PageContainer>
        </section>

        <section id="how-kit-helps" aria-labelledby="helps-heading">
          <PageContainer className="grid gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:py-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">How Kit helps</p>
              <h2 id="helps-heading" className="mt-5 font-display text-4xl leading-[1.15] tracking-tight text-primary-dark sm:text-5xl">One place for<br />the moving pieces.</h2>
              <p className="mt-6 max-w-sm text-base leading-7 text-muted">Less keeping track. More knowing what comes next, together.</p>
              <p className="mt-8 max-w-sm border-l-2 border-accent pl-4 text-sm leading-6 text-muted">A portfolio demonstration of the Kit experience. External services and live AI are not connected.</p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {capabilities.map(({ title, description, icon: Icon }) => (
                <div key={title} className="flex gap-5 py-6">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="mt-1 size-5 shrink-0 text-primary" />
                  <div><h3 className="text-base font-medium text-primary-dark">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></div>
                </div>
              ))}
            </div>
          </PageContainer>
        </section>

        <section aria-labelledby="final-heading" className="bg-surface-secondary">
          <PageContainer className="flex flex-col items-start justify-between gap-8 py-16 sm:flex-row sm:items-center lg:py-20">
            <div><p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-primary">Make room for what matters</p><h2 id="final-heading" className="font-display text-4xl leading-tight tracking-tight text-primary-dark sm:text-5xl">A little less on your mind.</h2></div>
            <div className="shrink-0"><ButtonLink href="/login">Try the demo <ArrowRight aria-hidden="true" className="size-4" /></ButtonLink><p className="mt-3 text-xs text-muted">Explore the Kit experience.</p></div>
          </PageContainer>
        </section>
      </main>

      <footer>
        <PageContainer className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6"><Wordmark /><p className="text-sm text-muted">Less to remember. More living.</p></div>
          <p className="text-xs text-muted">Kit · Thoughtfully built for household life.</p>
        </PageContainer>
      </footer>
    </>
  );
}
