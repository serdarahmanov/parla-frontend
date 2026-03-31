"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import useScreenFlag from "@/lib/utils/useScreenFlag";
import { RedirectType } from "next/navigation";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    id: 1,
    title: "BRAND IDENTITY",
    description:
      "Creating a unique visual and emotional image of the brand, including logo, colors, typography, and overall style",
    href: "/Section-3/Section-3-1.png",
    logo: "/blackSVGs/Asset-1.svg",
  },
  {
    id: 2,
    title: "BRAND GUIDELINES",
    description:
      "A clear set of rules on how to use the brand consistently across all platforms and materials",
    href: "/Section-3/Section-3-2.png",
    logo: "/blackSVGs/Asset-2.svg",
  },
  {
    id: 3,
    title: "PRODUCT DESIGN",
    description:
      "Designing the look, feel, and functionality of a product to align with the brand and user needs",
    href: "/Section-3/Section-3-3.png",
    logo: "/blackSVGs/Asset-3.svg",
  },
  {
    id: 4,
    title: "CONCEPT DEVELOPMENT",
    description:
      "Creating the idea and visual direction for packaging that attracts attention and reflects the brand",
    href: "/Section-3/Section-3-1.png",
    logo: "/blackSVGs/Asset-4.svg",
  },
];

const MainSection3 = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { isSmall, isMedium, isLarge } = useScreenFlag();


  useGSAP(() => {
  if (!sectionRef.current || !cardRefs.current.length) return;

  const cards = cardRefs.current.filter(
    (card): card is HTMLDivElement => card !== null
  );

  cards.forEach((card, index) => {
    if (index === 0) return;

   gsap.set(card, {
    y: -100,
    rotate: -5,
    backgroundColor: "#c2c2c2",
  });

  gsap.to(card, {
    y: 0,
    rotate: 0,
    backgroundColor: "#fefefe",
    ease: "none",
    scrollTrigger: {
      trigger: card,
      start: `top ${105 - index * 5}%`,
      end: `top ${5 + index * (isLarge?15:20)}%`,
      scrub: true,
    
    },
  });
  });
}, { scope: sectionRef, dependencies:[ isSmall, isMedium, isLarge] ,revertOnUpdate:true,});





  return (
    <section
      id="section-3"
      ref={sectionRef}
      className="relative z-30 h-screen flex flex-col bg-[#fefefe]   overflow-hidden shadow-[0_-12px_20px_-10px_rgba(0,0,0,0.25)]"
    >

      <div className="relative bg-[#fefefe] w-full pt-25"></div>
      <div className="relative flex flex-col h-full w-full  pb-10  font-sans overflow-hidden">
        {services.map((service, index) => (
            
          <div
            key={service.id}
            ref={(el)=>{
              cardRefs.current[index]= el;
            }}
            style={{ zIndex: 50 - index , transformOrigin: "left" }}
            className={`relative h-[25%] w-full  border-t-1 border-b-1 border-[#eeeeee] bg-[#fefefe] grid  grid-cols-2  lg:grid-cols-6 overflow-hidden gap-1 lg:gap-3 pl-25 md:pl-30 lg:pl-30 pr-6 lg:pr-10 `}
          >

{/* " h-[25%] w-full  border-t-1 border-[#eeeeee] grid grid-cols-6 overflow-hidden gap-3" */}

            <div className="col-span-1 lg:col-span-2 flex flex-col lg:flex-row gap-2  pt-6">
              <div>
                <img src={service.logo} alt="" className=" object-contain max-w-2 opacity-30" />
              </div>
              <h2 className="   text-[1.3rem] leading-[1.3rem]  md:text-[2.5rem] font-semibold  lg:leading-[2rem] tracking-tight">{service.title}</h2>
            </div>
            {(isLarge|| isMedium) &&(<h2 className="text-xs opacity-90 pt-6 text-ce-secondary ">{service.title}</h2>)}
          

            <p className="col-span-1 lg:col-span-2 text-[0.8rem] leading-[0.8rem]  lg:text-[1rem] lg:leading-[1rem] font-medium tracking-tight pt-6">{service.description}</p>


            {(isMedium || isLarge)&& (<div className="overflow-hidden py-2 px-2">
              <img
                src={service.href}
                alt=""
                className="object-cover  w-full h-full"
              />
            </div>)}
            
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

export default MainSection3;
