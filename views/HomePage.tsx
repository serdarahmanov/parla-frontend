"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MainSection6 from "../sections/MainSection6";
import MainSection3 from "../sections/MainSection3";
import MainSection4 from "../sections/MainSection4";
import MainSection5 from "../sections/MainSection5";
import MainSection2 from "@/sections/MainSection2";
import PortfolioVideoPlayer from "@/components/VideoPlayer";
import MainSection7 from "@/sections/MainSection7";
import MainSection8 from "@/sections/MainSection8";

gsap.registerPlugin(ScrollTrigger);

type HomeProps = {
  introDone?: boolean;
};

export default function Home({ introDone }: HomeProps) {
  const mainSection2VideoLinks = ["D:/portfolio/MusicVideo/BASHYMYAYLADY.mp4"];
  const mainSection2MaskText = "WE BUILD BRANDS";

  return (
    <div className="relative bg-[#FAFAF9] text-[#050506]">
      <MainSection2
        videoLinks={["/video/TasVegias.mp4"]}
        maskText={"WE MAKE IT"}
        introDone={introDone}
      />

      <MainSection6
        videoLinks={mainSection2VideoLinks}
        maskText={mainSection2MaskText}
        sectionId="section-2"
        zIndexClassName="z-21"
      ></MainSection6>
      <MainSection8></MainSection8>
      <MainSection7></MainSection7>
      <MainSection5></MainSection5>
    </div>
  );
}
