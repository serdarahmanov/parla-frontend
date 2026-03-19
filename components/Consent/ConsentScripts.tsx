import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID } from "@/lib/consent/config";
import { consentBridgeScript } from "@/lib/consent/consentBridgeScript";

export default function ConsentScripts() {
  return (
    <>
      <Script id="consent-banner" strategy="beforeInteractive">
        {consentBridgeScript}
      </Script>
      <Script src="/vendor/klaro-config.js" strategy="beforeInteractive" />
      <GoogleTagManager gtmId={GTM_ID} />
      <Script src="/vendor/klaro.js" strategy="afterInteractive" />
    </>
  );
}
