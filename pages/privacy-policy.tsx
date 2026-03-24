import type { NextPage } from "next";
import Head from "next/head";
import PrivacyPolicy from "../views/PrivacyPolicy";

const PrivacyPolicyPage: NextPage = () => (
  <>
    <Head>
      <title>Privacy Policy | Parla</title>
      <meta
        name="description"
        content="Read the Parla privacy policy to understand how personal data is collected, used, and protected."
      />
    </Head>
    <PrivacyPolicy />
  </>
);

export default PrivacyPolicyPage;
