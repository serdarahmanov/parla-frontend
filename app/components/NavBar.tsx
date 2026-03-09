import Link from "next/link";
import React from "react";
import HoverSwapLink from "../animations/HoverSwapLink";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
function NavBar() {
  return (
    <div className="nav-bar__outer">
      <nav className="site-nav">
        {navItems.map((item) => (
        
         <HoverSwapLink key={item.href}  href={item.href} text={item.label} className="font-medium text-xs"  />
            
          
        ))}
      </nav>
        
    </div>
  );
}

export default NavBar;
