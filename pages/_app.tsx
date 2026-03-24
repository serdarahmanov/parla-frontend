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

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const PAGE_TITLES: Record<string, string> = {
  "/": "Parla",
  "/about": "About | Parla",
  "/work": "Work | Parla",
  "/cookie": "Cookie Policy | Parla",
  "/privacy-policy": "Privacy Policy | Parla",
  "/by-rahmanov": "By Rahmanov | Parla",
};

const resolvePageTitle = (urlOrPath: string) => {
  let path = urlOrPath;
  try {
    path = new URL(urlOrPath, "http://dummy.local").pathname;
  } catch {
    path = urlOrPath.split("?")[0].split("#")[0];
  }
  return PAGE_TITLES[path] || "Parla";
};

export default function App({ Component, pageProps, router }: AppProps) {
  const [pageReady, setPageReady] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add(geist.variable, ibmPlexSans.variable);
    return () => {
      document.body.classList.remove(geist.variable, ibmPlexSans.variable);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.__pageContext = {
      currentPageLocation: window.location.href,
      currentPageReferrer: document.referrer || "",
      currentPageTitle: resolvePageTitle(window.location.pathname),
    };

    const pushPageView = () => {
      window.dataLayer.push({
        event: "page_view",
        page_location: window.__pageContext?.currentPageLocation || window.location.href,
        page_referrer: window.__pageContext?.currentPageReferrer || document.referrer || "",
        page_title:
          window.__pageContext?.currentPageTitle ||
          resolvePageTitle(window.location.pathname),
      });
    };

    pushPageView();

    const handleRouteChangeComplete = () => {
      const previousLocation =
        window.__pageContext?.currentPageLocation || window.location.href;
      window.__pageContext = {
        currentPageLocation: window.location.href,
        currentPageReferrer: previousLocation,
        currentPageTitle: resolvePageTitle(window.location.pathname),
      };
      pushPageView();
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  const handleRevealStart = useCallback(() => {
    setPageReady(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroVisible(false);
  }, []);

  return (
    <div className={cn("m-0 p-0", "font-sans","bg-[#fefefe]", geist.variable)}>
     
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
          <AnimatePresence mode="wait">
            <PageTransition key={router.asPath} introDone={pageReady}>
              <Component {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
