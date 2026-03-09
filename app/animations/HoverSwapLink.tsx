"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

  return (
    <Link
      
      href={href}
      ref={rootRef}
      className={`relative   ${className}`}
    >
      <span className="relative block  overflow-hidden">
        <span ref={topRef} className="block">
          {text}
        </span>

        <span ref={bottomRef} className="absolute left-0 top-full block opacity-50">
          {text}
        </span>
      </span>
    </Link>
  );
}