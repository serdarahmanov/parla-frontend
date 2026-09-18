import ServiceHeroSection from "@/sections/ServiceHeroSection";
import Paragraph from "@/animations/Paragraph";
import { slugifyOffering, type ServiceItem } from "@/components/data/services";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";

type ServiceDetailPageProps = {
  service: ServiceItem;
};

const ecommerceLead =
  "We create online stores that don't just showcase products — they drive conversions and build lasting customer relationships.";
const ecommerceLeadHighlightWords = 9;

function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const leadWords = (service.description ?? ecommerceLead).split(" ");
  const leadHighlightWords = service.description
    ? Math.ceil(leadWords.length / 2)
    : ecommerceLeadHighlightWords;
  const processScrollerRef = useRef<HTMLOListElement>(null);
  const processDragRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const [processIndex, setProcessIndex] = useState(0);
  const processSteps = service.process ?? [];

  const handleProcessPointerDown = (event: PointerEvent<HTMLOListElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const scroller = processScrollerRef.current;
    if (!scroller) return;

    processDragRef.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: scroller.scrollLeft,
    };
    scroller.setPointerCapture(event.pointerId);
    scroller.classList.add("is-dragging");
    event.preventDefault();
  };

  const handleProcessPointerMove = (event: PointerEvent<HTMLOListElement>) => {
    const drag = processDragRef.current;
    const scroller = processScrollerRef.current;
    if (!drag.isDragging || !scroller) return;

    scroller.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX);
    event.preventDefault();
  };

  const handleProcessPointerEnd = (event: PointerEvent<HTMLOListElement>) => {
    const scroller = processScrollerRef.current;
    if (!processDragRef.current.isDragging || !scroller) return;

    processDragRef.current.isDragging = false;
    const closestStep = Array.from(scroller.children).reduce<HTMLElement | null>(
      (closest, child) => {
        const candidate = child as HTMLElement;
        if (!closest) return candidate;
        return Math.abs(candidate.offsetLeft - scroller.scrollLeft) <
          Math.abs(closest.offsetLeft - scroller.scrollLeft)
          ? candidate
          : closest;
      },
      null,
    );

    if (closestStep) {
      scroller.scrollTo({ left: closestStep.offsetLeft, behavior: "smooth" });
    }
    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    scroller.classList.remove("is-dragging");
  };

  const handleProcessScroll = () => {
    const scroller = processScrollerRef.current;
    if (!scroller || processSteps.length === 0) return;

    let closestIndex = 0;
    let closestDistance = Infinity;
    Array.from(scroller.children).forEach((child, index) => {
      const distance = Math.abs((child as HTMLElement).offsetLeft - scroller.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setProcessIndex(closestIndex);
  };

  return (
    <div className="w-full font-sans">
      <ServiceHeroSection
        title={service.title}
        text={service.text}
        image={service.image}
      />

      {service.description && (
        <>
          <section className="service-page-intro grid grid-cols-1 gap-12 px-2 py-8 font-sans md:grid-cols-2 md:gap-0 md:px-[5vw] md:py-[4.5vw] lg:gap-0 lg:px-[5vw]">
            <div className="@container min-w-0 md:pr-[7vw] lg:pr-[7vw]">
              <p className="service-page-intro-lead font-medium tracking-tighter [word-spacing:0.12em] ">
                <Paragraph
                  as="span"
                  className="block"
                  text={leadWords.slice(0, leadHighlightWords).join(" ")}
                  isLines
                  delay={0.4}
                  revealImmediately
                />{" "}
                <Paragraph
                  as="span"
                  className="block opacity-35"
                  text={leadWords.slice(leadHighlightWords).join(" ")}
                  isLines
                  delay={0.5}
                  revealImmediately
                />
              </p>
            </div>
            <div className="@container min-w-0">
              <Paragraph
                className="service-page-intro-description opacity-35 lg:pt-1"
                text={service.description}
                isLines
                delay={0.6}
                revealImmediately
              />
            </div>
          </section>

          <div className="flex flex-col gap-16 md:gap-0 md:pb-[5vw]">
          <section className="px-2 pt-8 font-sans md:px-[5vw] md:pt-[5vw]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.35, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="service-page-section-title font-medium uppercase leading-none tracking-tighter opacity-35"
              >
                What we do
              </motion.h2>
              <ul className="service-page-offering-list grid grid-cols-1 gap-3">
                {service.offerings?.map((offering, index) => {
                  const offeringSlug = slugifyOffering(offering);

                  return (
                    <motion.li
                      key={offering}
                      id={offeringSlug}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.55, delay: 0.6 + index * 0.06, ease: [0.32, 0.72, 0, 1] }}
                    >
                      <Link
                        href={`/service/${service.slug}/${offeringSlug}`}
                        scroll={false}
                        className="service-offering-link group cta flex w-full items-center justify-between rounded-[var(--r-cta)] bg-(--ink)/5 px-4 py-3 text-black transition-colors hover:bg-(--ink) hover:text-white"
                      >
                        <span className="transition-transform duration-200 group-hover:translate-x-2">
                          {offering}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-[1.25em] shrink-0 transition-colors transition-transform duration-300 ease-out group-hover:-translate-x-2 group-hover:text-[#FDB813]"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section className="px-2 font-sans md:px-[5vw] md:pt-[12vw]">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 0.35, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="service-page-section-title font-medium uppercase leading-none tracking-tighter opacity-35"
            >
              Our process
            </motion.h2>
            <ol
              ref={processScrollerRef}
              onScroll={handleProcessScroll}
              onPointerDown={handleProcessPointerDown}
              onPointerMove={handleProcessPointerMove}
              onPointerUp={handleProcessPointerEnd}
              onPointerCancel={handleProcessPointerEnd}
              className="process-scroller mt-8 flex w-full cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth select-none [touch-action:pan-x] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-[2vw] md:grid md:cursor-default md:grid-cols-4 md:gap-[1vw] md:overflow-visible"
            >
              {processSteps.map((step, index) => (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
                  className="process-card cta flex aspect-[4/3] min-w-full snap-center flex-col justify-between gap-8 rounded-[var(--r-cta)] bg-(--ink)/5 p-6 md:min-w-0 md:gap-[2vw] md:p-[2vw]"
                >
                  <div className="flex items-baseline justify-between gap-4 md:block">
                    <h3 className="service-page-process-title leading-none tracking-tighter md:text-[1.5vw]">
                      {step.title}
                    </h3>
                    <span className="process-step-number text-sm opacity-35 md:mt-[2vw] md:block md:text-[1vw]">
                      {step.number}
                    </span>
                  </div>
                  <p className="service-page-process-description">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </ol>
            <div className="mt-4 flex items-center justify-center gap-2 md:hidden" aria-label="Process step position">
              {processSteps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Process step ${index + 1}`}
                  onClick={() => {
                    const scroller = processScrollerRef.current;
                    const step = scroller?.children[index] as HTMLElement | undefined;
                    if (!scroller || !step) return;
                    scroller.scrollTo({ left: step.offsetLeft, behavior: "smooth" });
                    setProcessIndex(index);
                  }}
                  className={`process-progress-indicator rounded-full transition-all duration-300 ${
                    index === processIndex ? "is-active" : ""
                  } ${
                    index === processIndex ? "h-[4px] w-6 bg-black" : "h-[4px] w-[4px] bg-black/25"
                  }`}
                />
              ))}
            </div>
          </section>
          </div>
        </>
      )}
    </div>
  );
}

export default ServiceDetailPage;
