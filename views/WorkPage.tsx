"use client";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollCounter from "../components/ScrollCounter";
import { works } from "@/components/data/works";
import useScreenFlag from "../lib/utils/useScreenFlag";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Page = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const { isSmall, isMedium, isLarge } = useScreenFlag();

  useGSAP(
    () => {
      const texts = textRefs.current;
      const cleanups: (() => void)[] = [];

      gsap.set(texts, { autoAlpha: 0, y: 0 });
      gsap.set(texts[0], { autoAlpha: 1, y: 0 });

      const showText = (activeIndex: number) => {
        texts.forEach((text, index) => {
          if (!text) return;

          gsap.to(text, {
            autoAlpha: index === activeIndex ? 1 : 0,
            y: index === activeIndex ? 0 : 0,
            duration: 0.02,
          });
        });
      };

      works.forEach((_, index) => {
        const st = ScrollTrigger.create({
          trigger: `.image-section-${index}`,
          start: isLarge
            ? "top center"
            : isMedium
              ? "top center"
              : isSmall
                ? "top 30%"
                : "top center",
          end: isLarge
            ? "bottom center"
            : isMedium
              ? "bottom center"
              : isSmall
                ? "top 80%"
                : "top center",
          onEnter: () => showText(index),
          onEnterBack: () => showText(index),
          // markers:true,
        });
        cleanups.push(() => st.kill());
      });

      imageRefs.current.forEach((img, index) => {
        if (!img) return;

        const introTween = gsap.fromTo(
          img,
          {
            clipPath: "inset(50% 0% 50% 0% )",
            scale: 1,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
            scale: 1.25,
            delay: 0.2,
          },
        );

        const paralaxTween = gsap.fromTo(
          img,
          {
            yPercent: -25,
          },
          {
            yPercent: 25,
            ease: "none",
            scrollTrigger: {
              trigger: `.image-section-${index}`,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        const howerTween = gsap.to(img, {
          scale: 1.3,
          ease: "power3.out",
          duration: 0.4,
          paused: true,
        });

        const onEnter = () => howerTween.play();
        const onLeave = () => howerTween.reverse();

        img.addEventListener("mouseenter", onEnter);
        img.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          img.removeEventListener("mouseenter", onEnter);
          img.removeEventListener("mouseleave", onLeave);
          introTween.kill();
          paralaxTween.kill();
          howerTween.kill();
        });
      });

      return () => {
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: rootRef, dependencies: [isLarge, isMedium, isSmall] },
  );

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full px-6 md:relative md:mx-auto md:w-full md:px-6 lg:relative lg:mx-auto lg:w-full lg:px-6"
    >
      <ScrollCounter />
      <div className="relative grid grid-cols-12 gap-2 md:relative md:grid md:grid-cols-12 lg:relative lg:grid lg:grid-cols-12">
        {/* Left column */}
        <div className="relative col-start-1 col-span-9 flex flex-col gap-1 pt-15 pb-100 md:relative md:col-start-2 md:col-span-7 md:flex md:flex-col md:gap-2 md:pt-25 md:pb-15 lg:relative lg:col-start-2 lg:col-span-8 lg:flex lg:flex-col lg:gap-2 lg:pt-25 lg:pb-15">
          {works.map((work, index) => (
            <Link
              key={work.slug}
              href={`/work/${work.slug}`}
              scroll={false}
              aria-label={`${work.clientName} ${work.videoName}`}
              className={`image-section-${index} flex h-[50vh] w-full items-center relative md:flex md:h-[70vh] md:w-full md:items-center md:relative lg:flex lg:h-[80vh] lg:w-full lg:items-center lg:relative`}
            >
              <div className="relative h-full w-full py-4 overflow-hidden md:relative md:h-full md:w-full md:py-4 md:overflow-hidden lg:relative lg:h-full lg:w-full lg:py-4 lg:overflow-hidden">
                <img
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  src={work.coverImage}
                  alt={`${work.clientName} - ${work.videoName}`}
                  className="w-full h-full scale-125 object-cover md:w-full md:h-full md:scale-125 md:object-cover lg:w-full lg:h-full lg:scale-125 lg:object-contain"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Right Column */}
        <div className="relative col-start-10 col-span-3 md:relative md:col-start-9 md:col-span-4 lg:relative lg:col-start-10 lg:col-span-3">
          <div className=" sticky top-0 grid grid-rows-5 h-screen  md:sticky md:top-0 md:flex md:h-screen md:justify-center md:items-center lg:sticky lg:top-0 lg:flex lg:h-screen lg:justify-center lg:items-center">
            <div className="  relative w-full h-[220px] row-start-2 flex justify-center items-center md:relative md:w-full md:h-[220px] md:flex md:justify-center md:items-center lg:relative lg:w-full lg:h-[220px] lg:flex lg:justify-center lg:items-center ">
              {works.map((work, index) => (
                <div
                  key={work.slug}
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className=" absolute grid grid-rows-2 h-full  gap-0 w-full md:absolute md:grid md:grid-cols-3 md:grid-rows-1 md:items-center md:gap-0 md:w-full lg:absolute lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:items-center  lg:gap-4 lg:w-full "
                >
                  <p className=" text-left  self-end row-start-1 font-sans text-[0.5em] font-semibold text-neutral-400 md:col-start-1 md:self-center md:row-span-1 md:text-center md:text-[0.6em] md:font-semibold md:text-neutral-400 lg:col-start-1 lg:text-xs lg:text-right lg:font-semibold lg:text-neutral-400 ">
                    CLIENT
                  </p>
                  <h2 className=" row-start-2 text-left self-start sans text-[0.5em]  font-semibold md:col-start-2 md:col-span-2 md:row-span-1 md:self-center md:text-left md:text-[0.6em] md:font-semibold lg:col-start-2 lg:text-left lg:text-xs lg:font-semibold ">
                    {work.clientName} / {work.videoName}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
