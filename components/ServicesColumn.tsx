"use client";

import { useState } from "react";
import ServiceMenuItem from "@/components/ServiceMenuItem";
import type { ServiceItem } from "@/components/data/services";

type ServicesColumnProps = {
  services: ServiceItem[];
  open: boolean;
  height: string;
};

// Grid row weights rather than per-box heights. With four independently
// height-transitioning boxes, nothing guarantees their animations land in
// sync frame-by-frame — during quick moves between boxes they can drift,
// which is what let the last box's edge creep. `fr` units don't have that
// problem: the browser always divides 100% of the container across the
// rows on every frame, by construction, so the total can never drift.
const BASE_FR = "6fr";
const GROWN_FR = "7fr";
const SHRUNK_FR = "5fr";

export default function ServicesColumn({
  services,
  open,
  height,
}: ServicesColumnProps) {
  // activeIndex is wherever the mouse currently is; shrinkIndex is
  // whichever box the mouse was on right before that. Growing/shrinking
  // tracks movement itself, not a fixed pairing — so the pair in play is
  // always just "where the mouse came from" and "where it went", and
  // every other box is untouched no matter how far into the column you
  // are.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [shrinkIndex, setShrinkIndex] = useState<number | null>(null);

  // A grow with no matching shrink pushes the column's total height past
  // its fixed container — which shifts the top of box 1 / bottom of the
  // last box out of place. That only happens on the very first hover
  // (nothing was active yet to shrink), so it needs a fallback partner:
  // the top box pairs with the one below it, everything else pairs with
  // the one above.
  const fallbackPartner = (index: number) => (index === 0 ? 1 : index - 1);

  const handleEnter = (index: number) => {
    setShrinkIndex(activeIndex === null ? fallbackPartner(index) : activeIndex);
    setActiveIndex(index);
  };

  // Only fires when the mouse leaves the whole column (mouseleave doesn't
  // fire when moving between children of the same parent), so moving
  // between boxes never resets anything mid-flight.
  const handleColumnLeave = () => {
    setActiveIndex(null);
    setShrinkIndex(null);
  };

  const gridTemplateRows = services
    .map((_, index) =>
      activeIndex === index
        ? GROWN_FR
        : shrinkIndex === index
          ? SHRUNK_FR
          : BASE_FR,
    )
    .join(" ");

  return (
    <div
      className="services-column grid flex-1 gap-[var(--pad)]"
      style={{ height, gridTemplateRows }}
      onMouseLeave={handleColumnLeave}
    >
      {services.map((service, index) => (
        <ServiceMenuItem
          key={service.slug}
          service={service}
          open={open}
          index={index}
          onHoverStart={() => handleEnter(index)}
        />
      ))}
    </div>
  );
}
