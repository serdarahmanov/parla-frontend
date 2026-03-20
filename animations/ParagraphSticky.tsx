"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type Props = {
  text: string;
  bgColor?: string;
  textColor?: string;
  index: number;
  activeIndex: number;
  onActiveChange?: (index: number) => void;
  isLines?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
  startTop?: string;
  topStay?: string;
  triggerSelector?: string;
  secondText?:string;
};

const ParagraphSticky = ({
  text,
  bgColor = "bg-black",
  textColor = "text-ce-text",
  index,
  activeIndex,
  onActiveChange,
  isLines = false,
  delay = 0.2,
  stagger = 0.04,
  duration = 0.6,
  startTop = "90vh",
  topStay = "0vh",
  triggerSelector,
  secondText="Second Text here",
}: Props) => {
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const paragraphEl = paragraphRef.current;
    const outerEl = outerRef.current;
    if (!paragraphEl || !outerEl) return;

    const ctx = gsap.context(() => {
      const triggerEl =
        (triggerSelector ? document.querySelector(triggerSelector) : null) ||
        outerEl.parentElement ||
        document.body;

      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top top+=90%",
        end: "bottom top+=5%",
        onEnter: () => onActiveChange?.(index),       
        onLeaveBack: () => onActiveChange?.(Math.max(1, index - 1)),
        });

      gsap.fromTo(
        paragraphEl,
        { top: startTop, autoAlpha: 1 },
        {
          top: topStay,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 90%",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      const split = new SplitText(paragraphEl, {
        type: isLines ? "lines" : "chars,words",
      });

      gsap.from(isLines ? split.lines : split.chars, {
        autoAlpha: 0,
        yPercent: 20,
        duration,
        ease: "expo.out",
        stagger,
        delay,
      });
    }, outerEl);

    return () => ctx.revert();
  }, [delay, duration, index, isLines, onActiveChange, stagger, startTop, topStay, triggerSelector]);

  const depth = Math.max(0, activeIndex - index);
  const isActive = activeIndex === index;
  const opacity = isActive ? 1 : Math.max(0.35, 0.8 - depth * 0.15);
  const handleClick = () => {
    if (!triggerSelector) return;
    const target = document.querySelector(triggerSelector);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={outerRef} className="fixed left-0 top-0 w-full h-screen z-55 pointer-events-none  items-center">
      <div
        ref={paragraphRef}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
          }
        }}
        style={{ opacity }}
        className={`tracking-tighter absolute px-20 h-[3vh] text-2xl  font-sans w-[30vw] transition-opacity duration-300 ${textColor}  flex flex-row items-center pointer-events-auto cursor-pointer`}
      >
         <p  >
        {text}
       
      </p>
      {/* <span className="text-sm ">   {secondText}</span>  */}
      </div>
     
    </div>
  );
};

export default ParagraphSticky;
