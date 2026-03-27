"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/router";

gsap.registerPlugin(useGSAP);

type HoverSwapLinkProps = {
  href: string;
  text: string;
  className?: string;
  "data-analytics": string;
};

export default function HoverSwapLink({
  href,
  text,
  className = "",
  "data-analytics": dataAnalytics,
}: HoverSwapLinkProps) {
  const router = useRouter();
  const isInternal = href.startsWith("/");
  const isHttpExternal = /^https?:\/\//i.test(href);
  const rootRef = useRef<HTMLAnchorElement | null>(null);
  const topRef = useRef<HTMLSpanElement | null>(null);
  const bottomRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!rootRef.current || !topRef.current || !bottomRef.current) return;

      const tl = gsap.timeline({ paused: true });

      tl.to(topRef.current, {
        yPercent: -100,
        duration: 0.45,
        ease: "power3.out",
        delay:0.3
      }).to(
        bottomRef.current,
        {
          yPercent: -100,
          duration: 0.45,
          ease: "power3.out",
          delay:0.3
        },
        0
      );

      const el = rootRef.current;

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        tl.kill();
      };
    },
    { scope: rootRef }
  );

  const pushOutboundClick = () => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];

    const anchor = rootRef.current;
    const pageContext = window.__pageContext;

    window.dataLayer.push({
      event: "outbound_click",
      outbound: true,
      link_url: anchor?.href || href,
      link_text: (anchor?.textContent || text || "").trim(),
      link_id: anchor?.dataset.track || "",
      page_location: pageContext?.currentPageLocation || window.location.href,
      page_title: document.title,
      page_referrer: pageContext?.currentPageReferrer || document.referrer || "",
    });
  };

  return (
    <a
      href={href}
      ref={rootRef}
      data-track={dataAnalytics}
      className={`relative ${className}`}
      target={isHttpExternal ? "_blank" : undefined}
      rel={isHttpExternal ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (!isInternal) {
          pushOutboundClick();
          return;
        }

        if (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          (e.nativeEvent as MouseEvent).button === 1
        ) {
          return;
        }

        e.preventDefault();

        if (router.pathname === href) {
          return;
        }

        void router.push(href, undefined, {scroll:false});
      }}
    >
      <span className="relative block overflow-hidden">
        <span ref={topRef} className="block text-inherit">
          {text}
        </span>

        <span ref={bottomRef} className="absolute left-0 top-full block text-inherit ">
          {text}
        </span>
      </span>

    </a>
  );
}
