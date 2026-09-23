"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.clearScrollMemory("manual")
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true
    })

    // Keep ScrollTrigger in sync with Lenis scroll state.
    const onLenisScroll = () => ScrollTrigger.update()
    lenis.on("scroll", onLenisScroll)

    const onScrollToTop = () => {
      ScrollTrigger.clearScrollMemory("manual")
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      lenis.scrollTo(0, { immediate: true, force: true })
      window.requestAnimationFrame(() => {
        lenis.resize()
        ScrollTrigger.refresh(true)
      })
    }
    window.addEventListener("scroll-to-top", onScrollToTop)
    onScrollToTop()

    // Run Lenis on GSAP's ticker so both systems share one timing source.
    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off("scroll", onLenisScroll)
      window.removeEventListener("scroll-to-top", onScrollToTop)
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return null
}
