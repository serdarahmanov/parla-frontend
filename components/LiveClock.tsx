"use client";
import React from 'react'
import { useEffect, useState, useMemo } from "react";

type Props = {
    className: string,
}

const LiveClock = ({className}:Props) => {

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
    <div className='relative'>
       
          <div className={className} >{time} GTM+5</div>
        
    </div>
  )
}

export default LiveClock
