"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import { EASE_BRAND } from "@/lib/gsap/customEase";
import { usePageEntry } from "@/components/PageEntryProvider";
import ParlaIcon from "@/components/ParlaIcon";
import type { MarketingMedia } from "@/views/HomePage";

gsap.registerPlugin(ScrollTrigger, SplitText);

type VideoMaskSectionProps = {
  maskText: string;
  marqueeText: string;
  desktopMedia: MarketingMedia;
  mobileMedia: MarketingMedia;
  sectionId?: string;
  zIndexClassName?: string;
};

const VideoMaskSection = ({
  maskText,
  marqueeText,
  desktopMedia,
  mobileMedia,
  sectionId = "section-6",
  zIndexClassName = "z-21",
}: VideoMaskSectionProps) => {
   const logo1Ref = useRef<SVGSVGElement | null>(null);
    const logo2Ref = useRef<SVGSVGElement | null>(null);
    const logo3Ref = useRef<SVGSVGElement | null>(null);
    const logo4Ref = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const parllaxTextRef = useRef<HTMLHeadingElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const { entry } = usePageEntry();
  const entryId = entry?.id ?? null;
  const desktopVideo = desktopMedia.video ?? mobileMedia.video;
  const mobileVideo = mobileMedia.video ?? desktopMedia.video;
  const desktopCover = desktopMedia.coverImage ?? mobileMedia.coverImage;
  const mobileCover = mobileMedia.coverImage ?? desktopMedia.coverImage;
  const videoSourceKey = `${desktopVideo ?? ""}|${mobileVideo ?? ""}`;
  const hasVideo = Boolean(desktopVideo || mobileVideo);
  const hasCover = Boolean(desktopCover || mobileCover);

  useEffect(() => {
    setVideoReady(false);
  }, [videoSourceKey]);

  useGSAP(
    () => {
      if (
        !entryId ||
        !wrapperRef.current ||
        !parllaxTextRef.current ||
        !mediaRef.current
      )
        return;

      const videoEntry = gsap.fromTo(
        mediaRef.current,
        {
          scale: 1.3,
          rotate: -10,
        },
        {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: EASE_BRAND,
          scrollTrigger: {
              trigger: parllaxTextRef.current,
              start: "top bottom+=4%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            }

        },
      );

      const splitText = SplitText.create(parllaxTextRef.current, {
        type: "lines,chars,words",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(self.chars, {
            yPercent: 100,
          });
          gsap.to(self.words, {
            yPercent: 0,
            duration: 0.1,
            stagger: 0.03,
            ease: EASE_BRAND,
            scrollTrigger: {
              trigger: parllaxTextRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              // markers: true,
            },
          });

          return gsap.to(self.chars, {
            yPercent: 0,
            duration: 0.1,
            stagger: 0.02,
            ease: EASE_BRAND,
            scrollTrigger: {
              trigger: parllaxTextRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              // markers: true,
            },
          });
        },
      });

      return () => {
        splitText.revert();
        videoEntry.kill();
      };
    },
    {
      scope: wrapperRef,
      dependencies: [entryId, maskText, videoSourceKey],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={wrapperRef}
      id={sectionId}
      className={`relative h-screen overflow-hidden flex flex-col justify-between items-center ${zIndexClassName}`}
    >
      <div className="relative top-0 left-0 z-10 flex  w-full gap-5  text-ce-text flex-col pt-[20%] overflow-hidden items-center">
        <h1
          ref={parllaxTextRef}
          className="relative overflow-hidden text-center font-sans text-[2rem] leading-[2rem] font-semibold tracking-tighter text-white md:text-[4rem] md:leading-[4rem]"
        >
          {maskText}
        </h1>
          <div className="relative z-10 intro-logo gap-1 flex flex-row  pb-10 h-[3.5rem]">
            
            <ParlaIcon
              position="top-right"
              fill="#ffffff"
              ref={logo2Ref}
              className=" h-full"
            />
            <ParlaIcon
              position="bottom-right"
              fill="#ffffff"
              ref={logo4Ref}
              className="h-full "
            />
            <ParlaIcon
              position="top-left"
              fill="#ffffff"
              ref={logo1Ref}
              className="h-full "
            />
            <ParlaIcon
              position="bottom-left"
              fill="#ffffff"
              ref={logo3Ref}
              className="h-full"
            />
            
          </div>
      </div>

      <div>
      
      </div>

      <div
        ref={mediaRef}
        className="absolute inset-0 z-9 h-full w-full overflow-hidden rounded-[var(--r-cta)] bg-black"
      >
        {hasCover && (
          <picture>
            {mobileCover && (
              <source media="(max-width: 767px)" srcSet={mobileCover.src} />
            )}
            {/* This CMS image is rendered as a responsive full-bleed background. */}
            <img
              src={(desktopCover ?? mobileCover)?.src}
              alt={(desktopCover ?? mobileCover)?.alt ?? ""}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
          </picture>
        )}

        {hasVideo && (
          <video
            key={videoSourceKey}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              videoReady ? "opacity-80" : "opacity-0"
            }`}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            poster={(desktopCover ?? mobileCover)?.src}
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            onEmptied={() => setVideoReady(false)}
            onError={() => setVideoReady(false)}
          >
            {mobileVideo && (
              <source media="(max-width: 767px)" src={mobileVideo} />
            )}
            {desktopVideo && (
              <source media="(min-width: 768px)" src={desktopVideo} />
            )}
            <source src={desktopVideo ?? mobileVideo ?? undefined} />
          </video>
        )}
      </div>

      <div className="marketing-section-marquee" aria-hidden="true">
        <div className="marketing-section-marquee-track">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

    </section>
  );
};

export default VideoMaskSection;
