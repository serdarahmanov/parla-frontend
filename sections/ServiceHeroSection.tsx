import Link from "next/link";
import Paragraph from "@/animations/Paragraph";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

type ServiceHeroSectionProps = {
  title: string;
  text: string;
  image?: string;
};

const ServiceHeroSection = ({ title, text, image }: ServiceHeroSectionProps) => {
  return (
    <section
      className={`header-clearance-top isolate relative flex h-[70vh] w-full flex-col justify-end overflow-hidden pb-8 font-sans md:h-[70vh] md:pb-[5vw] ${
        "text-white"
      }`}
    >
      {image && (
        <>
          <motion.img
            initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
            src={image}
            alt=""
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
        </>
      )}

      <div className="relative z-10 flex w-full flex-col gap-8 px-2 md:grid md:grid-cols-2 md:gap-x-[5vw] md:px-[5vw] md:gap-y-[2vw] lg:gap-x-[5vw] lg:px-[5vw]">
        <div className="md:col-start-1 md:row-start-1  md:grid md:grid-rows-2 md:gap-x-[5vw]  md:gap-y-[2vw] ">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
          <Link
            href="/services"
            className="row-start-2 service-offering-link service-hero-back-link group cta inline-flex w-fit items-center gap-1 rounded-[var(--r-cta)] bg-[#f2f2f2]/50 px-4 py-3 text-[12px] font-normal text-white transition-colors duration-200 md:self-start md:w-fit md:px-[1vw] md:py-[0.75vw] md:text-[1vw] focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-[1.25em] shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-1"
            />
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              View all services
            </span>
          </Link>
          </motion.div>
        </div>
        <div className="w-full md:col-start-2 md:row-start-1 md:grid md:grid-cols-3 md:grid-rows-2 md:gap-x-[2vw] md:gap-y-[2vw]">
        <h1 className="service-page-hero-title max-w-[16ch] font-medium tracking-tighter md:col-span-3 md:col-start-1 md:row-start-1">
          <Paragraph
            as="span"
            className="block"
            text={title}
            isLines
            delay={0.4}
            stagger={0.05}
            revealImmediately
          />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.65, delay: 0.65, ease: [0.32, 0.72, 0, 1] }}
          className="service-page-hero-description hidden max-w-[50ch] opacity-80 md:col-start-2 md:col-span-2 md:row-start-2 md:block lg:pb-1"
        >
          {text}
        </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;
