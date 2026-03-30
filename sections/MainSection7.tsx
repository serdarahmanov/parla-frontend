"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScreenFlag from "@/lib/utils/useScreenFlag";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const cardsData = [
  {
    id: "card-1",
    src: "/Section-4/_DSF1863.webp",
    caption: "STRATEGY & PLANNING",
    description: "Brand identity set in motion with clean, cinematic framing",
  },
  {
    id: "card-2",
    src: "/Section-4/_DSF1938.webp",
    caption: "PRE-PRODUCTION",
    description:
      "Story-first composition that keeps focus on the product mood",
  },
  {
    id: "card-3",
    src: "/Section-4/1F5A8270.webp",
    caption: "PRODUCTION",
    description: "Dynamic visual rhythm designed for social-first attention",
  },
  {
    id: "card-4",
    src: "/Section-4/1F5A0676.webp",
    caption: "POST-PRODUCTION",
    description: "Balanced lighting and texture to elevate the brand tone",
  },
  {
    id: "card-5",
    src: "/Section-4/1F5A7357.webp",
    caption: "LAUNCH & DELIVERY",
    description: "Editorial angle crafted for premium campaign storytelling",
  },
];

const MainSection7 = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const textWrapRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  const { isSmall, isMedium, isLarge } = useScreenFlag();

  // which card is active geometrically
  const [activeIndex, setActiveIndex] = useState(0);
  //which card text is currently shown  . it is good separation that makes text transitions clean
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const displayedCard = cardsData[displayedIndex] ?? cardsData[0];
  // Transisiton control
  const isTransitioningRef = useRef(false);
  const pendingIndexxRef = useRef<number | null>(null);

  const getInitialX = (cards: HTMLElement[]) => {
    const firstCard = cards[0];
    if (!firstCard) return 0;
    const viewportCenter = window.innerWidth / 2;
    const firstCardCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2;
    return viewportCenter - firstCardCenter;
  };

  const getFinalX = (cards: HTMLElement[]) => {
    const lastCard = cards[cards.length - 1];
    if (!lastCard) return 0;
    const centerLastCard = lastCard.offsetLeft + lastCard.offsetWidth / 2;
    const viewportCenter = window.innerWidth / 2;
    return viewportCenter - centerLastCard;
  };

  const getScrollDistance = (cards: HTMLElement[]) => {
    return Math.abs(getFinalX(cards) - getInitialX(cards));
  };

  const getClosestCardIndex = (cards: HTMLElement[]) => {
    if (!cards.length) return 0;
    const viewportCenter = window.innerWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    return closestIndex;
  };

  // Paralax
 const updateImageParallax = (
  cards: HTMLElement[],
  images: (HTMLImageElement | null)[]
) => {
  const viewportWidth = window.innerWidth;
  const viewportCenter = viewportWidth / 2;
  const maxShift = isLarge ? 60 : isMedium ? 60 : 60;

  cards.forEach((card, index) => {
    const img = images[index];
    if (!img) return;

    const rect = card.getBoundingClientRect();
    const isVisible = rect.right > 0 && rect.left < viewportWidth;
    if (!isVisible) return;

    // parallax
    const travelProgress = gsap.utils.clamp(
      0,
      1,
      (viewportWidth - rect.left) / (viewportWidth + rect.width)
    );

    const shift = gsap.utils.mapRange(0, 1, -maxShift, maxShift, travelProgress);

    // clip only while approaching center from the right
    const cardCenter = rect.left + rect.width / 2;

    let clipAmount = 0;

    if (cardCenter > viewportCenter) {
      const startDistance = viewportWidth / 2 + rect.width / 2;
      const distanceToCenter = cardCenter - viewportCenter;

      const normalized = gsap.utils.clamp(
        0,
        1,
        distanceToCenter / startDistance
      );

      clipAmount = gsap.utils.mapRange(0, 1, 0, isSmall?3:15, normalized);
    } else {
      clipAmount = 0;
    }

    gsap.set(img, { x: shift });
    gsap.set(card, {
      clipPath: `inset(${clipAmount}% 0% ${clipAmount}% 0%)`,
    });
  });
};




  useGSAP(
    () => {
      if (!trackRef.current || !containerRef.current) return;

      const cards = Array.from(trackRef.current.children) as HTMLElement[];
      const images = cards.map(
        (card) => card.querySelector("img") as HTMLImageElement | null,
      );

      const handleUpdate = () => {
        const nextIndex = getClosestCardIndex(cards);
        setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
        updateImageParallax(cards, images);
      };

      const trackTL = gsap.fromTo(
        trackRef.current,
        {
          x: getInitialX(cards),
        },
        {
          x: getFinalX(cards),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${getScrollDistance(cards)}`,
            pin: true,
            scrub: true,
          
            invalidateOnRefresh: true, //when Scrolltrigger refrehshes, recalculate function-based values
            onUpdate: handleUpdate,
          },
        },
      );
      handleUpdate();
      return () => {
        trackTL.kill();
      };
    },
    { scope: containerRef },
  );

  // Text Exit Animation
  useGSAP(
    () => {
      if (!titleRef.current || !descRef.current || !textWrapRef.current) return;
      // if the current displayed text and active text is same do not do anything
      if (activeIndex === displayedIndex) return;
      // if the animation is running do not animate
      if (isTransitioningRef.current) {
        pendingIndexxRef.current = activeIndex;
        return;
      }
      isTransitioningRef.current = true;
      const targetIndex = activeIndex;

      let titleOutTween: gsap.core.Tween | null = null;
      let descOutTween: gsap.core.Tween | null = null;

      const splitTitle = SplitText.create(titleRef.current, {
        type: "lines",
        autoSplit: true,

        onSplit: (self) => {
          titleOutTween =  gsap.to(self.lines, {
            x: isSmall?-20:-20,
            autoAlpha: 0,
            duration: 0.2,
            ease: "power3.out",
            stagger: 0.03,
            overwrite: "auto",
          });
          return titleOutTween;
        },
      }) as SplitText & {
        animation?: gsap.core.Animation;
      };

      const splitDesc = SplitText.create(descRef.current, {
        type: "lines",
        autoSplit: true,
        onSplit: (self) => {
          descOutTween = gsap.to(self.lines, {
            x: isSmall?-20:-20,
            autoAlpha: 0,
            duration: 0.2,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: "auto",
           
          });
          return descOutTween;
        },
      }) as SplitText & {
        animation?: gsap.core.Animation;
      };

      const outTL = gsap.timeline({
        onComplete: () => {
          splitTitle.revert();
          splitDesc.revert();
          gsap.set([titleRef.current, descRef.current], { autoAlpha: 0 });

          const latestIndex = pendingIndexxRef.current !==null ?pendingIndexxRef.current : targetIndex;
          pendingIndexxRef.current=null;
          setDisplayedIndex(latestIndex);
        },
      });

      if (titleOutTween) outTL.add(titleOutTween, 0);
      if (descOutTween) outTL.add(descOutTween, 0);

      return () => {
        outTL.kill();
        splitTitle.revert();
        splitDesc.revert();
      };
    },
    { dependencies: [activeIndex, displayedIndex,isLarge,isMedium,isSmall], scope: textWrapRef },
  );

  // Text IN Transition Animation
  useGSAP(
    () => {
      if (!titleRef.current || !descRef.current) return;
    let titleInTween: gsap.core.Tween | null = null;
    let descInTween: gsap.core.Tween | null = null;
      

      const splitTitle = SplitText.create(titleRef.current, {
        type: "lines",
        autoSplit: true,
        onSplit: (self) => {
          titleInTween = gsap.fromTo(
            self.lines,
            {
              x: isSmall?40:20,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
              ease: "power3.out",
              duration: 0.2,
              overwrite: "auto",
              onStart: () => {
                gsap.set(titleRef.current, { autoAlpha: 1 });
              },
            },
          );
          return titleInTween;
        },
      }) as SplitText & { animation?: gsap.core.Animation };

      const splitDesc = SplitText.create(descRef.current, {
        type: "lines",
        autoSplit: true,
        onSplit: (self) => {
          descInTween = gsap.fromTo(
            self.lines,
            {
              x: isSmall?40:20,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
               duration: 0.2,
                 ease: "power3.out",
                 stagger: 0.1,
              overwrite:"auto",
              onStart: () => {
                gsap.set(descRef.current, { autoAlpha: 0.5 });
              },
            },
          );
          return descInTween;
        },
      }) as SplitText & { animation?: gsap.core.Animation };

      const intl = gsap.timeline({
        onComplete: () => {
          splitTitle.revert();
          splitDesc.revert();
          isTransitioningRef.current = false;
          if (
            pendingIndexxRef.current !== null &&
            pendingIndexxRef.current !== displayedIndex
          ) {
            const nextIndex = pendingIndexxRef.current;
            pendingIndexxRef.current = null;
            setDisplayedIndex(nextIndex);
          } else {
            pendingIndexxRef.current = null;
          }
        },
      });

      if (titleInTween) intl.add(titleInTween, 0);
      if (descInTween) intl.add(descInTween, 0.1);

      return () => {
        intl.kill();
        splitTitle.revert();
        splitDesc.revert();
      };
    },
    { dependencies: [displayedIndex,isMedium,isLarge,isSmall], scope: textWrapRef, revertOnUpdate: true },
  );

  return (
    <section ref={containerRef}
    id="section-4"
    className="wrapper w-full h-screen overflow-hidden z-40 bg-[#fefefe]">
      {/* OUTER TRACK SECTION TO SHOW ONLY THIS AREA */}
      <div className=" tracker h-[80%]  md:h-[90%]  lg:h-[85%] pt-10 ">
        {/* TRACK FOR HORIZONTAL SCROLLING */}
        <div
          ref={trackRef}
          className="flex items-center  gap-1 md:gap-2 w-max  h-full p-10   overflow-hidden"
        >
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className={`w-[70vw]  md:w-[40vw] lg:w-[30vw]   h-fit  flex-none overflow-hidden   `}

              //   "w-[70vw] h-full flex-none bg-fuchsia-400"
            >
              <img
                src={card.src}
                alt={card.caption}
                className="object-cover  md:object-contain lg:object-contain lg:scale-120 lg:object-center   md:object-top md:scale-130 w-full h-full scale-120 "
              />
            </div>
          ))}
        </div>
      </div>

      {/* TITLE AND DESCRIPTION */}
      <div
      
        ref={textWrapRef}
        className=" h-[20%]  grid grid-rows-3 grid-cols-1  lg:grid lg:grid-cols-2   lg:grid-rows-2 lg:items-center lg:justify-center md:grid md:grid-cols-2 md:grid-rows-2 gap-2   md:items-center md:justify-center  px-6 font-sans md:h-[10%] lg:h-[10%]"
      >
        <h2
          ref={titleRef}
          className=" self-end tracking-tight font-medium text-[1.3rem]  leading-[1.3rem]  md:text-[1.7rem] md:leading-[1.7rem]   md:text-end  md:self-auto   lg:text-end font-sans    md:mt-0 lg:mt-0"
        >
          {displayedCard.caption}
        </h2>
        <p ref={descRef} className="text-[0.8rem] leading-[0.8rem] md:text-[0.75rem] md:leading-[0.75rem]  w-[15rem] md:w-[15rem] lg:w-[18rem] ">
          {displayedCard.description}
        </p>
      </div>
    </section>
  );
};

export default MainSection7;
