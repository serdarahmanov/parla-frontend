"use client";
import React from "react";
import { usePathname } from "next/navigation";
import HoverSwapLink from "../animations/HoverSwapLink";

const navItems = [
   { label: "Work", href: "/work" ,},
  { label: "Info", href: "/about" },
  { label: "Contact", href: "/contact" ,},
  
];
function NavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-1/2 left-6 z-[99] -translate-y-1/2 text-white [mix-blend-mode:difference] max-[480px]:left-3 max-[480px]:rounded-full max-[480px]:bg-[rgba(251,251,251,0.9)] max-[480px]:px-2 max-[480px]:py-2 max-[480px]:text-black max-[480px]:[mix-blend-mode:normal] max-[480px]:[backdrop-filter:blur(2px)]">
      <nav className="site-nav flex flex-col gap-3">
        {navItems.map((item) => (
          <HoverSwapLink
            key={item.href}
            href={item.href}
            text={item.label}
            className={`text-inherit text-xs transition-opacity ${
              pathname === item.href ? "font-semibold opacity-100" : "font-medium opacity-65 hover:opacity-100"
            }`}
          />
        ))}
      </nav>
        
    </div>
  );
}

export default NavBar;
