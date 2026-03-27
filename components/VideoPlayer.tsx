"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";


gsap.registerPlugin(ScrollTrigger, useGSAP);

function formatTime(time: number) {
  if (!isFinite(time)) return "00:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

type PortfolioVideoPlayerProps = {
  src: string;
  poster?: string;
  title?: string;
  videoName?: string;
  clientName?: string;
  videoSlug?: string;
};

export default function PortfolioVideoPlayer({
  src,
  poster,
  title = "Project video",
  videoName = "Video Name",
  clientName = "Client",
  videoSlug,
}: PortfolioVideoPlayerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const seekInputRef = useRef<HTMLInputElement | null>(null);
  const timeLabelRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nameAndClientRef =useRef<HTMLDivElement | null> (null);
  const pathname = usePathname();
  const hasStartedRef = useRef(false);
  const hasProgress50Ref = useRef(false);
  const hasCompletedRef = useRef(false);

  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const resolvedVideoSlug = useMemo(() => {
    if (videoSlug && videoSlug.trim()) return videoSlug;
    if (pathname?.startsWith("/work/")) {
      return pathname.replace("/work/", "").split("/")[0] || "unknown";
    }
    return src.split("/").pop()?.split(".")[0] || "unknown";
  }, [videoSlug, pathname, src]);

  const pushVideoEvent = useCallback(
    (eventName: "video_start" | "video_progress" | "video_complete", durationValue?: number) => {
      if (typeof window === "undefined") return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        video_slug: resolvedVideoSlug,
        video_duration:
          Number.isFinite(durationValue) && typeof durationValue === "number"
            ? Math.floor(durationValue)
            : 0,
      });
    },
    [resolvedVideoSlug],
  );

  useEffect(() => {
    hasStartedRef.current = false;
    hasProgress50Ref.current = false;
    hasCompletedRef.current = false;
  }, [src, resolvedVideoSlug]);



  // Animation Part

  useGSAP(()=>{
    if(!wrapperRef.current || ! videoRef.current || !nameAndClientRef.current) return;

    const tl = gsap.timeline();

   tl.fromTo(wrapperRef.current,
  {
    scale: 0.8,
    clipPath: "inset(20% 20% 20% 20%)",
    opacity: 0,
  },
  {
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    duration: 0.8,
    ease: [0.76, 0, 0.24, 1],
  }
).from(nameAndClientRef.current,{
      opacity:0,
      y: 50,
      duration: 0.4,
      ease:[0.76, 0, 0.24, 1],
      delay: 0.3,
      clearProps: "opacity"
    })


      return()=>{
        tl.kill();
      }

  },{scope:wrapperRef, dependencies:[src], revertOnUpdate:true});


  const drawProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration) || video.duration <= 0) return;

    const current = video.currentTime;
    const total = video.duration;
    const ratio = Math.min(Math.max(current / total, 0), 1);
    if (progressRef.current) {
      progressRef.current.max = total;
      progressRef.current.value = current;
    }

    if (seekInputRef.current) {
      seekInputRef.current.max = String(total);
      seekInputRef.current.value = String(current);
    }

    if (timeLabelRef.current) {
      const trackWidth = seekInputRef.current?.clientWidth ?? 0;
      const thumbX = ratio * trackWidth;
      timeLabelRef.current.style.left = `${thumbX}px`;
      timeLabelRef.current.style.transform = "translateX(-50%)";
      timeLabelRef.current.textContent = formatTime(current);
    }
  }, []);

  const stopProgressLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current !== null) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  const scheduleInactivityHide = useCallback(() => {
    clearInactivityTimer();
    inactivityTimerRef.current = setTimeout(() => {
      setIsHover(false);
    }, 3000);
  }, [clearInactivityTimer]);

  const startProgressLoop = useCallback(() => {
    const update = () => {
      const video = videoRef.current;
      if (!video) return;

      drawProgress();

      if (!video.paused && !video.ended) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    stopProgressLoop();
    rafRef.current = requestAnimationFrame(update);
  }, [drawProgress, stopProgressLoop]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      const nextDuration = isFinite(video.duration) ? video.duration : 0;
      setDuration(nextDuration);
      setIsLoaded(true);
      setIsMuted(video.muted);
      drawProgress();
    };

    const onPlay = () => {
      setIsPlaying(true);
      setIsActivated(true);
      setIsHover(true);
      startProgressLoop();
      scheduleInactivityHide();

      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
        pushVideoEvent("video_start", video.duration);
      }
    };

    const onPause = () => {
      setIsPlaying(false);
      clearInactivityTimer();
      setIsHover(true);
      drawProgress();
      stopProgressLoop();
    };

    const onEnded = () => {
      setIsPlaying(false);
      clearInactivityTimer();
      setIsHover(true);
      drawProgress();
      stopProgressLoop();

      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        pushVideoEvent("video_complete", video.duration);
      }
    };

    const onTimeUpdate = () => {
      if (video.paused) drawProgress();

      if (
        !hasProgress50Ref.current &&
        isFinite(video.duration) &&
        video.duration > 0 &&
        video.currentTime / video.duration >= 0.5
      ) {
        hasProgress50Ref.current = true;
        pushVideoEvent("video_progress", video.duration);
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      clearInactivityTimer();
      stopProgressLoop();
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [
    src,
    clearInactivityTimer,
    drawProgress,
    scheduleInactivityHide,
    startProgressLoop,
    stopProgressLoop,
    pushVideoEvent,
  ]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const wrapper = wrapperRef.current;
      const current = document.fullscreenElement;
      if (!wrapper || !current) {
        setIsFullscreen(false);
        return;
      }
      setIsFullscreen(wrapper === current || wrapper.contains(current));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    setIsActivated(true);
    setIsHover(true);

    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch {
      // Ignore play() rejection from browser autoplay policies.
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        void togglePlay();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [togglePlay]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    try {
      if (!document.fullscreenElement) {
        await wrapper.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore fullscreen API rejection.
    }
  }, []);

  const handleClose = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
    } catch {
      // Ignore fullscreen API rejection.
    }

    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/work";
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const nextTime = Number(e.target.value);
    video.currentTime = nextTime;
    setIsActivated(true);
    drawProgress();
  }, [drawProgress]);

  const handlePointerEnter = useCallback(() => {
    setIsHover(true);
    if (isPlaying) scheduleInactivityHide();
  }, [isPlaying, scheduleInactivityHide]);

  const handlePointerMove = useCallback(() => {
    if (!isHover) setIsHover(true);
    if (isPlaying) scheduleInactivityHide();
  }, [isHover, isPlaying, scheduleInactivityHide]);

  const handlePointerLeave = useCallback(() => {
    clearInactivityTimer();
    setIsHover(false);
  }, [clearInactivityTimer]);

  return (
    <section className="z-[100] flex h-screen w-full items-center justify-center  overflow-hidden">
      <div
        ref={wrapperRef}
        className="video_player_wrap relative h-screen w-screen overflow-hidden bg-black"
        data-vimeo-playing={String(isPlaying)}
        data-vimeo-muted={String(isMuted)}
        data-vimeo-hover={String(isHover)}
        data-vimeo-activated={String(isActivated)}
        data-vimeo-loaded={String(isLoaded)}
        data-vimeo-fullscreen={String(isFullscreen)}
        data-vimeo-update-size="cover"
        onMouseEnter={handlePointerEnter}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <video
          ref={videoRef}
          className="video_player_iframe h-full w-full object-contain"
          src={src}
          // poster={poster}
          playsInline
          preload="metadata"
          aria-label={title}
          onClick={togglePlay}
        />

        <div className="video_player_overlay pointer-events-none absolute inset-0 z-10 bg-black/50 transition-opacity duration-300" />

        <button
          type="button"
          onClick={handleClose}
          className="absolute left-6 top-3 z-40 border-0 bg-transparent p-0 text-xs font-semibold uppercase text-white opacity-90 transition-opacity duration-300 ease-in-out hover:opacity-100"
        >
          Close
        </button>

        <div
          data-vimeo-control="play"
          className="video_player_play absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          onClick={togglePlay}
          role="button"
          aria-label="Play video"
        >
          <div className="h-0 w-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-white" />
        </div>

        <div
          data-vimeo-control="pause"
          className="video_player_pause absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          onClick={togglePlay}
          role="button"
          aria-label="Pause video"
        >
          <div className="flex gap-1">
            <span className="block h-6 w-1.5 bg-white" />
            <span className="block h-6 w-1.5 bg-white" />
          </div>
        </div>

        <div  className="video_player_interface absolute inset-x-0 bottom-0 z-20 py-4 lg:bottom-[30vh] font-sans">
          <div ref={nameAndClientRef} className="video_player_interface_layout mx-6 grid grid-cols-5 items-center gap-6">

            <div 
              className={`video_player_content_col col-span-1 justify-self-start text-left text-white transition-opacity duration-150 ${
                isPlaying ? "opacity-0" : "opacity-100"
              }`}
            >
              <h1 className="m-0 p-0 text-2xl font-medium uppercase tracking-tighter">{videoName}</h1>
              <p className="m-0 p-0 text-md font-medium tracking-tight">{clientName}</p>
            </div>

            <div className="video_player_timeline_component relative col-span-3 h-10 w-full min-w-0 justify-self-center overflow-visible">
              <progress
                ref={progressRef}
                max={duration || 0}
                className="video_player_timeline_progress absolute left-0 top-1/2 h-[0.1em] w-full -translate-y-1/2"
              />
              <input
                ref={seekInputRef}
                type="range"
                min={0}
                max={duration || 0}
                step={0.001}
                defaultValue={0}
                onChange={handleSeek}
                className="video_player_timeline_input absolute left-0 top-1/2 h-6 w-full -translate-y-1/2"
                aria-label="Seek video"
              />
              <div className="video_player_timeline_duration pointer-events-none absolute top-[80%] left-0 w-full">
                <span
                  ref={timeLabelRef}
                  className="video_player_timeline_text absolute left-0 whitespace-nowrap text-xs tabular-nums text-white"
                  style={{ transform: "translateX(-50%)" }}
                >
                  00:00
                </span>
              </div>
            </div>

            <div className="video_player_control_wrap col-span-1 justify-self-end grid grid-cols-[4.5rem_auto] items-center gap-3 text-xs font-semibold text-white">
              <div
                data-vimeo-control="mute"
                className="video_player_sound_wrap flex w-full items-center gap-2"
                onClick={toggleMute}
                role="button"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                <div className="video_player_sound_mute flex h-6 w-6 items-center justify-center">
                  <img src="/player/sound-on.svg" alt="" className="video_player_vol_up_svg h-5 w-5" />
                  <img src="/player/sound-off.svg" alt="" className="video_player_vol_mute_svg h-5 w-5" />
                </div>
                <div className="video_player_sound_stat_wrap">
                  <p className="video_player_sound_stat_text">On</p>
                </div>
              </div>

              <button type="button" onClick={toggleFullscreen} className="video_player_screen_text">
                {isFullscreen ? "Normal" : "Full Screen"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
