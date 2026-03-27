import type { NextPage } from "next";
import Head from "next/head";
import Work from "@/views/WorkPage";

const WorkPage: NextPage = () => (
  <>
    <Head>
      <title>Work | Parla</title>
      <meta
        name="description"
        content="Explore selected Parla projects, creative productions, and client work across campaigns and content."
      />
    </Head>
    <Work />
  </>
);

export default WorkPage;
