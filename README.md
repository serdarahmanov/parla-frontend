# Parla

Parla is a Next.js Pages Router project for a marketing/agency-style website with animated navigation, scroll-driven motion, and a validated contact form.

## Tech Stack

- Next.js 16 (Pages Router)
- React 19 + TypeScript
- Tailwind CSS 4
- shadcn/ui + Base UI primitives
- GSAP + ScrollTrigger
- Framer Motion
- React Hook Form + Zod
- Sonner (toast notifications)

## Project Structure

- `pages/_app.tsx`: global shell, fonts, header/nav/footer, GTM.
- `pages/index.tsx`, `pages/about.tsx`, `pages/contact.tsx`, `pages/work.tsx`, `pages/byrahmanov.tsx`: routes.
- `views/*`: page view components.
- `components/*`: shared UI pieces.
- `animations/*`: animation-specific reusable components.
- `sections/*`: home page sections.
- `styles/globals.css`: theme tokens, Tailwind/shadcn imports, and global styles.
- `components/ui/*`: shadcn-style design system components.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
