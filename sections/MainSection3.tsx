import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const MainSection3 = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const photoCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const photoImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const photoSources = [
    "/Section-3/Section-3-1.png",
    "/Section-3/Section-3-2.png",
    "/Section-3/Section-3-3.png",
    "/Section-3/Section-3-1.png",
    "/Section-3/Section-3-2.png",
    "/Section-3/Section-3-3.png",
    "/Section-3/Section-3-1.png",
    "/Section-3/Section-3-2.png",
  ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const text = textRef.current;
      const cards = photoCardRefs.current.filter(Boolean) as HTMLDivElement[];
      const images = photoImgRefs.current.filter(Boolean) as HTMLImageElement[];
      const hoverCleanups: Array<() => void> = [];

      if (!section || !text || cards.length === 0 || images.length === 0) return;

      const entryFrom = [
        { xPercent: -140, yPercent: -60, rotation: -6, scale: 0.92 },
        { xPercent: 0, yPercent: -130, rotation: 4, scale: 0.9 },
        { xPercent: 120, yPercent: -40, rotation: 7, scale: 0.94 },
        { xPercent: -120, yPercent: 40, rotation: -5, scale: 0.9 },
        { xPercent: 130, yPercent: 30, rotation: 5, scale: 0.92 },
        { xPercent: -80, yPercent: 120, rotation: 8, scale: 0.93 },
        { xPercent: 20, yPercent: 140, rotation: -7, scale: 0.91 },
        { xPercent: 140, yPercent: 90, rotation: 6, scale: 0.9 },
      ];

      cards.forEach((card, index) => {
        const from = entryFrom[index] ?? {
          xPercent: 0,
          yPercent: 120,
          rotation: 0,
          scale: 0.92,
        };

        gsap.fromTo(
          card,
          { autoAlpha: 0, ...from },
          {
            autoAlpha: 1,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 42%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.04,
          }
        );
      });

      gsap.fromTo(
        text,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const offsets = [-12, 9, -10, 7, -9, 11, -8, 10];
      images.forEach((image, index) => {
        const offset = offsets[index] ?? 8;
        gsap.fromTo(
          image,
          { yPercent: offset * -1 },
          {
            yPercent: offset,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      cards.forEach((card, index) => {
        const image = images[index];
        if (!image) return;

        const cardXTo = gsap.quickTo(card, "x", {
          duration: 0.35,
          ease: "power3.out",
        });
        const cardYTo = gsap.quickTo(card, "y", {
          duration: 0.35,
          ease: "power3.out",
        });
        const cardScaleTo = gsap.quickTo(card, "scale", {
          duration: 0.35,
          ease: "power3.out",
        });

        const imageXTo = gsap.quickTo(image, "x", {
          duration: 0.35,
          ease: "power3.out",
        });
        const imageYTo = gsap.quickTo(image, "y", {
          duration: 0.35,
          ease: "power3.out",
        });
        const imageScaleTo = gsap.quickTo(image, "scale", {
          duration: 0.35,
          ease: "power3.out",
        });

        const handleMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          const cardShift = 6;
          const imageShift = 14;
          cardXTo(px * cardShift);
          cardYTo(py * cardShift);
          imageXTo(px * imageShift);
          imageYTo(py * imageShift);
        };

        const handleEnter = () => {
          cardScaleTo(1.03);
          imageScaleTo(1.08);
        };

        const handleLeave = () => {
          cardXTo(0);
          cardYTo(0);
          cardScaleTo(1);
          imageXTo(0);
          imageYTo(0);
          imageScaleTo(1);
        };

        card.addEventListener("pointermove", handleMove);
        card.addEventListener("pointerenter", handleEnter);
        card.addEventListener("pointerleave", handleLeave);

        hoverCleanups.push(() => {
          card.removeEventListener("pointermove", handleMove);
          card.removeEventListener("pointerenter", handleEnter);
          card.removeEventListener("pointerleave", handleLeave);
        });
      });

      return () => {
        hoverCleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: sectionRef }
  );

  const renderPhoto = (
    index: number,
    cardClassName: string,
    imageClassName: string,
    allowOverflow = false
  ) => (
    <div
      ref={(el) => {
        photoCardRefs.current[index] = el;
      }}
      className={`relative ${allowOverflow ? "overflow-visible" : "overflow-hidden"} will-change-transform ${cardClassName}`}
    >
      <img
        ref={(el) => {
          photoImgRefs.current[index] = el;
        }}
        className={`absolute h-[132%] w-[115%] object-cover will-change-transform ${imageClassName}`}
        src={photoSources[index]}
        alt={`section-3-photo-${index + 1}`}
      />
    </div>
  );

  return (
    <section
      id="section-3"
      ref={sectionRef}
      className=" relative z-30  h-screen bg-[#0F0F0F] flex items-center justify-center overflow-hidden"
    >
      <div className="h-[60vh] w-[60vw] flex flex-col gap-0">
        <div className="flex flex-1 gap-0 items-end">
          {renderPhoto(
            0,
            "basis-[19%] h-[108%]",
            "-left-[6%] -top-[34%] h-[170%] w-[108%]",
            true
          )}
          {renderPhoto(1, "basis-[46%] h-[72%]", "-left-[6%] -top-[10%]")}
          {renderPhoto(2, "basis-[32%] h-[90%]", "-left-[12%] -top-[20%]")}
        </div>

        <div className="flex flex-1 gap-0 items-center">
          {renderPhoto(
            3,
            "basis-[24%] h-[92%]",
            "-left-[3%] -top-[20%] h-[142%] w-[103%]"
          )}
          <div
            ref={textRef}
            className="relative z-30 basis-[40%] h-[92%] flex flex-col items-start justify-center px-6 text-left text-ce-text"
          >
            <p className="mt-3 max-w-[40ch] text-sm md:text-base ">
              Branding is a key part of any business, big or small. We help companies build
              clear and recognizable identities that people understand and remember.
              
            </p>
          </div>
          {renderPhoto(4, "basis-[30%] h-[92%]", "-left-[2%] -top-[18%] h-[138%] w-[102%]")}
        </div>

        <div className="flex flex-1 gap-0 items-start pt-2">
          {renderPhoto(5, "basis-[36%] h-[78%]", "-left-[11%] -top-[14%]")}
          {renderPhoto(
            6,
            "basis-[20%] h-[102%]",
            "-left-[4%] -top-[20%] h-[148%] w-[104%]",
            true
          )}
          {renderPhoto(7, "basis-[40%] h-[86%]", "-left-[9%] -top-[12%]")}
        </div>
      </div>
    </section>
  );
};

export default MainSection3;
