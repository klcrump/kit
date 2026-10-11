# Development

## Getting started

Use Node.js 22.13 or later and pnpm 11.25.0 (the version declared in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. The root route is only a scaffold placeholder.

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
Household, Settings, and the AI assistant. None are implemented yet. Future
local-storage access belongs in client-side hooks or features after mounting;
do not read browser storage during server rendering. Storage keys, schemas,
and state libraries are intentionally deferred until the first feature needs them.

Tailwind uses its PostCSS integration and CSS-first configuration in
`src/app/globals.css`. Lucide icons can be imported individually from
`lucide-react`. System fonts keep the scaffold build independent of font downloads.

ESLint 9 is pinned to the major supported by the plugins bundled with Next.js's
ESLint configuration. Upgrade it when those plugins support ESLint 10.

There are no environment variables or external services required. Environment
files and build artifacts are ignored by Git. The original README is unchanged.
