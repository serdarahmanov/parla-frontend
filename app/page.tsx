"use client";
import { useRef } from "react";
import ScrollCounter from "./components/ScrollCounter";
import { useMediaQuery } from "react-responsive";
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
  const isMobile = useMediaQuery({ maxWidth: 767 });
  

  useGSAP(() => {
    const video = video1Ref.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const startValueForVideo1 = isMobile ? "top 50%" : "top bottom";
    const endValueForVide1 = isMobile ? "120% top" : "bottom top";

    let tl: gsap.core.Timeline | null = null;

    const init = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      const proxy = { time: 0 };

      tl?.kill();

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: startValueForVideo1,
          end: endValueForVide1,
          scrub: true,
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
  }, [isMobile]);

  return (
    <div className="m-1">
      <ScrollCounter />
      <div className="w-full h-screen bg-black"></div>

      <div ref={sectionRef} className="video bg-blue-500 h-screen">
        <video
          className="w-full object-bottom object-cover"
          ref={video1Ref}
          src="/video/output.mp4"
          muted
          playsInline
          preload="metadata"
        />
      </div>
        


      <div className="w-full min-h-screen bg-black">
      </div>
      <div className="w-full min-h-screen bg-black"></div>

    </div>
  );
}