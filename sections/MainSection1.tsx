"use client";
import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParagraphSticky from "@/animations/ParagraphSticky";
import MaskTextAnimation from "@/animations/MaskTextAnimation";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type Props= {
  arkaRenk?: string,
  text?: string,
  textColor?:string,
  direction?:number,
  
}

const MainSection1 = ({arkaRenk,text= "Yazmaly birzatlar",textColor, direction=1}:Props) => {

const scopeRef = useRef<HTMLDivElement | null> (null);







  return (
    <div  ref={scopeRef} className={`scticky h-screen top-0 z-11 w-full  bg-whitejustify-center  items-center ${arkaRenk}  ${textColor} text-[2rem] leading-8 font-normal     tracking-tighter`}>
     
        
            <video
              className="relative h-full w-full object-contain  opacity-100"
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
              src="/video/TasVegias.mp4"
            >
            </video>
           
      
     
  
         <div className="relative z-12 flex h-screen w-full items-center justify-center text-6xl font-medium tracking-tighter text-black">
            <MaskTextAnimation text={text}></MaskTextAnimation>
          </div>
    </div>
  );
};

export default MainSection1;
