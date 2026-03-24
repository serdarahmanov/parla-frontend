"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

type Props = {
  text: string;
  className?: string;
};

const MaskTextAnimation = ({ text, className }: Props) => {
  const topRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
        let split: SplitText | null = null;
      const run = async () => {
        if (!topRef.current) return;

        if ("fonts" in document) {
          await document.fonts.ready;
        }

        const split = new SplitText(topRef.current, {
          type: "lines, words, chars",
        });
        gsap.from(split.chars, {
          autoAlpha: 1,
          yPercent: 100,
          duration: 0.5,
          ease: "expo.out",
          stagger: 0.04,
          delay: 0.5,
        });
      };

      run();

      return () => {
        split?.revert();
      };
    },
    { scope: topRef, dependencies: [text] },
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
