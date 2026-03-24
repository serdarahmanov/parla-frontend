"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import MaskTextAnimation from "@/animations/MaskTextAnimation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MainSection2Props = {
  videoLinks: string[];
  maskText: string;
};

const MainSection2 = ({ videoLinks, maskText }: MainSection2Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const backTextRef = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      if (
        !wrapperRef.current ||
        !scrollRef.current ||
        !introRef.current ||
        !backTextRef.current
      )
        return;

      const weListen = backTextRef.current.querySelector(".weListen");
      const weCraft = backTextRef.current.querySelector(".weCraft");
      const weDeliver = backTextRef.current.querySelector(".weDeliver");


      if (!weListen|| !weCraft || !weDeliver) return;
      const textAnimationTl = gsap.timeline(); 
      
      textAnimationTl.from(
        [weListen,weCraft,weDeliver],
        {
         opacity:0,
        stagger: 0.6,
          scrollTrigger: {
            trigger: wrapperRef.current,
           start: "top top-=40%",
      end: "bottom top+=35%",
            scrub: true,
            markers: true,
          },

        },
       
      )

      // Intro animation ONLY on introRef
      const introTween = gsap.fromTo(
        introRef.current,
        {
          clipPath: "inset(50% 0% 50% 0%)",
          scale: 0.8,
          y: 100,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: [0.76, 0, 0.24, 1],
          clearProps: "clipPath",
        },
      );

      // Scroll animation ONLY on scrollRef
      const scrollTween = gsap.to(scrollRef.current, {
        scale: 0.8,
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top-=10vh",
          end: "bottom center+=10vh",
          scrub: true,
        },
      });

      return () => {
        introTween.kill();
        scrollTween.kill();
        textAnimationTl.kill();
      };
    },
    { scope: wrapperRef },
  );

  return (
    <div
      id="section-1"
      ref={wrapperRef}
      className="sticky top-0 h-screen w-full z-20 overflow-hidden bg-[#fefefe]"
    >
      <div
        ref={backTextRef}
        className="absolute text-lg font-medium  text-black font-sans inset-0 left-1/2 -translate-x-1/2 top-[25%] text-center"
      >
        <span className="weListen inline-block">WE LISTEN,</span> 
        <span className="weCraft inline-block">WE CRAFT,</span> 
        <span className="weDeliver inline-block">WE DELIVER</span>
      </div>
      {/* Scroll layer */}
      <div ref={scrollRef} className="relative h-full w-full">
        {/* Intro layer */}
        <div ref={introRef} className="relative h-full w-full overflow-hidden">
          {/* Video */}
          <div className="absolute inset-0 z-0">
            <video
              className="h-full w-full object-cover"
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
            >
              {videoLinks.map((videoLink) => (
                <source key={videoLink} src={videoLink} />
              ))}
            </video>
          </div>

          {/* Text */}
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-white">
            <MaskTextAnimation
              className="w-full p-0 m-0 text-center text-6xl font-sans font-semibold tracking-tight"
              text={maskText}
            />
            <p className="m-0 p-0 font-sans tracking-tighter">
              Description About The Work
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection2;
