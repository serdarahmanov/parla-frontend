"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import MaskTextAnimation from "@/animations/MaskTextAnimation";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type MainSection2Props = {
  videoLinks: string[];
  maskText: string;
};

const MainSection2 = ({ videoLinks, maskText }: MainSection2Props) => {
  const wrapperRef = useRef<HTMLDivElement | null> (null);


  // useEffect(()=>{
  //   if(!wrapperRef.current) return;

  //   const context = gsap.context(()=>{

  //     // gsap.from(wrapperRef.current,{
        
    
       
  //     //   scale: 1.2,
  //     //   duration:1.2,
  //     //   ease: [0.76, 0, 0.24, 1],
  //     //   })


    


  // },wrapperRef);


  // return ()=> context.revert();




  // },[])








  return (
    <div id="section-1" ref={wrapperRef} className="sticky top-0 h-screen z-20 w-full  bg-black  flex flex-col">
     
     
      {/* <div  className="relative min-h-screen bg-black  flex flex-col"> */}

        {/* <div className="absolute h-screen inset-0 w-full  flex flex-col justify-center items-center z-10 text-6xl text-ce-text font-medium tracking-tighter">
     
              <MaskTextAnimation text={maskText} ></MaskTextAnimation>

       
        </div> */}
        <div className="video overflow-hidden absolute inset-0 h-screen">
          <video
            className="absolute inset-0 h-full w-full object-bottom object-cover opacity-100"
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
       
      {/* </div> */}
         
    </div>
  );
};

export default MainSection2;
