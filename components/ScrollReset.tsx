"use client";

import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export default function ScrollReset() {
  const router = useRouter();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let frameId: number | null = null;
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.dispatchEvent(new CustomEvent("scroll-to-top"));
    };

    const handlePageShow = () => {
      scrollToTop();
      frameId = window.requestAnimationFrame(scrollToTop);
    };

    scrollToTop();
    frameId = window.requestAnimationFrame(scrollToTop);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [router.asPath]);

  return null;
}
