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
    <header className="fixed top-3 left-0 w-full z-50 m-0 p-0 text-center pointer-events-none">
      <div className="p-0 m-0">
        <Link
          href="/"
          className="leading-none inline-block pointer-events-auto "
        >
          <img
            src="/assets/logo.svg"
            alt="Parla"
            width={50}
            height={16}
            className="block h-auto w-[50px]"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
