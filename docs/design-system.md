# Kit design foundation

The landing page uses an editorial layout: generous space, clear type hierarchy,
thin dividers, and one everyday-life vignette. There are no gradients, shadows,
animations, app previews, or external-service claims.

## Tokens

All brand colors live in `src/app/globals.css` as `--kit-*` custom properties.
Tailwind's `@theme inline` maps them to semantic utilities:

| Utility token | Color | Role |
| --- | --- | --- |
| `primary` | `#356859` | Evergreen buttons, links, and icons |
| `primary-dark` | `#25332F` | Wordmark and marketing headings |
| `background` | `#F7F6F2` | Warm page canvas |
| `surface` | `#FFFFFF` | Selected section background, inverse button text |
| `surface-secondary` | `#EDF1ED` | Quiet emphasis areas |
| `border` | `#D9DFDA` | Dividers and control borders |
| `foreground` | `#252927` | Primary text |
| `muted` | `#66706B` | Supporting text |
| `accent` | `#C47A52` | Small decorative details |
| `success` | `#3F755D` | Reserved for future status feedback |
| `warning` | `#B87934` | Reserved for future status feedback |
| `critical` | `#B24C4C` | Reserved for future status feedback |

Use `rounded-kit` for the shared 12px radius. Accent and status colors are
available for future work; avoid using lighter accents as small text on light
surfaces. Links and controls have visible keyboard focus outlines.

## Typography

- **Newsreader** (`font-display`): wordmark and major marketing headings. Its
  editorial serif forms bring warmth and a calm, human character.
- **DM Sans** (`font-sans`): body copy, labels, navigation, and controls. Its
  straightforward shapes keep interface text easy to scan.

Both fonts use the SIL Open Font License. Latin variable WOFF2 files and their
licenses are stored in `src/app/fonts`, loaded through `next/font/local`, and
served by Kit with `font-display: swap`. No font package or runtime CDN is used.

Sources: [Newsreader](https://fontsource.org/fonts/newsreader/about),
[DM Sans](https://fontsource.org/fonts/dm-sans/about). The font files were obtained
from Fontsource's jsDelivr distribution; licenses come from Google Fonts.

## Components and scope

`PageContainer` controls shared content width and responsive gutters without
adding a landmark. Pages supply their own semantic `main`, `header`, and `footer`.
`ButtonLink` provides primary and secondary navigation actions. `Wordmark`
provides the linked typographic brand mark. Landing-specific content stays in
`src/features/landing`; no general component framework is needed yet.

The landing page is a Server Component. Narrow layouts stack the hero, grids,
capability rows, and final CTA. Decorative Lucide icons are hidden from assistive
technology; headings, landmarks, and a skip link support navigation.

The page frames Kit as a portfolio demo and explicitly notes that external
services and live AI are not connected. Demo links point to `/login`, with a
client-only demo credential check leading to `/home`. Remaining app screens, local
persistence, and LLM/service integrations remain outside this milestone.

Home uses the same typography, spacing, surfaces, and controls. Its layout
prioritizes one reviewable change and a short daily brief, without KPI cards.
Dinner and upcoming details recede through smaller, muted text and thin dividers.
Member colors use separate `member-alex`, `member-jordan`, `member-emma`,
`member-mason`, and `member-harper` tokens. Names always accompany the colors;
system status uses text and icons in addition to evergreen styling.

Household's main emphasis is What Kit Knows; People & Pets stay as simple rows,
with restrained arrows and hover styling opening a compact detail panel. A named
color selector uses the existing household palette; other profile details are
read-only. A small remembered-facts section links to the person's filtered
knowledge view rather than duplicating memory controls in the panel.
Scout is listed with the people rather than as a belonging. Household Details
reveals an availability message only after interaction. The
knowledge library starts with search, small text summaries, and compact household
filters. Paginated rows use separators rather than cards or a table. Statements
carry the strongest hierarchy; scope, type, and expiration are smaller. Rules
have an evergreen left rule and a firmer type label, without error colors.
Selecting a row opens one restrained detail dialog containing provenance,
confidence, and memory controls. The native Why does Kit know this? disclosure
reveals explanation on demand. Search, bounded pages, and progressive disclosure
keep the resting page manageable as knowledge grows. No scoring, meters, or
technical AI terminology is shown.
