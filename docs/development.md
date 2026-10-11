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
Household, Settings, and the AI assistant. Landing, demo Login, and Home are
implemented. The demo CTA points to `/login`; use `alex@kitdemo.com` and
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
preview. Home is active in the application navigation; Kit jumps to Ask Kit.
Other navigation destinations are disabled and labeled Soon, so they never
send the user to missing pages. Login's account creation and password recovery
actions show a quiet inline availability message only when clicked; they do not
create accounts or send recovery requests.
