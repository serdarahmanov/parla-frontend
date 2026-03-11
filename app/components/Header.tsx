"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

function Header() {
  // const linkRef = useRef<HTMLDivElement | null>(null);

  // useGSAP(() => {
  //   const link = linkRef.current;
  //   if (!link) return;

  //   const mm = gsap.matchMedia();

  //   const createTween = (startScale: number, endDistance: number) =>
  //     gsap.fromTo(
  //       link,
  //       {
  //         y: window.innerHeight * 0.5,
  //         scale: startScale,
  //         transformOrigin: "center center",
  //       },
  //       {
  //         y: 0,
  //         scale: 1,
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: document.body,
  //           start: "top top",
  //           end: `+=${endDistance}`,
  //           scrub: true,
  //           invalidateOnRefresh: true,
  //         },
  //       },
  //     );

  //   mm.add("(max-width: 767px)", () => {
  //     const tween = createTween(1.8, 240);
  //     return () => tween.kill();
  //   });

  //   mm.add("(min-width: 768px)", () => {
  //     const tween = createTween(5.8, 420);
  //     return () => tween.kill();
  //   });

  //   return () => {
  //     mm.revert();
  //   };
  // }, []);


//  ref={linkRef}

  return (
    <header className="fixed top-3 left-0 w-full z-50 m-0 p-0 text-center pointer-events-none">
      <div className="p-0 m-0">
        <Link
          href="/"
          className="leading-none inline-block pointer-events-auto "
        >
          <img
            src="/assets/logo.svg"
            alt="Parla"
            width={50}
            height={16}
            className="block h-auto w-[50px]"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
