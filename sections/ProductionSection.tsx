"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type TouchEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/router";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { works } from "@/components/data/works";
import { EASE_BRAND } from "@/lib/gsap/customEase";
import { usePageEntry } from "@/components/PageEntryProvider";
import ParlaIcon from "@/components/ParlaIcon";
import { useVideoPlayback } from "@/hooks/useVideoPlayback";
import { useVideoReadiness } from "@/hooks/useVideoReadiness";

type ProductionSectionProps = { videoLinks: string[] };

const productionCoverImages = [
  "/production/blurred-covers/1a.webp",
  "/production/blurred-covers/2.webp",
  "/production/blurred-covers/3.webp",
  "/production/blurred-covers/4.webp",
  "/production/blurred-covers/5.webp",
];

const ProductionSection = ({ videoLinks }: ProductionSectionProps) => {
  const router = useRouter();
  const headingRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const coverImageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const selectedIndexRef = useRef(0);
  const railTweenRef = useRef<gsap.core.Tween | null>(null);
  const isRailEnteringRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const suppressClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadedCoverImages, setLoadedCoverImages] = useState<Set<number>>(() => new Set());
  const [revealedVideoIndex, setRevealedVideoIndex] = useState<number | null>(null);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { entry } = usePageEntry();
  const currentRouteKey = router.asPath.split("#", 1)[0] || "/";
  const entryId = entry?.routeKey === currentRouteKey ? entry.id : null;

  const activeWork = works[selectedIndex];
  const activeVideoSrc = videoLinks[selectedIndex] || activeWork.videoSrc;

  const handlePlaybackError = useCallback(() => {
    setShouldPlay(false);
  }, []);

  const handleVideoReady = useCallback(() => {
    setRevealedVideoIndex(selectedIndex);
  }, [selectedIndex]);

  const markCoverImageLoaded = useCallback((index: number) => {
    setLoadedCoverImages((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  }, []);

  useEffect(() => {
    const alreadyLoaded = coverImageRefs.current.reduce<number[]>((indexes, image, index) => {
      if (image?.complete && image.naturalWidth > 0) indexes.push(index);
      return indexes;
    }, []);

    alreadyLoaded.forEach(markCoverImageLoaded);
  }, [markCoverImageLoaded]);

  const centerSelectedCard = useCallback((index: number, animate = true) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!viewport || !track || !card) return;

    const targetX = viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    railTweenRef.current?.kill();
    isRailEnteringRef.current = false;

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
    setRevealedVideoIndex(null);
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

  const toggleVideo = useCallback(() => {
    setShouldPlay((current) => !current);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRefs.current[selectedIndexRef.current];
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  useVideoPlayback({
    videoRefs,
    selectedIndex,
    shouldPlay,
    isMuted,
    onPlaybackError: handlePlaybackError,
  });

  useVideoReadiness({
    videoRefs,
    selectedIndex,
    activeVideoSrc,
    onReady: handleVideoReady,
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => {
      if (!entryId || isRailEnteringRef.current) return;
      centerSelectedCard(selectedIndexRef.current, false);
    });
    observer.observe(viewport);
    if (entryId && !isRailEnteringRef.current) {
      centerSelectedCard(selectedIndexRef.current, false);
    }
    return () => observer.disconnect();
  }, [centerSelectedCard, entryId]);

  useGSAP(() => {
    const heading = headingRef.current;
    if (!entryId || !heading) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(heading, { x: 0, opacity: 1 });
      return;
    }

    gsap.to(heading, {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: EASE_BRAND,
    });
  }, {
    scope: headingRef,
    dependencies: [entryId],
    revertOnUpdate: true,
  });

  useGSAP(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const selectedCard = cardRefs.current[selectedIndexRef.current];
    if (!entryId || !viewport || !track || !selectedCard) return;

    const targetX = viewport.clientWidth / 2
      - (selectedCard.offsetLeft + selectedCard.offsetWidth / 2);

    railTweenRef.current?.kill();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      isRailEnteringRef.current = false;
      gsap.set(track, { x: targetX });
      return;
    }

    isRailEnteringRef.current = true;
    const entryTween = gsap.to(track, {
      x: targetX,
      duration: 1.5,
      ease: EASE_BRAND,
      overwrite: true,
      onComplete: () => {
        isRailEnteringRef.current = false;
        if (railTweenRef.current === entryTween) railTweenRef.current = null;
      },
    });
    railTweenRef.current = entryTween;

    return () => {
      if (railTweenRef.current === entryTween) railTweenRef.current = null;
      isRailEnteringRef.current = false;
    };
  }, {
    scope: viewportRef,
    dependencies: [entryId],
    revertOnUpdate: true,
  });

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
    return () => {
      railTweenRef.current?.kill();
      if (suppressClickTimerRef.current) clearTimeout(suppressClickTimerRef.current);
    };
  }, []);

  return (
    <section id="production-section" aria-label="Production" className="production-section relative z-21">
      <div
        ref={headingRef}
        className="production-library-heading"
        style={{ opacity: 0, transform: "translate3d(100vw, 0, 0)" }}
      >
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
          <div
            ref={trackRef}
            className="production-library-track"
            style={{ transform: "translate3d(100vw, 0, 0)" }}
          >
            {works.map((work, index) => {
              const isSelected = index === selectedIndex;
              const isVideoVisible = index === revealedVideoIndex;
              const videoSrc = videoLinks[index] || work.videoSrc;
              return (
                <article
                  key={work.slug}
                  ref={(element) => { cardRefs.current[index] = element; }}
                  className={`production-library-card${isSelected ? " is-selected" : ""}${isVideoVisible ? " is-video-visible" : ""}`}
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
                        <span className="production-library-media-overscan">
                          <span
                            className={`production-library-poster-layer ${
                              loadedCoverImages.has(index) ? "is-cover-loaded" : "is-cover-loading"
                            }`}
                            aria-hidden="true"
                          >
                            {/* This pre-optimized decorative asset intentionally bypasses next/image. */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              ref={(image) => {
                                coverImageRefs.current[index] = image;
                              }}
                              src={productionCoverImages[index]}
                              alt=""
                              draggable={false}
                              loading="lazy"
                              decoding="async"
                              onLoad={() => markCoverImageLoaded(index)}
                              onError={() => markCoverImageLoaded(index)}
                            />
                          </span>
                          <video
                            ref={(element) => { videoRefs.current[index] = element; }}
                            src={videoSrc}
                            playsInline
                            muted={isMuted}
                            preload="none"
                            onEnded={() => {
                              if (index !== selectedIndexRef.current) return;
                              if (selectedIndexRef.current < works.length - 1) selectProject(selectedIndexRef.current + 1);
                              else selectProject(0);
                            }}
                          />
                        </span>
                    </span>
                      <span className="production-library-card-caption">
                      <span
                        className={`production-library-card-names${isSelected && isVideoVisible ? " is-visible" : ""}`}
                        aria-hidden={!isSelected || !isVideoVisible}
                      >
                          <span>{work.clientName}</span>
                          <span>{work.videoName}</span>
                      </span>
                      <span
                        className={`production-library-parla-mark${!isSelected || !isVideoVisible ? " is-visible" : ""}${isSelected && !isVideoVisible ? " is-loading" : ""}`}
                        aria-hidden="true"
                      >
                          {(["top-right", "bottom-right", "top-left", "bottom-left"] as const).map((position, partIndex) => (
                            <ParlaIcon
                              key={position}
                              position={position}
                              fill="#000000"
                              aria-hidden="true"
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

        <div className="production-library-footer">
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

        </div>
      </div>

    </section>
  );
};

export default ProductionSection;
