"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";


type Props ={
    enabled?: boolean
     getEngagementTimeMs?: () => number
}

export function useScrollTacking(options:Props ={} ) {
  const pathname = usePathname();
const { enabled = false, getEngagementTimeMs } = options;

 



  const hasFiredRef = useRef(false);


  useEffect(() => {
    if(!enabled) return;
        hasFiredRef.current = false;

    const handleScroll = () => {
      if (hasFiredRef.current) return;
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const percent = (scrollTop + viewportHeight) / docHeight;

      if (percent >= 0.9) {
        hasFiredRef.current = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "scroll_depth",
          scroll_percent: 90,
          engagement_time_msec: getEngagementTimeMs?.() ,
          page_location: window.__pageContext?.currentPageLocation,
          page_referrer: window.__pageContext?.currentPageReferrer,
          page_title: window.__pageContext?.currentPageTitle,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, {passive:true});

    return ()=>{ window.removeEventListener("scroll",handleScroll)}


  }, [pathname,enabled,getEngagementTimeMs]);
}
