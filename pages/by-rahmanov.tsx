import type { NextPage } from "next";
import Head from "next/head";
import ByRahmanov from "../views/ByRahmanovPage";

const ByRahmanovPage: NextPage = () => (
  <>
    <Head>
      <title>By Rahmanov | Parla</title>
      <meta
        name="description"
        content="Read the story behind the Parla website build, development process, and project notes by Rahmanov."
      />
    </Head>
    <ByRahmanov />
  </>
);

export default ByRahmanovPage;
