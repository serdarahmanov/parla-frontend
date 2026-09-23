
import Paragraph from "../animations/Paragraph";
import { motion } from "framer-motion";

import HoverSwapLink from "@/animations/HoverSwapLink";
import LiveClock from "@/components/LiveClock";

const images = [
  {
    id: 1,
    href: "/info-photos/business-people-shaking-hands-agreement_53876-30721.jpg",
  },
];

function About() {
  return (
    <div
      className="about-page header-clearance-top relative pb-10 px-6  w-full h-screen
     flex flex-col gap-y-10
      md:relative md:pb-10 md:px-6 md:w-full md:min-h-screen md:flex md:font-sans md:flex-col md:gap-y-5
      lg:relative lg:pb-10 lg:px-6 lg:grid lg:w-full   lg:font-sans
      lg:gap-x-3 lg:grid-cols-12 lg:grid-rows-2 lg:h-screen lg:gap-y-15  "
    >
      <div className=" grid grid-cols-3 md:row-span-2 md:col-span-10 md:col-start-1 md:grid md:grid-cols-10  md:gap-x-5 lg:col-span-12 lg:row-span-1 lg:grid lg:grid-cols-12 lg:gap-x-3 ">
        <div className="col-start-1 col-span-2 font-sans font-semibold leading-5 tracking-tight  md:col-start-1 md:col-span-6 lg:col-start-1 md:text-2xl md:leading-[1.4rem] lg:col-span-7 lg:font-sans lg:tracking-tight lg:text-[2rem] lg:leading-8 lg:font-medium ">
          <Paragraph
            delay={0}
            stagger={0.05}
            text="Parla is a strategic marketing and content partner for brands that want structured, long-term growth. We do not just produce visuals or post content - we build the system behind it, from positioning and strategy to production and execution."
            isLines
          />
        </div>
        <motion.div
          initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="col-start-3 col-span-1 md:col-start-8 md:col-span-3 lg:col-start-10 lg:col-span-3"
        >
          {images.map((item) => (
            <img
              src={item.href}
              alt="Parla team handshake"
              key={item.id}
              className="w-full object-contain md:w-full md:object-contain lg:w-full lg:object-contain"
            />
          ))}
        </motion.div>
      </div>

      <div className="flex-col flex gap-10 font-sans md:text-[0.7rem] md:leading-[0.9rem] md:flex md:flex-wrap md:flex-row md:gap-5 lg:col-span-12 lg:row-span-1 lg:grid lg:grid-cols-12 lg:gap-x-3  lg:text-xs lg:font-normal lg:font-sans ">
        
        
        
        <div className="font-normal text-[0.8rem]  md:w-[40vw]  md:text-[0.7rem] md:leading-[0.9rem] lg:col-start-1 lg:col-span-3 lg:w-full lg:text-xs">
          <div className=" flex flex-col gap-2 md:flex md:flex-col md:gap-2 lg:flex lg:flex-col lg:gap-3 ">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="text-[0.7rem] font-bold opacity-50 md:text-[0.7rem] md:font-bold md:opacity-50 lg:text-[0.7rem] lg:font-bold lg:opacity-50"
            >
              What We Do
            </motion.h1>
            <Paragraph
              delay={0}
              stagger={0.05}
              text="Marketing and creative direction, production management, music distribution, web and mobile applications, eCommerce, SAAS platforms, AI-generated content, and interior/exterior architecture design for businesses that want clarity, consistency, and real results."
              isLines
            />
          </div>
        </div>


        <div className="font-normal text-[0.8rem] font-sans md:w-[40vw] md:text-[0.7rem] md:leading-[0.9rem] lg:col-start-7 lg:col-span-3  lg:text-xs lg:font-normal lg:font-sans ">
          <div className="flex flex-col gap-2 md:flex md:flex-col md:gap-2 lg:flex lg:flex-col lg:gap-3">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="text-[0.7rem] font-bold opacity-50 md:text-[0.7rem] md:font-bold md:opacity-50 lg:text-[0.7rem] lg:font-bold lg:opacity-50"
            >
              Contact
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
            >
              <HoverSwapLink
                href={"mailto:info@parla.com"}
                text={"info@parla.com"}
                data-analytics="contact-email"
               
              />
              <HoverSwapLink
                href={"tel:+99361060803"}
                text={"+ 99 361 06 0803"}
                data-analytics="contact-phone"
              />
              <HoverSwapLink
                href={"https://instagram.com/parla_vision"}
                text={"Instagram"}
                data-analytics="social-instagram"
              />
              <HoverSwapLink
                href={"https://t.me/orayevbatyr"}
                text={"Telegram"}
                data-analytics="social-telegram"
              />
            </motion.div>
          </div>
        </div>



        <div className="font-normal text-[0.8rem] font-sans md:w-full md:text-[0.7rem] md:leading-[0.9rem]  flex flex-col gap-10 md:flex md:flex-row md:flex-wrap md:gap-5 lg:col-start-10 lg:col-span-3  lg:flex lg:flex-col lg:gap-10 lg:text-xs lg:font-normal lg:font-sans ">
          
          
          <div className="flex flex-col gap-2   md:w-[40vw] md:flex md:flex-col md:gap-2 lg:flex lg:flex-col lg:gap-3 lg:w-full">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="text-[0.7rem] font-bold opacity-50 md:text-[0.7rem] md:font-bold md:opacity-50 lg:text-[0.7rem] lg:font-bold lg:opacity-50"
            >
              Office
            </motion.h1>
            <div>
           
              <Paragraph
                delay={0}
                stagger={0.05}
                text="Studio B12, Block 3, Berkarar Business Center Atatürk Street, Berkararlyk District, Ashgabat, Turkmenistan"
                isLines
              />
              
            </div>
          </div>
          <div className=" flex flex-col gap-2 md:w-[40vw]  md:flex md:flex-col md:gap-2 lg:flex lg:flex-col lg:gap-3  lg:w-full">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="text-[0.7rem] font-bold opacity-50 md:text-[0.7rem] md:font-bold md:opacity-50 lg:text-[0.7rem] lg:font-bold lg:opacity-50"
            >
              Working Hours
            </motion.h1>
            <div>
              <Paragraph
                delay={0}
                stagger={0.05}
                text="Monday to Friday"
                isLines
                revealImmediately
              />
              <Paragraph
                delay={0}
                stagger={0.05}
                text="08:00 AM - 06:00 PM"
                isLines
                revealImmediately
              />
             

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <LiveClock className={" font-bold text-[0.7rem] font-sans opacity-50 md:text-[0.6rem] "} />
              </motion.div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default About;
