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
  const copyResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousEmailCopiedRef = useRef(emailCopied);
  const { entry } = usePageEntry();
  const entryId = entry?.id ?? null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@parla.com");

      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }

      setEmailCopied(true);
      copyResetTimerRef.current = setTimeout(() => {
        setEmailCopied(false);
        copyResetTimerRef.current = null;
      }, 3000);
    } catch {
      // clipboard access denied or unavailable
    }
  };

  useEffect(() => {
    const previousEmailCopied = previousEmailCopiedRef.current;
    previousEmailCopiedRef.current = emailCopied;

    if (previousEmailCopied === emailCopied) return;
    if (!copyIconRef.current) return;

    gsap.fromTo(
      copyIconRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" },
    );
  }, [emailCopied]);

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  useGSAP(
    () => {
      if (
        !entryId ||
        !wrapperRef.current ||
        !introPanelRef.current ||
        !introTextRef.current
      ) {
        return;
      }

      const wrapper = wrapperRef.current;
      let lineExitTween: gsap.core.Tween | null = null;
      let refreshFrame: number | null = null;

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: () => `+=${wrapper.offsetHeight}`,
        pin: introPanelRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      gsap.set(introTextRef.current, { opacity: 1 });
      const metaEls = [turkmenistanRef.current, clockWrapRef.current].filter(
        (element) => element !== null,
      );
      const emailEls = [emailTextRef.current, emailIconWrapRef.current].filter(
        (element) => element !== null,
      );
      const entryEls = [...metaEls, ...emailEls];
      const scrollExitEls = copiedMessageRef.current
        ? [...entryEls, copiedMessageRef.current]
        : entryEls;
      let entryComplete = false;

      const exitTween = gsap.to(scrollExitEls, {
        xPercent: -100,
        duration: 0.6,
        ease: EASE_BRAND,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top-=2",
        end: "bottom top",
        onEnter: () => {
          if (entryComplete) exitTween.play();
        },
        onLeaveBack: () => {
          if (entryComplete) exitTween.reverse();
        },
      });

      const finishEntry = () => {
        entryComplete = true;

        if (wrapper.getBoundingClientRect().top <= -2) {
          exitTween.play();
        }
      };

      if (entryEls.length) {
        gsap.set(entryEls, { opacity: 1 });
        gsap.fromTo(
          entryEls,
          { xPercent: 100 },
          {
            xPercent: 0,
            duration: 0.6,
            ease: EASE_BRAND,
            overwrite: "auto",
            onComplete: finishEntry,
          },
        );
      } else {
        finishEntry();
      }

      const textSplit = SplitText.create(introTextRef.current, {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          lineExitTween?.scrollTrigger?.kill();
          lineExitTween?.kill();

          const tl = gsap.timeline();
          tl.from(self.words, {
            yPercent: 100,
            duration: 0.4,
            stagger: 0.03,
            ease: EASE_BRAND,
          });

          lineExitTween = gsap.to(self.lines, {
            yPercent: 100,
            ease: "none",
            stagger: 0.03,
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: "bottom top+=45%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          if (refreshFrame !== null) cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => {
            refreshFrame = null;
            ScrollTrigger.refresh();
          });

          return tl;
        },
      });

      return () => {
        if (refreshFrame !== null) cancelAnimationFrame(refreshFrame);
        lineExitTween?.scrollTrigger?.kill();
        lineExitTween?.kill();
        textSplit.revert();
      };
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
      className="relative z-20 min-h-[85dvh] w-full font-sans"
    >
      <div
        ref={introPanelRef}
        className="relative grid min-h-[85dvh] w-full grid-rows-[calc(var(--header-top)+var(--header-top)+((var(--cta-h)+(var(--pad)*2))*1.5))_minmax(max-content,3fr)_minmax(max-content,1fr)] px-6 pb-5 md:grid-rows-[calc(var(--header-top)+var(--header-top)+var(--cta-h)+var(--pad)+var(--pad))_minmax(max-content,3fr)_minmax(max-content,1fr)] md:px-0 md:pb-[1.25vw]"
      >
        <header className="flex items-end justify-end px-10 md:w-[100vw] md:items-center md:px-[5vw]">
          <div className="flex w-full items-baseline justify-end gap-4 md:gap-[1vw]">
            <div className="overflow-hidden">
              <h2
                ref={turkmenistanRef}
                className="text-sm font-semibold opacity-0 md:text-[1vw] md:leading-[1.2]"
              >
                Turkmenistan
              </h2>
            </div>
            <div className="overflow-hidden">
              <div ref={clockWrapRef} className="opacity-0">
                <LiveClock className="w-[5ch] text-right text-sm font-semibold md:text-[1vw] md:leading-[1.2]" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-start md:px-[5vw]">
          <h1
            ref={introTextRef}
            className="mx-auto w-[90%] text-[clamp(1.5rem,6vw,2.5rem)] font-semibold leading-[1.2] tracking-tighter opacity-0 md:mx-0 md:w-full md:max-w-[30ch] md:text-[4vw]"
          >
            <span className="pl-30 md:pl-[10vw]">Parla</span> is a production
            and software studio.{" "}
            <span className="font-suisse-works font-normal italic opacity-30">
              We combine established production expertise with new digital
              capabilities.
            </span>
          </h1>
        </div>

        <footer className="flex items-end md:w-[100vw]">
          <div
            ref={emailRowRef}
            className="relative mx-auto flex h-10 w-[90%] items-center gap-2 md:h-[3vw] md:w-[90vw] md:gap-[0.5vw]"
          >
            <div className="overflow-hidden">
              <p
                ref={emailTextRef}
                className="text-sm font-semibold opacity-0 md:text-[1vw] md:leading-[1.2]"
              >
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
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-(--ink)/10 md:size-[2vw]"
                  >
                    <img
                      ref={copyIconRef}
                      src={
                        emailCopied
                          ? "/header-icons/copy-success.svg"
                          : "/header-icons/copy.svg"
                      }
                      alt=""
                      className="h-5 w-5 md:size-[1.25vw]"
                    />
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full overflow-hidden md:-top-[0.5vw]">
                <span
                  ref={copiedMessageRef}
                  className={`cta inline-flex h-7 items-center justify-center whitespace-nowrap rounded-full bg-(--ink)/10 px-3 text-sm font-semibold text-black transition-all duration-300 ease-out md:h-[1.75vw] md:px-[0.75vw] md:text-[1vw] md:leading-[1.2] ${
                    emailCopied
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0"
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
