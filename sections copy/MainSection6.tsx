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

  // useGSAP(
  //   () => {
  //     if (!wrapperRef.current || !videoRef.current) return;

  //     // gsap.set(wrapperRef.current,{
  //     //   scale:0.98,
  //     // })

  //    const tl  = gsap.timeline();



  // tl.to(videoRef.current, {
  //       yPercent: 50, // move video slightly while scrolling
  //        // helps avoid empty edges
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: wrapperRef.current,
  //         start: "top bottom",
  //         end: "bottom top",
  //         scrub: true,
          
  //       },
  //     })
  //   },
  //   { scope: wrapperRef },
  // );

  return (
    <section
      ref={wrapperRef}
      id={sectionId}
      className={`sticky top-0 h-screen overflow-hidden bg-[#fefefe] ${zIndexClassName} shadow-[0_-12px_20px_-10px_rgba(0,0,0,0.25)]`}
    > 
   
      
      <div className="absolute inset-0 z-10 flex h-screen w-full items-center justify-center text-ce-text flex-col">
        <MaskTextAnimation
          className=" p-0 m-0 text-4xl md:text-5xl lg:text-5xl font-sans  w-full text-center tracking-tighter font-semibold "
          text={maskText}
        ></MaskTextAnimation>
        
      </div>

      <div  className="relative w-full h-full items-center flex flex-col ">
       
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
