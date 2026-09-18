import type { NextPage } from "next";
import Head from "next/head";
import Services from "../views/ServicesPage";

const ServicesPage: NextPage = () => (
  <>
    <Head>
      <title>Services | Parla</title>
      <meta
        name="description"
        content="Marketing and creative direction, production management, music distribution, web and mobile applications, eCommerce, SAAS platforms, AI-generated content, and interior/exterior architecture design from Parla."
      />
    </Head>
    <Services />
  </>
);

export default ServicesPage;
