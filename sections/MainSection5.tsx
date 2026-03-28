"use client";
import Paragraph from "@/animations/Paragraph";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const clients = [
  { id: "1", brandName: "Aytac", logo: "/clients/tas-logo-black.png" },
  { id: "2", brandName: "Hyundai", logo: "/clients/tas-logo-black.png" },
  { id: "3", brandName: "Kids Expo", logo: "/clients/tas-logo-black.png" },
  { id: "4", brandName: "Gandaş", logo: "/clients/tas-logo-black.png" },
  { id: "5", brandName: "Tör", logo: "/clients/tas-logo-black.png" },
  { id: "6", brandName: "Real", logo: "/clients/tas-logo-black.png" },
  { id: "7", brandName: "Bold", logo: "/clients/tas-logo-black.png" },
  { id: "8", brandName: "Softea", logo: "/clients/tas-logo-black.png" },
  { id: "9", brandName: "Rahat", logo: "/clients/tas-logo-black.png" },
  { id: "10", brandName: "Tachil", logo: "/clients/tas-logo-black.png" },
  { id: "11", brandName: "Gatnaşyk", logo: "/clients/tas-logo-black.png" },
  { id: "12", brandName: "TMCeli", logo: "/clients/tas-logo-black.png" },
  { id: "13", brandName: "Panasian", logo: "/clients/tas-logo-black.png" },
  { id: "14", brandName: "Depe", logo: "/clients/tas-logo-black.png" },
   { id: "15", brandName: "Birzatlar", logo: "/clients/tas-logo-black.png" },
];

const MainSection5 = () => {
  const clientsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !clientsRef.current[0]) return;

     
      const clients = clientsRef.current;
     gsap.from(clients, {
        scale: 1.2,
        y: 50,
        opacity: 0,
        ease: [0.76, 0, 0.24, 1],
        stagger: 0.03,
        duration: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none none",
          once: true,
          // markers:true
        },
      });

     
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section-5"
      className="relative z-39 h-screen w-full bg-[#fefefe] flex flex-col  items-center  pt-25  gap-y-20 "
    >
      <div className="font-sans font-normal text-2xl tracking-tight opacity-30">
        <Paragraph isLines text={"Brands We’ve Worked With"}></Paragraph>
      </div>

      <div className=" flex flex-wrap 
      lg:grid lg:grid-cols-5 lg:grid-rows-3 lg:gap-10  lg:w-[60vw] 
      
      
      w-full  gap-y-10 gap-x-5  justify-center ">
        {clients.map((client, index) => (
          <div
            key={index}
            ref={(el) => {
              clientsRef.current[index] = el;
            }}
            className="lg:col-span-1 lg:row-span-1 flex  items-center"
          >
            <img
              src={client.logo}
              alt={client.brandName}
              className="h-auto w-full object-contain p-3"
            />
            
          </div>
        ))}
      </div>

      <div className=" relative w-full  bg-[#fefefe] flex flex-col items-center ">
        <div className="intro-logo gap-0.5 grid grid-cols-2 grid-rows-2  w-4 mt-auto">
          <img
            src="/landingTransition/Asset-1.svg"
            alt="Parla"
            className="row-start-1 col-start-1 row-span-1 col-span-1 "
          />
          <img
            src="/landingTransition/Asset-2.svg"
            alt="Parla"
            className="row-start-1 col-start-2  row-span-1 col-span-1"
          />
          <img
            src="/landingTransition/Asset-3.svg"
            alt="Parla"
            className="row-start-2 col-start-1   row-span-1 col-span-1"
          />
          <img
            src="/landingTransition/Asset-4.svg"
            alt="Parla"
            className=" row-start-2 col-start-2   row-span-1 col-span-1 "
          />
        </div>
      </div>
    </section>
  );
};

export default MainSection5;
