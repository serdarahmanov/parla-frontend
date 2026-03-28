"use client";

import { useEffect, useState } from "react";

type ScreenFlags = {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
};

export default function useScreenFlag(): ScreenFlags {
  const [isSmall, setIsSmall] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setIsLarge(true);
        setIsMedium(false);
        setIsSmall(false);
        return;
      }

      if (width >= 768) {
        setIsLarge(false);
        setIsMedium(true);
        setIsSmall(false);
        return;
      }

      setIsLarge(false);
      setIsMedium(false);
      setIsSmall(true);
    };

    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return { isSmall, isMedium, isLarge };
}
