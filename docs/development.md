# Development

## Getting started

Use Node.js 22.13 or later and pnpm 11.25.0 (the version declared in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. The root route is the public landing page.

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

On a fresh checkout, run `pnpm build` before `pnpm typecheck` so Next.js can
generate its environment declarations and route types. `pnpm start` serves a
previously completed production build.

## Structure

- `src/app`: App Router pages, route layouts, metadata, and global styles.
- `src/components/ui`: small reusable presentation components.
- `src/components/layout`: shared page and layout components.
- `src/features`: future domain-specific components and logic, grouped by feature.
- `src/hooks`: reusable client-side React hooks.
- `src/lib`: shared utilities and future browser-storage helpers.
- `src/types`: types shared across features; keep feature-only types with their feature.
- `public`: static assets.

Import source files through the `@/*` alias. Keep route files thin and compose
them from shared or feature components. Components are Server Components by
default; add `"use client"` at the smallest boundary that needs state, events,
or browser APIs.

Planned routes include Landing, Login, Home, Calendar, Meals, Lists & Tasks,
Household, Settings, and the AI assistant. Landing, demo Login, Home, Household,
and What Kit Knows are implemented. The demo CTA points to `/login`; use `alex@kitdemo.com` and
`demo123` to enter `/home`. Credentials are checked in the browser only, and
`/home` is directly accessible. There is no authentication or protected data.
Future
local-storage access belongs in client-side hooks or features after mounting;
do not read browser storage during server rendering. Storage keys, schemas,
and state libraries are intentionally deferred until the first feature needs them.

Tailwind uses its PostCSS integration and CSS-first configuration in
`src/app/globals.css`. Lucide icons can be imported individually from
`lucide-react`. Local fonts keep builds independent of font downloads.

ESLint 9 is pinned to the major supported by the plugins bundled with Next.js's
ESLint configuration. Upgrade it when those plugins support ESLint 10.

There are no environment variables or external services required. Environment
files and build artifacts are ignored by Git. The original README is unchanged.

## Demo behavior

`src/lib/demo-household.ts` contains the fictional Parker Household, public demo
credentials, a fixed Tuesday (October 13) brief, dinner, and upcoming items.
Member identifiers and shared color tokens keep household references consistent.
The fixed date supports a predictable portfolio walkthrough rather than implying
that demo events are tied to the viewer's actual day.

Today labels soccer's current 5:00 PM time and proposed 5:30 PM change separately.
Approving the update changes its time in the current Home view, removes pending
labels, and announces a quiet caught-up state in What changed. It sends no messages
and resets on reload or remount. Local storage is intentionally deferred. Ask Kit is a disabled conversation
preview. Home and Household navigation reflect the current route; the Household
section stays active on its knowledge page. Kit jumps to Ask Kit.
Unimplemented navigation destinations are disabled and labeled Soon, so they never
send the user to missing pages. Login's account creation and password recovery
actions show a quiet inline availability message only when clicked; they do not
create accounts or send recovery requests.

## Household and knowledge

`/household` shows People & Pets, lightweight Household Details entry points, and a
prominent link to `/household/knowledge`. People and Scout the dog have clickable
rows opening a small native dialog. People show fictional birthdays, ages relative
to the fixed demo day, interests, a household color selector, and up to two
remembered facts. Scout retains a simple read-only detail view. The dialog traps focus,
supports Escape and its close button, and restores focus to the initiating row. Home,
vehicle, and service buttons show an inline coming-soon message without routing
to missing pages or inventing household details.

`src/lib/demo-knowledge.ts` contains eight fictional memories. The model supports
Rule, Strong preference, Preference, Pattern, Observation, and Temporary context;
the UI groups the seeded items into preferences, rules, and temporary context.
Every item carries scope and source, with confidence or dates when relevant.
The knowledge library searches statements and household-member names together
with URL-based All, Household, and person filters. Overview counts describe all
active knowledge; a separate result count describes the current search and filter.
Compact rows are grouped under Preferences & patterns, Rules, and Temporary
context. Each group shows at most eight rows per page, with Previous/Next controls
when needed. Search and scope changes reset pagination; removals clamp the current
page so an empty last page cannot strand the user. No extra demo records are seeded.

Clicking a row opens a native detail dialog with the complete statement, type,
scope, source, and learned/observed date or date range. Learned preferences show
“High confidence”; the emerging Friday takeout pattern shows “Still learning”.
Explicit rules carry no confidence label. The native Why does Kit know this?
disclosure reveals distinct fictional source context and how Kit may use it to
help. No numeric scores are shown. Temporary rows expose short expiration dates;
their details retain full dates and the relevant period.

Edits within the detail dialog reject empty statements, preserve original source information, and
record Alex's correction on the fixed demo date. Inferred confidence is cleared
after a direct correction. Forget and End now use lightweight inline confirmations
with Keep memory / Keep active cancellation. Confirming End now removes temporary
context from the active list. Explanations describe why each fact is worth remembering;
rules are constraints and temporary context is used only until its end date.
Success messages are announced to screen
readers, and cancellation restores focus to the initiating action. Closing details
returns focus to the original row; after a removed or filtered-out row, focus goes
to search. No matching results offer clear-search and all-household recovery paths.

The household layout's client provider shares color choices and knowledge changes
across Home, Household, and What Kit Knows until a full reload. Color names accompany
the swatches; updates appear in member rows, the sidebar, and member labels. The
person dialog links to `/household/knowledge?member=emma` (or the corresponding
member ID), which selects that person's library filter. Unknown member values
safely show all knowledge. Memory
editing and forgetting stay exclusively on What Kit Knows. No browser storage,
API calls, backend, or full profile editing are involved.
The fixed current date is October 13, 2026. Jordan's six-week context runs October
1–November 12 (42 days); Alex's next-week travel runs October 21–22. End dates are
displayed and treated inclusively, using UTC date formatting to avoid timezone
shifts. Empty categories are omitted from filtered results to keep searching calm.
