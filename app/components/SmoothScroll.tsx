"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true
    })

    // Keep ScrollTrigger in sync with Lenis scroll state.
    const onLenisScroll = () => ScrollTrigger.update()
    lenis.on("scroll", onLenisScroll)

    // Run Lenis on GSAP's ticker so both systems share one timing source.
    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off("scroll", onLenisScroll)
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return null
}
