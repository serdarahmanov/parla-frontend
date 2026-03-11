# Parla

Parla is a Next.js App Router project for a marketing/agency-style website with animated page transitions, scroll-driven motion, and a validated contact form.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- shadcn/ui + Base UI primitives
- GSAP + ScrollTrigger
- Framer Motion
- React Hook Form + Zod
- Sonner (toast notifications)

## Project Structure

- `app/layout.tsx`: global layout, fonts, header/nav/footer, page transition wrapper, GTM.
- `app/page.tsx`: home page with scroll-scrubbed video section and scroll counter.
- `app/about/page.tsx`: about page content with text animations.
- `app/contact/page.tsx`: contact page mounting `ContactForm`.
- `app/components/*`: shared UI pieces (header, footer, nav, transition, form, counter).
- `app/animations/*`: animation-specific reusable components.
- `components/ui/*`: shadcn-style design system components.
- `app/globals.css`: theme tokens, Tailwind/shadcn imports, and global styles.

## Routes

- `/` - Home
- `/about` - About
- `/contact` - Contact
- `/byrahmanov` - Additional page

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- Theme colors are token-driven from CSS variables in `app/globals.css`.
- Form validation schema is defined in `app/components/ContactForm.tsx` via Zod.
- Scroll/video behavior on home is implemented with GSAP `ScrollTrigger`.
