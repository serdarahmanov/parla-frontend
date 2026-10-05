"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRouter } from "next/router"

export default function SmoothScroll() {
  const router = useRouter()

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

    let firstRefreshFrame: number | null = null
    let secondRefreshFrame: number | null = null

    const scheduleRefresh = () => {
      if (firstRefreshFrame !== null) window.cancelAnimationFrame(firstRefreshFrame)
      if (secondRefreshFrame !== null) window.cancelAnimationFrame(secondRefreshFrame)

      firstRefreshFrame = window.requestAnimationFrame(() => {
        firstRefreshFrame = null
        secondRefreshFrame = window.requestAnimationFrame(() => {
          secondRefreshFrame = null
          lenis.resize()
          ScrollTrigger.refresh(true)
        })
      })
    }

    const onScrollToTop = () => {
      ScrollTrigger.clearScrollMemory("manual")
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      lenis.scrollTo(0, { immediate: true, force: true })
      scheduleRefresh()
    }

    const onScrollToPosition = (event: Event) => {
      const detail = (event as CustomEvent<{
        target: HTMLElement
        offset?: number
        onComplete?: () => void
      }>).detail
      if (!detail?.target || !(detail.target instanceof HTMLElement)) return
      lenis.scrollTo(detail.target, {
        offset: detail.offset ?? 0,
        duration: 0.8,
        force: true,
        onComplete: detail.onComplete,
      })
    }

    window.addEventListener("scroll-to-top", onScrollToTop)
    window.addEventListener("parla-scroll-to-position", onScrollToPosition)
    window.addEventListener("parla-layout-change", scheduleRefresh)
    router.events.on("routeChangeComplete", scheduleRefresh)
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
      window.removeEventListener("parla-scroll-to-position", onScrollToPosition)
      window.removeEventListener("parla-layout-change", scheduleRefresh)
      router.events.off("routeChangeComplete", scheduleRefresh)
      if (firstRefreshFrame !== null) window.cancelAnimationFrame(firstRefreshFrame)
      if (secondRefreshFrame !== null) window.cancelAnimationFrame(secondRefreshFrame)
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [router.events])

  return null
}
