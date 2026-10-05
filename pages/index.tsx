import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Home, { type HomeBrandStatementData } from "../views/HomePage";
import type { Media } from "@/payload-types";

type HomePageProps = {
  brandStatement: HomeBrandStatementData;
  seo: HomeSeoData;
};

type HomeSeoData = {
  title: string;
  description: string;
  image: string | null;
};

const fallbackBrandStatement: HomeBrandStatementData = {
  statement: "WE BUILD BRANDS",
  marqueeText: "Parla is a production and software studio. We combine established production expertise with new digital capabilities.",
  desktop: { coverImage: null, video: null },
  mobile: { coverImage: null, video: null },
};

const fallbackSeo: HomeSeoData = {
  title: "Parla",
  description: "Digital Marketing Agency",
  image: null,
};

const mediaDetails = (value: number | Media | null | undefined) =>
  value && typeof value === "object" && value.url
    ? { src: value.url, alt: value.alt }
    : null;

const mediaUrl = (value: number | Media | null | undefined) =>
  value && typeof value === "object" ? value.url ?? null : null;

const absoluteMediaUrl = (value: number | Media | null | undefined) => {
  const url = mediaUrl(value);
  if (!url) return null;

  try {
    return new URL(url, process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").toString();
  } catch {
    return url;
  }
};

const HomePage: NextPage<HomePageProps> = ({ brandStatement, seo }) => (
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
    <Home brandStatement={brandStatement} />
  </>
);

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("../payload.config"),
    ]);
    const payload = await getPayload({ config });
    const activeLocale = locale === "en" ? "en" : "tk";
    const [brandContent, heroContent] = await Promise.all([
      payload.findGlobal({
        slug: "home-brand-statement",
        locale: activeLocale,
        depth: 1,
      }),
      payload.findGlobal({
        slug: "home-hero",
        locale: activeLocale,
        depth: 1,
      }),
    ]);

    return {
      props: {
        brandStatement: {
          statement: brandContent.statement || fallbackBrandStatement.statement,
          marqueeText: brandContent.marqueeText || fallbackBrandStatement.marqueeText,
          desktop: {
            coverImage: mediaDetails(brandContent.desktopCoverImage),
            video: mediaUrl(brandContent.desktopVideo),
          },
          mobile: {
            coverImage: mediaDetails(brandContent.mobileCoverImage),
            video: mediaUrl(brandContent.mobileVideo),
          },
        },
        seo: {
          title: heroContent.metaTitle || fallbackSeo.title,
          description: heroContent.metaDescription || fallbackSeo.description,
          image: absoluteMediaUrl(heroContent.metaImage),
        },
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: { brandStatement: fallbackBrandStatement, seo: fallbackSeo },
      revalidate: 60,
    };
  }
};

export default HomePage;
