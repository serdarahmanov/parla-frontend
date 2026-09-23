"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import VideoMaskSection from "@/sections/VideoMaskSection";
import HeroSection from "@/sections/HeroSection";
import ProductionSection from "@/sections/ProductionSection";
import PortfolioVideoPlayer from "@/components/VideoPlayer";
import ProcessSection from "@/sections/ProcessSection";
import ServicesSection from "@/sections/ServicesSection";
import { works } from "@/components/data/works";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainSection2VideoLinks = ["D:/portfolio/MusicVideo/BASHYMYAYLADY.mp4"];
  const mainSection2MaskText = "WE BUILD BRANDS";

  return (
    <div className="relative text-[#050506]">
      <HeroSection />
      <ProductionSection videoLinks={works.map((work) => work.videoSrc)} />

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
