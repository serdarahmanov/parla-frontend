"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { WorkIcon } from "@/icons/WorkIcon";
import { InformationIcon } from "@/icons/InformationIcon";
import { ServicesIcon } from "@/icons/ServicesIcon";

const SERVICES_HREF = "/services";
// Not a real route — a virtual key so the language toggle can share the
// same hoveredHref/highlightedHref tracking (and therefore the same
// nav-hover-pill) as the actual nav links, without colliding with a href.
const LANGUAGE_KEY = "language";

const navItems = [
  { label: "services", href: "/services", analytics: "nav-services", Icon: ServicesIcon },
  { label: "work", href: "/work", analytics: "nav-work", Icon: InformationIcon },
  { label: "information", href: "/about", analytics: "nav-info", Icon: WorkIcon },
];

type NavBarProps = {
  collapsed?: boolean;
  servicesOpen?: boolean;
  onServicesHoverStart?: () => void;
  onServicesHoverEnd?: () => void;
  onOtherLinkHover?: () => void;
};

function NavBar({
  collapsed = false,
  servicesOpen = false,
  onServicesHoverStart,
  onServicesHoverEnd,
  onOtherLinkHover,
}: NavBarProps) {
  const { pathname } = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [language, setLanguage] = useState<"tk" | "ru">("tk");
  const isActiveRoute = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const toggleLanguage = () =>
    setLanguage((current) => (current === "tk" ? "ru" : "tk"));

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current.children,
        {
          x: 20,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
          clearProps: "opacity",
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const visibleItems = navItems.filter(
    (item) => !collapsed || isActiveRoute(item.href),
  );

  // What the hover pill should be tracking right now: whatever's actively
  // hovered, or — once the mouse has left the "services" link but its panel
  // is still open — fall back to "services" so the pill stays put instead of
  // handing off to a second element. hoveredHref always wins when set, so
  // this can never point at two different links at once.
  const highlightedHref =
    hoveredHref ?? (servicesOpen ? SERVICES_HREF : null);

  // Render nothing at all (not an empty <nav>) when collapsed hides every
  // item — an empty flex child would still claim the flex gap next to it.
  if (visibleItems.length === 0) return null;

  return (
    <nav ref={rootRef} className="site-nav flex flex-row gap-6 shrink-0">
      {visibleItems.map((item) => {
        const active = isActiveRoute(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            data-analytics={item.analytics}
            onMouseEnter={() => {
              if (!active) setHoveredHref(item.href);
              if (item.href === SERVICES_HREF) {
                onServicesHoverStart?.();
              } else {
                onOtherLinkHover?.();
              }
            }}
            onMouseLeave={() => {
              setHoveredHref((h) => (h === item.href ? null : h));
              if (item.href === SERVICES_HREF) onServicesHoverEnd?.();
            }}
            className={`cta relative inline-flex items-center gap-2 h-[var(--cta-h)] rounded-[var(--r-cta)] px-4
              text-sm md:text-base lg:text-base font-sans font-extrabold tracking-tight
              motion-reduce:transition-none
              focus-visible:outline-2 focus-visible:outline-(--ink) focus-visible:outline-offset-2
               ${active ? "text-white" : "text-(--ink)"}`}
          >
            {active && (
              <motion.div
                layoutId="nav-active-pill"
                className="cta absolute inset-0 rounded-[var(--r-cta)] bg-(--ink)"
                transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              />
            )}
            {/* Tracks highlightedHref rather than hoveredHref directly so
                that while services' panel is open, leaving the link (e.g.
                moving down into the panel) doesn't hand off to a second
                element — the same pill just stays put instead. highlightedHref
                is always exclusive to one link at a time, so this can't
                collide when the mouse moves straight to another link. */}
            <AnimatePresence>
              {!active && highlightedHref === item.href && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="cta absolute inset-0 rounded-[var(--r-cta)] bg-(--ink)/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    layout: { duration: 0.3, ease: [0.32, 0.72, 0, 1] },
                    opacity: { duration: 0.15 },
                  }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10 inline-flex items-center gap-2">
              <item.Icon className="w-4 h-4" />
              {item.label}
            </span>
          </Link>
        );
      })}

      <button
        type="button"
        onClick={toggleLanguage}
        onMouseEnter={() => {
          setHoveredHref(LANGUAGE_KEY);
          onOtherLinkHover?.();
        }}
        onMouseLeave={() =>
          setHoveredHref((h) => (h === LANGUAGE_KEY ? null : h))
        }
        aria-label={`Switch language to ${language === "tk" ? "Russian" : "Turkmen"}`}
        className="cta relative inline-flex items-center gap-2 h-[var(--cta-h)] rounded-[var(--r-cta)] px-4
          text-sm md:text-base lg:text-base font-sans font-extrabold tracking-tight
          text-(--ink)
          motion-reduce:transition-none
          focus-visible:outline-2 focus-visible:outline-(--ink) focus-visible:outline-offset-2"
      >
        <AnimatePresence>
          {highlightedHref === LANGUAGE_KEY && (
            <motion.div
              layoutId="nav-hover-pill"
              className="cta absolute inset-0 rounded-[var(--r-cta)] bg-(--ink)/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                layout: { duration: 0.3, ease: [0.32, 0.72, 0, 1] },
                opacity: { duration: 0.15 },
              }}
            />
          )}
        </AnimatePresence>
        <span className="relative z-10 inline-flex items-center gap-2">
          <img src="/header-icons/language-svgrepo-com.svg" alt="" className="w-5 h-5" />
          {language}
        </span>
      </button>
    </nav>
  );
}

export default NavBar;
