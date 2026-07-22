import type { NextPage } from "next";
import Head from "next/head";
import Services from "../views/ServicesPage";

const ServicesPage: NextPage = () => (
  <>
    <Head>
      <title>Services | Parla</title>
      <meta
        name="description"
        content="Brand strategy, content strategy, creative direction, production, and ongoing marketing support from Parla."
      />
    </Head>
    <Services />
  </>
);

export default ServicesPage;
