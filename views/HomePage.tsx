"use client";

import { useState } from "react";
import ParagraphSticky from "@/animations/ParagraphSticky";

import MainSection6 from "../sections/MainSection6";
import MainSection3 from "../sections/MainSection3";
import MainSection4 from "../sections/MainSection4";
import MainSection5 from "../sections/MainSection5";
import MainSection2 from "@/sections/MainSection2";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSection2VideoLinks = ["/video/TasVegias.mp4"];
  const mainSection2MaskText = "WE BUILD BRANDS";

  return (
    <div className="relative bg-black">
     
        <MainSection2 videoLinks={["/video/TasVegias.mp4"]} maskText={"Deneme"}  />
      

      <MainSection6
        videoLinks={mainSection2VideoLinks}
        maskText={mainSection2MaskText}
        sectionId="section-2"
        zIndexClassName="z-21"
      ></MainSection6>
      <MainSection3></MainSection3>

      <ParagraphSticky
        index={1}
        activeIndex={activeIndex}
        onActiveChange={setActiveIndex}
        text={"SERVICES"}
        triggerSelector="#section-3"
        startTop="100vh"
        topStay="2vh"
        textColor="text-ce-text"
        bgColor="bg-black"
      />
      <MainSection4></MainSection4>

      <ParagraphSticky
        index={2}
        activeIndex={activeIndex}
        onActiveChange={setActiveIndex}
        text={"PROCESS"}
        secondText="Our Process "
        triggerSelector="#section-4"
        textColor="text-ce-text"
        bgColor="bg-black"
        startTop="150vh"
        topStay="5vh"
      />
      <MainSection5></MainSection5>

      <ParagraphSticky
        index={3}
        activeIndex={activeIndex}
        onActiveChange={setActiveIndex}
        text={"CLIENTS"}
        secondText="Our Process "
        triggerSelector="#section-5"
        textColor="text-ce-text"
        bgColor="bg-black"
        startTop="200vh"
        topStay="8vh"
      />
    </div>
  );
}
