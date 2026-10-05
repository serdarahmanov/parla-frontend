# Parla

Parla is a Next.js Pages Router project for a marketing/agency-style website with animated navigation and scroll-driven motion.

## Tech Stack

- Next.js 16 (Pages Router)
- React 19 + TypeScript
- Tailwind CSS 4
- shadcn/ui + Base UI primitives
- GSAP + ScrollTrigger
- Framer Motion
- Sonner (toast notifications)

## Project Structure

- `pages/_app.tsx`: global shell, fonts, transitions, consent scripts, and analytics events.
- `pages/index.tsx`, `pages/about.tsx`, `pages/work.tsx`, `pages/cookie.tsx`, `pages/privacy-policy.tsx`: routes.
- `views/*`: page view components.
- `components/*`: shared UI pieces.
- `animations/*`: animation-specific reusable components.
- `sections/*`: home page sections.
- `lib/consent/*`: Klaro consent bridge and consent config.
- `types/global.d.ts`: global browser typings (`dataLayer`, consent bridge, and page context).
- `styles/globals.css`: theme tokens, Tailwind/shadcn imports, and global styles.
- `components/ui/*`: shadcn-style design system components.

## Analytics

- `page_view` is pushed from `pages/_app.tsx` on first load and on each SPA route change.
- `page_title` for `page_view` is inferred from a route-to-title map to avoid timing issues with `document.title`.
- Outbound links are tracked from `animations/HoverSwapLink.tsx` via `outbound_click`.
- Outbound link metadata is attached through `data-analytics` on `HoverSwapLink` and emitted as `data-track` on the rendered anchor.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
## Payload CMS

Payload is available at `http://localhost:3000/admin` and its REST API is
available below `/api`.

The CMS and public site use two locales:

- `tk` — Turkmen, the default locale (`/`)
- `en` — English (`/en`)

Copy the Payload values from `.env.example` into `.env.local`, replace the
development defaults, and make sure PostgreSQL is running before opening the
admin panel. At minimum, production requires `DATABASE_URI`, `PAYLOAD_SECRET`,
and `NEXT_PUBLIC_SITE_URL`.

Useful commands:

```bash
npm run payload:generate-types
npm run payload:generate-importmap
npm run db:migrate:create
npm run db:migrate
npm run db:migrate:status
```

Development automatically pushes schema changes to PostgreSQL. Production
does not; create and commit a migration before deploying schema changes.
