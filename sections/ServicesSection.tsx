"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { entry } = usePageEntry();
  const entryId = entry?.id ?? null;


  useGSAP(() => {
  if (!entryId || !sectionRef.current || !cardRefs.current.length) return;

  const cards = cardRefs.current.filter(
    (card): card is HTMLDivElement => card !== null
  );

  const animatedCards = cards.slice(1);

  gsap.set(cards[0], { backgroundColor: initialServiceColors[0] });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(animatedCards, {
      y: 0,
      rotate: 0,
      backgroundColor: "#f9f9f8",
    });
    return;
  }

  gsap.set(animatedCards, {
    y: -70,
    rotate: -3,
    backgroundColor: (index) => initialServiceColors[index + 1],
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 85%",
      end: "bottom 105%",
      scrub: true,
      invalidateOnRefresh: true,
      onEnter: () => document.body.classList.add("services-active"),
      onEnterBack: () => document.body.classList.add("services-active"),
      onLeaveBack: () => document.body.classList.remove("services-active"),
    },
  }).to(animatedCards, {
    y: 0,
    rotate: 0,
    backgroundColor: "#f9f9f8",
    duration: 0.75,
    stagger: 0.18,
    ease: "none",
  });

  return () => document.body.classList.remove("services-active");
}, {
  scope: sectionRef,
  dependencies: [entryId],
  revertOnUpdate: true,
});





  return (
    <>
      {/* Temporarily hidden; keep this marquee available for a future revision.
      <div
        className="relative z-20 flex h-16 w-full items-center overflow-hidden bg-[#f9f9f8] lg:h-20"
        aria-hidden="true"
      >
        <div className="marketing-section-marquee-track text-[clamp(0.75rem,1vw,1rem)] font-semibold leading-none tracking-tight text-[#777773] whitespace-nowrap">
          <span>{servicesMarqueeText}</span>
          <span>{servicesMarqueeText}</span>
        </div>
      </div>
      */}

    <div className="services-section-shell pt-20">
      <section
        id="section-3"
        ref={sectionRef}
        className="relative z-30 flex h-auto min-h-0 flex-col overflow-x-clip overflow-y-visible lg:h-screen lg:min-h-0 lg:overflow-hidden"
      >
        <header className="relative flex h-25 w-full flex-none items-center justify-start bg-[#f9f9f8] px-[clamp(1rem,4vw,2.5rem)] md:pl-[clamp(2rem,8vw,7.5rem)] md:pr-[clamp(1.5rem,4vw,2.5rem)]">
        <h2 className="font-sans whitespace-nowrap text-left text-[clamp(0.6875rem,1.2vw,1rem)] font-medium leading-none tracking-tight text-[#777773]">
          &quot;software, step by step&quot;
        </h2>
        </header>
        <div className="relative flex w-full flex-col pb-10 font-sans lg:h-full lg:overflow-hidden">
        {services.map((service, index) => (
            
          <div
            key={service.id}
            ref={(el)=>{
              cardRefs.current[index]= el;
            }}
            style={{ zIndex: 50 - index , transformOrigin: "left" }}
            className={`relative grid min-h-[8.5rem] w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-[clamp(0.5rem,2vw,1rem)] overflow-hidden border-[#eeeeee] px-[clamp(1rem,4vw,2.5rem)] md:grid-cols-4 md:gap-x-[clamp(1.5rem,3vw,2rem)] md:pl-[clamp(2rem,8vw,7.5rem)] md:pr-[clamp(1.5rem,4vw,2.5rem)] lg:h-[20%] lg:min-h-0 lg:grid-cols-5 ${index === 0 ? "border-x border-b rounded-b-[var(--r-cta)]" : "border-y rounded-[var(--r-cta)]"}`}
          >

{/* " h-[25%] w-full  border-t-1 border-[#eeeeee] grid grid-cols-6 overflow-hidden gap-3" */}

            <div className="col-span-1 flex min-w-0 items-start gap-2 pt-6 md:col-span-2">
              <img
                src={service.href}
                alt=""
                className="h-7 w-7 shrink-0 object-contain opacity-40 md:h-8 md:w-8 lg:hidden"
              />
              <h2 className="min-w-0 flex-1 break-normal hyphens-none text-[clamp(0.9rem,5vw,1.2rem)] font-semibold leading-[1.05] tracking-tight md:text-[clamp(1.5rem,3.3vw,2rem)] lg:leading-[0.9]">
                {service.title}
              </h2>
            </div>
            <p className="col-span-1 min-w-0 break-normal hyphens-none pt-6 text-[clamp(0.68rem,2.8vw,0.8rem)] font-medium leading-[1.12] tracking-tight md:col-span-2 md:text-[clamp(0.78rem,1.5vw,1rem)]">
              {service.description}
            </p>


            <div className="hidden overflow-hidden px-2 py-2 lg:block">
              <img
                src={service.href}
                alt=""
                className="h-full w-full object-contain opacity-40"
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
    </div>
    </>
  );
};

export default ServicesSection;
