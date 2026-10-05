import React, { forwardRef, useId } from "react";

export type ParlaIconPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type ParlaIconTone = "solid" | "footer-dark" | "footer-lit";

type ParlaIconProps = React.SVGProps<SVGSVGElement> & {
  position?: ParlaIconPosition;
  tone?: ParlaIconTone;
};

const VIEWBOX_WIDTH = 569.79;
const VIEWBOX_HEIGHT = 698.76;
const PATH = "M70.65,0H0v698.76h143.29c235.55,0,426.5-190.95,426.5-426.5V0H70.65Z";

const transforms: Record<ParlaIconPosition, string> = {
  "top-left": "",
  "top-right": `translate(${VIEWBOX_WIDTH} 0) scale(-1 1)`,
  "bottom-left": `translate(0 ${VIEWBOX_HEIGHT}) scale(1 -1)`,
  "bottom-right": `translate(${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}) scale(-1 -1)`,
};

const toneConfig: Record<ParlaIconTone, { from?: string; to?: string; noise?: number }> = {
  solid: {},
  "footer-dark": { from: "#0d0d0d", to: "#050505", noise: 0.03 },
  "footer-lit": { from: "#313131", to: "#141414", noise: 0.06 },
};

const ParlaIcon = forwardRef<SVGSVGElement, ParlaIconProps>(function ParlaIcon(
  { position = "top-left", tone = "solid", fill = "currentColor", ...props },
  ref,
) {
  const id = useId().replace(/:/g, "");
  const config = toneConfig[tone];
  const gradientId = `${id}-gradient`;
  const clipId = `${id}-clip`;
  const noiseId = `${id}-noise`;
  const fillValue = tone === "solid" ? fill : `url(#${gradientId})`;

  return (
    <svg ref={ref} viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} {...props}>
      {tone !== "solid" ? (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={config.from} />
            <stop offset="1" stopColor={config.to} />
          </linearGradient>
          <clipPath id={clipId}><path d={PATH} /></clipPath>
          <filter id={noiseId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="1" seed="7" stitchTiles="stitch" />
            <feColorMatrix values="1 1 1 0 -1  1 1 1 0 -1  1 1 1 0 -1  0 0 0 0 1" />
          </filter>
        </defs>
      ) : null}
      <g transform={transforms[position]}>
        <path fill={fillValue} d={PATH} />
        {tone !== "solid" ? (
          <g clipPath={`url(#${clipId})`}>
            <rect width="100%" height="100%" filter={`url(#${noiseId})`} opacity={config.noise} />
          </g>
        ) : null}
      </g>
    </svg>
  );
});

ParlaIcon.displayName = "ParlaIcon";

export default ParlaIcon;
