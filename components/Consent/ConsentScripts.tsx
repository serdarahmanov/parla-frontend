import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID } from "@/lib/consent/config";

export default function ConsentScripts() {
  return (
    <>
      <GoogleTagManager gtmId={GTM_ID} />

      <Script src="/vendor/klaro.js" strategy="afterInteractive" />

      <Script id="klaro-css-override" strategy="afterInteractive">
        {`(function () {
          function removeInjectedKlaroStyles() {
            var styles = document.querySelectorAll('style[data-context="klaro-styles"]');
            for (var i = 0; i < styles.length; i++) {
              var node = styles[i];
              if (node && node.parentNode) {
                node.parentNode.removeChild(node);
              }
            }
          }

          removeInjectedKlaroStyles();
          var observer = new MutationObserver(removeInjectedKlaroStyles);
          observer.observe(document.documentElement, { childList: true, subtree: true });
        })();`}
      </Script>
    </>
  );
}
