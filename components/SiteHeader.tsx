"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu } from "lucide-react";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import ServicesColumn from "@/components/ServicesColumn";
import { services } from "@/components/data/services";
import { ServicesIcon } from "@/icons/ServicesIcon";
import { WorkIcon } from "@/icons/WorkIcon";

type Props = {
  introDone: boolean;
};

// Pages reached from the footer keep the island fully expanded — no
// shrink-on-scroll there.
const NO_COLLAPSE_ROUTES = ["/cookie", "/privacy-policy", "/by-rahmanov"];

// The services panel's exact height as a CSS calc(), not framer-motion's
// "auto" — animating to "auto" requires briefly rendering unclipped to
// measure it first, which causes a one-frame flash. Using var(--pad) here
// (rather than a hardcoded px gap) also keeps it correct on the <420px
// breakpoint where --pad itself shrinks. 25.5rem = pt-6 (1.5rem) + the
// column height below (24rem); each column also needs this as a *definite*
// height of its own, not just the outer's max-height, since the hover
// grow/shrink relies on flex-grow having a fixed pool to redistribute.
const SERVICES_COLUMN_HEIGHT = "calc(24rem + (var(--pad) * 3))";
const SERVICES_PANEL_HEIGHT = "calc(25.5rem + (var(--pad) * 3))";

