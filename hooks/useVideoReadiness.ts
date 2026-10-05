"use client";

import { useEffect } from "react";

type VideoRefs = { current: (HTMLVideoElement | null)[] };

type UseVideoReadinessOptions = {
  videoRefs: VideoRefs;
  selectedIndex: number;
  activeVideoSrc: string | undefined;
  onReady: () => void;
};

export function useVideoReadiness({
  videoRefs,
  selectedIndex,
  activeVideoSrc,
  onReady,
}: UseVideoReadinessOptions) {
  useEffect(() => {
    const video = videoRefs.current[selectedIndex];
    if (!video) return;

    let cancelled = false;
    let frameCallbackId: number | null = null;
    let fallbackFrameId: number | null = null;
    let bufferPollId: ReturnType<typeof setInterval> | null = null;
    let frameWaitStarted = false;
    let renderedFrameCount = 0;

    const revealVideo = () => {
      if (cancelled) return;
      onReady();
    };

    const getBufferedSecondsAhead = () => {
      const currentTime = video.currentTime;

      for (let index = 0; index < video.buffered.length; index += 1) {
        const start = video.buffered.start(index);
        const end = video.buffered.end(index);
        if (start <= currentTime + 0.05 && end >= currentTime) return end - currentTime;
      }

      return 0;
    };

    const waitForRenderedFrames = () => {
      if (cancelled || frameWaitStarted) return;
      frameWaitStarted = true;
      if (bufferPollId !== null) {
        clearInterval(bufferPollId);
        bufferPollId = null;
      }

      if (!video.paused && "requestVideoFrameCallback" in video) {
        const handleRenderedFrame = () => {
          if (cancelled) return;
          renderedFrameCount += 1;

          if (renderedFrameCount >= 2) {
            revealVideo();
            return;
          }

          frameCallbackId = video.requestVideoFrameCallback(handleRenderedFrame);
        };

        frameCallbackId = video.requestVideoFrameCallback(handleRenderedFrame);
        return;
      }

      const waitOneMorePaint = () => {
        fallbackFrameId = window.requestAnimationFrame(revealVideo);
      };
      fallbackFrameId = window.requestAnimationFrame(waitOneMorePaint);
    };

    const checkBuffer = () => {
      if (cancelled || frameWaitStarted) return;

      const remainingDuration = Number.isFinite(video.duration)
        ? Math.max(0, video.duration - video.currentTime)
        : 2.5;
      const requiredBuffer = Math.min(2.5, remainingDuration);
      const hasForwardBuffer = getBufferedSecondsAhead() >= requiredBuffer;

      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA && hasForwardBuffer) {
        waitForRenderedFrames();
      }
    };

    bufferPollId = setInterval(checkBuffer, 100);
    checkBuffer();

    return () => {
      cancelled = true;
      if (bufferPollId !== null) clearInterval(bufferPollId);
      if (frameCallbackId !== null && "cancelVideoFrameCallback" in video) {
        video.cancelVideoFrameCallback(frameCallbackId);
      }
      if (fallbackFrameId !== null) window.cancelAnimationFrame(fallbackFrameId);
    };
  }, [activeVideoSrc, onReady, selectedIndex, videoRefs]);
}
