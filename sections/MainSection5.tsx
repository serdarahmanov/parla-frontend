import HoverSwapLink from "@/animations/HoverSwapLink";
import React from "react";

const clients = [
  { id: "1", brandName: "Aytac", logo: "/clients/tas-logo-white.png" },
  { id: "2", brandName: "Hyundai", logo: "/clients/tas-logo-white.png" },
  { id: "3", brandName: "Kids Expo", logo: "/clients/tas-logo-white.png" },

  { id: "4", brandName: "Gandaş", logo: "/clients/tas-logo-white.png" },

  { id: "5", brandName: "Tör", logo: "/clients/tas-logo-white.png" },

  { id: "6", brandName: "Real", logo: "/clients/tas-logo-white.png" },

  { id: "7", brandName: "Bold", logo: "/clients/tas-logo-white.png" },

  { id: "8", brandName: "Softea", logo: "/clients/tas-logo-white.png" },

  { id: "9", brandName: "Rahat", logo: "/clients/tas-logo-white.png" },

  { id: "10", brandName: "Tachil", logo: "/clients/tas-logo-white.png" },

  { id: "11", brandName: "Gatnaşyk", logo: "/clients/tas-logo-white.png" },

  { id: "12", brandName: "TMCeli", logo: "/clients/tas-logo-white.png" },

  { id: "13", brandName: "Panasian", logo: "/clients/tas-logo-white.png" },

  { id: "14", brandName: "Depe", logo: "/clients/tas-logo-white.png" },
];

const MainSection5 = () => {
  return (
    <section
      id="section-5"
      className="relative z-50 h-screen w-full bg-black  flex flex-col    "
    >
      {/* Takes 30vh of vertical space inside this h-screen section. */}
      <div className="absolute top-[25vh] w-full overflow-hidden  flex items-end justify-centerbg-black ">
        <div className="clients-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-70" />
        <div className="clients-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-70" />
        <div className="clients-marquee-track">
          {[...clients, ...clients].map((client, index) => (
            <div key={`${client.id}-${index}`} className="h-15 shrink-0 px-16">
              <img
                src={client.logo}
                alt={client.brandName}
                className="h-full w-auto object-contain opacity-80"
              />
            </div>
          ))}
        </div>
      </div>

      {/* h-full here is another 100vh inside the same h-screen section.
          Combined with the 30vh block above + gap-20, total content exceeds viewport height. */}

      <div className="w-full  bg-black flex flex-col items-center top-[60vh]  absolute opacity-85 gap-10 ">
       
        <div className="  grid grid-cols-3 gap-3 w-[60vw] h-auto text-white  bg-black">
          <div className="col-span-1">
            <div className="h-[1px] w-full bg-white  mt-3"></div>
            <div className="mt-10">
              <h1 className="font-medium opacity-65 mt-10  text-sm">
                BUSINESS ENQUIRIES
              </h1>
            </div>

            <div className="mt-6 flex flex-col leading-[1.2rem] text-sm font-sans tracking-tighter">
             
            <HoverSwapLink href={"mailto:info@parla.com"} text={"info@parla.com"}/>
            <HoverSwapLink href={"tel:+447778870307"} text={"+ 44 777 88 70307"}/>

              
            </div>
          </div>

          <div className="col-span-1  ">
            <div className="h-[1px] w-full bg-white  mt-3"> </div>
            <div className="mt-10">
              <h1 className="font-medium opacity-65   text-sm">SOCIALS</h1>
            </div>

            <div className="mt-6 flex flex-col  font-sans leading-[1.2rem] text-sm tracking-tighter">
              <HoverSwapLink href={"https://instagram.com/parla"} text={"INSTAGRAM"}/>
             <HoverSwapLink href={"https://t.me/parla"} text={"TELEGRAM"}/>
             
            
            </div>
          </div>

          <div className="col-span-1">
            <div className="h-[1px] w-full bg-white  mt-3"> </div>
            <div className=" mt-10">
              <h1 className="font-medium opacity-65  text-sm">
                {" "}
                WORKING HOURS
              </h1>
            </div>

            <div className="mt-6 flex flex-col  leading-[1.2rem] text-md tracking-tighter">
              <p> Monday to Friday</p>
              <p>08:00 AM - 18:00 PM</p>
            </div>
          </div>
        </div>
        <div className="intro-logo gap-0.5 grid grid-cols-2 grid-rows-2  w-10 mt-auto">
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

      <style jsx>{`
        .clients-marquee-track {
          display: flex;
          width: max-content;
          animation: clients-loop-right 70s linear infinite;
          will-change: transform;
        }

        .clients-fade-left {
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .clients-fade-right {
          background: linear-gradient(
            to left,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        @keyframes clients-loop-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default MainSection5;
