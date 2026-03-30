"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import HoverSwapLink from "../animations/HoverSwapLink";
import { usePathname } from "next/navigation";

function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

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
      className="absolute bottom-3 left-0 top-auto w-full z-55 grid grid-cols-4 px-6  
        font-sans
    text-[0.6rem] font-semibold text-black md:text-[0.7rem]
    lg:text-xs lg:font-semibold items-end overflow-hidden"
    >
      <div className=" col-span-1  ">
        <h2 className="opacity-40"> PARLA® ©2024</h2>
       
        
        
        </div>

      <div className="col-span-1">
        <HoverSwapLink
          className={`text-inherit ${
    pathname === "/cookie" ? "opacity-100" : "opacity-40"
  }`}
          href="/cookie"
          text="Cookie Policy"
          data-analytics="footer-cookie-policy"
        />
      </div>
      <div className="col-span-1">
        <HoverSwapLink
          className={`text-inherit ${
    pathname === "/privacy-policy" ? "opacity-100" : "opacity-40"
  }`}
          href="/privacy-policy"
          text="Privacy Policy"
          data-analytics="footer-privacy-policy"
        />
      </div>

      <div className="col-span-1 flex justify-end ">
        <HoverSwapLink
          className="text-inherit opacity-40 "
          href="/by-rahmanov"
          text=" Site by Rahmanov"
          data-analytics="footer-site-by-rahmanov"
        />
      </div>
    </div>
  );
}

export default Footer;
