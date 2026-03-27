import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import PortfolioVideoPlayer from "@/components/VideoPlayer";
import { works, worksBySlug, type WorkItem } from "@/components/data/works";

type WorkPageProps = {
  work: WorkItem;
};

const WorkSlugPage: NextPage<WorkPageProps> = ({ work }) => {
  return (
    <>
      <Head>
        <title>{`${work.clientName} - ${work.videoName} | Parla`}</title>
        <meta
          name="description"
          content={`Watch ${work.videoName} by ${work.clientName}.`}
        />
      </Head>

      <PortfolioVideoPlayer
        key={work.videoSrc}
        src={work.videoSrc}
        poster={work.poster}
        videoName={work.videoName}
        clientName={work.clientName}
        title={`${work.clientName} ${work.videoName}`}
        videoSlug={work.slug}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: works.map((work) => ({
      params: { slug: work.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<WorkPageProps> = async ({ params }) => {
  const slug = params?.slug;

  if (typeof slug !== "string") {
    return { notFound: true };
  }

  const work = worksBySlug[slug];

  if (!work) {
    return { notFound: true };
  }

  return {
    props: { work },
  };
};

export default WorkSlugPage;
