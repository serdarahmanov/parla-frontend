"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import HoverSwapLink from "../animations/HoverSwapLink";

function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current.children,
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

  return (
    <div
      ref={footerRef}
      className="m-0 fixed bottom-6 left-0 w-full z-50 grid grid-cols-4 px-6 
    
    text-[0.6em] font-bold text-white [mix-blend-mode:difference]
    lg:text-xs lg:font-medium items-end
    max-[480px]:bottom-3 max-[480px]:rounded-full max-[480px]:bg-[rgba(251,251,251,0.9)] max-[480px]:py-2 max-[480px]:text-black max-[480px]:[mix-blend-mode:normal] max-[480px]:[backdrop-filter:blur(2px)]
    
    "
    >
      <div className=" col-span-1 ">PARLA® ©2024</div>

      <div className="col-span-1">
        <HoverSwapLink
          className="text-inherit opacity-80 hover:opacity-100"
          href="/cookie"
          text="Cookie Policy"
        />
      </div>
      <div className="col-span-1">
        <HoverSwapLink
          className="text-inherit opacity-80 hover:opacity-100"
          href="/gdpr"
          text="Privacy Policy"
        />
      </div>

      <div className="col-span-1 flex justify-end">
        <HoverSwapLink
          className="text-inherit opacity-80 hover:opacity-100"
          href="/by-rahmanov"
          text=" Site by Rahmanov"
        />
      </div>
    </div>
  );
}

export default Footer;
