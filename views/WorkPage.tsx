"use client";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollCounter from "../components/ScrollCounter";
import { works } from "@/components/data/works";
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(
    () => {
      const texts = textRefs.current;
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
        ScrollTrigger.create({
          trigger: `.image-section-${index}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => showText(index),
          onEnterBack: () => showText(index),
        });
      });

      imageRefs.current.forEach((img, index) => {
        if (!img) return;

        gsap.fromTo(
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

        gsap.fromTo(
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
      });

      ScrollTrigger.refresh();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative mx-auto w-full px-6 ">
      <ScrollCounter />
      <div className="relative grid grid-cols-12">
        {/* Left column */}
        <div className="relative  col-start-2 col-span-8 flex flex-col gap-2 pt-25 pb-15">
          {works.map((work, index) => (
            <Link
              key={work.slug}
              href={`/work/${work.slug}`}
              aria-label={`${work.clientName} ${work.videoName}`}
              className={`image-section-${index} flex h-[80vh] w-full items-center relative `}
            >
              <div className="relative h-full w-full py-4 overflow-hidden">
                <img
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  src={work.coverImage}
                  alt={`${work.clientName} - ${work.videoName}`}
                  className=" w-full h-full scale-125 object-contain  "
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Right Column */}
        <div className="relative col-start-10 col-span-3">
          <div className="sticky top-0 flex h-screen justify-center items-center">
            <div className="relative w-full h-[220px] flex justify-center items-center">
              {works.map((work, index) => (
                <div
                  key={work.slug}
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className=" flex flex-row justify-center absolute gap-4"
                >
                  <p className=" text-xs font-semibold text-neutral-400">
                    CLIENT
                  </p>
                  <h2 className=" text-xs font-semibold">
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
