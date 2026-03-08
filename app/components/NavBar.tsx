import Link from "next/link";
import React from "react";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
function NavBar() {
  return (
    <div className="nav-bar__outer">
      <nav className="site-nav">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="site-nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
        
    </div>
  );
}

export default NavBar;
