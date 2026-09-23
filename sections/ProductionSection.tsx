"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type TouchEvent } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { works } from "@/components/data/works";
import { EASE_BRAND } from "@/lib/gsap/customEase";

type ProductionSectionProps = { videoLinks: string[] };

const ProductionSection = ({ videoLinks }: ProductionSectionProps) => {
  const marqueeText = "Parla is a production and software studio. We combine established production expertise with new digital capabilities.";
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const selectedIndexRef = useRef(0);
  const railTweenRef = useRef<gsap.core.Tween | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const suppressClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const activeWork = works[selectedIndex];
  const activeVideoSrc = videoLinks[selectedIndex] || activeWork.videoSrc;

  const centerSelectedCard = useCallback((index: number, animate = true) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!viewport || !track || !card) return;

    const targetX = viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    railTweenRef.current?.kill();

    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(track, { x: targetX });
      return;
    }

    railTweenRef.current = gsap.to(track, {
      x: targetX,
      duration: 1.5,
      ease: EASE_BRAND,
      overwrite: true,
    });
  }, []);

  const selectProject = useCallback((index: number, animate = true) => {
    const nextIndex = Math.max(0, Math.min(index, works.length - 1));
    if (nextIndex === selectedIndexRef.current) {
      centerSelectedCard(nextIndex, animate);
      return;
    }

    selectedIndexRef.current = nextIndex;
    setSelectedIndex(nextIndex);
    requestAnimationFrame(() => centerSelectedCard(nextIndex, animate));
  }, [centerSelectedCard]);

  const handleRailTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(max-width: 767px) and (any-pointer: coarse)").matches || event.touches.length !== 1) {
      touchStartRef.current = null;
      return;
    }

    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleRailTouchEnd = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || event.changedTouches.length !== 1) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isHorizontalSwipe = Math.abs(deltaX) >= 44 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15;
    if (!isHorizontalSwipe) return;

    suppressClickRef.current = true;
    if (suppressClickTimerRef.current) clearTimeout(suppressClickTimerRef.current);
    suppressClickTimerRef.current = setTimeout(() => {
      suppressClickRef.current = false;
      suppressClickTimerRef.current = null;
    }, 400);

    selectProject(selectedIndexRef.current + (deltaX < 0 ? 1 : -1));
  }, [selectProject]);

  const toggleVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      video.pause();
      setShouldPlay(false);
      return;
    }

    try {
      await video.play();
      setShouldPlay(true);
    } catch {
      setShouldPlay(false);
    }
  }, [shouldPlay]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => {
      centerSelectedCard(selectedIndexRef.current, false);
    });
    observer.observe(viewport);
    centerSelectedCard(selectedIndexRef.current, false);
    return () => observer.disconnect();
  }, [centerSelectedCard]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLElement => Boolean(card));
    if (!viewport || !cards.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(cards, { clipPath: "inset(0 0 0% 0)" });
      return;
    }

    gsap.set(cards, { clipPath: "inset(0 0 80% 0)" });
    let revealTween: gsap.core.Tween | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        revealTween = gsap.to(cards, {
          clipPath: "inset(0 0 0% 0)",
          duration: 3,
          stagger: 0.09,
          ease: EASE_BRAND,
          overwrite: true,
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(viewport);
    return () => {
      observer.disconnect();
      revealTween?.kill();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (shouldPlay) void video.play().catch(() => setShouldPlay(false));
    else video.pause();
  }, [activeVideoSrc, isMuted, shouldPlay]);

  useEffect(() => {
    return () => {
      railTweenRef.current?.kill();
      if (suppressClickTimerRef.current) clearTimeout(suppressClickTimerRef.current);
    };
  }, []);

  return (
    <section id="production-section" aria-label="Production" className="production-section relative z-21">
      <div className="production-library-heading">
        <p aria-live="polite">
          <span>{String(selectedIndex + 1).padStart(2, "0")}</span>
          <span aria-hidden="true"> / </span>
          <span>{String(works.length).padStart(2, "0")}</span>
        </p>
      </div>

      <div className="production-library-stage">
        <div
          ref={viewportRef}
          className="production-library-viewport"
          role="region"
          aria-roledescription="carousel"
          aria-label="Production projects"
          tabIndex={0}
          onTouchStart={handleRailTouchStart}
          onTouchEnd={handleRailTouchEnd}
          onTouchCancel={() => { touchStartRef.current = null; }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") { event.preventDefault(); selectProject(selectedIndexRef.current - 1); }
            if (event.key === "ArrowRight") { event.preventDefault(); selectProject(selectedIndexRef.current + 1); }
          }}
        >
          <div ref={trackRef} className="production-library-track">
            {works.map((work, index) => {
              const isSelected = index === selectedIndex;
              return (
                <article
                  key={work.slug}
                  ref={(element) => { cardRefs.current[index] = element; }}
                  className={`production-library-card${isSelected ? " is-selected" : ""}`}
                  style={{ clipPath: "inset(0 0 80% 0)" }}
                  aria-label={`${index + 1} of ${works.length}: ${work.clientName}, ${work.videoName}`}
                  aria-current={isSelected ? "true" : undefined}
                >
                  <button
                    type="button"
                    className="production-library-card-hit group"
                    onClick={() => {
                      if (suppressClickRef.current) return;
                      selectProject(index);
                    }}
                    aria-label={isSelected ? `${work.clientName} ${work.videoName}, selected` : `Select ${work.clientName} ${work.videoName}`}
                  >
                    <span className="production-library-card-media">
                      <span className="production-library-poster-layer">
                        <span className="production-library-poster-image">
                          <Image
                            src={work.poster ?? work.coverImage}
                            alt=""
                            fill
                            draggable={false}
                            sizes="39.375dvh"
                          />
                        </span>
                      </span>
                      {isSelected && (
                        <video
                          key={activeVideoSrc}
                          ref={videoRef}
                          src={activeVideoSrc}
                          poster={work.poster ?? work.coverImage}
                          playsInline
                          autoPlay={shouldPlay}
                          muted={isMuted}
                          preload="metadata"
                          onEnded={() => {
                            if (selectedIndexRef.current < works.length - 1) selectProject(selectedIndexRef.current + 1);
                            else if (videoRef.current && shouldPlay) {
                              videoRef.current.currentTime = 0;
                              void videoRef.current.play().catch(() => setShouldPlay(false));
                            }
                          }}
                        />
                      )}
                    </span>
                    <span className="production-library-card-caption">
                      <span
                        className={`production-library-card-names${isSelected ? " is-visible" : ""}`}
                        aria-hidden={!isSelected}
                      >
                          <span>{work.clientName}</span>
                          <span>{work.videoName}</span>
                      </span>
                      <span
                        className={`production-library-parla-mark${isSelected ? "" : " is-visible"}`}
                        aria-hidden="true"
                      >
                          {[2, 4, 1, 3].map((part, partIndex) => (
                            <Image
                              key={part}
                              src={`/blackSVGs/Asset-${part}.svg`}
                              alt=""
                              width={18}
                              height={18}
                              style={{ transitionDelay: `${partIndex * 60}ms` }}
                            />
                          ))}
                      </span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        <div className="production-library-controls" data-carousel-control>
          <div className="production-library-video-controls">
            <button type="button" onClick={() => void toggleVideo()} aria-label={shouldPlay ? "Pause video" : "Play video"}>
              {shouldPlay ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
            </button>
            <button
              type="button"
              className={`cta production-library-sound-toggle${isMuted ? " is-muted" : " is-audible"}`}
              onClick={toggleMute}
              role="switch"
              aria-checked={!isMuted}
              aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
            >
              <span className="cta production-library-sound-thumb" aria-hidden="true">
                <VolumeX className="production-library-sound-icon production-library-sound-icon--muted" />
                <Volume2 className="production-library-sound-icon production-library-sound-icon--audible" />
              </span>
            </button>
          </div>
        </div>

        <div className="production-library-marquee" aria-hidden="true">
          <div className="production-library-marquee-track">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductionSection;
