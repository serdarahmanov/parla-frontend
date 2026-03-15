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
      className="fixed bottom-6 left-0 top-auto w-full z-55 grid grid-cols-4 px-6 
    
    text-[0.6em] font-medium text-white [mix-blend-mode:difference]
    lg:text-xs lg:font-medium items-end"
    >
      <div className=" col-span-1 ">PARLA® ©2024</div>

      <div className="col-span-1">
        <HoverSwapLink
          className="text-inherit opacity-80 hover:opacity-100 "
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
