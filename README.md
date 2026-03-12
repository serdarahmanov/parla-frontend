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

## Recent Work (Current Session)

- `MainSection4` (`app/main sections/MainSection4.tsx`)
  - Built pinned horizontal scroll section at `100vh` with GSAP `ScrollTrigger`.
  - Added center-based card detection to switch slide text content.
  - Added per-card caption system with unique descriptions.
  - Kept retro/step animation on captions and smooth transition for descriptions.
  - Added scroll-driven depth effects:
    - card scale behavior (grow toward center and stay `scale: 1` after crossing center to the left)
    - subtle inner-image parallax
  - Added one-time entry animation (non-scrub) for first viewport entry.
  - Improved teardown/reset on unmount:
    - kill tweens/triggers
    - clear inline animated props to avoid overlap on route return.

- `MainSection2` (`app/main sections/MainSection2.tsx`)
  - Removed experimental video parallax that caused extra rendering load.
  - Kept scroll-scrubbed video timeline and improved remount stability:
    - removed hardcoded start snap
    - aligned scrub time to current scroll progress on init
    - reduced redundant `currentTime` writes
    - switched video preload to `auto`
    - ensured cleanup pauses video and kills timeline listeners cleanly.

- Navigation/Footer readability updates
  - Updated nav and footer contrast handling to stay visible on mixed backgrounds.
  - Applied blend-mode based readability pattern in component classes (not global hardcoded block).
  - Updated animated link component to inherit parent color correctly across both text layers.
  - Added active/inactive nav link emphasis with pathname-based styling.
