import { Head, Html, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";
import Script from "next/script";
import { consentBridgeScript } from "@/lib/consent/consentBridgeScript";

export default function Document({ __NEXT_DATA__ }: DocumentProps) {
  return (
    <Html lang={__NEXT_DATA__.locale ?? "tk"}>
      <Head>
        <link rel="stylesheet" href="/vendor/klaro.css" />
      </Head>
      <body>
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
          }
          window.scrollTo(0, 0);`}
        </Script>
        <Script id="consent-banner" strategy="beforeInteractive">
          {consentBridgeScript}
        </Script>
        <Script
          id="klaro-config"
          src="/vendor/klaro-config.js"
          strategy="beforeInteractive"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
