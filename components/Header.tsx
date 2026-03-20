"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

function Header() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLImageElement | null>(null);
  const bottomRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || !topRef.current || !bottomRef.current) return;

    const entranceAnimation = gsap.timeline();

    entranceAnimation.from(topRef.current, {
      x: -100,
      ease: "power3.out",

      delay: 1,
    });

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

  return (
    <header className="fixed top-3 left-0 w-full z-60 m-0 p-0 text-center pointer-events-none">
      <div className="p-0 m-0">
        <Link
          href="/"
          className="leading-none inline-block pointer-events-auto  "
        >
          <div
            ref={rootRef}
            className=" relative block overflow-hidden w-auto "
          >
            <img
              ref={topRef}
              src="/landingTransition/Asset-5.svg"
              alt="Parla"
              className="w-15 mt-1 block"
            />

            <img
              ref={bottomRef}
              src="/landingTransition/rectangular-part-of-logo-inside-parla.svg"
              alt="Parla"
              className="w-15 mt-1 absolute left-0 top-0 block"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
