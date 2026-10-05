import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import ServiceDetailPage from "@/views/ServiceDetailPage";
import {
  categoryServices,
  categoryServicesBySlug,
  type ServiceItem,
} from "@/components/data/services";

type ServiceSlugPageProps = {
  service: ServiceItem;
};

const ServiceSlugPage: NextPage<ServiceSlugPageProps> = ({ service }) => {
  return (
    <>
      <Head>
        <title>{`${service.title} | Parla`}</title>
        <meta name="description" content={service.text} />
      </Head>

      <ServiceDetailPage key={service.slug} service={service} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const supportedLocales = locales ?? ["tk", "en"];

  return {
    paths: supportedLocales.flatMap((locale) =>
      categoryServices.map((service) => ({
        params: { slug: service.slug },
        locale,
      })),
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ServiceSlugPageProps> = async ({ params }) => {
  const slug = params?.slug;

  if (typeof slug !== "string") {
    return { notFound: true };
  }

  const service = categoryServicesBySlug[slug];

  if (!service) {
    return { notFound: true };
  }

  return {
    props: { service },
  };
};

export default ServiceSlugPage;
