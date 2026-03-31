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
      className="relative z-39 h-screen w-full bg-[#fefefe] flex flex-col  items-center  pt-[20vh]  gap-y-20
      md:relative md:z-39 md:h-screen md:w-full md:bg-[#fefefe] md:flex md:flex-col md:items-center md:pt-auto md:gap-y-20  
      lg:relative lg:z-39 lg:h-screen lg:w-full lg:bg-[#fefefe] lg:flex lg:flex-col lg:items-center lg:pt-25 lg:gap-y-20 "
    >
      {/* Brands We've Worked With */}
      <div
        className="font-sans font-normal text-2xl tracking-tight opacity-30
      md:font-sans md:font-normal md:text-2xl md:tracking-tight md:opacity-30
      lg:font-sans lg:font-normal lg:text-2xl lg:tracking-tight lg:opacity-30"
      >
        <Paragraph isLines text={"Brands We’ve Worked With"}></Paragraph>
      </div>

      {/* Logos */}

      <div
        className=" grid grid-cols-3 w-[80vw] gap-y-4 gap-x-2  
      md:grid md:grid-cols-5 md:w-[80vw]  md:gap-y-10 md:gap-x-5
      lg:grid lg:grid-cols-5 lg:grid-rows-3 lg:gap-10  lg:w-[60vw] 
      
      
         "
      >
        {clients.map((client, index) => (
          <div
            key={index}
            ref={(el) => {
              clientsRef.current[index] = el;
            }}
            className="flex  items-center md:flex md:items-center lg:col-span-1 lg:row-span-1 lg:flex lg:items-center"
          >
            <img
              src={client.logo}
              alt={client.brandName}
              className="h-auto w-full object-contain p-2 md:h-auto md:w-full md:object-contain md:p-3 lg:h-auto lg:w-full lg:object-contain lg:p-3"
            />
          </div>
        ))}
      </div>

      {/* Logo */}
      <div
        className=" relative w-full  bg-[#fefefe] flex flex-col items-center
      md:relative md:w-full md:bg-[#fefefe] md:flex md:flex-col md:items-center
      lg:relative lg:w-full lg:bg-[#fefefe] lg:flex lg:flex-col lg:items-center "
      >
        <div
          className=" gap-[0.05rem] grid grid-cols-2 grid-rows-2  w-4 
        md:gap-[0.05rem] md:grid md:grid-cols-2 md:grid-rows-2 md:w-6
        lg:gap-[0.05rem] lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:w-4 "
        >
          <img
            src="/landingTransition/Asset-1.svg"
            alt="Parla"
            className="row-start-1 col-start-1 row-span-1 col-span-1 md:row-start-1 md:col-start-1 md:row-span-1 md:col-span-1 lg:row-start-1 lg:col-start-1 lg:row-span-1 lg:col-span-1 "
          />
          <img
            src="/landingTransition/Asset-2.svg"
            alt="Parla"
            className="row-start-1 col-start-2  row-span-1 col-span-1 md:row-start-1 md:col-start-2 md:row-span-1 md:col-span-1 lg:row-start-1 lg:col-start-2 lg:row-span-1 lg:col-span-1"
          />
          <img
            src="/landingTransition/Asset-3.svg"
            alt="Parla"
            className="row-start-2 col-start-1   row-span-1 col-span-1 md:row-start-2 md:col-start-1 md:row-span-1 md:col-span-1 lg:row-start-2 lg:col-start-1 lg:row-span-1 lg:col-span-1"
          />
          <img
            src="/landingTransition/Asset-4.svg"
            alt="Parla"
            className=" row-start-2 col-start-2   row-span-1 col-span-1 md:row-start-2 md:col-start-2 md:row-span-1 md:col-span-1 lg:row-start-2 lg:col-start-2 lg:row-span-1 lg:col-span-1 "
          />
        </div>
      </div>
    </section>
  );
};

export default MainSection5;
