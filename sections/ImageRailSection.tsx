"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigation } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryImages = [
  "/design/images/1.webp",
  "/design/images/2.webp",
  "/design/images/3.webp",
  "/design/images/4.webp",
];

const ImageRailSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressTrackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const planImageRef = useRef<HTMLImageElement | null>(null);
  const mobilePlanImageRef = useRef<HTMLImageElement | null>(null);
  const tabletPlanImageRef = useRef<HTMLImageElement | null>(null);
  const navigationIconRef = useRef<SVGSVGElement | null>(null);
  const mobileNavigationIconRef = useRef<SVGSVGElement | null>(null);
  const tabletNavigationIconRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const progressTrack = progressTrackRef.current;
      const progress = progressRef.current;
      const planImage = planImageRef.current;
      const navigationIcon = navigationIconRef.current;
      const mobilePlanImage = mobilePlanImageRef.current;
      const mobileNavigationIcon = mobileNavigationIconRef.current;
      const tabletPlanImage = tabletPlanImageRef.current;
      const tabletNavigationIcon = tabletNavigationIconRef.current;
      if (!section || !viewport || !track || !progressTrack || !progress || !planImage || !navigationIcon || !mobilePlanImage || !mobileNavigationIcon || !tabletPlanImage || !tabletNavigationIcon) return;

      const planImages = [planImage, mobilePlanImage, tabletPlanImage];
      const navigationIcons = [navigationIcon, mobileNavigationIcon, tabletNavigationIcon];

      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;
      gsap.set(planImages, { clipPath: "inset(50% 50% 50% 50%)" });
      gsap.set(navigationIcons, { autoAlpha: 0, scale: 0.7 });
      gsap.set(progressTrack, { autoAlpha: 0, clipPath: "inset(0 50% 0 50%)" });

      const sectionChromeTimeline = gsap.timeline({ paused: true });
      sectionChromeTimeline
        .to(progressTrack, {
          autoAlpha: 1,
          clipPath: "inset(0 0% 0 0%)",
          duration: 0.8,
          ease: "power2.out",
        }, 0)
        .fromTo(
          planImages,
          { clipPath: "inset(50% 50% 50% 50%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            ease: "power2.out",
          },
          0,
        )
        .to(navigationIcons, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }, 0);

      const getStartX = () => 0;
      const getEndX = () => Math.min(0, viewport.clientWidth - track.scrollWidth);
      const setProgressX = gsap.quickSetter(progress, "x", "px");
      let activeCardIndex = -1;
      const updateActiveCard = () => {
        const viewportCenter = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const bounds = card.getBoundingClientRect();
          const distance = Math.abs(bounds.left + bounds.width / 2 - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex === activeCardIndex) return;
        activeCardIndex = closestIndex;
        gsap.to(planImages, {
          rotation: closestIndex * -90,
          duration: 0.65,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };
      let progressTravel = 0;
      const measureProgressTravel = () => {
        progressTravel = Math.max(0, progressTrack.clientWidth - progress.offsetWidth);
      };
      measureProgressTravel();

      const tween = gsap.fromTo(
        track,
        { x: getStartX },
        {
          x: getEndX,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.abs(getEndX() - getStartX())}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              measureProgressTravel();
              setProgressX(self.progress * progressTravel);
              updateActiveCard();
            },
            onEnter: () => {
              sectionChromeTimeline.play();
            },
            onEnterBack: () => {
              sectionChromeTimeline.play();
            },
            onLeave: () => {
              sectionChromeTimeline.reverse();
            },
            onLeaveBack: () => {
              sectionChromeTimeline.reverse();
            },
            onUpdate: (self) => {
              setProgressX(self.progress * progressTravel);
              updateActiveCard();
            },
          },
        },
      );

      return () => tween.scrollTrigger?.kill();
    },
    { scope: sectionRef, revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="More work"
      className="image-rail-section relative z-40 grid h-screen grid-rows-[1fr_auto_1fr] gap-2 overflow-hidden px-2 py-2 font-sans md:grid-rows-[7.25rem_auto_1fr]"
    >
      <div className="image-rail-intro-row image-rail-mobile-intro-box relative overflow-hidden">
        <figure className="image-rail-mobile-plan absolute z-0 flex items-center justify-center overflow-hidden md:hidden">
          <img
            ref={mobilePlanImageRef}
            src="/design/design-section-left-col-image.png"
            alt="Top-down interior layout"
            className="block h-full w-auto max-w-[90%] origin-center object-contain"
          />
          <Navigation
            ref={mobileNavigationIconRef}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-20 size-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 fill-[#777773] text-[#777773]"
            strokeWidth={1.5}
          />
        </figure>
        <div className="image-rail-intro-content flex h-full items-center px-5 text-center md:absolute md:bottom-0 md:left-0 md:top-0 md:h-auto md:px-0 md:pr-[calc(0.75rem+5vw)] md:justify-end md:text-right">
          <p className="font-sans whitespace-nowrap text-left text-[clamp(0.6875rem,1.2vw,1rem)] font-medium leading-none tracking-tight text-[#777773]">
            More work
          </p>
        </div>
      </div>

      <div className="image-rail-stage relative w-full overflow-hidden py-6 lg:grid lg:grid-cols-[30%_minmax(0,1fr)] lg:gap-2">
        <figure className="image-rail-box hidden min-w-0 items-center justify-center overflow-hidden p-[2vw] lg:relative lg:col-start-1 lg:row-start-1 lg:flex">
          <img
            ref={planImageRef}
            src="/design/design-section-left-col-image.png"
            alt="Top-down interior layout"
            className="block h-full w-auto max-w-[90%] origin-center object-contain"
          />
          <Navigation
            ref={navigationIconRef}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-20 size-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 fill-[#777773] text-[#777773]"
            strokeWidth={1.5}
          />
        </figure>
        <div className="image-rail-image-cell min-w-0 lg:col-start-2 lg:row-start-1">
          <div ref={viewportRef} className="image-rail-viewport overflow-hidden">
            <div
              ref={trackRef}
              className="flex w-max items-center gap-[1vw]"
            >
              {galleryImages.map((src, index) => (
                <figure
                  key={src}
                  className="image-rail-box image-rail-card h-[52vh] flex-none md:h-[68vh]"
                >
                  <img
                    src={src}
                    alt={`Project image ${index + 1}`}
                    className="block h-full w-auto max-w-none object-contain"
                    onLoad={() => window.dispatchEvent(new CustomEvent("parla-layout-change"))}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="image-rail-bottom-row relative grid min-h-0 gap-x-2">
        <figure className="image-rail-box image-rail-tablet-plan relative col-start-1 row-span-1 row-start-1 hidden min-h-0 min-w-0 overflow-hidden md:block lg:hidden">
          <div className="image-rail-tablet-plan-inner absolute flex items-center justify-center overflow-hidden">
            <img
              ref={tabletPlanImageRef}
              src="/design/design-section-left-col-image.png"
              alt="Top-down interior layout"
              className="block h-full w-auto max-w-[90%] origin-center object-contain"
            />
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <Navigation
                ref={tabletNavigationIconRef}
                aria-hidden="true"
                className="size-5 -rotate-45 fill-[#777773] text-[#777773]"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </figure>
        <div className="image-rail-bottom-meta">
          <div className="image-rail-box image-rail-bottom-copy min-w-0 w-full flex items-center justify-center px-[calc(0.75rem+1vw)] text-center">
            <p className="text-[1rem] font-semibold uppercase leading-[0.95] tracking-tight text-[#aaa9a5] md:text-[clamp(1.5rem,2.1vw,2.5rem)]">
              Interior design / Selected space
            </p>
          </div>
          <div className="image-rail-box image-rail-bottom-progress min-w-0 w-full flex flex-col justify-end px-2 pb-8 md:px-0 md:pb-[4vw] md:pl-6 md:pr-9">
            <div ref={progressTrackRef} className="relative mx-[1vw] h-5" aria-label="Gallery progress">
              <div
                ref={progressRef}
                className="image-rail-ruler-progress absolute left-0 top-0 h-4 w-px"
              />
              {Array.from({ length: 101 }, (_, index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  className="image-rail-ruler-tick absolute top-0 h-2 w-px"
                  style={{ left: `${index}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageRailSection;
