"use client";
import React, { useRef , useLayoutEffect} from "react";
import { useRouter } from "next/router";
import HoverSwapLink from "../animations/HoverSwapLink";
import gsap from 'gsap'

const navItems = [
   { label: "WORK", href: "/work", analytics: "nav-work" },
  { label: "INFO", href: "/about", analytics: "nav-info" },

  
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
    <div  className="fixed text-white mix-blend-difference  top-3 right-6 text-right z-100">
      <nav  ref={rootRef} className="site-nav flex flex-row gap-10">
        {navItems.map((item) => (
          <HoverSwapLink
            key={item.href}
            href={item.href}
            text={item.label}
            data-analytics={item.analytics}
            className={` text-[0.6em]  lg:text-xs font-sans font-medium ${pathname === item.href ? "opacity-100" : "opacity-40"}`}
          />
        ))}
      </nav>
        
    </div>
  );
}

export default NavBar;
