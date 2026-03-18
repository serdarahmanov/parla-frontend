import type { AppProps } from "next/app";
import { GoogleTagManager } from "@next/third-parties/google";
import { IBM_Plex_Sans, Geist } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "../styles/globals.css";
import "@/components/PageTransition/page-transition.css";
import SmoothScroll from "../components/SmoothScroll";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition/PageTransition";
import LandingIntro from "@/components/LandingIntro";
import { useCallback, useState } from "react";
import Script from "next/script";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const GTM_ID = "GTM-MM9N6562";

export default function App({ Component, pageProps, router }: AppProps) {
  const [pageReady, setPageReady] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  const handleRevealStart = useCallback(() => {
    setPageReady(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroVisible(false);
  }, []);

  return (
    <div className={cn("m-0 p-0", "font-sans", geist.variable)}>

      
       {/* 1) Define dataLayer + gtag + consent bridge BEFORE GTM loads */}
      <Script id="consent-banner" strategy="beforeInteractive">
        {`(function () {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
              window.dataLayer.push(arguments);
            };

            window.__consentBridge = {
              STORAGE_KEY: "site-consent-v1",
              COOKIE_MAX_AGE_DAYS: 180,
              lastApplied: null,

              readCookie: function (name) {
                try {
                  var parts = document.cookie ? document.cookie.split("; ") : [];
                  for (var i = 0; i < parts.length; i++) {
                    var pair = parts[i].split("=");
                    var key = pair.shift();
                    if (key === name) {
                      return pair.join("=");
                    }
                  }
                  return null;
                } catch (e) {
                  return null;
                }
              },

              writeCookie: function (name, value, maxAgeDays) {
                try {
                  var maxAgeSeconds = Math.max(1, Math.floor((maxAgeDays || 1) * 24 * 60 * 60));
                  document.cookie =
                    name +
                    "=" +
                    value +
                    "; path=/; max-age=" +
                    maxAgeSeconds +
                    "; SameSite=Lax";
                } catch (e) {}
              },

              deleteCookie: function (name) {
                try {
                  document.cookie = name + "=; path=/; max-age=0; SameSite=Lax";
                } catch (e) {}
              },

              readStored: function () {
                try {
                  var raw = this.readCookie(this.STORAGE_KEY);
                  if (!raw) {
                    return { analytics: false, marketing: false };
                  }
                  var parsed = JSON.parse(decodeURIComponent(raw));
                  return {
                    analytics: !!parsed.analytics,
                    marketing: !!parsed.marketing
                  };
                } catch (e) {
                  return { analytics: false, marketing: false };
                }
              },

              writeStored: function (consents) {
                try {
                  this.writeCookie(
                    this.STORAGE_KEY,
                    encodeURIComponent(JSON.stringify(consents)),
                    this.COOKIE_MAX_AGE_DAYS
                  );
                } catch (e) {}
              },

              clearStored: function () {
                try {
                  this.deleteCookie(this.STORAGE_KEY);
                } catch (e) {}
              },

              toGoogleConsent: function (consents) {
                return {
                  analytics_storage: consents.analytics ? "granted" : "denied",
                  ad_storage: consents.marketing ? "granted" : "denied",
                  ad_user_data: consents.marketing ? "granted" : "denied",
                  ad_personalization: consents.marketing ? "granted" : "denied",
                  functionality_storage: "granted",
                  security_storage: "granted",
                  personalization_storage: "denied"
                };
              },

              isSameConsents: function (a, b) {
                return (
                  !!a &&
                  !!b &&
                  !!a.analytics === !!b.analytics &&
                  !!a.marketing === !!b.marketing
                );
              },

              pushEvent: function (eventName, payload) {
                window.dataLayer.push(
                  Object.assign(
                    {
                      event: eventName
                    },
                    payload || {}
                  )
                );
              },

              applyDefault: function () {
                var consents = this.readStored();
                var googleConsent = this.toGoogleConsent(consents);
                this.lastApplied = {
                  analytics: !!consents.analytics,
                  marketing: !!consents.marketing
                };

                window.gtag("consent", "default", googleConsent);

                // Optional privacy hardening for Google Ads flows
                window.gtag("set", "ads_data_redaction", true);

                this.pushEvent("consent_default_applied", {
                  consent_source: "cookie",
                  consent_analytics: consents.analytics,
                  consent_marketing: consents.marketing,
                  google_consent: googleConsent
                });
              },

              applyUpdate: function (consents, reason) {
                var normalized = {
                  analytics: !!consents.analytics,
                  marketing: !!consents.marketing
                };
                var previous =
                  this.lastApplied ||
                  this.readStored();

                if (this.isSameConsents(previous, normalized)) {
                  this.lastApplied = normalized;
                  return;
                }

                var googleConsent = this.toGoogleConsent(consents);

                this.writeStored(normalized);
                window.gtag("consent", "update", googleConsent);
                this.lastApplied = normalized;

                this.pushEvent("consent_updated", {
                  consent_reason: reason || "unknown",
                  consent_analytics: normalized.analytics,
                  consent_marketing: normalized.marketing,
                  google_consent: googleConsent
                });

                // Optional service-level events for GTM custom triggers
                if (normalized.analytics) {
                  this.pushEvent("klaro-analytics-accepted");
                } else {
                  this.pushEvent("klaro-analytics-declined");
                }

                if (normalized.marketing) {
                  this.pushEvent("klaro-marketing-accepted");
                } else {
                  this.pushEvent("klaro-marketing-declined");
                }
              },

              syncFromKlaro: function (reason) {
                try {
                  if (!window.klaro || !window.klaroConfig) return;
                  if (typeof window.klaro.getManager !== "function") return;
                  var manager = window.klaro.getManager(window.klaroConfig);
                  if (!manager || typeof manager.getConsent !== "function") return;
                  var consents = {
                    analytics: !!manager.getConsent("analytics"),
                    marketing: !!manager.getConsent("marketing")
                  };
                  this.applyUpdate(consents, reason || "klaro_sync");
                } catch (e) {
                  this.pushEvent("consent_sync_error", {
                    message: e && e.message ? e.message : "unknown_error"
                  });
                }
              }
            };

            // Required for Advanced Mode: defaults before GTM/tag logic executes
            window.__consentBridge.applyDefault();
          })()`}

      </Script>

       {/* 2) Make Klaro config available before Klaro runtime loads */}
      <Script src="/vendor/klaro-config.js" strategy="beforeInteractive" /> 

           <GoogleTagManager gtmId="GTM-MM9N6562" />
       {/* 4) Klaro runtime */}
      <Script src="/vendor/klaro.js" strategy="afterInteractive" />
      <div
        className={`${ibmPlexSans.className} relative p-0 m-0 min-h-screen bg-white text-black`}
      >
        <SmoothScroll />
        <Toaster richColors position="top-right" />
        <main className="p-0 m-0 min-h-full w-full relative">
          {introVisible && (
            <LandingIntro
              onRevealStart={handleRevealStart}
              onComplete={handleIntroComplete}
            />
          )}
          <AnimatePresence mode="wait">
            <PageTransition key={router.asPath} introDone={pageReady}>
              <Component {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </main>

       
      </div>
    </div>
  );
}
