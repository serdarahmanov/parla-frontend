"use client";

import React, { useRef } from "react";
import MaskTextAnimation from "@/animations/MaskTextAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);


type MainSection6Props = {
  videoLinks: string[];
  maskText: string;
  sectionId?: string;
  zIndexClassName?: string;
};

const MainSection6 = ({
  videoLinks,
  maskText,
  sectionId = "section-6",
  zIndexClassName = "z-21",
}: MainSection6Props) => {
  const wrapperRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const parllaxTextRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !parllaxTextRef.current) return;

      const splitText = SplitText.create(parllaxTextRef.current, {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          const tl = gsap.timeline();

          // entry
          tl.from(self.words, {
            yPercent: 100,
            duration: 0.4,
            stagger: 0.03,
            delay: 1,
            ease: [0.76, 0, 0.24, 1],
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top center",
              end: "center 80%",
              toggleActions: "play none reverse none",
              invalidateOnRefresh: true,
              markers:true
              
            },
          });

          return tl;
        },
      });
    
    return()=>{splitText.revert();}
    },
    { scope: wrapperRef },
  );

  return (
    <section
      ref={wrapperRef}
      id={sectionId}
      className={`sticky top-0 h-screen overflow-hidden bg-[#fefefe] ${zIndexClassName} shadow-[0_-12px_20px_-10px_rgba(0,0,0,0.25)]`}
    >
      <div className="absolute top-0 left-0 z-10 flex h-screen w-full items-center justify-center text-ce-text flex-col py-30">
        <h1
          ref={parllaxTextRef}
          className="relative font-medium tracking-tight font-sans text-[4rem] leading-[3rem] h-full w-full text-center "
        >
          {maskText}
        </h1>
      </div>

      <div className="relative w-full h-full items-center flex flex-col ">
        <video
          ref={videoRef}
          className="absolute left-0 w-full h-full object-cover scale-100 lg:object-cover md:object-cover"
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
        >
          {videoLinks.map((videoLink, index) => (
            <source key={`${videoLink}-${index}`} src={videoLink} />
          ))}
        </video>
      </div>
    </section>
  );
};

export default MainSection6;
