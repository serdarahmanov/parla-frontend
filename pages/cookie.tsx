import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import CookiePolicy from "../views/CookiePolicyPage";
import type { Media } from "@/payload-types";

type CookiePageProps = {
  seo: {
    title: string;
    description: string;
    image: string | null;
  };
};

const fallbackSeo: CookiePageProps["seo"] = {
  title: "Cookie Policy | Parla",
  description: "Read the Parla cookie policy and review your current cookie consent settings and preferences.",
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

const CookiePage: NextPage<CookiePageProps> = ({ seo }) => (
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
    <CookiePolicy />
  </>
);

export const getStaticProps: GetStaticProps<CookiePageProps> = async ({ locale }) => {
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("../payload.config"),
    ]);
    const payload = await getPayload({ config });
    const privacy = await payload.findGlobal({
      slug: "privacy",
      locale: locale === "en" ? "en" : "tk",
      depth: 1,
    });

    return {
      props: {
        seo: {
          title: privacy.cookieMetaTitle || fallbackSeo.title,
          description: privacy.cookieMetaDescription || fallbackSeo.description,
          image: absoluteMediaUrl(privacy.cookieMetaImage),
        },
      },
      revalidate: 60,
    };
  } catch {
    return { props: { seo: fallbackSeo }, revalidate: 60 };
  }
};

export default CookiePage;
