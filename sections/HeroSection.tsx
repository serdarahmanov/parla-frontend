"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import SplitText from "gsap/SplitText";
import LiveClock from "@/components/LiveClock";
import { EASE_BRAND } from "@/lib/gsap/customEase";
import { usePageEntry } from "@/components/PageEntryProvider";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroSection = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const introTextRef = useRef<HTMLHeadingElement | null>(null);
  const introPanelRef = useRef<HTMLDivElement | null>(null);
  const turkmenistanRef = useRef<HTMLHeadingElement | null>(null);
  const clockWrapRef = useRef<HTMLDivElement | null>(null);
  const emailRowRef = useRef<HTMLDivElement | null>(null);
  const emailTextRef = useRef<HTMLParagraphElement | null>(null);
  const emailIconWrapRef = useRef<HTMLDivElement | null>(null);
  const copiedMessageRef = useRef<HTMLSpanElement | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const copyIconRef = useRef<HTMLImageElement | null>(null);
  const { entry } = usePageEntry();
  const entryId = entry?.id ?? null;

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
      if (!entryId || !wrapperRef.current || !introPanelRef.current || !introTextRef.current) {
        return;
      }

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
          onUpdate: (self) => {
            if (self.progress > 0) exitTween.play();
            else exitTween.reverse();
          },
        });
      };

      gsap.set(introTextRef.current, { opacity: 1 });
      const metaEls = [turkmenistanRef.current, clockWrapRef.current].filter(Boolean);

      if (metaEls.length) {
        gsap.set(metaEls, { opacity: 1 });
        gsap.fromTo(metaEls, { xPercent: 100 }, {
          xPercent: 0,
          duration: 0.6,
          ease: EASE_BRAND,
          overwrite: "auto",
        });
        createScrollExit(metaEls as HTMLElement[], 0.03);
      }

      const emailEls = [emailTextRef.current, emailIconWrapRef.current].filter(Boolean);

      if (emailEls.length) {
        gsap.set(emailEls, { opacity: 1 });
        gsap.from(emailEls, {
          xPercent: 100,
          duration: 0.6,
          stagger: 0.08,
          ease: EASE_BRAND,
        });
        createScrollExit(emailEls as HTMLElement[], 0.03);
      }

      if (copiedMessageRef.current) createScrollExit([copiedMessageRef.current], 0);

      const textSplit = SplitText.create(introTextRef.current, {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          const tl = gsap.timeline();
          tl.from(self.words, {
            yPercent: 100,
            duration: 0.4,
            stagger: 0.03,
            ease: EASE_BRAND,
          });

          gsap.to(self.lines, {
            yPercent: 100,
            ease: "none",
            stagger: 0.03,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: "bottom top+=45%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          return tl;
        },
      });

      return () => textSplit.revert();
    },
    {
      scope: wrapperRef,
      dependencies: [entryId],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      id="section-1"
      ref={wrapperRef}
      aria-label="Parla introduction"
      className="relative z-20 h-[85dvh] w-full font-sans"
    >
      <div
        ref={introPanelRef}
        className="relative grid h-[85dvh] w-full grid-rows-[2fr_3fr_1fr] px-6 pb-5"
      >
        <header className="flex items-start justify-end px-10 pt-[var(--header-clearance)] md:pt-10">
          <div className="flex w-full justify-end gap-4">
            <div className="overflow-hidden">
              <h2 ref={turkmenistanRef} className="text-sm font-semibold opacity-0">
                Turkmenistan
              </h2>
            </div>
            <div className="overflow-hidden">
              <div ref={clockWrapRef} className="opacity-0">
                <LiveClock className="w-[5ch] text-right text-sm font-semibold" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex min-h-0 items-start justify-start overflow-hidden">
          <h1
            ref={introTextRef}
            className="mx-auto w-[90%] overflow-hidden text-[clamp(1.5rem,6vw,2.5rem)] font-semibold leading-[clamp(1.75rem,6.6vw,2.75rem)] tracking-tighter opacity-0 md:text-[clamp(2.9rem,6vw,4.6rem)] md:leading-[clamp(3.25rem,6.6vw,5.1rem)]"
          >
            <span className="pl-30">Parla</span> is a production and software studio.{" "}
            <span className="font-suisse-works font-normal italic opacity-30">
              We combine established production expertise with new digital capabilities.
            </span>
          </h1>
        </div>

        <footer className="flex items-end">
          <div ref={emailRowRef} className="relative mx-auto flex h-10 w-[90%] items-center gap-2">
            <div className="overflow-hidden">
              <p ref={emailTextRef} className="text-sm font-semibold opacity-0">
                hello@parla.com
              </p>
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
                      className="h-5 w-5"
                    />
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full overflow-hidden">
                <span
                  ref={copiedMessageRef}
                  className={`cta inline-flex h-7 items-center justify-center whitespace-nowrap rounded-full bg-(--ink)/10 px-3 text-sm font-semibold text-black transition-all duration-300 ease-out ${
                    emailCopied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                  }`}
                >
                  Copied!
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default HeroSection;
