"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceItem } from "@/components/data/services";

type ServiceMenuItemProps = {
  service: ServiceItem;
  open: boolean;
  index: number;
  onHoverStart: () => void;
};

export default function ServiceMenuItem({
  service,
  open,
  index,
  onHoverStart,
}: ServiceMenuItemProps) {
  return (
    <div
      className="service-item cta rounded-[var(--r-cta)] bg-(--ink)/10"
      onMouseEnter={onHoverStart}
    >
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{
          duration: 0.22,
          ease: [0.32, 0.72, 0, 1],
          delay: open ? index * 0.04 : 0,
        }}
        className="h-full"
      >
        <Link
          href="/services"
          scroll={false}
          className="block px-4 pt-3 pb-3
            text-sm md:text-base lg:text-base font-sans font-extrabold tracking-tight
            text-(--ink)"
        >
          {service.title}
        </Link>
      </motion.div>
    </div>
  );
}
