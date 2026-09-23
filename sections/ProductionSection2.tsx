"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "@/components/data/works";
import { EASE_BRAND } from "@/lib/gsap/customEase";

gsap.registerPlugin(ScrollTrigger);

const libraryWorks = [...works, ...works];
const libraryAngleStep = 360 / libraryWorks.length;

type ProductionSectionProps = {
  videoLinks: string[];
};

const ProductionSection = ({ videoLinks }: ProductionSectionProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const introPhotosRef = useRef<(HTMLImageElement | null)[]>([]);
  const libraryRingRef = useRef<HTMLDivElement | null>(null);
  const libraryCardContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const shouldAutoplayNextVideoRef = useRef(false);
  const [heroVideoIndex, setHeroVideoIndex] = useState(0);
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false);
  const [heroVideoMuted, setHeroVideoMuted] = useState(true);
  const [libraryRotation, setLibraryRotation] = useState(162);
  const [selectedLibraryIndex, setSelectedLibraryIndex] = useState(0);
  const librarySpinTweenRef = useRef<gsap.core.Tween | null>(null);

  const heroVideoSources = videoLinks.length ? videoLinks : [works[2].videoSrc];
  const activeVideoIndex = heroVideoIndex % heroVideoSources.length;
  const heroVideoSrc = heroVideoSources[activeVideoIndex];

  const toggleHeroVideo = async () => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  };

  const toggleHeroVideoMute = () => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setHeroVideoMuted(video.muted);
  };

  const selectHeroVideo = (libraryIndex: number) => {
    const videoIndex = libraryIndex % heroVideoSources.length;
    setSelectedLibraryIndex(libraryIndex);

    if (videoIndex !== heroVideoIndex) {
      shouldAutoplayNextVideoRef.current = true;
      setHeroVideoIndex(videoIndex);
    }

    focusProject(libraryIndex);
  };

  const focusProject = (index: number) => {
    if (!libraryRingRef.current) return;

    gsap.killTweensOf(libraryRingRef.current);
    const currentRotation = Number(gsap.getProperty(libraryRingRef.current, "rotation")) || libraryRotation;
    const itemAngle = index * libraryAngleStep - 162;
    const desiredRotation = (window.innerWidth < 768 ? -90 : 0) - itemAngle;
    const shortestDelta = ((desiredRotation - currentRotation + 540) % 360) - 180;

    librarySpinTweenRef.current?.kill();
    librarySpinTweenRef.current = gsap.to(libraryRingRef.current, {
      rotation: currentRotation + shortestDelta,
      duration: 1,
      ease: EASE_BRAND,
      onUpdate: () => syncLibraryCardOrientation(Number(gsap.getProperty(libraryRingRef.current, "rotation")) || 0),
      onComplete: () => setLibraryRotation(currentRotation + shortestDelta),
    });
  };

  const syncLibraryCardOrientation = (rotation: number) => {
    libraryCardContentRefs.current.forEach((card, index) => {
      if (!card) return;
      const itemAngle = index * libraryAngleStep - 162;
      card.style.setProperty("--production-card-counter", `${-(rotation + itemAngle)}deg`);
    });
  };

  useEffect(() => {
    setHeroVideoPlaying(false);

    if (!shouldAutoplayNextVideoRef.current) return;

    const video = heroVideoRef.current;
    if (!video) return;

    const playNextVideo = () => {
      shouldAutoplayNextVideoRef.current = false;
      void video.play().catch(() => setHeroVideoPlaying(false));
    };

    if (video.readyState >= 3) {
      playNextVideo();
      return;
    }

    video.addEventListener("canplay", playNextVideo, { once: true });
    return () => video.removeEventListener("canplay", playNextVideo);
  }, [heroVideoIndex]);

  useGSAP(() => {
    const introPhotos = introPhotosRef.current.filter(
      (photo): photo is HTMLImageElement => Boolean(photo),
    );

    if (introPhotos.length) {
      gsap.fromTo(
        introPhotos,
        { y: 14 },
        {
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: EASE_BRAND,
        },
      );
    }

  }, { scope: wrapperRef });

  useGSAP(() => {
    if (!wrapperRef.current || !libraryRingRef.current) return;

    const focusRotation = window.innerWidth < 768 ? 72 : 162;
    const entryTween = gsap.fromTo(
      libraryRingRef.current,
      { rotation: focusRotation + 180, transformOrigin: "0 0" },
      {
        rotation: focusRotation,
        duration: 1.8,
        ease: EASE_BRAND,
        onUpdate: () => syncLibraryCardOrientation(Number(gsap.getProperty(libraryRingRef.current, "rotation")) || 0),
        onComplete: () => setLibraryRotation(focusRotation),
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 78%",
          once: true,
        },
      },
    );

    return () => entryTween.kill();
  }, { scope: wrapperRef });

  return (
    <section
      ref={wrapperRef}
      id="production-section"
      aria-label="Production work"
      className="relative z-21 mb-[clamp(4rem,10vw,10rem)] flex h-auto flex-col px-0 md:h-[95dvh]"
    >
      <div className="relative grid h-auto gap-8 md:h-full md:grid-cols-[minmax(0,1fr)_max-content] md:gap-8">
        <div className="order-2 hidden min-w-0 md:order-none md:block md:px-2">
          <div
            className="production-library-stage relative ml-0 w-screen select-none overflow-hidden md:-ml-2 md:w-[calc(100%+0.5rem)] md:overflow-visible"
            aria-label="Production project library. Select a project to focus it and play its video."
          >
            <div
              ref={libraryRingRef}
              className="production-library-ring absolute left-1/2 h-0 w-0 md:left-0"
              style={{ transform: `rotate(${libraryRotation}deg)` }}
            >
            {libraryWorks.map((work, index) => {
                const itemAngle = index * libraryAngleStep - 162;

                return (
                  <button
                    key={`${work.slug}-${index}`}
                    type="button"
                    onClick={() => selectHeroVideo(index)}
                    aria-label={`Show ${work.clientName} ${work.videoName}`}
                    className="production-library-card group absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 text-left transition-transform duration-300 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                    style={{
                      transform: `rotate(${itemAngle}deg) translateX(var(--library-radius)) scale(${index === selectedLibraryIndex ? 1.14 : 1})`,
                    }}
                  >
                    <div
                      className="production-card-content"
                      ref={(el) => {
                        libraryCardContentRefs.current[index] = el;
                      }}
                      style={{ "--production-card-counter": `${-(libraryRotation + itemAngle)}deg` } as React.CSSProperties}
                    >
                      <figure className="w-full perspective-midrange">
                        <img
                          ref={(el) => {
                            introPhotosRef.current[index] = el;
                          }}
                          src={work.poster ?? work.coverImage}
                          alt={`${work.clientName} ${work.videoName}`}
                          className={`transform-3d aspect-[4/3] h-auto w-full rounded-[10px] object-cover transition-opacity duration-300 group-hover:opacity-100 ${
                            index === selectedLibraryIndex
                              ? "opacity-100 blur-0"
                              : "opacity-70"
                          }`}
                        />
                      </figure>
                      <span className="mt-2 block text-[0.7rem] uppercase leading-tight tracking-[0.08em] text-black/60">
                        {work.clientName} · {work.videoName}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="order-1 flex min-w-0 items-start overflow-visible pr-0 md:order-none md:pr-4">
          <div className="hero-media-column relative flex max-w-full flex-col perspective-midrange ">
            <div className="relative aspect-[9/16] h-auto w-full ">
              <video
                key={heroVideoSrc}
                ref={heroVideoRef}
                src={heroVideoSrc}
                playsInline
                autoPlay
                muted={heroVideoMuted}
                onPlay={() => setHeroVideoPlaying(true)}
                onPause={() => setHeroVideoPlaying(false)}
                onEnded={() => {
                  shouldAutoplayNextVideoRef.current = true;
                  setHeroVideoIndex((currentIndex) => (currentIndex + 1) % heroVideoSources.length);
                }}
                className="h-full w-full bg-black object-cover"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 top-auto z-10 flex w-full flex-wrap items-center justify-between gap-3 px-4 pb-4 pt-4 md:static md:mt-auto md:px-0 md:pb-0 md:pt-8">
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={toggleHeroVideo}
                  aria-label={heroVideoPlaying ? "Pause video" : "Play video"}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f9f9f8]/90 text-[#0d0d0d] transition-colors duration-200 hover:bg-white/95 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 active:scale-95"
                >
                  {heroVideoPlaying ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-6 w-6 fill-current">
                      <path d="M8 5.7a1 1 0 0 1 1.53-.85l8.43 6.3a1.06 1.06 0 0 1 0 1.7l-8.43 6.3A1 1 0 0 1 8 18.3V5.7Z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleHeroVideoMute}
                  aria-label={heroVideoMuted ? "Unmute video" : "Mute video"}
                  role="switch"
                  aria-checked={heroVideoMuted}
                  className="relative flex h-12 w-18 items-center rounded-full bg-[#f9f9f8]/90 p-1 transition-colors duration-200 hover:bg-white/95 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  <span
                    style={{
                      transform: heroVideoMuted ? "translateX(26px)" : "translateX(0)",
                      transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    className={`block h-9 w-9 rounded-full shadow-sm transition-colors duration-300 ${
                      heroVideoMuted ? "bg-[#d8d8d3]" : "bg-[#c4c4be]"
                    }`}
                  >
                    {heroVideoMuted ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full p-1.5 text-black">
                        <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                        <path d="m17 9 4 4m0-4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full p-1.5 text-black">
                        <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                        <path d="M16 9.5a4 4 0 0 1 0 5m2-7a7 7 0 0 1 0 9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                </button>
              </div>

              <div className="flex h-12 shrink-0 items-center gap-3 rounded-full bg-[#f9f9f8]/90 px-4 md:px-6">
                {heroVideoSources.map((_, index) => (
                  <button
                    key={`production-video-dot-${index}`}
                    type="button"
                    onClick={() => selectHeroVideo(index)}
                    aria-label={`Go to video ${index + 1}`}
                    aria-current={index === heroVideoIndex ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                      index === heroVideoIndex
                        ? "w-5 bg-[#0d0d0d]"
                        : "w-1.5 bg-[#a4a49f] hover:bg-[#6f6f6a]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductionSection;
