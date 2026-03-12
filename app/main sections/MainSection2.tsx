"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const MainSection2 = () => {
  // Refs
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const captionTriggerRef = useRef<HTMLDivElement | null>(null);
  const captionWrapRef = useRef<HTMLDivElement | null>(null);
  const captionTextRef = useRef<HTMLParagraphElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // UI state
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeCaptionIndex, setActiveCaptionIndex] = useState(0);

  // Data (replace with your real four video files when ready)
  const videoSources = [
    "/video/output.mp4",
    "/video/1.MOV",
    "/video/output.mp4",
    "/video/1.MOV",
  ];
  const captions = [
    "Concept and story setup",
    "Production day highlights",
    "Post-production details",
    "Final delivery and rollout",
  ];

  // Shared breakpoint mapping for both video and caption text changes.
  // 0.2 / 0.4 / 0.6 => first/second/third/fourth segment.
  const getIndexFromProgress = (progress: number) => {
    if (progress >= 0.6) return 3;
    if (progress >= 0.4) return 2;
    if (progress >= 0.2) return 1;
    return 0;
  };

  useGSAP(() => {
    // -------- Animation Block 1: Video trigger (index only) --------
    const section = sectionRef.current;

    // -------- Animation Block 2: Caption trigger + caption movement --------
    const captionTriggerEl = captionTriggerRef.current;
    const captionWrap = captionWrapRef.current;

    if (!section || !captionTriggerEl || !captionWrap) return;

    const videoTrigger = ScrollTrigger.create({
      trigger: section,
      // Track progress while section moves through viewport.
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const nextIndex = getIndexFromProgress(self.progress);
        // Avoid unnecessary re-renders if index did not actually change.
        setActiveVideoIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      },
    });

    const captionTrigger = ScrollTrigger.create({
      trigger: captionTriggerEl,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const nextIndex = getIndexFromProgress(self.progress);
        setActiveCaptionIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      },
    });

    const captionMoveTween = gsap.fromTo(
      captionWrap,
      // You changed these values to 1% -> 95% for stronger travel.
      { top: "1%", autoAlpha: 1 },
      {
        top: "95%",
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: {
          trigger: captionTriggerEl,
          start: "top bottom",
          end: "bottom top",
          // Directly binds movement to scroll position.
          scrub: true,
        },
      }
    );

    // Cleanup on unmount/re-init (including ScrollTrigger refresh cycles in React mounts):
    // kill video index trigger, caption index trigger, and caption movement tween.
    return () => {
      // Stops the video section progress listener.
      videoTrigger.kill();
      // Stops caption text breakpoint updates.
      captionTrigger.kill();
      // Stops scrubbed caption wrapper movement (top: 1% -> 95%).
      captionMoveTween.kill();
    };
  }, []);

  // -------- Animation Block 3: Active video playback control --------
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeVideoIndex) {
        // Keep only the active video playing.
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeVideoIndex]);

  // -------- Animation Block 4: Caption text swap easing --------
  useEffect(() => {
    const textEl = captionTextRef.current;
    if (!textEl) return;

    // Prevent overlap when user scrolls quickly across multiple breakpoints.
    gsap.killTweensOf(textEl);
    gsap.fromTo(
      textEl,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" }
    );
  }, [activeCaptionIndex]);

  return (
    <div className="relative">
      <div ref={sectionRef} className="relative min-h-screen">
        <div className="video overflow-hidden relative min-h-screen">
          {videoSources.map((src, index) => (
            <video
              key={`${src}-${index}`}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              className={`absolute inset-0 h-full w-full object-bottom object-cover ${
                activeVideoIndex === index ? "opacity-100" : "opacity-0"
              }`}
              src={src}
              muted
              playsInline
              preload="auto"
            />
          ))}
        </div>
      </div>

      <div
        ref={captionTriggerRef}
        className="pointer-events-none absolute inset-0 z-[99] text-white [mix-blend-mode:difference]"
      >
        <div
          ref={captionWrapRef}
          className="absolute right-6 text-xl md:text-lg leading-tight"
        >
          <p ref={captionTextRef}>{captions[activeCaptionIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default MainSection2;
