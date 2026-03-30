"use client";
import { privacyPolicy } from "../public/data/privacyPolicyData";
import MaskTextAnimation from "@/animations/MaskTextAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { use, useLayoutEffect, useRef, useState } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollToPlugin);

const PrivacyPolicy = () => {
  const wrapperRef = useRef(null);
  const leftSideBarRef = useRef(null);
  const policiesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activePolicy, setActivePolicy] = useState(0);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftSideBarRef.current,
        pinSpacing: false,
      });

      policiesRef.current.forEach((header, i) =>
        ScrollTrigger.create({
          trigger: header,
          start: "top top+=20%",
          onEnter: () => setActivePolicy(i),
          onEnterBack: () => setActivePolicy(i),
        }),
      );
    }, wrapperRef);

    return () => context.revert();
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="bg-white md:bg-white lg:bg-white">

        {/* Inner Wrapper definig grip rules */}
      <div className="relative grid grid-cols-12 pt-25 pb-[80vh] px-6 font-sans gap-1
      md:relative md:grid md:grid-cols-12 md:pt-25 md:pb-[80vh] md:px-6 md:gap-0
      lg:relative lg:grid lg:grid-cols-12 lg:pt-25 lg:pb-[80vh] lg:px-6 kg:gap-0 ">


          {/* Left Side Bar */}
       
         {/* className=" col-start-1 col-span-3 flex flex-col  gap-4 h-screen  */}
        <div
          ref={leftSideBarRef}
          className="h-screen col-span-3 gap-4 flex flex-col col-start-1 
          md:h-screen md:col-span-3 md:gap-4 md:flex md:flex-col md:col-start-2 
          lg:h-screen lg:col-span-3 lg:gap-4 lg:flex lg:flex-col lg:col-start-4 "
        >
          <MaskTextAnimation
            text={"PRIVACY POLICY"}
            className=" leading-4 text-lg font-semibold md:leading-7 md:text-2xl md:font-semibold lg:leading-7 lg:text-2xl lg:font-semibold"
          ></MaskTextAnimation>

          <div className="gap-3 text-xs font-bold  flex flex-col md:gap-1 md:text-xs md:font-bold md:flex md:flex-col lg:gap-1 lg:text-xs lg:font-bold lg:flex lg:flex-col">
            {privacyPolicy.sections.map((section, index) => (
              <h2
                key={index}
                className={`${activePolicy == index ? "opacity-100" : "opacity-30"} cursor-pointer`}
                onClick={() => {
                  const el = policiesRef.current[index];
                  if (!el) return;
                  gsap.to(window, {
                    duration: 0.8,
                    scrollTo: { y: el, offsetY: window.innerHeight * 0.2 },
                    ease: "power2.out",
                  });
                }}
              >
                {section.heading}
              </h2>
            ))}
          </div>
        </div>


            {/* Right Side Bar */}
            {/*  col-start-4 col-span-9  flex flex-col */}
         
        <div className="col-start-4 col-span-9 gap-8 flex flex-col
        md:col-start-6 md:col-span-6 md:gap-8 md:flex md:flex-col
        lg:col-start-8 lg:col-span-4 lg:gap-8 lg:flex lg:flex-col">
          {privacyPolicy.sections.map((section, index) => (
            <div key={index} className=" flex flex-col gap-2 md:flex md:flex-col md:gap-2 lg:flex lg:flex-col lg:gap-2">
              <h2
                ref={(el) => (policiesRef.current[index] = el)}
                className={`text-xs font-black    ${activePolicy == index ? "opacity-100" : "opacity-30"} `}
              >
                {" "}
                {section.heading}
              </h2>

              {section.content?.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-xs font-sans md:text-xs md:font-sans lg:text-xs lg:font-sans"
                >
                  {paragraph}
                </p>
              ))}

              {section.innerFirst && (
                <ul className="list-none text-xs font-sans space-y-1 md:list-none md:text-xs md:font-sans md:space-y-1 lg:list-none lg:text-xs lg:font-sans lg:space-y-1  ">
                  {section.innerFirst.innerList.map((items, index) => (
                    <li key={index}>
                      <h1>{items.innerListHeading}</h1>
                      <ul className="list-disc pl-8 space-y-1 mt-1 md:list-disc md:pl-8 md:space-y-1 md:mt-1 lg:list-disc lg:pl-8 lg:space-y-1 lg:mt-1">
                        {items.list.map((listItems, i) => (
                          <li className="" key={i}>
                            {listItems}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}

              {section.innerContent && (
                <ul className="list-decimal pl-8 space-y-1 text-xs font-sans md:list-decimal md:pl-8 md:space-y-1 md:text-xs md:font-sans lg:list-decimal lg:pl-8 lg:space-y-1 lg:text-xs lg:font-sans">
                  {section.innerContent.innerList?.map((innerList, index) => (
                    <li className="pl-2 md:pl-2 lg:pl-2" key={index}>
                      <h1>{innerList.innerListHeading}</h1>
                      <ol className=" list-[upper-alpha] pl-8 space-y-1 mt-1 md:list-[upper-alpha] md:pl-8 md:space-y-1 md:mt-1 lg:list-[upper-alpha] lg:pl-8 lg:space-y-1 lg:mt-1">
                        {innerList.innerListList?.map((innerListList, i) => (
                          <li key={i} className="pl-2 md:pl-2 lg:pl-2 ">
                            <h1>{innerListList.heading}</h1>

                            <ol className="list-[lower-alpha] pl-10 space-y-1  mt-1 md:list-[lower-alpha] md:pl-10 md:space-y-1 md:mt-1 lg:list-[lower-alpha] lg:pl-10 lg:space-y-1 lg:mt-1">
                              {innerListList.list?.map((listItems, i) => (
                                <li className="pl-2 md:pl-2 lg:pl-2 " key={i}>
                                  {listItems}
                                </li>
                              ))}
                            </ol>
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="col-span-2 md:col-span-2 lg:col-span-2"></div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
