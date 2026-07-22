import type { NextPage } from "next";
import Head from "next/head";
import Home from "../views/HomePage";

type HomePageProps = {
  introDone?: boolean;
};

const HomePage: NextPage<HomePageProps> = ({ introDone }) => (
  <>
    <Head>
      <title>Parla</title>
      <meta name="description" content="Digital Marketing Agency" />
    </Head>
    <Home introDone={introDone} />
  </>
);

export default HomePage;
