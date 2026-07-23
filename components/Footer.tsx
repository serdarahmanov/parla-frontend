"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

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

  return (
    <div
      ref={footerRef}
      className="absolute bottom-3 left-0 top-auto w-full z-55 grid grid-cols-4 px-6  
        font-sans
    text-[0.6rem] font-small text-black md:text-sm
    lg:text-sm lg:font-small items-end overflow-hidden"
    >
      <div className=" col-span-1  ">
        <h2 className="opacity-40"> PARLA® ©2024</h2>
       
        
        
        </div>

      <div className="col-span-1">
        <Link
          scroll={false}
          href="/cookie"
          data-analytics="footer-cookie-policy"
          className={`cta inline-flex items-center h-[var(--cta-h)] rounded-[var(--r-cta)] px-4 font-semibold transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-(--ink) focus-visible:outline-offset-2 ${
            pathname === "/cookie"
              ? "bg-(--ink) text-white"
              : "text-black hover:bg-(--ink)/10"
          }`}
        >
          cookie Policy
        </Link>
      </div>
      <div className="col-span-1">
        <Link
          scroll={false}
          href="/privacy-policy"
          data-analytics="footer-privacy-policy"
          className={`cta inline-flex items-center h-[var(--cta-h)] rounded-[var(--r-cta)] px-4 font-semibold transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-(--ink) focus-visible:outline-offset-2 ${
            pathname === "/privacy-policy"
              ? "bg-(--ink) text-white"
              : "text-black hover:bg-(--ink)/10"
          }`}
        >
          privacy Policy
        </Link>
      </div>

      <div className="col-span-1 flex justify-end ">
        <Link
          scroll={false}
          href="/by-rahmanov"
          data-analytics="footer-site-by-rahmanov"
          className={`cta inline-flex items-center h-[var(--cta-h)] rounded-[var(--r-cta)] px-4 font-semibold transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-(--ink) focus-visible:outline-offset-2 ${
            pathname === "/by-rahmanov"
              ? "bg-(--ink) text-white"
              : "text-black hover:bg-(--ink)/10"
          }`}
        >
          site by Rahmanov
        </Link>
      </div>
    </div>
  );
}

export default Footer;
