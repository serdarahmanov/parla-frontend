"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/components/data/services";

const ICON_ASSETS = [
  {
    viewBox: "0 0 564.76 698.76",
    path: "M564.76,678.03V0H0v272.67c0,235.32,190.76,426.08,426.08,426.08h138.68v-20.72Z",
  },
  {
    viewBox: "0 0 564.76 698.76",
    path: "M0,426.48v272.27h564.76V0h-138.28C190.94,0,0,190.94,0,426.48Z",
  },
  {
    viewBox: "0 0 569.79 698.76",
    path: "M70.65,0H0v698.76h143.29c235.55,0,426.5-190.95,426.5-426.5V0H70.65Z",
  },
  {
    viewBox: "0 0 569.79 698.76",
    path: "M145.62,0H0v698.76h569.79v-274.59C569.79,189.9,379.88,0,145.62,0Z",
  },
] as const;

const makeIconUri = (
  viewBox: string,
  path: string,
  from: string,
  to: string,
  noise: number,
) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
  <defs>
    <linearGradient id="iconGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <clipPath id="iconClip"><path d="${path}"/></clipPath>
    <filter id="iconNoise" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="1" seed="7" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="1 1 1 0 -1  1 1 1 0 -1  1 1 1 0 -1  0 0 0 0 1"/>
    </filter>
  </defs>
  <g clip-path="url(#iconClip)">
    <path fill="url(#iconGradient)" d="${path}"/>
    <rect width="100%" height="100%" filter="url(#iconNoise)" opacity="${noise}"/>
  </g>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const ICONS = ICON_ASSETS.map(({ viewBox, path }) => ({
  aspect: viewBox.replace("0 0 ", " / "),
  dark: makeIconUri(viewBox, path, "#0d0d0d", "#050505", 0.03),
  lit: makeIconUri(viewBox, path, "#313131", "#141414", 0.06),
}));

const serviceGroups = [
  {
    title: "Visual & Marketing",
    services: services.slice(0, 4),
  },
  {
    title: "Technology",
    services: services.slice(4),
  },
] as const;

