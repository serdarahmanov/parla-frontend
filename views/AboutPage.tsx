import React from "react";
import Paragraph from "../animations/Paragraph";
import PortfolioVideoPlayer from "@/components/VideoPlayer";

const images = [
  { id: 1, href: "/info-photos/business-people-shaking-hands-agreement_53876-30721.jpg" },
];

function About() {
  return (
    <div
      className="relative pb-10 pt-20 px-6 grid w-full h-screen
      grid-cols-4 overflow-hidden font-sans
      lg:gap-x-3.5 lg:grid-cols-12 lg:grid-rows-2 lg:m-0 lg:h-screen"
    >
      <div className="col-start-10 col-span-3 flex flex-col gap-2">
        {images.map((item) => (
          <img
            src={item.href}
            alt="Parla team handshake"
            key={item.id}
            className="w-full object-contain"
          />
        ))}
      </div>

      <div
        className="col-start-2 col-span-3 flex flex-col gap-10 lg:gap-6
        lg:col-span-9 lg:grid lg:grid-cols-3 lg:row-start-1"
      >
        <div
          className="text-3xl font-semibold leading-[1em]
          lg:col-span-2 lg:gap-4 lg:row-span-1"
        >
          <Paragraph
            delay={0.4}
            stagger={0.05}
            text="Parla is a strategic marketing and content partner for brands that want structured, long-term growth. We do not just produce visuals or post content - we build the system behind it, from positioning and strategy to production and execution."
            isLines
          />
        </div>

        <div className="lg:col-span-1 lg:row-span-1 lg:col-start-1 lg:row-start-2 text-sm lg:text-md">
          <div>
            <h1 className="text-[1rem] font-bold opacity-50 mb-1.5">
              What We Do
            </h1>
            <Paragraph
              delay={0.6}
              stagger={0.05}
              text="Brand strategy, content strategy, creative direction, pre-production planning, production management, storytelling, social media content systems, campaign execution, and ongoing marketing support for businesses that want clarity, consistency, and real results."
              isLines
            />
          </div>
        </div>

        <div className="font-light text-xs gap-4 flex flex-col justify-end lg:col-start-3 lg:col-span-1 lg:row-span-1 lg:row-start-2">
          <div>
            <h1 className="text-[1rem] font-bold opacity-50 mb-1.5">
              Office
            </h1>
            <Paragraph
              delay={0.8}
              stagger={0.05}
              text="Ashgabat, Turkmenistan"
              isLines
            />
            <div className="text-md font-bold opacity-50">
              <Paragraph text="Strategic Partner in Marketing & Content" />
            </div>
          </div>
        </div>
      </div>
        
    </div>
  );
}

export default About;
