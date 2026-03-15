import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type LandingIntroProps = {
  onRevealStart: () => void;
  onComplete: () => void;
};

export default function LandingIntro({
  onRevealStart,
  onComplete,
}: LandingIntroProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const logo1Ref = useRef<HTMLImageElement | null>(null);
  const logo2Ref = useRef<HTMLImageElement | null>(null);
  const logo3Ref = useRef<HTMLImageElement | null>(null);
  const logo4Ref = useRef<HTMLImageElement | null>(null);
  const logo5Ref = useRef<HTMLImageElement | null>(null);
  const flairRef = useRef<HTMLVideoElement | null>(null);
  const hasPlayed = useRef(false);

  useLayoutEffect(() => {
    if (!rootRef.current && !flairRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      tl.to(flairRef.current, {
        onStart: () => {
          if (!hasPlayed.current) {
            flairRef.current?.play();
            hasPlayed.current = true;
          }
        },
      })

        .from(logo1Ref.current, {
          y: -5,
          x: -5,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          logo2Ref.current,
          {
            y: -5,
            x: 5,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          logo3Ref.current,
          {
            y: 5,
            x: -5,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          logo4Ref.current,
          {
            y: 5,
            x: 5,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          logo5Ref.current,
          {
            y: 5,
          
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .to(".intro-overlay", {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.5,
          onStart: onRevealStart,
        });
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete, onRevealStart]);

  return (
    <div
      ref={rootRef}
      className="z-[9999] w-full fixed h-screen flex items-center justify-center  text-white overflow-hidden"
    >
      <div className="intro-overlay fixed inset-0   bg-black object-cover">



        
        <video
          ref={flairRef}
          className="blend-video absolute left-0 right-0 w-full h-full overflow-hidden"
          muted
          playsInline
        >
          <source src="/flairs/1-flair.mp4" />
        </video>




        <div className=" text-center z-[10000] w-full h-screen flex flex-col justify-center items-center">
          
          <div className="intro-logo gap-0.5 grid grid-cols-2 grid-rows-2   w-20">
            <img
              ref={logo1Ref}
              src="/landingTransition/Asset-1.svg"
              alt="Parla"
              className="row-start-1 col-start-1 row-span-1 col-span-1 "
            />
            <img
              src="/landingTransition/Asset-2.svg"
              alt="Parla"
              ref={logo2Ref}
              className="row-start-1 col-start-2  row-span-1 col-span-1"
            />
            <img
              src="/landingTransition/Asset-3.svg"
              alt="Parla"
              ref={logo3Ref}
              className="row-start-2 col-start-1   row-span-1 col-span-1"
            />
            <img
              src="/landingTransition/Asset-4.svg"
              alt="Parla"
              ref={logo4Ref}
              className=" row-start-2 col-start-2   row-span-1 col-span-1 "
            />
          </div>

          <img
            src="/landingTransition/Asset-5.svg"
            alt="Parla"
            ref={logo5Ref}
            className="w-20 mt-1"
          />
        </div>
      </div>
    </div>
  );
}
