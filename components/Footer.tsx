"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { ArrowUpRight } from "lucide-react";
import { categoryServices } from "@/components/data/services";
import HoverSwapLink from "@/animations/HoverSwapLink";
import ParlaIcon from "@/components/ParlaIcon";

type FooterContent = {
  cookiePolicyLabel: string;
  privacyPolicyLabel: string;
  copyright: string;
  credit: string;
};

const fallbackFooterContent: FooterContent = {
  cookiePolicyLabel: "Cookie Policy",
  privacyPolicyLabel: "Privacy Policy",
  copyright: "PARLA® ©2024",
  credit: "site by Rahmanov",
};

const FOOTER_ICONS = ["top-right", "bottom-right", "top-left", "bottom-left"] as const;

function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const footerSectionRef = useRef<HTMLElement | null>(null);
  const iconRowRef = useRef<HTMLDivElement | null>(null);
  const litLayerRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const [footerReached, setFooterReached] = useState(false);
  const [footerContent, setFooterContent] = useState(fallbackFooterContent);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const locale = router.locale === "en" ? "en" : "tk";

    const loadFooterContent = async () => {
      try {
        const response = await fetch(`/api/globals/footer?locale=${locale}&depth=0`, {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const content = (await response.json()) as Partial<FooterContent>;
        setFooterContent({
          cookiePolicyLabel: content.cookiePolicyLabel || fallbackFooterContent.cookiePolicyLabel,
          privacyPolicyLabel: content.privacyPolicyLabel || fallbackFooterContent.privacyPolicyLabel,
          copyright: content.copyright || fallbackFooterContent.copyright,
          credit: content.credit || fallbackFooterContent.credit,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    };

    void loadFooterContent();
    return () => controller.abort();
  }, [router.locale]);

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
        className="grid w-full grid-cols-1 gap-8 px-2 pb-16 font-sans md:grid-cols-3 md:gap-3 md:px-6"
      >
        <div className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 items-start gap-x-3 gap-y-1 md:grid-cols-2">
            {categoryServices.map((service) => {
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
                    pathname === serviceHref || pathname?.startsWith(`${serviceHref}/`)
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
        <div className="col-span-1 flex flex-col gap-3 md:pl-3">
          <h2
            className={`text-[0.6rem] font-bold uppercase md:text-sm ${
              footerReached ? "text-[#a2a2a2]" : "text-black/50"
            }`}
          >
            Contact us
          </h2>
          <div
            className={`flex flex-col gap-1 text-[0.6rem] font-normal md:text-sm ${
              footerReached ? "text-[#a2a2a2]" : "text-black"
            }`}
          >
            <HoverSwapLink
              href="mailto:info@parla.com"
              text="info@parla.com"
              data-analytics="footer-contact-email"
              className="w-fit transition-colors duration-300 hover:text-(--color-ce-primary)"
            />
            <HoverSwapLink
              href="tel:+99361060803"
              text="+ 99 361 06 0803"
              data-analytics="footer-contact-phone"
              className="w-fit transition-colors duration-300 hover:text-(--color-ce-primary)"
            />
            <HoverSwapLink
              href="https://instagram.com/parla_vision"
              text="Instagram"
              data-analytics="footer-social-instagram"
              className="w-fit transition-colors duration-300 hover:text-(--color-ce-primary)"
            />
            <HoverSwapLink
              href="https://t.me/orayevbatyr"
              text="Telegram"
              data-analytics="footer-social-telegram"
              className="w-fit transition-colors duration-300 hover:text-(--color-ce-primary)"
            />
          </div>
        </div>
      </div>
      <div
        ref={iconRowRef}
        className={`footer-brand-icons relative z-50 mb-1 w-full md:mb-[60px] ${
          footerReached ? "footer-brand-icons--reached" : ""
        }`}
      >
        <div className="footer-brand-icon-layer">
          {FOOTER_ICONS.map((position, index) => (
            <ParlaIcon
              key={`dark-${index}`}
              position={position}
              tone="footer-dark"
              aria-hidden="true"
              className="footer-brand-icon"
            />
          ))}
        </div>
        <div ref={litLayerRef} className="footer-brand-icon-layer footer-brand-icon-layer--lit" aria-hidden="true">
          {FOOTER_ICONS.map((position, index) => (
            <ParlaIcon
              key={`lit-${index}`}
              position={position}
              tone="footer-lit"
              aria-hidden="true"
              className="footer-brand-icon"
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
        <h2 className="opacity-40">{footerContent.copyright}</h2>
       
        
        
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
          {footerContent.cookiePolicyLabel}
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
          {footerContent.privacyPolicyLabel}
        </Link>
      </div>

      <div className="col-span-1 flex justify-end ">
        <h2 className="opacity-40">{footerContent.credit}</h2>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
