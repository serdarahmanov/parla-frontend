import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { usePageEntry } from "@/components/PageEntryProvider";
import ParlaIcon from "@/components/ParlaIcon";

type LandingIntroProps = {
  onRevealStart: () => void;
  onComplete: () => void;
};

export default function LandingIntro({
  onRevealStart,
  onComplete,
}: LandingIntroProps) {
  const { notifyLandingEntry } = usePageEntry();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const logo1Ref = useRef<SVGSVGElement | null>(null);
  const logo2Ref = useRef<SVGSVGElement | null>(null);
  const logo3Ref = useRef<SVGSVGElement | null>(null);
  const logo4Ref = useRef<SVGSVGElement | null>(null);
  const logo5Ref = useRef<HTMLImageElement | null>(null);
  const flairRef = useRef<HTMLVideoElement | null>(null);
  const hasPlayed = useRef(false);

  useLayoutEffect(() => {
    if (!rootRef.current && !flairRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl
      // .to(flairRef.current, {
      //   onStart: () => {
      //     if (!hasPlayed.current) {
      //       flairRef.current?.play();
      //       hasPlayed.current = true;
      //     }
      //   },
      // })

        .fromTo(
          logo1Ref.current,
          { y: -5, x: -5, opacity: 0 },
          { y: 0, x: 0, opacity: 1, duration: 0.6 },
        )
        .fromTo(
          logo2Ref.current,
          { y: -5, x: 5, opacity: 0 },
          { y: 0, x: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          logo3Ref.current,
          { y: 5, x: -5, opacity: 0 },
          { y: 0, x: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          logo4Ref.current,
          { y: 5, x: 5, opacity: 0 },
          { y: 0, x: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          logo5Ref.current,
          { y: 5, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        )
        .to(".intro-overlay", {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.5,
          onStart: onRevealStart,
          onComplete,
        })
        .call(notifyLandingEntry, [], ">-0.3");
    }, rootRef);

    return () => ctx.revert();
  }, [notifyLandingEntry, onComplete, onRevealStart]);

  return (
    <div
      ref={rootRef}
      className="z-[9999] w-full fixed h-screen flex items-center justify-center  text-white overflow-hidden"
    >
      <div className="intro-overlay fixed inset-0 object-cover bg-black">



{/*         
        <video
          ref={flairRef}
          className="blend-video absolute left-0 right-0 w-full h-full overflow-hidden"
          muted
          playsInline
        >
          <source src="/flairs/1-flair.mp4" />
        </video> */}




        <div className=" text-center z-[10000] w-full h-screen flex flex-col justify-center items-center">
          
          <div className="intro-logo gap-0.5 grid grid-cols-2 grid-rows-2   w-10">
            <ParlaIcon
              ref={logo1Ref}
              position="top-left"
              fill="#fdb814"
              style={{ opacity: 0 }}
              className="row-start-1 col-start-1 row-span-1 col-span-1 "
            />
            <ParlaIcon
              ref={logo2Ref}
              position="top-right"
              fill="#fdb814"
              style={{ opacity: 0 }}
              className="row-start-1 col-start-2  row-span-1 col-span-1"
            />
            <ParlaIcon
              ref={logo3Ref}
              position="bottom-left"
              fill="#fdb814"
              style={{ opacity: 0 }}
              className="row-start-2 col-start-1   row-span-1 col-span-1"
            />
            <ParlaIcon
              ref={logo4Ref}
              position="bottom-right"
              fill="#fdb814"
              style={{ opacity: 0 }}
              className=" row-start-2 col-start-2   row-span-1 col-span-1 "
            />
          </div>

          <img
            src="/landingTransition/Asset-5.svg"
            alt="Parla"
            ref={logo5Ref}
            style={{ opacity: 0 }}
            className="w-10 mt-1"
          />
        </div>
      </div>
    </div>
  );
}
