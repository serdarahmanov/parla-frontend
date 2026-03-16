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
    <div ref={wrapperRef} className="bg-white">
      <div className="relative grid grid-cols-12 pt-25 pb-[90vh] px-6 ">
        <div
          ref={leftSideBarRef}
          className="h-screen col-span-3 gap-4 flex flex-col col-start-4"
        >
          <MaskTextAnimation
            text={"PRIVACY POLICY"}
            className=" leading-7"
          ></MaskTextAnimation>

          <div className="gap-1 text-xs font-bold  flex flex-col">
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

        <div className="col-start-8 col-span-4 gap-8 flex flex-col">
          {privacyPolicy.sections.map((section, index) => (
            <div key={index} className=" flex flex-col gap-2">
              <h2
                ref={(el) => (policiesRef.current[index] = el)}
                className={`text-xs font-black    ${activePolicy == index ? "opacity-100" : "opacity-30"} `}
              >
                {" "}
                {section.heading}
              </h2>

              {section.content?.map((paragraph, i) => (
                <p key={i} className="text-xs font-sans">
                  {paragraph}
                </p>
              ))}

              {section.innerFirst && (
                <ul className="list-none text-xs font-sans space-y-1  ">
                  {section.innerFirst.innerList.map((items, index) => (
                    <li key={index}>
                      <h1>{items.innerListHeading}</h1>
                      <ul className="list-disc pl-8 space-y-1 mt-1">
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
                <ul className="list-decimal pl-8 space-y-1 text-xs font-sans">
                  {section.innerContent.innerList?.map((innerList, index) => (
                    <li className="pl-2" key={index}>
                      <h1>{innerList.innerListHeading}</h1>
                      <ol className=" list-[upper-alpha] pl-8 space-y-1 mt-1">
                        {innerList.innerListList?.map((innerListList, i) => (
                          <li key={i} className="pl-2 ">
                            <h1>{innerListList.heading}</h1>

                            <ol className="list-[lower-alpha] pl-10 space-y-1  mt-1">
                              {innerListList.list?.map((listItems, i) => (
                                <li className="pl-2 " key={i}>
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

        <div className="col-span-2"></div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
