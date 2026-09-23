"use client";

import Link from "next/link";
import { useRouter } from "next/router";
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
  const { asPath } = useRouter();
  const serviceHref = `/service/${service.slug}`;
  const currentPath = asPath.split("?")[0];
  const isActive =
    currentPath === serviceHref || currentPath.startsWith(`${serviceHref}/`);

  return (
    <Link
      href={serviceHref}
      className={`service-link block h-full${isActive ? " is-active" : ""}`}
    >
      <div
        className={`service-item group relative cta h-full rounded-[var(--r-cta)] bg-(--ink)/10${
          isActive ? " is-active" : ""
        }`}
        onMouseEnter={onHoverStart}
      >
        {service.icon && (
          <img
            src={service.icon}
            alt=""
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-9 -translate-x-1/2 -translate-y-1/2 opacity-50 transition-opacity duration-300 group-hover:opacity-80"
          />
        )}
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
          <span
            className="block px-4 pt-3 pr-14 pb-3
              text-sm md:text-base lg:text-base font-sans font-medium tracking-tight
              text-inherit"
          >
            {service.title}
          </span>
        </motion.div>
      </div>
    </Link>
  );
}
