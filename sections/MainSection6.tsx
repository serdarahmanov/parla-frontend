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
   const logo1Ref = useRef<HTMLImageElement | null>(null);
    const logo2Ref = useRef<HTMLImageElement | null>(null);
    const logo3Ref = useRef<HTMLImageElement | null>(null);
    const logo4Ref = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const parllaxTextRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !parllaxTextRef.current || !videoRef.current)
        return;

      const videoEntry = gsap.fromTo(
        videoRef.current,
        {
          scale: 1.3,
          rotate: -10,
        },
        {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: [0.76, 0, 0.24, 1],
          scrollTrigger: {
              trigger: parllaxTextRef.current,
              start: "top bottom+=4%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            }

        },
      );

      const splitText = SplitText.create(parllaxTextRef.current, {
        type: "lines,chars,words",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(self.chars, {
            yPercent: 100,
          });
          gsap.to(self.words, {
            yPercent: 0,
            duration: 0.1,
            stagger: 0.03,
            ease: [0.76, 0, 0.24, 1],
            scrollTrigger: {
              trigger: parllaxTextRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              // markers: true,
            },
          });

          return gsap.to(self.chars, {
            yPercent: 0,
            duration: 0.1,
            stagger: 0.02,
            ease: [0.76, 0, 0.24, 1],
            scrollTrigger: {
              trigger: parllaxTextRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              // markers: true,
            },
          });
        },
      });

      return () => {
        splitText.revert();
        videoEntry.kill();
      };
    },
    { scope: wrapperRef },
  );

  return (
    <section
      ref={wrapperRef}
      id={sectionId}
      className={`sticky top-0 left-0 h-screen overflow-hidden flex flex-col justify-between items-center bg-[#fefefe] ${zIndexClassName} shadow-[0_-12px_20px_-10px_rgba(0,0,0,0.25)]`}
    >
      <div className="relative top-0 left-0 z-10 flex  w-full gap-5  text-ce-text flex-col pt-[20%] overflow-hidden items-center">
        <h1
          ref={parllaxTextRef}
          className="relative font-semibold tracking-tighter font-sans text-[4rem] leading-[4rem]  text-center overflow-hidden text-white"
        >
          WE BUILD BRANDS
        </h1>
          <div className="relative z-10 intro-logo gap-1 flex flex-row  pb-10 h-[3.5rem]">
            
            <img
              src="/whiteSVGs/Asset-2.svg"
              alt="Parla"
              ref={logo2Ref}
              className=" h-full"
            />
            <img
              src="/whiteSVGs/Asset-4.svg"
              alt="Parla"
              ref={logo4Ref}
              className="h-full "
            />
            <img
              ref={logo1Ref}
              src="/whiteSVGs/Asset-1.svg"
              alt="Parla"
              className="h-full "
            />
            <img
              src="/whiteSVGs/Asset-3.svg"
              alt="Parla"
              ref={logo3Ref}
              className="h-full"
            />
            
          </div>
      </div>

      <div>
      
      </div>

      <div className="absolute z-9 left-0 top-0 inset-0 w-full h-full bg-black">
        <video
          ref={videoRef}
          className="relative w-full h-full object-cover  lg:object-cover md:object-cover opacity-80"
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
