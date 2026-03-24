"use client";

import React, { useRef } from "react";
import MaskTextAnimation from "@/animations/MaskTextAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

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

  useGSAP(
    () => {
      if (!wrapperRef.current || !videoRef.current) return;

      gsap.set(wrapperRef.current,{
        scale:0.98,
      })

     const tl  = gsap.timeline();



  tl.to(videoRef.current, {
        yPercent: 50, // move video slightly while scrolling
         // helps avoid empty edges
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          
        },
      }).to(wrapperRef.current, {
        scale: 0.8,
        opacity:1,
        yPercent:40,
      
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom center+=10vh",
          scrub: true,

      },},0);
    },
    { scope: wrapperRef },
  );

  return (
    <section
      ref={wrapperRef}
      id={sectionId}
      className={`sticky top-0 h-screen overflow-hidden bg-[#fefefe] ${zIndexClassName}`}
    > 
   
      
      <div className="absolute inset-0 z-10 flex h-screen w-full items-center justify-center text-ce-text flex-col">
        <MaskTextAnimation
          className="p-0 m-0 text-7xl font-sans w-full text-center tracking-tighter font-semibold "
          text={maskText}
        ></MaskTextAnimation>
        <p className="p-0 m-0">Description About The Work</p>
      </div>

      <div  className="relative w-full h-full items-center flex flex-col ">
       
        <video
          ref={videoRef}
          className="absolute left-0 w-full h-full object-contain scale-150 -top-45"
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
