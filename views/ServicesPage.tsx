import Link from "next/link";
import Image from "next/image";
import Paragraph from "../animations/Paragraph";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  serviceCategories,
  servicesBySlug,
} from "@/components/data/services";

const servicePageCategories = [
  serviceCategories[0],
  serviceCategories[2],
  serviceCategories[1],
  serviceCategories[3],
];

function Services() {
  return (
    <div className="services-page header-clearance-top relative min-h-[100svh] w-full px-6 pb-[20vh] font-sans md:pb-[25vh]">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
        className="services-page-title mt-4 pb-[3rem] font-sans text-[1.5rem] font-bold opacity-50"
      >
        What We Do
      </motion.h1>

      <div className="services-page-category-grid">
        {servicePageCategories.map((category, categoryIndex) => (
          <motion.section
            key={category.slug}
            aria-labelledby={`service-category-${category.slug}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2 + categoryIndex * 0.1,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="services-page-category-card"
          >
            <header className="services-page-category-header">
              <h2 id={`service-category-${category.slug}`}>
                <Link
                  href={`/service/${category.slug}`}
                  className="group inline-flex items-center gap-2"
                >
                  {category.title}
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2 + categoryIndex * 0.1,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                      aria-hidden="true"
                      className="inline-flex shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-(--color-ce-primary)"
                    >
                      <ArrowUpRight className="size-[0.9em]" />
                    </motion.span>
                </Link>
              </h2>
              <Image
                src={category.icon}
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className="services-page-category-icon"
              />
            </header>

            <div className="services-page-category-services">
              {category.serviceSlugs.map((serviceSlug, serviceIndex) => {
                const service = servicesBySlug[serviceSlug];
                const animationDelay = 0.2 + categoryIndex * 0.08 + serviceIndex * 0.03;

                return (
                  <Link
                    key={service.slug}
                    href={`/service/${category.slug}#${service.slug}`}
                    id={service.slug}
                    className="services-page-category-link group scroll-mt-[var(--header-clearance)]"
                  >
                    <div className="services-page-service-title flex items-start justify-start gap-2 text-lg font-semibold tracking-tight">
                      <Paragraph
                        text={service.title}
                        isLines
                        delay={animationDelay}
                        revealImmediately
                      />
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 1,
                          delay: animationDelay,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                        aria-hidden="true"
                        className="mt-[0.1em] inline-flex shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-(--color-ce-primary)"
                      >
                        <ArrowUpRight className="size-[1em]" />
                      </motion.span>
                    </div>
                    <div className="services-page-service-description max-w-[48ch] text-sm font-normal opacity-70">
                      <Paragraph
                        text={service.text}
                        isLines
                        delay={animationDelay + 0.05}
                        revealImmediately
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

export default Services;
