import Link from "next/link";
import Paragraph from "../animations/Paragraph";
import { services } from "@/components/data/services";

function Services() {
  return (
    <div className="services-page header-clearance-top relative pb-25 px-6 w-full font-sans">
      <h1 className="services-page-title text-4xl font-medium pb-[3rem] font-sans">
        What We Do
      </h1>

      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
        {services.map((service, index) => (
          <Link
            key={service.slug}
            href={`/service/${service.slug}`}
            id={service.slug}
            className="flex flex-col gap-2 scroll-mt-[var(--header-clearance)]"
          >
            <h2 className="services-page-number text-xs font-bold opacity-50">
              {String(index + 1).padStart(2, "0")}
            </h2>
            <div className="services-page-service-title text-lg font-semibold tracking-tight">
              <Paragraph text={service.title} isLines delay={0.2 + index * 0.03} />
            </div>
            <div className="services-page-service-description text-sm font-normal opacity-70 max-w-[40ch]">
              <Paragraph text={service.text} isLines delay={0.25 + index * 0.03} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Services;
