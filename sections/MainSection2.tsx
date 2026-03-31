"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import MaskTextAnimation from "@/animations/MaskTextAnimation";
import useScreenFlag from "@/lib/utils/useScreenFlag";
import { works } from "@/components/data/works";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type MainSection2Props = {
  videoLinks: string[];
  maskText: string;
};

const MainSection2 = ({ videoLinks, maskText }: MainSection2Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const introPhotosRef = useRef<(HTMLImageElement | null)[]>([]);
  const introTextRef = useRef<HTMLHeadingElement | null>(null);
  const introDescRef = useRef<HTMLParagraphElement | null>(null);
  const photosWrapperRef = useRef<HTMLDivElement | null>(null);
  const { isSmall, isMedium, isLarge } = useScreenFlag();
  const logo1Ref = useRef<HTMLImageElement | null>(null);
  const logo2Ref = useRef<HTMLImageElement | null>(null);
  const logo3Ref = useRef<HTMLImageElement | null>(null);
  const logo4Ref = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      if (
        !wrapperRef.current ||
        !introTextRef.current ||
        !introDescRef.current ||
        !introPhotosRef.current.length ||
        !photosWrapperRef.current
      )
        return;

      let textSplitTween: gsap.core.Tween | null = null;
      let descTextTween: gsap.core.Tween | null = null;

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
            delay: 1,
            ease: [0.76, 0, 0.24, 1],
          });

          // scroll exit
          gsap.to(self.lines, {
            yPercent: 100,
            ease: "none",
            stagger: 0.03,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top-=5%",
              end: "bottom 90%",
              scrub: true,
            },
          });

          return tl;
        },
      });

      const descSplit = SplitText.create(introDescRef.current, {
        type: "words",
        mask: "words",
        autoSplit: true,
        onSplit: (self) => {
          const tl = gsap.timeline();

          // entry
          tl.from(self.words, {
            yPercent: 100,
            duration: 0.4,
            stagger: 0.03,
            delay: 1.2,
            ease: [0.76, 0, 0.24, 1],
          });

          // scroll exit
          gsap.to(self.words, {
            yPercent: 100,
            ease: "none",
            stagger: 0.002,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top-=5%",
              end: "bottom 90%",
              scrub: true,
            },
          });

          return tl;
        },
      });

      const photosArray = introPhotosRef.current.filter(
        (el): el is HTMLImageElement => el !== null,
      );

      if (photosArray.length && wrapperRef.current) {
        gsap.set(photosArray, {
          clipPath: "inset(0 0 100% 0)",
        });

        gsap.to(photosArray, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
          stagger: 0.04,
          delay: 1.3,
          ease: [0.76, 0, 0.24, 1],
        });

        const centerIndex = (photosArray.length - 1) / 2;

        gsap.set(photosArray, {
          transformOrigin: "center center",
        });

        const rowRect = wrapperRef.current.getBoundingClientRect();
        const rowCenter = rowRect.left + rowRect.width / 2;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top-=5%",
            end: "bottom 55%",
            scrub: true,
            // toggleActions: "play none reverse none",
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          photosArray,
          {
            skewY: 6,
            stagger: 0.02,
            // duration: 0.3,
            ease: "none",
          },
          0,
        );

        timeline.to(
          photosWrapperRef.current,
          {
            yPercent: -150,
            ease: "none",
          },
          0,
        );

        timeline.to(
          photosArray,
          {
            x: (index, el) => {
              const rowRect = photosWrapperRef.current.getBoundingClientRect();
              const rowCenter = rowRect.left + rowRect.width / 2;

              const rect = el.getBoundingClientRect();
              const currentLeft = rect.left;
              const itemWidth = rect.width;

              const stackSpacing = 46;
              const stackWidth =
                itemWidth + (photosArray.length - 1) * stackSpacing;
              const stackLeft = rowCenter - stackWidth / 2;

              const targetLeft = stackLeft + index * stackSpacing;

              return targetLeft - currentLeft;
            },

            rotate: (index) => (index - centerIndex) * 1.5,
            
            scale: 0.9,
            stagger: 0.02,
            duration: 0.3,
            ease: "power1.out",
          },
          1,
        );


        timeline.to(photosArray,{
          autoAlpha: 0,
          stagger: 0.02,
          scale: 0,
        },2)
      }

      return () => {
        textSplit.revert();
        descSplit.revert();

      };
    },
    {
      scope: wrapperRef,
    },
  );

  return (
    <div
      id="section-1"
      ref={wrapperRef}
      className="sticky top-0 h-screen w-full z-20 overflow-hidden bg-[#fefefe] font-sans"
    >
      <div className="relative h-full w-full grid grid-rows-6 px-6 pb-5">
        <div className="row-span-1 "></div>
        <div className="row-span-3 flex flex-col gap-5 overflow-hidden">
          <h1
            ref={introTextRef}
            className=" lg:text-[7rem] w-[70%] leading-[5.8rem] font-normal uppercase overflow-hidden tracking-tighter [word-spacing:0.20em]"
          >
            Parla is a marketing & content partner
          </h1>

          <p
            ref={introDescRef}
            className="font-normal opacity-100 [word-spacing:0.10em] uppercase text-ce-secondary"
          >We define brand direction, develop content, and build systems that
            keep everything consistent and scalable
          </p>
        </div>

        <div className="row-span-2 flex flex-col gap  bg-[#fefefe] h-full ">
          <div
            ref={photosWrapperRef}
            className="flex flex-row gap-1 bg-[#fefefe] "
          >
            {[...works, ...works].map((work, index) => (
              <div key={index} className="w-[10%]  ">
                <img
                  ref={(el) => {
                    introPhotosRef.current[index] = el;
                  }}
                  src={work.poster}
                  alt=""
                  className="  "
                />
              </div>
            ))}
          </div>

          {/* <div className="self-center intro-logo gap-0.5 grid grid-cols-2 grid-rows-2   w-10">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MainSection2;
