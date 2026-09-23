import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

import "../styles/globals.css";
import SmoothScroll from "../components/SmoothScroll";
import ScrollReset from "../components/ScrollReset";
import { PageEntryProvider } from "../components/PageEntryProvider";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import LandingIntro from "@/components/LandingIntro";
import { useCallback, useEffect, useState } from "react";
import ConsentScripts from "@/components/Consent/ConsentScripts";
import { useEngagementTracking } from "@/components/analytics/useEngagementTracking";
import { useScrollTacking } from "@/components/analytics/useScrollTracking";
import { usePageViewTracking } from "@/components/analytics/usePageViewTracking";

const geist = localFont({
  src: "../public/font/geist/geist-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-sans",
});

const suisseWorks = localFont({
  variable: "--font-suisse-works",
  src: [
    {
      path: "../public/font/suisse-font-family/SuisseWorksTrial-Book.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/suisse-font-family/SuisseWorksTrial-BookItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/font/suisse-font-family/SuisseWorksTrial-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/suisse-font-family/SuisseWorksTrial-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/font/suisse-font-family/SuisseWorksTrial-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/suisse-font-family/SuisseWorksTrial-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/font/suisse-font-family/SuisseWorksTrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/suisse-font-family/SuisseWorksTrial-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
});



export default function App({ Component, pageProps, router }: AppProps) {
  const [pageReady, setPageReady] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const enableScrollTracking = router.pathname ==="/"|| router.pathname==="/work";
  const engagement = useEngagementTracking();
  usePageViewTracking(router);

  
  useScrollTacking({enabled:enableScrollTracking, getEngagementTimeMs:engagement.getEngagementTimeMs });

  useEffect(() => {
    document.body.classList.add(geist.variable, suisseWorks.variable);
    return () => {
      document.body.classList.remove(geist.variable, suisseWorks.variable);
    };
  }, []);

  const handleRevealStart = useCallback(() => {
    setPageReady(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroVisible(false);
  }, []);

  return (
    <PageEntryProvider landingActive={introVisible}>
      <div className={cn("site-shell m-0 p-0", "font-sans", geist.variable)}>
        <ConsentScripts />
        <div
          className="site-shell-inner relative p-0 m-0 min-h-screen text-black"
        >
          <SmoothScroll />
          <ScrollReset />
          <Toaster richColors position="top-right" />
          <main className="site-main p-0 m-0 min-h-full w-full relative">
            {introVisible && (
              <LandingIntro
                onRevealStart={handleRevealStart}
                onComplete={handleIntroComplete}
              />
            )}
            <SiteHeader introDone={pageReady} />
            <Component {...pageProps} introDone={!introVisible} />
            {!router.pathname.startsWith("/work/") && <Footer />}
          </main>
        </div>
      </div>
    </PageEntryProvider>
  );
}
