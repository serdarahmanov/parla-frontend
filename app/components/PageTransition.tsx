"use client";
import React, { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP);
type Props = {
  children: ReactNode;
};

export default function PageTransition({ children }: Props) {
  const pathname = usePathname();

  const container = useRef<HTMLDivElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [displayedPath, setDisplayedPath] = useState(pathname);

  useGSAP(() => {
   

      setDisplayedPath(pathname);

        // flash animation
        gsap.fromTo(
          flashRef.current,
          { opacity: 0.2 },
          { opacity: 0, duration: 0.3 }
        ).then(()=>{
            
        setDisplayChildren(children);
       });
    
  }, [pathname]);

  return (
    <div ref={container}>
      <div
        ref={flashRef}
        className=" opacity-0 absolute z-30 w-full h-screen bg-white"
      >
        {" "}
      </div>
      {displayChildren}
    </div>
  );
}
