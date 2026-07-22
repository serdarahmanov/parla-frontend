"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type Props = {
  text: string;
  textColor?: string;
  index: number;
  activeIndex: number;
  onActiveChange?: (index: number) => void;
  isLines?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
  triggerSelector?: string;
};

const ParagraphSticky = ({
  text,
  textColor = "text-black",
  index,
  activeIndex,
  onActiveChange,
  isLines = false,
  delay = 0.2,
  stagger = 0.04,
  duration = 0.6,
  triggerSelector,
}: Props) => {
  const paragraphRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const paragraphEl = paragraphRef.current;
    if (!paragraphEl) return;

    const ctx = gsap.context(() => {
      const triggerEl =
        (triggerSelector ? document.querySelector(triggerSelector) : null) ||
        document.body;

      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top top+=90%",
        end: "bottom top+=5%",
        onEnter: () => onActiveChange?.(index),
        onLeaveBack: () => onActiveChange?.(Math.max(1, index - 1)),
      });

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
    });

    return () => ctx.revert();
  }, [delay, duration, index, isLines, onActiveChange, stagger, triggerSelector]);

  const isActive = activeIndex === index;
  const opacity = isActive ? 1 : 0.35;

  const handleClick = () => {
    if (!triggerSelector) return;
    const target = document.querySelector(triggerSelector);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
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
      className={`tracking-tighter text-[0.6em] md:text-sm lg:text-sm italic font-[family-name:var(--font-ibm)] font-semibold whitespace-nowrap transition-opacity duration-300 ${textColor} cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default ParagraphSticky;
