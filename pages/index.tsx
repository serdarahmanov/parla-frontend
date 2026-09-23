import type { NextPage } from "next";
import Head from "next/head";
import Home from "../views/HomePage";

const HomePage: NextPage = () => (
  <>
    <Head>
      <title>Parla</title>
      <meta name="description" content="Digital Marketing Agency" />
    </Head>
    <Home />
  </>
);

export default HomePage;
