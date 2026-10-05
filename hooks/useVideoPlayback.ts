"use client";

import { useEffect, useRef } from "react";

type VideoRefs = { current: (HTMLVideoElement | null)[] };

type UseVideoPlaybackOptions = {
  videoRefs: VideoRefs;
  selectedIndex: number;
  shouldPlay: boolean;
  isMuted: boolean;
  onPlaybackError?: () => void;
};

export function useVideoPlayback({
  videoRefs,
  selectedIndex,
  shouldPlay,
  isMuted,
  onPlaybackError,
}: UseVideoPlaybackOptions) {
  const previousSelectedIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const previousIndex = previousSelectedIndexRef.current;
    const previousVideo = previousIndex !== null ? videoRefs.current[previousIndex] : null;
    const currentVideo = videoRefs.current[selectedIndex];

    if (previousVideo && previousIndex !== selectedIndex) {
      previousVideo.pause();
    }

    if (currentVideo) {
      currentVideo.muted = isMuted;

      if (shouldPlay) {
        void currentVideo.play().catch(() => onPlaybackError?.());
      } else {
        currentVideo.pause();
      }
    }

    previousSelectedIndexRef.current = selectedIndex;
  }, [isMuted, onPlaybackError, selectedIndex, shouldPlay, videoRefs]);
}
