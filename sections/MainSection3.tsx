"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

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


  useGSAP(
    () => {
          if(!itemRefs.current || !cardRefs.current || !titleRefs.current || !sectionRef.current) return

            gsap.from(cardRefs.current,{
              y:100,
               
              opacity:0,
              duration: 0.3,
              stagger: 0.1,
              ease: "power3.Out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%"
                
              }

            })




          gsap.from(titleRefs.current,{
              xPercent: -100,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "center 40%",
          toggleActions: "play none none none",
          scrub: true,
        },

          })

          const items = itemRefs.current;

          items.forEach((el,index)=>{
            if(!el)return;
            const title = titleRefs.current[index];
            const card = cardRefs.current[index];
            const description = el.querySelector(".desc");


            const tl  = gsap.timeline({paused:true});

            tl.to(title,{
              opacity: 1,
              // y: -2,
              scale:1.001,
              duration: 0.3,
              ease: "power2.out"

            }).to(el,{
              



            },"<")

            tl.to(description,{
              opacity: 1,
            },0)



            const onEnter = ()=>tl.restart();
            const onLeave = ()=> tl.revert();

            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
 return()=>{
  el.removeEventListener("mouseenter", onEnter);
  el.removeEventListener("mouseleave", onLeave);
  tl.kill();
 }

          })









    },
    { scope: sectionRef },
  );




  return (
    <section
      id="section-3"
      ref={sectionRef}
      className="relative z-30 h-screen bg-[#fefefe] overflow-hidden shadow-[0_-12px_20px_-10px_rgba(0,0,0,0.25)]"
    >
      <div
      
        className="relative grid grid-cols-4 grid-rows-2 h-screen w-full gap-2 px-26 pt-26 pb-5"
      >
        {services.map((item,index) => (
          <div  
          ref={ (el)=>{cardRefs.current[index]= el;}}
          key={item.id}
          className="relative col-span-1 row-span-1">
            <div className="card-inner relative h-full w-full bg-amber-100 overflow-hidden text-white ">
              <img
                src={item.href}
                alt=""
                className="object-cover absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        ))}

        <div  className="relative col-span-4 row-span-1 row-start-2  grid grid-rows-4 gap-2 mt-10">
          {services.map((item,index) => (
            <div ref={ (el)=>{
              itemRefs.current[index]= el;
            }}
              key={item.id}
              className=" relative row-span-1 flex flex-row justify-between border-b-2 border-[#eeeeee] items-end"
            >
              <div 
              ref = {(el)=>{
                titleRefs.current[index]=el;
              }}
              className="title text-2xl font-medium tracking-tight opacity-30 font-sans mb-2">
                {item.title}
              </div>
              <div className="desc card-description  mx-2 text-xs font-sans w-[30vw]  text-right  opacity-30 mb-2">
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
