"use client";
import React from "react";
import { ContactForm } from "../components/ContactForm";
import Paragraph from "../animations/Paragraph";
import { useEffect, useState, useMemo } from "react";

function Contact() {
  const [now, setNow] = useState<Date | null>(null);

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Ashgabat",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const time = now ? timeFormatter.format(now) : "00:00:00";

  return (
    <div className=" pt-50  px-6 py-20 grid  grid-cols-4 lg:grid-cols-12 bg-white h-screen ">
      <div
        className="
        col-start-2  col-span-3
        lg:col-start-4 lg:col-span-3 flex flex-col gap-4 mr-1.5 lg:mb-0"
      >
        <div>
          <h1 className="text-[1rem] font-bold opacity-50 ">Office</h1>
          <Paragraph
            delay={0.5}
            stagger={0.05}
            text="Studio G6, Gate 1, Victoria Junction, Prestwich St, Greenpoint, Cape Town"
            isLines
          />
        </div>

        <div>+(993) 61 0608 03</div>

        <div className="flex flex-row gap-3 items-baseline mt-5">
          <div className="font-medium text-xs">{time} GTM+5</div>
        </div>
      </div>

      <div
        className=" mt-7
        col-start-2  col-span-3
        lg:col-span-4 lg:col-start-8 lg:mt-0 "
      >
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;
