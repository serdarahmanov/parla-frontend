import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type LandingIntroProps = {
  onComplete: () => void;
};

export default function LandingIntro({ onComplete }: LandingIntroProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      tl.from(".intro-logo", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".intro-sub",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(".intro-overlay", {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.2,
        });
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="intro-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
    >
      <div className="text-center">
        <div className="intro-logo text-3xl font-semibold tracking-[0.2em]">
          PARLA
        </div>
        <div className="intro-sub mt-3 text-sm opacity-70">
          CREATIVE MARKETING AGENCY
        </div>
      </div>
    </div>
  );
}
