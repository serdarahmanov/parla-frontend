import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ServiceHeroSection from "@/sections/ServiceHeroSection";
import {
  services,
  servicesBySlug,
  slugifyOffering,
  type ServiceItem,
} from "@/components/data/services";

type OfferingPageProps = {
  service: ServiceItem;
  offering: string;
};

const OfferingPage: NextPage<OfferingPageProps> = ({ service, offering }) => {
  return (
    <>
      <Head>
        <title>{`${offering} | ${service.title} | Parla`}</title>
        <meta name="description" content={`${offering} services by Parla.`} />
      </Head>

      <div className="w-full font-sans">
        <ServiceHeroSection
          title={offering}
          text={service.text}
          image={service.image}
        />

        <div className="px-8 pt-[2vw] md:px-[5vw]">
          <Link
            href={`/service/${service.slug}`}
            className="cta inline-flex h-[var(--cta-h)] items-center rounded-[var(--r-cta)] px-4 font-semibold text-black transition-colors hover:bg-(--ink) hover:text-white"
          >
            &larr; {service.title}
          </Link>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: services.flatMap((service) =>
    (service.offerings ?? []).map((offering) => ({
      params: {
        slug: service.slug,
        offering: slugifyOffering(offering),
      },
    })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<OfferingPageProps> = async ({ params }) => {
  const slug = params?.slug;
  const offeringSlug = params?.offering;

  if (typeof slug !== "string" || typeof offeringSlug !== "string") {
    return { notFound: true };
  }

  const service = servicesBySlug[slug];
  const offering = service?.offerings?.find(
    (item) => slugifyOffering(item) === offeringSlug,
  );

  if (!service || !offering) {
    return { notFound: true };
  }

  return { props: { service, offering } };
};

export default OfferingPage;
