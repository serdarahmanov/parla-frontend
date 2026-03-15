"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

function Header() {
  
  return (
    <header className="fixed top-3 left-0 w-full z-60 m-0 p-0 text-center pointer-events-none">
      <div className="p-0 m-0">
        <Link
          href="/"
          className="leading-none inline-block pointer-events-auto "
        >
         
          <img
            src="/landingTransition/Asset-5.svg"
            alt="Parla"
            
            className="w-15 mt-1"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
