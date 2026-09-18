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
import { EASE_BRAND } from "@/lib/gsap/customEase";

gsap.registerPlugin(ScrollTrigger, SplitText);

type HeroSectionProps = {
  videoLinks: string[];
  maskText: string;
  introDone?: boolean;
};

const HeroSection = ({
  videoLinks,
  maskText,
  introDone,
}: HeroSectionProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const introPhotosRef = useRef<(HTMLImageElement | null)[]>([]);
  const introTextRef = useRef<HTMLHeadingElement | null>(null);
  const introPanelRef = useRef<HTMLDivElement | null>(null);
  const turkmenistanRef = useRef<HTMLHeadingElement | null>(null);
  const clockWrapRef = useRef<HTMLDivElement | null>(null);
  const photosWrapperRef = useRef<HTMLDivElement | null>(null);
  const introMetaRowRef = useRef<HTMLDivElement | null>(null);
  const emailRowRef = useRef<HTMLDivElement | null>(null);
  const emailTextRef = useRef<HTMLHeadingElement | null>(null);
  const emailIconWrapRef = useRef<HTMLDivElement | null>(null);
  const copiedMessageRef = useRef<HTMLSpanElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
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
        !introPanelRef.current ||
        !introTextRef.current ||
        !introPhotosRef.current.length ||
        !photosWrapperRef.current
      )
        return;

      let textSplitTween: gsap.core.Tween | null = null;

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "top+=85%",
        pin: introPanelRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      const createScrollExit = (elements: HTMLElement[], stagger: number) => {
        const exitTween = gsap.to(elements, {
          xPercent: -100,
          duration: 0.6,
          stagger,
          ease: EASE_BRAND,
          paused: true,
        });

        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: "top top",
          // end: "bottom top",
          onUpdate: (self) => {
            if (self.progress > 0) {
              exitTween.play();
            } else {
              exitTween.reverse();
            }
          },
        });
      };

      gsap.set(introTextRef.current, { opacity: 1 });
      const metaEls = [turkmenistanRef.current, clockWrapRef.current].filter(
        Boolean,
      );

      if (metaEls.length) {
        gsap.set(metaEls, { opacity: 1 });

        gsap.fromTo(
          metaEls,
          { xPercent: 100 },
          {
            xPercent: 0,
            duration: 0.6,
            delay: 0.45,
            ease: EASE_BRAND,
            overwrite: "auto",
          },
        );

        createScrollExit(metaEls as HTMLElement[], 0.03);
      }

      const emailEls = [emailTextRef.current, emailIconWrapRef.current].filter(
        Boolean,
      );

      if (emailEls.length) {
        gsap.set(emailEls, { opacity: 1 });

        gsap.from(emailEls, {
          xPercent: 100,
          duration: 0.6,
          delay: 0.75,
          stagger: 0.08,
          ease: EASE_BRAND,
        });

        createScrollExit(emailEls as HTMLElement[], 0.03);
      }

      if (copiedMessageRef.current) {
        createScrollExit([copiedMessageRef.current], 0);
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
            delay: 0.4,
            stagger: 0.03,
            // delay: 0.05,
            ease: EASE_BRAND,
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
              scrub: true,
            },
          });

          return tl;
        },
      });

      const introPhotos = introPhotosRef.current.filter(
        (photo): photo is HTMLImageElement => Boolean(photo),
      );

      if (introPhotos.length) {
        gsap.fromTo(
          introPhotos,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.3,
            stagger: 0.1,
            ease: EASE_BRAND,
          },
        );
      }

      if (captionRef.current) {
        gsap.fromTo(
          captionRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.85,
            ease: EASE_BRAND,
          },
        );
      }

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
      className="relative mb-30 h-[185dvh] w-full z-20 font-sans"
    >
      <div
        ref={introPanelRef}
        className="relative h-[85dvh] w-full grid grid-rows-6 px-6 pb-5"
      >


        <div className="row-span-2 flex justify-end gap-4 px-10 pt-[var(--header-clearance)] md:pt-10">
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
            className="opacity-0 mx-auto w-[90%] text-[clamp(1.5rem,6vw,2.5rem)] leading-[clamp(1.75rem,6.6vw,2.75rem)] font-semibold overflow-hidden tracking-tighter md:text-[clamp(2.9rem,6vw,4.6rem)] md:leading-[clamp(3.25rem,6.6vw,5.1rem)]"
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

                <div className="pointer-events-none absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full overflow-hidden">
                  <span
                    ref={copiedMessageRef}
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

      <div className="flex h-[100dvh] flex-col gap px-6">
        
        <div
          ref={photosWrapperRef}
          className="grid h-full grid-cols-4 grid-rows-8 gap-3"
        >
          <div className="main-section-2-photo-container-1 col-start-1 row-start-2 row-span-3 perspective-midrange">
            <img
              ref={(el) => {
                introPhotosRef.current[0] = el;
              }}
              src={works[0].poster}
              alt=""
              className="main-section-2-photo-1 transform-3d rounded-[calc(var(--r-island)/2)] h-full w-full object-cover"
            />
          </div>

          <div className="main-section-2-photo-container-2 col-start-2 row-start-2 row-span-4 perspective-midrange">
            <img
              ref={(el) => {
                introPhotosRef.current[1] = el;
              }}
              src={works[1].poster}
              alt=""
              className="main-section-2-photo-2 transform-3d rounded-[calc(var(--r-island)/2)] h-full w-full object-cover"
            />
          </div>

          <div className="main-section-2-photo-container-3 col-start-3 col-span-2 row-span-8 perspective-midrange">
            <img
              ref={(el) => {
                introPhotosRef.current[2] = el;
              }}
              src={works[2].poster}
              alt=""
              className="main-section-2-photo-3 transform-3d rounded-[calc(var(--r-island)/2)] h-full w-full object-cover"
            />
          </div>

          <div className="main-section-2-photo-caption col-start-1 col-span-2 row-start-7 row-span-2">
            <p
              ref={captionRef}
              className="text-[clamp(2.05rem,4vw,3.15rem)] leading-[clamp(2.3rem,4.45vw,3.5rem)] font-medium tracking-tighter text-[#050506]"
            >
              <span className="pl-30">We</span> shape visual stories with production craft and digital precision.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
