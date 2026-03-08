import React from "react";
import { AnimatedText } from "../components/AnimatedText";
import Paragraph from "../animations/Paragraph";

function About() {
  return (
    <div
      className=" m-0  pt-20 px-6  grid  w-full h-screen
     grid-cols-4

    lg:gap-x-3.5 lg:grid-cols-12 lg:grid-rows-2   "
    >
      <div
        className="col-start-2  col-span-3 flex flex-col gap-10 lg:gap-0
      lg:col-start-4 lg:col-span-9 lg:grid lg:grid-cols-3 
     
      "
      >
        <div
          className=" text-2xl font-extrabold leading-[1em]
      
       lg:col-span-1  lg:gap-4 lg:row-span-1"
        >
          <AnimatedText
            text={[
              "Gavin Schneider Productions has been a leading full-service film and stills production company in Cape Town for over 27 years. Founded in 1997, we have established a strong reputation for delivering seamless international productions with expert local insight.",
            ]}
            el="h1"
            className="font-bold"
            stagger={0.0008}
            animation={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.1, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          />
        </div>

        <div className="text-ce-text lg:col-span-1 lg:row-span-1  lg:col-start-2 lg:row-start-2 ">
          <div>
            <h1 className="text-[1em] font-bold opacity-50 mb-1.5">
              Selected Clients
            </h1>
             <Paragraph delay={0.3} stagger={0.05}
                text=" Joules, NRBY, Evarea, Starbucks, Artisan, Ecco, Kennel & Schmenger, Canon, John Lewis, Paws, Swiss Re, Uber Eats, Shell, Schlaraffia, Samsung, Sacoor Brothers, Jon Enoch, Avon, Mountain Warehouse, Kalita, Honda, Davidoff, Clarks, Chevrolet, Big Sky,Bella Di Notte, Pour Moi, Protexin, LIDL, NKD, Becks, Avon, Asics, Amfar, Louis Vuitton"
                isLines
              />
          </div>
        </div>

        <div className="font-light text-sm gap-4 flex flex-col justify-end lg:col-start-3 lg:col-span-1 lg:row-span-1 ">
          <div>
            <h1 className="text-[1em] font-bold opacity-50 mb-1.5">Office</h1>
             <Paragraph delay={0.5} stagger={0.05}
                text="Studio G6, Gate 1, Victoria Junction, Prestwich St, Greenpoint, Cape Town"
                isLines
              />
              <div className="text-md font-bold opacity-50"><Paragraph text="Turkmenistan" /></div>
           

           
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
