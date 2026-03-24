import type { NextPage } from "next";
import Head from "next/head";
import About from "../views/AboutPage";

const AboutPage: NextPage = () => (
  <>
    <Head>
      <title>About | Parla</title>
      <meta
        name="description"
        content="Learn how Parla helps brands grow through strategy, creative direction, production planning, and long-term content systems."
      />
    </Head>
    <About />
  </>
);

export default AboutPage;
