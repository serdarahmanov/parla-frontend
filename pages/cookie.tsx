import type { NextPage } from "next";
import Head from "next/head";
import CookiePolicy from "../views/CookiePolicyPage";

const CookiePage: NextPage = () => (
  <>
    <Head>
      <title>Cookie Policy | Parla</title>
      <meta
        name="description"
        content="Read the Parla cookie policy and review your current cookie consent settings and preferences."
      />
    </Head>
    <CookiePolicy />
  </>
);

export default CookiePage;
