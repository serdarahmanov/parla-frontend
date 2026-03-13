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
};

export default function HoverSwapLink({
  href,
  text,
  className = "",
}: HoverSwapLinkProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLAnchorElement | null>(null);
  const topRef = useRef<HTMLSpanElement | null>(null);
  const bottomRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!rootRef.current || !topRef.current || !bottomRef.current) return;

      const tl = gsap.timeline({ paused: true });

      tl.to(topRef.current, {
        yPercent: -100,
        duration: 0.35,
        ease: "power3.out",
        delay:0.1
      }).to(
        bottomRef.current,
        {
          yPercent: -100,
          duration: 0.35,
          ease: "power3.out",
          delay:0.1
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
// relative text-inherit
// href={href}
      // ref={rootRef}
  return (
    <a
      href={href}
      ref={rootRef}
      className={`relative ${className}`}
      onClick={(e) => {
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

        void router.push(href);
      }}
    >
      <span className="relative block overflow-hidden">
        <span ref={topRef} className="block text-inherit">
          {text}
        </span>

        <span ref={bottomRef} className="absolute left-0 top-full block text-inherit opacity-65">
          {text}
        </span>
      </span>

    </a>
  );
}
