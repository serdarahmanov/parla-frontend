"use client";
import { useRef } from "react";
import ScrollCounter from "./components/ScrollCounter";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverSwapLink from "./animations/HoverSwapLink";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function Home() {
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  

  useGSAP(() => {
    const video = video1Ref.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const mm = gsap.matchMedia();

    const createVideoScrub = (start: string, end: string) => {
      let tl: gsap.core.Timeline | null = null;

      const init = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;

        const proxy = { time: 0 };
        tl?.kill();

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(proxy, {
          time: video.duration - 0.05,
          ease: "none",
          onUpdate: () => {
            if (Number.isFinite(proxy.time)) {
              video.currentTime = proxy.time;
            }
          },
        });

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1 && Number.isFinite(video.duration)) {
        init();
      } else {
        video.addEventListener("loadedmetadata", init, { once: true });
      }

      return () => {
        video.removeEventListener("loadedmetadata", init);
        tl?.kill();
      };
    };

    mm.add("(max-width: 767px)", () => createVideoScrub("top 50%", "120% top"));
    mm.add("(min-width: 768px)", () => createVideoScrub("top bottom", "bottom top"));

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="m-1">
      <ScrollCounter />
      <div className="w-full h-screen  rounded-2xl"></div>

      <div ref={sectionRef} className="video ">
        <video
          className="w-full min-h-screen object-bottom object-cover"
          ref={video1Ref}
          src="/video/output.mp4"
          muted
          playsInline
          preload="metadata"
        />
      </div>
        


      <div className="w-full min-h-screen">
      </div>
      <div className="w-full min-h-screen"></div>

    </div>
  );
}
