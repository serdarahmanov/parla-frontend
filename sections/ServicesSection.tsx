"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import useScreenFlag from "@/lib/utils/useScreenFlag";
import { RedirectType } from "next/navigation";
import { usePageEntry } from "@/components/PageEntryProvider";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    id: 1,
    title: "PRODUCT STRATEGY",
    description:
      "Defining user needs, product goals, core features, and a clear technical roadmap",
    href: "/software engineering/icons/product-strategy.png",
  },
  {
    id: 2,
    title: "UX & UI DESIGN",
    description:
      "Designing intuitive user journeys, accessible interfaces, and interactive prototypes",
    href: "/software engineering/icons/ux-design.png",
  },
  {
    id: 3,
    title: "SOFTWARE DEVELOPMENT",
    description:
      "Engineering scalable web, mobile, backend, and cloud systems with clean architecture",
    href: "/software engineering/icons/software-engineering.png",
  },
  {
    id: 4,
    title: "QUALITY ENGINEERING",
    description:
      "Validating functionality, performance, accessibility, security, and product reliability",
    href: "/software engineering/icons/quality-engineering.png",
  },
  {
    id: 5,
    title: "LAUNCH & GROWTH",
    description:
      "Deploying, monitoring real-world usage, and continuously improving the product",
    href: "/software engineering/icons/launch-growth.png",
  },
];

const initialServiceColors = ["#f9f9f8", "#a8a8a8", "#909090", "#787878", "#606060"];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { entry } = usePageEntry();
  const entryId = entry?.id ?? null;

  const { isSmall, isMedium, isLarge } = useScreenFlag();


  useGSAP(() => {
  if (!entryId || !sectionRef.current || !cardRefs.current.length) return;

  const cards = cardRefs.current.filter(
    (card): card is HTMLDivElement => card !== null
  );

  cards.forEach((card, index) => {
   if (index === 0) {
     gsap.set(card, { backgroundColor: initialServiceColors[index] });
     return;
   }

   gsap.set(card, {
    y: -100,
    rotate: -5,
    backgroundColor: initialServiceColors[index],
  });

  gsap.to(card, {
    y: 0,
    rotate: 0,
    backgroundColor: "#f9f9f8",
    ease: "none",
    scrollTrigger: {
      trigger: card,
      start: `top ${105 - index * 5}%`,
      end: `top ${5 + index * (isLarge?15:20)}%`,
      scrub: true,
    
    },
  });
  });
}, {
  scope: sectionRef,
  dependencies: [entryId, isSmall, isMedium, isLarge],
  revertOnUpdate: true,
});





  return (
    <section
      id="section-3"
      ref={sectionRef}
      className="relative z-30 h-screen flex flex-col overflow-hidden shadow-[0_-12px_20px_-10px_rgba(0,0,0,0.25)]"
    >

      <div className="relative w-full pt-25"></div>
      <div className="relative flex flex-col h-full w-full  pb-10  font-sans overflow-hidden">
        {services.map((service, index) => (
            
          <div
            key={service.id}
            ref={(el)=>{
              cardRefs.current[index]= el;
            }}
            style={{ zIndex: 50 - index , transformOrigin: "left" }}
            className={`relative h-[20%] w-full border-t-1 border-b-1 border-[#eeeeee] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 overflow-hidden gap-1 lg:gap-3 px-4 md:pl-30 md:pr-6 lg:pl-30 lg:pr-10`}
          >

{/* " h-[25%] w-full  border-t-1 border-[#eeeeee] grid grid-cols-6 overflow-hidden gap-3" */}

            <div className="col-span-1 md:col-span-2 flex items-start gap-2 pt-6">
              <img
                src={service.href}
                alt=""
                className="h-7 w-7 shrink-0 object-contain md:h-8 md:w-8 lg:hidden"
              />
              <h2 className="   text-[1.3rem] leading-[1.3rem]  md:text-[2.5rem] font-semibold  lg:leading-[2rem] tracking-tight">{service.title}</h2>
            </div>
            <p className="col-span-1 md:col-span-2 text-[0.8rem] leading-[0.8rem]  lg:text-[1rem] lg:leading-[1rem] font-medium tracking-tight pt-6">{service.description}</p>


            <div className="hidden overflow-hidden px-2 py-2 lg:block">
              <img
                src={service.href}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            
          </div>


        ))}
      </div>

      {/*       
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
      </div> */}
    </section>
  );
};

export default ServicesSection;
