"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { GSP_NO_RETURNED_VALUE } from "next/dist/lib/constants";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

function Header() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLImageElement | null>(null);
  const bottomRef = useRef<HTMLImageElement | null>(null);
  const { pathname } = useRouter();

  useLayoutEffect(() => {
    if (!rootRef.current || !topRef.current || !bottomRef.current) return;

    const entranceAnimation = gsap.timeline();

    // entranceAnimation.from(topRef.current, {
    //   x: -100,
    //   ease: "power3.out",

    //   delay: 1,
    // });

    const tl = gsap.timeline({ paused: true });
    const el = rootRef.current;
    tl.to(topRef.current, {
      opacity: 0,
      duration: 0.35,
      scale: 0.8,
      ease: "power3.out",

      delay: 0.1,
    })
      .to(
        bottomRef.current,
        {
          opacity: 1,
          duration: 0.35,

          ease: "power3.out",
          delay: 0.1,
        },
        0,
      )
      .to(
        el,
        {
          duration: 0.35,
          scale: 1.7,
          ease: "power3.out",
          delay: 0.1,
        },
        0,
      );

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      entranceAnimation.kill();
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      tl.kill();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        
        top: 0,
        behavior: "smooth",
      });
    } else return;
  };

  const isHome = pathname === "/";

  return (
    <Link
      scroll={false}
      href="/"
      className="cta relative flex h-[var(--cta-h)] items-center leading-none shrink-0 rounded-[var(--r-cta)] px-4
        motion-reduce:transition-none
        focus-visible:outline-2 focus-visible:outline-(--ink) focus-visible:outline-offset-2"
      onClick={handleClick}
    >
      {isHome && (
        <motion.div
          layoutId="nav-active-pill"
          className="cta absolute inset-0 rounded-[var(--r-cta)] bg-(--ink)"
          transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
        />
      )}
      <div ref={rootRef} className="relative z-10 block overflow-hidden w-auto">
        <img
          ref={topRef}
          src="/landingTransition/Asset-5.svg"
          alt="Parla"
          className="w-14 block"
        />

        <img
          ref={bottomRef}
          src="/landingTransition/rectangular-part-of-logo-inside-parla.svg"
          alt="Parla"
          className="w-14 absolute left-0 top-0 block"
        />
      </div>
    </Link>
  );
}

export default Header;
