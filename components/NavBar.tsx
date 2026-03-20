"use client";
import React, { useRef , useLayoutEffect} from "react";
import { useRouter } from "next/router";
import HoverSwapLink from "../animations/HoverSwapLink";
import gsap from 'gsap'

const navItems = [
   { label: "WORK", href: "/work" ,},
  { label: "INFO", href: "/about" },
  { label: "CONTACT", href: "/contact" ,},
  
];
function NavBar() {
  const { pathname } = useRouter();
  const rootRef = useRef< HTMLDivElement | null>(null);

useLayoutEffect(() => {
    
    if(!rootRef.current)return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current.children,
        {
          x: 20,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.2,
          clearProps: "opacity",
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])









  return (
    <div  className="fixed top-1/2 left-6 z-[99] -translate-y-1/2 text-white [mix-blend-mode:difference] max-[480px]:left-3 max-[480px]:rounded-full max-[480px]:bg-[rgba(251,251,251,0.9)] max-[480px]:px-2 max-[480px]:py-2 max-[480px]:text-black max-[480px]:[mix-blend-mode:normal] max-[480px]:[backdrop-filter:blur(2px)]">
      <nav  ref={rootRef} className="site-nav flex flex-col gap-1">
        {navItems.map((item) => (
          <HoverSwapLink
            key={item.href}
            href={item.href}
            text={item.label}
            className={`text-inherit text-[0.8rem] font-medium ${pathname === item.href ? "opacity-100" : "opacity-65 hover:opacity-100"}`}
          />
        ))}
      </nav>
        
    </div>
  );
}

export default NavBar;
