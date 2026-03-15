"use client";

import React from "react";
import MaskTextAnimation from "@/animations/MaskTextAnimation";

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
  return (
    <section id={sectionId} className={`sticky top-0 h-screen ${zIndexClassName}`}>
   

          {/* <div className="absolute inset-0 z-10 flex h-screen w-full items-center justify-center text-6xl font-medium tracking-tighter text-ce-text">
            <MaskTextAnimation text={maskText}></MaskTextAnimation>
          </div> */}

          <div className="relative w-full h-full overflow-hidden">
            <video
              className="relative w-full h-full  object-cover oopacity-100"
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
