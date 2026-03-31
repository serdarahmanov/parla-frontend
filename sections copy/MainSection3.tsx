"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import useScreenFlag from "@/lib/utils/useScreenFlag";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    id: 1,
    title: "BRAND IDENTITY",
    description:
      "Creating a unique visual and emotional image of the brand, including logo, colors, typography, and overall style",
    href: "/Section-3/Section-3-1.png",
  },
  {
    id: 2,
    title: "BRAND GUIDELINES",
    description:
      "A clear set of rules on how to use the brand consistently across all platforms and materials",
    href: "/Section-3/Section-3-2.png",
  },
  {
    id: 3,
    title: "PRODUCT DESIGN",
    description:
      "Designing the look, feel, and functionality of a product to align with the brand and user needs",
    href: "/Section-3/Section-3-3.png",
  },
  {
    id: 4,
    title: "CONCEPT DEVELOPMENT",
    description:
      "Creating the idea and visual direction for packaging that attracts attention and reflects the brand",
    href: "/Section-3/Section-3-1.png",
  },
];

const MainSection3 = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {isSmall, isMedium, isLarge}= useScreenFlag();

  useGSAP(
    () => {
      if (
        !itemRefs.current.length ||
        !cardRefs.current.length ||
        !titleRefs.current.length ||
        !sectionRef.current
      )
        return;


        const cleanups: (()=>void)[]=[];


       const cardTl = gsap.from(cardRefs.current, {
        y: 100,

        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power3.Out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      

       const titlesTl =  gsap.from(titleRefs.current, {
        xPercent: isLarge?-100:isMedium?-100:-120,
        opacity: 1,
        duration: 0.8,
        // ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isLarge?"top 40%":isMedium?"top 40%":"top 40%",
          end: isLarge?"center 40%":isMedium?"center 40%":"center center",
          // toggleActions: "play none none none",
          scrub: true,
          markers:true,
        },
      });

      

      const items = itemRefs.current;

      items.forEach((el, index) => {
        if (!el) return;
        const title = titleRefs.current[index];
        const card = cardRefs.current[index];
        const description = el.querySelector(".desc");

        const tl = gsap.timeline({ paused: true });

        tl.to(title, {
          opacity: 1,
          // y: -2,
          scale: 1.001,
          duration: 0.3,
          ease: "power2.out",
        });

        tl.to(
          description,
          {
            opacity: 1,
          },
          0,
        );

        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
  el.removeEventListener("mouseenter", onEnter);
  el.removeEventListener("mouseleave", onLeave);
});
      });


      return ()=>{
        cleanups.forEach((fn)=>fn());
      }

    },
    { scope: sectionRef , dependencies: [isSmall, isMedium, isLarge], revertOnUpdate: true,},
  );

  return (
    <section
      id="section-3"
      ref={sectionRef}
      className="relative z-30 h-screen bg-[#fefefe] overflow-hidden shadow-[0_-12px_20px_-10px_rgba(0,0,0,0.25)]"
    >
      <div className="relative grid grid-cols-4 grid-rows-2 h-screen w-full gap-1 md:gap-2 lg:gap-2 px-6 pt-20 pb-5  md:px-26 md:pt-26 md:pb-5  lg:px-26 lg:pt-26 lg:pb-5">
        {services.map((item, index) => (
          <div
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            key={item.id}
            className="relative col-span-1 row-span-1"
          >
            <div className="card-inner relative h-full w-full bg-amber-100 overflow-hidden text-white ">
              <img
                src={item.href}
                alt=""
                className="object-cover absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        ))}

        <div className="relative col-span-4 row-span-1 row-start-2  grid grid-rows-4 gap-2 mt-10">
          {services.map((item, index) => (
            <div
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              key={item.id}
              className=" relative row-span-1 flex flex-row justify-between border-b-2 border-[#eeeeee] items-end"
            >
              <div
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                className="title text-[1.2rem] leading-[1.2rem] md:text-2xl  lg:text-2xl  font-medium tracking-tight opacity-30 font-sans mb-2"
              >
                {item.title}
              </div>
              <div className="desc card-description  mx-2 text-[0.7rem] leading-[0.8rem]  md:text-xs lg:text-xs  font-sans w-50 md:w-[30vw]  lg:w-[30vw]  text-right  opacity-30 mb-2">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainSection3;
