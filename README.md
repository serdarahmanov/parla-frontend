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
- `pages/index.tsx`, `pages/about.tsx`, `pages/work.tsx`, `pages/cookie.tsx`, `pages/privacy-policy.tsx`, `pages/by-rahmanov.tsx`: routes.
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