const SiteHeader = ({ introDone }: Props) => {
  const { pathname, events } = useRouter();
  const [isLifted, setIsLifted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuWidthExpanded, setMobileMenuWidthExpanded] = useState(false);
  const [mobileLanguage, setMobileLanguage] = useState<"tk" | "ru">("tk");
  const mobileMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileMenuOpenRef = useRef(false);
  const mobileMenuWidthExpandedRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const islandRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const topRowClipRef = useRef<HTMLDivElement | null>(null);
  const islandInnerRef = useRef<HTMLDivElement | null>(null);
  const closeServicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseAfterServicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesOpenRef = useRef(false);
  const canCollapse = !NO_COLLAPSE_ROUTES.includes(pathname ?? "");
  const navCollapsed = collapsed && !isHovered;
  const isMobileRouteActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    servicesOpenRef.current = servicesOpen;
  }, [servicesOpen]);

  const openServicesMenu = () => {
    if (closeServicesTimeoutRef.current) {
      clearTimeout(closeServicesTimeoutRef.current);
      closeServicesTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  // Small grace period so moving the mouse from the link down into the
  // panel itself doesn't register as "left" and close it.
  const scheduleCloseServicesMenu = () => {
    closeServicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  // For when the mouse clearly moved to a sibling nav link instead of down
  // into the panel — no reason to keep waiting out the grace period then.
  const closeServicesMenuNow = () => {
    if (closeServicesTimeoutRef.current) {
      clearTimeout(closeServicesTimeoutRef.current);
      closeServicesTimeoutRef.current = null;
    }
    setServicesOpen(false);
  };

  useEffect(() => {
    return () => {
      if (closeServicesTimeoutRef.current) clearTimeout(closeServicesTimeoutRef.current);
      if (collapseAfterServicesTimeoutRef.current) {
        clearTimeout(collapseAfterServicesTimeoutRef.current);
      }
      if (mobileMenuTimerRef.current) clearTimeout(mobileMenuTimerRef.current);
    };
  }, []);

  const toggleMobileMenu = () => {
    if (mobileMenuTimerRef.current) {
      clearTimeout(mobileMenuTimerRef.current);
      mobileMenuTimerRef.current = null;
    }

    if (mobileMenuOpenRef.current) {
      mobileMenuOpenRef.current = false;
      setMobileMenuOpen(false);
      mobileMenuTimerRef.current = setTimeout(() => {
        mobileMenuWidthExpandedRef.current = false;
        setMobileMenuWidthExpanded(false);
        mobileMenuTimerRef.current = null;
      }, 300);
      return;
    }

    mobileMenuWidthExpandedRef.current = true;
    setMobileMenuWidthExpanded(true);
    mobileMenuTimerRef.current = setTimeout(() => {
      mobileMenuOpenRef.current = true;
      setMobileMenuOpen(true);
      mobileMenuTimerRef.current = null;
    }, 300);
  };

  const closeMobileMenu = useCallback(() => {
    if (!mobileMenuOpenRef.current && !mobileMenuWidthExpandedRef.current) return;
    if (mobileMenuTimerRef.current) clearTimeout(mobileMenuTimerRef.current);
    mobileMenuOpenRef.current = false;
    setMobileMenuOpen(false);
    mobileMenuTimerRef.current = setTimeout(() => {
      mobileMenuWidthExpandedRef.current = false;
      setMobileMenuWidthExpanded(false);
      mobileMenuTimerRef.current = null;
    }, 300);
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setServicesOpen(false);
      closeMobileMenu();
    };

    events.on("routeChangeStart", handleRouteChangeStart);
    return () => events.off("routeChangeStart", handleRouteChangeStart);
  }, [events, closeMobileMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const menu = mobileMenuRef.current;
      if (menu && !menu.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  const handleIslandEnter = () => {
    if (collapseAfterServicesTimeoutRef.current) {
      clearTimeout(collapseAfterServicesTimeoutRef.current);
      collapseAfterServicesTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleIslandLeave = () => {
    if (!servicesOpenRef.current) {
      setIsHovered(false);
      return;
    }

    // Close the taller services panel first. Keep the nav expanded until its
    // max-height transition has finished so the header never collapses first.
    setServicesOpen(false);
    collapseAfterServicesTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      collapseAfterServicesTimeoutRef.current = null;
    }, 300);
  };

  // Shrink the island to the logo (plus the active nav link, if any) when
  // scrolling down, and bring it back when scrolling up. Plain scrollY
  // comparison rather than a ScrollTrigger with a cached "end" — that end
  // is computed from document height at creation time, which goes stale
  // the moment you navigate from a short page to a much longer one.
  useEffect(() => {
    setCollapsed(false);
    if (!introDone || !canCollapse) return;

    // Require a deliberate scroll, not every single pixel of jitter, before
    // reacting — reset the run whenever direction flips.
    const REACT_AFTER_PX = 60;
    let lastY = window.scrollY;
    let runDirection: "up" | "down" | null = null;
    let runDistance = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY;
      lastY = y;

      // Don't shrink the island out from under the mouse while the
      // services panel is open — the page behind the fixed header can
      // still scroll even while hovering it.
      if (servicesOpenRef.current) {
        runDirection = null;
        runDistance = 0;
        return;
      }

      if (y <= 40) {
        setCollapsed(false);
        runDirection = null;
        runDistance = 0;
        return;
      }

      if (diff === 0) return;
      const direction = diff > 0 ? "down" : "up";

      if (direction !== runDirection) {
        runDirection = direction;
        runDistance = 0;
      }
      runDistance += Math.abs(diff);

      if (runDistance >= REACT_AFTER_PX) {
        setCollapsed(direction === "down");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [introDone, canCollapse, pathname]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsLifted(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [introDone]);

  // Animate the island's width whenever its content's natural size changes
  // (e.g. the header-center-slot swapping text), instead of snapping instantly.
  // The inner element is measured (never resized by script) and the outer
  // element is what gets an explicit width, so animating it can't feed back
  // into the observer that's driving it.
  //
  // The temporary overflow-hidden this needs (to hide inner overflowing the
  // animating width) is applied to a dedicated wrapper around just the top
  // row, not the outer island itself — the outer also holds the vertically
  // taller services panel, and clipping it would cut that off any time a
  // width transition happens to fire while the panel is open.
  useEffect(() => {
    const outer = islandRef.current;
    const clip = topRowClipRef.current;
    const inner = islandInnerRef.current;
    if (!outer || !clip || !inner) return;

    // outer is border-box and has its own padding, so its width must be the
    // inner (content) width plus that padding, not the inner width alone.
    const outerWidthFor = (contentWidth: number) => {
      const cs = getComputedStyle(outer);
      return (
        contentWidth + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
      );
    };

    outer.style.width = `${outerWidthFor(inner.getBoundingClientRect().width)}px`;
    let currentAnimation: Animation | null = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resizeObserver = new ResizeObserver(() => {
      const fromWidth = outer.getBoundingClientRect().width;
      const toWidth = outerWidthFor(inner.getBoundingClientRect().width);
      if (Math.abs(toWidth - fromWidth) < 0.5) return;

      currentAnimation?.cancel();
      outer.style.width = `${toWidth}px`;

      if (reduceMotion.matches) return;

      clip.style.overflow = "hidden";
      currentAnimation = outer.animate(
        [{ width: `${fromWidth}px` }, { width: `${toWidth}px` }],
        { duration: 420, easing: "cubic-bezier(.32,.72,0,1)" },
      );
      currentAnimation.onfinish = () => {
        clip.style.overflow = "";
        currentAnimation = null;
      };
    });

    resizeObserver.observe(inner);
    return () => {
      resizeObserver.disconnect();
      currentAnimation?.cancel();
    };
  }, [introDone]);

  if (!introDone) return null;

  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 left-0 w-full h-px" aria-hidden="true" />
      <div
        className={`shell fixed left-0 right-0 z-150 flex items-start justify-between px-4 pointer-events-none md:justify-start md:px-0 md:pl-6 ${isLifted ? "is-lifted" : ""}`}
      >
        <div className="header-island island pointer-events-auto inline-flex p-[var(--pad)] md:hidden">
          <Header activePillLayoutId="nav-active-pill-mobile" />
        </div>

        <div
          ref={mobileMenuRef}
          className={`header-island island pointer-events-auto inline-flex flex-col overflow-hidden p-[var(--pad)] md:hidden ${
            mobileMenuWidthExpanded
              ? "w-[calc(9rem+var(--pad)*2)]"
              : "w-[calc(var(--cta-h)+var(--pad)*2)]"
          }`}
          style={{
            width: mobileMenuWidthExpanded
              ? "calc(9rem + (var(--pad) * 2))"
              : "calc(var(--cta-h) + (var(--pad) * 2))",
          }}
        >
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
            className="cta relative inline-flex h-[var(--cta-h)] w-[var(--cta-h)] items-center justify-center rounded-[var(--r-cta)] text-(--ink) transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-(--ink) focus-visible:outline-offset-2"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>

          <div
            className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(.32,.72,0,1)] ${
              mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <nav className="min-h-0" aria-label="Mobile navigation">
              <div className="mt-2 flex min-w-[9rem] flex-col gap-1 pt-2">
                <Link
                  href="/services"
                  scroll={false}
                  onClick={closeMobileMenu}
                  className={`mobile-menu-link cta inline-flex items-center gap-2 rounded-[var(--r-cta)] px-3 py-2 text-sm font-extrabold capitalize transition-colors duration-300 ease-out hover:bg-(--ink)/10 ${
                    isMobileRouteActive("/services")
                      ? "nav-active-link bg-(--ink) text-white"
                      : "text-(--ink)"
                  }`}
                >
                  <ServicesIcon aria-hidden="true" className="size-4" />
                  Services
                </Link>
                <Link
                  href="/about"
                  scroll={false}
                  onClick={closeMobileMenu}
                  className={`mobile-menu-link cta inline-flex items-center gap-2 rounded-[var(--r-cta)] px-3 py-2 text-sm font-extrabold capitalize transition-colors duration-300 ease-out hover:bg-(--ink)/10 ${
                    isMobileRouteActive("/about")
                      ? "nav-active-link bg-(--ink) text-white"
                      : "text-(--ink)"
                  }`}
                >
                  <WorkIcon aria-hidden="true" className="size-4" />
                  Information
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileLanguage((current) => (current === "tk" ? "ru" : "tk"))}
                  aria-label="Switch language"
                  className="mobile-menu-link cta inline-flex items-center gap-2 rounded-[var(--r-cta)] px-3 py-2 text-left text-sm font-extrabold text-(--ink) transition-colors duration-300 ease-out hover:bg-(--ink)/10"
                >
                  <img src="/header-icons/language-svgrepo-com.svg" alt="" aria-hidden="true" className="size-4" />
                  {mobileLanguage}
                </button>
              </div>
            </nav>
          </div>
        </div>

        <div
          ref={islandRef}
          className="island pointer-events-auto hidden p-[var(--pad)] motion-reduce:transition-none md:inline-block"
          onMouseEnter={handleIslandEnter}
          onMouseLeave={handleIslandLeave}
          style={{ willChange: servicesOpen ? "height" : undefined }}
        >
          <div ref={topRowClipRef}>
            <div
              ref={islandInnerRef}
              className="inline-flex items-center gap-6 w-max"
            >
              <Header />
              <NavBar
                collapsed={navCollapsed}
                servicesOpen={servicesOpen}
                onServicesHoverStart={openServicesMenu}
                onServicesHoverEnd={scheduleCloseServicesMenu}
                onOtherLinkHover={closeServicesMenuNow}
              />
            </div>
          </div>

          <div
            onMouseEnter={openServicesMenu}
            onMouseLeave={scheduleCloseServicesMenu}
            className={`overflow-hidden [contain:layout] transition-[max-height,opacity] duration-300 ease-[cubic-bezier(.32,.72,0,1)] ${
              servicesOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{ maxHeight: servicesOpen ? SERVICES_PANEL_HEIGHT : "0px" }}
          >
            <div className="flex flex-col gap-1 pt-6 sm:flex-row">
              {[services.slice(0, 4), services.slice(4, 8)].map((column, i) => (
                <ServicesColumn
                  key={i}
                  services={column}
                  open={servicesOpen}
                  height={SERVICES_COLUMN_HEIGHT}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteHeader;
