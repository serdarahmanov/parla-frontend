import type { AppProps } from "next/app";
import { IBM_Plex_Sans, Geist } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

import "../styles/globals.css";
import "@/components/PageTransition/page-transition.css";
import SmoothScroll from "../components/SmoothScroll";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition/PageTransition";
import LandingIntro from "@/components/LandingIntro";
import { useCallback, useEffect, useState } from "react";
import ConsentScripts from "@/components/Consent/ConsentScripts";
import { useEngagementTracking } from "@/components/analytics/useEngagementTracking";
import { useScrollTacking } from "@/components/analytics/useScrollTracking";
import { usePageViewTracking } from "@/components/analytics/usePageViewTracking";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});



export default function App({ Component, pageProps, router }: AppProps) {
  const [pageReady, setPageReady] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const enableScrollTracking = router.pathname ==="/"|| router.pathname==="/work";
  const engagement = useEngagementTracking();
  usePageViewTracking(router);

  
  useScrollTacking({enabled:enableScrollTracking, getEngagementTimeMs:engagement.getEngagementTimeMs });

  useEffect(() => {
    document.body.classList.add(geist.variable, ibmPlexSans.variable);
    return () => {
      document.body.classList.remove(geist.variable, ibmPlexSans.variable);
    };
  }, []);

  

  const handleRevealStart = useCallback(() => {
    setPageReady(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroVisible(false);
  }, []);

  return (
    <div className={cn("m-0 p-0", "font-sans", "bg-[#fefefe]", geist.variable)}>
      <ConsentScripts />
      <div
        className={`${ibmPlexSans.className} relative p-0 m-0 min-h-screen bg-[#fefefe] text-black`}
      >
        <SmoothScroll />
        <Toaster richColors position="top-right" />
        <main className="p-0 m-0 min-h-full w-full relative">
          {introVisible && (
            <LandingIntro
              onRevealStart={handleRevealStart}
              onComplete={handleIntroComplete}
            />
          )}
          <AnimatePresence mode="wait"
          onExitComplete={() => {                                                                                                                                                                                                           
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });                                                                                                                                                                         
    }}
    >
            <PageTransition key={router.asPath} introDone={pageReady}>
              <Component {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