function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const footerSectionRef = useRef<HTMLElement | null>(null);
  const iconRowRef = useRef<HTMLDivElement | null>(null);
  const litLayerRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const [footerReached, setFooterReached] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const row = iconRowRef.current;
    if (!row) return;

    const REVEAL_RATIO = 0.16;
    const EASE = 0.12;

    const measure = () => {
      row.style.setProperty("--reveal-size", `${row.offsetWidth * REVEAL_RATIO}px`);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduceMotion ? 1 : EASE;
    let currentX = 0;
    let currentY = 0;
    let placed = false;
    let inside = false;
    let running = false;

    const tick = () => {
      const rowBounds = row.getBoundingClientRect();
      const targetX = pointerRef.current.x - rowBounds.left;
      const targetY = pointerRef.current.y - rowBounds.top;

      if (!placed) {
        currentX = targetX;
        currentY = targetY;
        placed = true;
      } else {
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;
      }

      if (litLayerRef.current) {
        litLayerRef.current.style.setProperty("--x", `${currentX}px`);
        litLayerRef.current.style.setProperty("--y", `${currentY}px`);
      }

      const settled =
        Math.abs(targetX - currentX) < 0.5 &&
        Math.abs(targetY - currentY) < 0.5;

      if (!inside && settled) {
        running = false;
        animationFrameRef.current = null;
        return;
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    const handlePointerEnter = (event: PointerEvent) => {
      inside = true;
      pointerRef.current = { x: event.clientX, y: event.clientY };
      placed = false;
      start();
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      start();
    };

    const handlePointerLeave = () => {
      inside = false;
    };

    measure();
    row.addEventListener("pointerenter", handlePointerEnter);
    row.addEventListener("pointermove", handlePointerMove);
    row.addEventListener("pointerleave", handlePointerLeave);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(row);

    return () => {
      row.removeEventListener("pointerenter", handlePointerEnter);
      row.removeEventListener("pointermove", handlePointerMove);
      row.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const section = footerSectionRef.current;
    if (!section) return;

    let reached = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const next = reached ? ratio > 0.12 : ratio >= 0.28;
        if (next === reached) return;
        reached = next;
        setFooterReached(reached);
      },
      { threshold: [0, 0.12, 0.2, 0.28, 0.4, 0.6, 1] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("footer-active", footerReached);
  }, [footerReached]);

  useLayoutEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node.children,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const activeLink = footerReached
    ? "text-[#a2a2a2] hover:bg-[#111111]"
    : "text-black hover:bg-[#111111]";
  const selectedLink = footerReached
    ? "bg-[#111111] text-[#FDB813]"
    : "bg-(--ink) text-white";

  return (
      <footer
      ref={footerSectionRef}
      className={`relative flex min-h-[70vh] w-full flex-col justify-end overflow-hidden transition-colors duration-700 ease-out ${
        footerReached ? "text-white" : "text-black"
      }`}
    >
      <div
        className="grid w-full grid-cols-1 gap-8 px-2 pb-16 font-sans md:grid-cols-2 md:gap-3 md:px-6"
      >
        {serviceGroups.map((group) => (
          <div key={group.title} className="col-span-1">
            <h2 className="mb-4 text-[0.6rem] font-semibold uppercase opacity-40 md:text-sm">
              {group.title}
            </h2>
            <div className="flex flex-col items-start gap-1">
              {group.services.map((service) => {
                const serviceHref = `/service/${service.slug}`;

                return (
                  <Link
                    key={service.slug}
                    href={serviceHref}
                    scroll={false}
                    onClick={(event) => {
                      if (pathname === serviceHref) {
                        event.preventDefault();
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                      }
                    }}
                    className={`group inline-flex items-center gap-1 text-[0.6rem] font-normal uppercase transition-[color,transform] duration-300 md:text-sm ${
                      pathname === serviceHref || pathname.startsWith(`${serviceHref}/`)
                        ? "translate-x-3"
                        : ""
                    } ${
                      footerReached
                        ? "text-[#a2a2a2] hover:text-white"
                        : "text-black hover:text-[#696969]"
                    }`}
                  >
                    {service.title}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-[1em] shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-(--color-ce-primary)"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div
        ref={iconRowRef}
        className={`footer-brand-icons relative z-50 mb-1 w-full md:mb-[60px] ${
          footerReached ? "footer-brand-icons--reached" : ""
        }`}
      >
        <div className="footer-brand-icon-layer">
          {ICONS.map((icon, index) => (
            <img
              key={`dark-${index}`}
              src={icon.dark}
              alt=""
              aria-hidden="true"
              className="footer-brand-icon"
              style={{ aspectRatio: icon.aspect }}
            />
          ))}
        </div>
        <div ref={litLayerRef} className="footer-brand-icon-layer footer-brand-icon-layer--lit" aria-hidden="true">
          {ICONS.map((icon, index) => (
            <img
              key={`lit-${index}`}
              src={icon.lit}
              alt=""
              aria-hidden="true"
              className="footer-brand-icon"
              style={{ aspectRatio: icon.aspect }}
            />
          ))}
        </div>
      </div>
      <div
      ref={footerRef}
      className="relative z-[55] grid w-full grid-cols-4 px-2 pb-3 md:px-6
        font-sans
    text-[0.6rem] font-normal md:text-sm
    lg:text-sm lg:font-normal items-center overflow-hidden"
    >
      <div className=" col-span-1  ">
        <h2 className="opacity-40"> PARLA® ©2024</h2>
       
        
        
        </div>

      <div className="col-span-1">
        <Link
          scroll={false}
          href="/cookie"
          data-analytics="footer-cookie-policy"
          className={`cta inline-flex items-center h-[36px] rounded-[var(--r-cta)] px-4 font-normal uppercase transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-(--ink) focus-visible:outline-offset-2 ${
            pathname === "/cookie" ? selectedLink : activeLink
          }`}
        >
          cookie Policy
        </Link>
      </div>
      <div className="col-span-1">
        <Link
          scroll={false}
          href="/privacy-policy"
          data-analytics="footer-privacy-policy"
          className={`cta inline-flex items-center h-[36px] rounded-[var(--r-cta)] px-4 font-normal uppercase transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-(--ink) focus-visible:outline-offset-2 ${
            pathname === "/privacy-policy" ? selectedLink : activeLink
          }`}
        >
          privacy Policy
        </Link>
      </div>

      <div className="col-span-1 flex justify-end ">
        <Link
          scroll={false}
          href="/by-rahmanov"
          data-analytics="footer-site-by-rahmanov"
          className={`cta inline-flex items-center h-[36px] rounded-[var(--r-cta)] px-4 font-normal uppercase transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-(--ink) focus-visible:outline-offset-2 ${
            pathname === "/by-rahmanov" ? selectedLink : activeLink
          }`}
        >
          site by Rahmanov
        </Link>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
