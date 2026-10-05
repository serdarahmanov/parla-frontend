import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import About from "../views/AboutPage";
import type { Media } from "@/payload-types";

type AboutPageProps = {
  seo: {
    title: string;
    description: string;
    image: string | null;
  };
};

const fallbackSeo: AboutPageProps["seo"] = {
  title: "About | Parla",
  description: "Learn how Parla helps brands grow through strategy, creative direction, production planning, and long-term content systems.",
  image: null,
};

const absoluteMediaUrl = (value: number | Media | null | undefined) => {
  const url = value && typeof value === "object" ? value.url : null;
  if (!url) return null;

  try {
    return new URL(url, process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").toString();
  } catch {
    return url;
  }
};

const AboutPage: NextPage<AboutPageProps> = ({ seo }) => (
  <>
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta name="twitter:card" content={seo.image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Head>
    <About />
  </>
);

export const getStaticProps: GetStaticProps<AboutPageProps> = async ({ locale }) => {
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("../payload.config"),
    ]);
    const payload = await getPayload({ config });
    const intro = await payload.findGlobal({
      slug: "about-intro",
      locale: locale === "en" ? "en" : "tk",
      depth: 1,
    });

    return {
      props: {
        seo: {
          title: intro.metaTitle || fallbackSeo.title,
          description: intro.metaDescription || fallbackSeo.description,
          image: absoluteMediaUrl(intro.metaImage),
        },
      },
      revalidate: 60,
    };
  } catch {
    return { props: { seo: fallbackSeo }, revalidate: 60 };
  }
};

export default AboutPage;
