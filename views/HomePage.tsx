"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import VideoMaskSection from "@/sections/VideoMaskSection";
import HeroSection from "@/sections/HeroSection";
import PortfolioVideoPlayer from "@/components/VideoPlayer";
import ProcessSection from "@/sections/ProcessSection";
import ServicesSection from "@/sections/ServicesSection";

gsap.registerPlugin(ScrollTrigger);

type HomeProps = {
  introDone?: boolean;
};

export default function Home({ introDone }: HomeProps) {
  const mainSection2VideoLinks = ["D:/portfolio/MusicVideo/BASHYMYAYLADY.mp4"];
  const mainSection2MaskText = "WE BUILD BRANDS";

  return (
    <div className="relative text-[#050506]">
      <HeroSection
        videoLinks={["/video/TasVegias.mp4"]}
        maskText={"WE MAKE IT"}
        introDone={introDone}
      />

      <VideoMaskSection
        videoLinks={mainSection2VideoLinks}
        maskText={mainSection2MaskText}
        sectionId="section-2"
        zIndexClassName="z-21"
      ></VideoMaskSection>
      <ServicesSection></ServicesSection>
      <ProcessSection></ProcessSection>
    </div>
  );
}
