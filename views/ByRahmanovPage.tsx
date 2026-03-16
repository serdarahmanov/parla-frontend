"use client";

import MaskTextAnimation from "@/animations/MaskTextAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { use, useLayoutEffect, useRef, useState } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollToPlugin);

function ByRahmanov() {
  const wrapperRef = useRef(null);
  const leftSideBarRef = useRef(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftSideBarRef.current,
        pinSpacing: false,
      });
    }, wrapperRef);

    return () => context.revert();
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="bg-white">
      <div className="relative grid grid-cols-12 pt-25 pb-[10vh] px-6 ">
        <div
          ref={leftSideBarRef}
          className="h-screen col-span-3 gap-4 flex flex-col col-start-4"
        >
          <MaskTextAnimation
            text={"BY RAHMANOV"}
            className=" leading-7"
          ></MaskTextAnimation>

          <div className="gap-1 text-xs font-bold  flex flex-col">
            <h2>Overview</h2>
          </div>
        </div>

        <div className="col-start-8 col-span-4 gap-8 flex flex-col">
          <div className="flex flex-col gap-3 text-xs font-sans">
            <h2 className=" text-xs font-bold">Overview</h2>

            <p>
              This website was created in April 2026, while I was a first-year
              Computing student at the University of Greenwich. It is the first
              website I built for a real production project, using Next.js and
              GSAP for animations.
            </p>
            <p>
              During development, I changed the project from App Router to Page
              Router to make the animation system work more smoothly and to have
              better control over page transitions.
            </p>

            <p>
              For me, this project is more than just a website. It was part of
              learning how to truly work with HTML layouts and structure. Unlike
              Photoshop or other design tools, here you are not simply placing
              elements — you are building a living and interactive layout that
              users can experience.
            </p>
            <p>
              Many visual ideas and approaches were inspired by other creative
              production websites. Throughout the process, I also used ChatGPT a
              lot to explore solutions, understand concepts, and continue
              improving the project
            </p>
            <p>And finally — it is done.</p>
            <p>I hope you enjoy it.</p>
            <div className="text-sm font-sans">
              <p>Hello from April 2026.</p>
              <p>— Rahmanov</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ByRahmanov;
