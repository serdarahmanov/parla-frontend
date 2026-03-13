"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const cardsData = [
  {
    id: "card-1",
    src: "/Section-4/_DSF1863.webp",
    caption: "FRAME 01",
    description: "Brand identity set in motion with clean, cinematic framing.",
  },
  {
    id: "card-2",
    src: "/Section-4/_DSF1938.webp",
    caption: "FRAME 02",
    description: "Story-first composition that keeps focus on the product mood.",
  },
  {
    id: "card-3",
    src: "/Section-4/1F5A8270.webp",
    caption: "FRAME 03",
    description: "Dynamic visual rhythm designed for social-first attention.",
  },
  {
    id: "card-4",
    src: "/Section-4/1F5A0676.webp",
    caption: "FRAME 04",
    description: "Balanced lighting and texture to elevate the brand tone.",
  },
  {
    id: "card-5",
    src: "/Section-4/1F5A7357.webp",
    caption: "FRAME 05",
    description: "Editorial angle crafted for premium campaign storytelling.",
  },
  {
    id: "card-6",
    src: "/Section-4/_DSF1986.webp",
    caption: "FRAME 06",
    description: "Final hero frame built to anchor the full visual narrative.",
  },
];

const MainSection4 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeTextIndexRef = useRef(0);

  useEffect(() => {
    const preloads = cardsData.slice(0, 5).map((item) => {
      const img = new window.Image();
      img.src = item.src;
      if (typeof img.decode === "function") {
        return img.decode().catch(() => undefined);
      }
      return Promise.resolve();
    });
    void Promise.all(preloads);
  }, []);

  useGSAP(
    () => {
      const track = trackRef.current!;
      const introLayer = introRef.current;
      const cards = gsap.utils.toArray<HTMLElement>(
        ".card",
        containerRef.current,
      );
      const images = cards.map((card) =>
        card.querySelector<HTMLImageElement>("img"),
      );
      const imageXSetters = images.map((image) =>
        image ? gsap.quickSetter(image, "x", "px") : null,
      );

      // Horizontal travel distance is based on the last card center.
      // This ensures the final card can reach viewport center on wide screens.
      const getDistance = () => {
        const lastCard = cards[cards.length - 1];
        if (!lastCard) return 0;
        const lastCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
        return Math.max(0, lastCenter - window.innerWidth / 2);
      };
      const getInitialCenterOffset = () => {
        const firstCard = cards[0];
        if (!firstCard) return 0;
        const firstCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2;
        return window.innerWidth / 2 - firstCenter;
      };

      // ==========================================
      // Animation 1: One-time section entry (no scrub)
      // Why: Plays once on first viewport entry and stays independent from
      // horizontal scrub logic, reducing transition jitter.
      // ==========================================
      const entryTween = introLayer
        ? gsap.fromTo(
            introLayer,
            { x: 150, y: 150, autoAlpha: 0 },
            {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true,
              },
            },
          )
        : null;

      // ==========================================
      // Animation 2: Caption Clock Initialization
      // Why: Set an explicit initial state for all caption items once, then reveal
      // only the first caption. This prevents random initial overlap/flicker.
      // ==========================================
      const textItems = gsap.utils.toArray<HTMLElement>(
        ".clock-text-item",
        containerRef.current,
      );
      const captionItems = gsap.utils.toArray<HTMLElement>(
        ".clock-caption",
        containerRef.current,
      );
      const descriptionItems = gsap.utils.toArray<HTMLElement>(
        ".clock-description",
        containerRef.current,
      );
      activeTextIndexRef.current = 0;
      gsap.set(textItems, { autoAlpha: 0 });
      gsap.set(textItems[0], { autoAlpha: 1 });
      gsap.set(captionItems, {
        y: 16,
        rotationX: -75,
        transformPerspective: 500,
      });
      gsap.set(captionItems[0], { y: 0, rotationX: 0 });

      // ==========================================
      // Animation 6: Scroll-based Card Scale (subtle depth)
      // Why: Start cards slightly smaller and scale to full size near viewport center
      // so horizontal motion feels more alive without changing layout logic.
      // ==========================================
      gsap.set(cards, { transformOrigin: "center center" });

      // ==========================================
      // Animation 7: Inner Image Parallax (subtle depth)
      // Why: Move image content a few pixels opposite card travel direction to add
      // depth while preserving the card layout and hover behaviors.
      // ==========================================
      const maxParallaxShift = 34;
      gsap.set(images.filter(Boolean), {
        scale: 1.06,
        transformOrigin: "center center",
      });

      // ==========================================
      // Animation 3: Caption Switch ("old clock" step feel)
      // Why: Kill active tweens before starting new ones to avoid stutter/overlap
      // when scroll updates fire rapidly around card boundaries.
      // ==========================================
      const switchCaption = (nextIndex: number) => {
        if (nextIndex === activeTextIndexRef.current) return;
        const currentText = textItems[activeTextIndexRef.current];
        const nextText = textItems[nextIndex];
        const currentCaption = captionItems[activeTextIndexRef.current];
        const nextCaption = captionItems[nextIndex];
        if (!currentText || !nextText) return;

        const currentDescription =
          descriptionItems[activeTextIndexRef.current];
        const nextDescription = descriptionItems[nextIndex];

        gsap.killTweensOf([
          currentText,
          nextText,
          currentCaption,
          nextCaption,
          currentDescription,
          nextDescription,
        ]);

        gsap.to(currentText, {
          autoAlpha: 0,
          duration: 0.16,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.fromTo(
          nextText,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
          },
        );

        if (currentCaption) {
          gsap.to(currentCaption, {
            y: -12,
            rotationX: 70,
            duration: 0.2,
            ease: "steps(8)",
            overwrite: "auto",
          });
        }

        if (nextCaption) {
          gsap.fromTo(
            nextCaption,
            { y: 16, rotationX: -75, transformPerspective: 500 },
            {
              y: 0,
              rotationX: 0,
              duration: 0.26,
              ease: "steps(10)",
              overwrite: "auto",
            },
          );
        }

        activeTextIndexRef.current = nextIndex;
      };

      // ==========================================
      // Animation 4: Horizontal Pin + Center Tracking
      // Why: A single scrubbed timeline handles horizontal translation while
      // onUpdate checks which card is closest to viewport center for caption sync.
      // ==========================================
      const updateCardEffects = () => {
        if (!cards.length || !textItems.length) return;

        const viewportCenter = window.innerWidth / 2;
        const maxDistance = window.innerWidth * 0.65;
        const parallaxDivisor = window.innerWidth * 0.4;
        const cardCenters: number[] = new Array(cards.length);
        const cardDistances: number[] = new Array(cards.length);
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;
        let activeDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenterX - viewportCenter);

          cardCenters[index] = cardCenterX;
          cardDistances[index] = distance;

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }

          if (index === activeTextIndexRef.current) {
            activeDistance = distance;
          }
        });

        cards.forEach((_, index) => {
          const cardCenterX = cardCenters[index];
          const distance = cardDistances[index];
          const clampedDistance = Math.min(distance, maxDistance);
          const proximity = 1 - clampedDistance / maxDistance;
          const approachScale = 0.90 + proximity * 0.10;
          // Keep cards at full scale after they pass viewport center to the left.
          // They shrink back only when scrolling up and moving to the right side again.
          const scrollScale = cardCenterX <= viewportCenter ? 1 : approachScale;
          gsap.set(cards[index], { scale: scrollScale });

          const normalizedOffset = gsap.utils.clamp(
            -1,
            1,
            (viewportCenter - cardCenterX) / parallaxDivisor,
          );
          imageXSetters[index]?.(normalizedOffset * maxParallaxShift);
        });

        if (!Number.isFinite(activeDistance)) {
          switchCaption(closestIndex);
          return;
        }

        if (
          closestIndex !== activeTextIndexRef.current &&
          closestDistance + 24 < activeDistance
        ) {
          switchCaption(closestIndex);
        }
      };

      const horizontalTween = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: updateCardEffects,
        },
      });

      // Horizontal track movement across all cards.
      horizontalTween.fromTo(
        track,
        { x: () => getInitialCenterOffset() },
        { x: () => -getDistance(), ease: "none" },
        0,
      );
      updateCardEffects();

      // ==========================================
      // Cleanup: kill active tweens/triggers
      // Why: Prevent duplicate animations on remount and route changes.
      // ==========================================
      return () => {
        // Cleanup for Animation 2/3 (caption tweens).
        gsap.killTweensOf([...textItems, ...captionItems, ...descriptionItems]);
        // Cleanup for Animation 6 (card scale tweens/sets).
        gsap.killTweensOf(cards);
        // Cleanup for Animation 7 (inner image parallax tweens/sets).
        gsap.killTweensOf(images.filter(Boolean));
        // Reset inline animation styles so route re-entry starts clean.
        gsap.set([...textItems, ...captionItems, ...descriptionItems], {
          clearProps: "all",
        });
        // Cleanup for Animation 1 (one-time entry animation).
        entryTween?.kill();
        gsap.set(introLayer, { clearProps: "all" });

        // Cleanup for Animation 4 (horizontal tween + pin ScrollTrigger).
        horizontalTween.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="main-container  relative overflow-hidden overflow-x-hidden w-full h-screen  "
    >
      <div ref={introRef} className="absolute left-0 top-0 w-full h-[80vh]">
      <section
        ref={trackRef}
        className="wrapper left-0 top-0 absolute w-max h-[80vh] overflow-hidden flex gap-2 p-20"
      >
        {cardsData.map((card, index) => (
          <div
            className="card w-120 flex-none overflow-hidden"
            id={card.id}
            key={card.id}
          >
            <img
              className=" object-fill will-change-transform"
              src={card.src}
              alt=""
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index < 3 ? "high" : "auto"}
            />
          </div>
          ))}
      </section>
      </div>
      <div className="text-section absolute top-[80vh] w-full h-[20vh] text-center pointer-events-none">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="clock-text-item absolute left-1/2 top-4 -translate-x-1/2"
          >
            <h1 className="clock-caption text-md font-semibold tracking-[0.35em]">
              {card.caption}
            </h1>
            <p className="clock-description  text-xs font-medium  opacity-80">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSection4;
