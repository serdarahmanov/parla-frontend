"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import { EASE_BRAND } from "@/lib/gsap/customEase";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

type Props = {
  text: string;
  className?: string;
  delay?: number;
};

const MaskTextAnimation = ({ text, className, delay = 0.5 }: Props) => {
  const topRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
        let split: SplitText | null = null;
      const run = async () => {
        if (!topRef.current) return;

        if ("fonts" in document) {
          await document.fonts.ready;
        }

        split = new SplitText(topRef.current, {
          type: "lines, words, chars",
          mask: "lines",
        });
        gsap.from(split.chars, {
          autoAlpha: 1,
          yPercent: 100,
          duration: 0.5,
          ease: EASE_BRAND,
          stagger: 0.01,
          delay,
        });
      };

      run();

      return () => {
        split?.revert();
      };
    },
    { scope: topRef, dependencies: [text, delay] },
  );

  return (
    <span
      className={`relative block overflow-hidden    ${className ?? ""}`}
    >
      <span
        ref={topRef}
        className="block "
      >
        {text}
      </span>
    </span>
  );
};

export default MaskTextAnimation;
