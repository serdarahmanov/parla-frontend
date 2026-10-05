"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import VideoMaskSection from "@/sections/VideoMaskSection";
import HeroSection from "@/sections/HeroSection";
import ProductionSection from "@/sections/ProductionSection";
// import ProcessSection from "@/sections/ProcessSection";
import ImageRailSection from "@/sections/ImageRailSection";
import ServicesSection from "@/sections/ServicesSection";
import { works } from "@/components/data/works";

gsap.registerPlugin(ScrollTrigger);

export type HomeBrandStatementData = {
  statement: string;
  marqueeText: string;
  desktop: MarketingMedia;
  mobile: MarketingMedia;
};

export type MarketingMedia = {
  coverImage: {
    src: string;
    alt: string;
  } | null;
  video: string | null;
};

type HomeProps = {
  brandStatement: HomeBrandStatementData;
};

export default function Home({ brandStatement }: HomeProps) {
  return (
    <div className="relative text-[#050506]">
      <HeroSection />
      <ProductionSection videoLinks={works.map((work) => work.videoSrc)} />

      <VideoMaskSection
        maskText={brandStatement.statement}
        marqueeText={brandStatement.marqueeText}
        desktopMedia={brandStatement.desktop}
        mobileMedia={brandStatement.mobile}
        sectionId="section-2"
        zIndexClassName="z-21"
      ></VideoMaskSection>
      <ServicesSection></ServicesSection>
      {/* <ProcessSection></ProcessSection> */}
      <ImageRailSection />
      <div aria-hidden="true" className="h-[20vh] md:h-[30vh]" />
    </div>
  );
}
