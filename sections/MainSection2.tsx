"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import MaskTextAnimation from "@/animations/MaskTextAnimation";
import useScreenFlag from "@/lib/utils/useScreenFlag";
import { works } from "@/components/data/works";
import SplitText from "gsap/SplitText";
import LiveClock from "@/components/LiveClock";

gsap.registerPlugin(ScrollTrigger, SplitText);

type MainSection2Props = {
  videoLinks: string[];
  maskText: string;
  introDone?: boolean;
};

const MainSection2 = ({
  videoLinks,
  maskText,
  introDone,
}: MainSection2Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const introPhotosRef = useRef<(HTMLImageElement | null)[]>([]);
  const introTextRef = useRef<HTMLHeadingElement | null>(null);
  const turkmenistanRef = useRef<HTMLHeadingElement | null>(null);
  const clockWrapRef = useRef<HTMLDivElement | null>(null);
  const photosWrapperRef = useRef<HTMLDivElement | null>(null);
  const introMetaRowRef = useRef<HTMLDivElement | null>(null);
  const emailRowRef = useRef<HTMLDivElement | null>(null);
  const emailTextRef = useRef<HTMLHeadingElement | null>(null);
  const emailIconWrapRef = useRef<HTMLDivElement | null>(null);
  const { isSmall, isMedium, isLarge } = useScreenFlag();
  const logo1Ref = useRef<HTMLImageElement | null>(null);
  const logo2Ref = useRef<HTMLImageElement | null>(null);
  const logo3Ref = useRef<HTMLImageElement | null>(null);
  const logo4Ref = useRef<HTMLImageElement | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const copyIconRef = useRef<HTMLImageElement | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@parla.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 3000);
    } catch {
      // clipboard access denied or unavailable
    }
  };

  useEffect(() => {
    if (!copyIconRef.current) return;

    gsap.fromTo(
      copyIconRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" },
    );
  }, [emailCopied]);

  useGSAP(
    () => {
      if (
        !introDone ||
        !wrapperRef.current ||
        !introTextRef.current ||
        !introPhotosRef.current.length ||
        !photosWrapperRef.current
      )
        return;

      let textSplitTween: gsap.core.Tween | null = null;

      gsap.set(introTextRef.current, { opacity: 1 });
      const metaEls = [turkmenistanRef.current, clockWrapRef.current].filter(
        Boolean,
      );

      if (metaEls.length) {
        gsap.set(metaEls, { opacity: 1 });

        gsap.from(metaEls, {
          xPercent: 100,
          duration: 0.6,
          stagger: 0.08,
          // delay: 1,
          ease: [0.76, 0, 0.24, 1],
          onComplete: () => {
            gsap.fromTo(
              metaEls,
              { xPercent: 0 },
              {
                xPercent: -100,
                ease: "none",
                stagger: 0.03,
                scrollTrigger: {
                  trigger: wrapperRef.current,
                  start: "top top",
                  end: "center 70%",
                  pin: introMetaRowRef.current,
                  pinSpacing: false,
                  scrub: true,
                },
              },
            );
          },
        });
      }

      const emailEls = [emailTextRef.current, emailIconWrapRef.current].filter(
        Boolean,
      );

      if (emailEls.length) {
        gsap.set(emailEls, { opacity: 1 });

        gsap.from(emailEls, {
          xPercent: 100,
          duration: 0.6,
          stagger: 0.08,
          ease: [0.76, 0, 0.24, 1],
          onComplete: () => {
            gsap.fromTo(
              emailEls,
              { xPercent: 0 },
              {
                xPercent: -100,
                ease: "none",
                stagger: 0.03,
                scrollTrigger: {
                  trigger: wrapperRef.current,
                  start: "top top",
                  end: "center 90%",
                  pin: emailRowRef.current,
                  pinSpacing: false,
                  scrub: true,
                },
              },
            );
          },
        });
      }

      const textSplit = SplitText.create(introTextRef.current, {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          const tl = gsap.timeline();

          // entry
          tl.from(self.words, {
            yPercent: 100,
            duration: 0.4,
            stagger: 0.03,
            // delay: 0.05,
            ease: [0.76, 0, 0.24, 1],
          });

          // scroll exit
          gsap.to(self.lines, {
            yPercent: 100,
            ease: "none",
            stagger: 0.03,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: "center 70%",
              pin: introTextRef.current,
              pinSpacing: false,
              scrub: true,
            },
          });

          return tl;
        },
      });

      return () => {
        textSplit.revert();
      };
    },
    {
      scope: wrapperRef,
      dependencies: [introDone],
    },
  );

  return (
    <div
      id="section-1"
      ref={wrapperRef}
      className="relative mb-30 h-[200dvh] w-full z-20  bg-[#fefefe] font-sans"
    >
      <div className="relative h-[80dvh] w-full grid grid-rows-6 px-6 pb-5">


        <div className="row-span-2 flex  justify-end gap-4 px-10 pt-10">
          <div ref={introMetaRowRef} className="flex justify-end gap-4 w-full">
            <div className="overflow-hidden">
              <h2
                ref={turkmenistanRef}
                className="font-semibold text-sm opacity-0"
              >
                Turkmenistan
              </h2>
            </div>

            <div className="overflow-hidden">
              <div ref={clockWrapRef} className="opacity-0">
                <LiveClock
                  className={" w-[5ch] text-right text-sm font-semibold "}
                />
              </div>
            </div>
          </div>
        </div>


        <div className="row-span-3 flex  gap-5 overflow-hidden justify-start ">
          <h1
            ref={introTextRef}
            className=" opacity-0 lg:text-[4rem] mx-auto w-[90%] leading-[4.5rem] font-semibold  overflow-hidden tracking-tighter   "
          >
            <span className="pl-30">Parla</span> is a production and software
            studio.{" "}
            <span className="opacity-30 font-suisse-works font-normal italic">
              We combine established production expertise with new digital
              capabilities.
            </span>
          </h1>

        </div>


        <div className=" relative  row-span-1 w  flex   items-end">

          <div
            ref={emailRowRef}
            className="relative  mx-auto w-[90%] h-10   flex items-center justify-left gap-2 "
          >
              <div className="overflow-hidden">
                <h2 ref={emailTextRef} className=" font-semibold text-sm opacity-0">
                  hello@parla.com
                </h2>
              </div>

              <div className="relative inline-flex">
                <div className="overflow-hidden">
                  <div ref={emailIconWrapRef} className="opacity-0">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      disabled={emailCopied}
                      aria-label="Copy email address"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-(--ink)/10"
                    >
                      <img
                        ref={copyIconRef}
                        src={emailCopied ? "/header-icons/copy-success.svg" : "/header-icons/copy.svg"}
                        alt=""
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>

                <div className="pointer-events-none absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full">
                  <span
                    className={`cta inline-flex items-center justify-center whitespace-nowrap h-7 rounded-full bg-(--ink)/10 px-3 text-sm font-semibold text-black transition-all duration-300 ease-out ${
                      emailCopied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    }`}
                  >
                    Copied!
                  </span>
                </div>
              </div>
          </div>
        </div>


      </div>

      <div className="flex flex-col gap  bg-[#fefefe] h-full   px-6">
        <div
          ref={photosWrapperRef}
          className="flex flex-row gap-3 bg-[#fefefe] "
        >
          {works.slice(0, 3).map((work, index) => (
            <div
              key={index}
              className={`${index === 2 ? "w-[50%]" : "w-[25%] mt-12"} perspective-midrange`}
            >
              <img
                ref={(el) => {
                  introPhotosRef.current[index] = el;
                }}
                src={work.poster}
                alt=""
                className="transform-3d rounded-[calc(var(--r-island)/2)] w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSection2;
