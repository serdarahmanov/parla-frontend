"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const MainSection2 = () => {
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const video = video1Ref.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const mm = gsap.matchMedia();

    const createVideoScrub = (start: string, end: string) => {
      let tl: gsap.core.Timeline | null = null;
      const TIME_EPSILON = 1 / 120;

      const init = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;

        const maxTime = Math.max(0, video.duration - 0.05);
        const proxy = {
          time: gsap.utils.clamp(0, maxTime, Number.isFinite(video.currentTime) ? video.currentTime : 0),
        };
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
          time: maxTime,
          ease: "none",
          onUpdate: () => {
            // Keep updates smooth while avoiding redundant seek writes.
            if (
              Number.isFinite(proxy.time) &&
              Math.abs(video.currentTime - proxy.time) >= TIME_EPSILON
            ) {
              video.currentTime = proxy.time;
            }
          },
        });

        // Align starting time with current scroll progress immediately on init/remount.
        const st = tl.scrollTrigger;
        if (st) {
          const targetTime = st.progress * maxTime;
          proxy.time = targetTime;
          if (Math.abs(video.currentTime - targetTime) >= TIME_EPSILON) {
            video.currentTime = targetTime;
          }
        }
      };

      if (video.readyState >= 1 && Number.isFinite(video.duration)) {
        init();
      } else {
        video.addEventListener("loadedmetadata", init, { once: true });
      }

      return () => {
        video.removeEventListener("loadedmetadata", init);
        tl?.kill();
        video.pause();
      };
    };

    mm.add("(max-width: 767px)", () => {
      return createVideoScrub("top 50%", "120% top");
    });

    mm.add("(min-width: 768px)", () => {
      return createVideoScrub("top bottom", "bottom top");
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="p-6 relative">
      <div className=' pt-20 pl-20 text-5xl absolute text-white'>Video Production</div>
      <div ref={sectionRef} className="video overflow-hidden rounded-sm">
        <video
          className="w-full min-h-screen object-bottom object-cover rounded-sm"
          ref={video1Ref}
          src="/video/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>

    
    </div>
  );
};

export default MainSection2;
