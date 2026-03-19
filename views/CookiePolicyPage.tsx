"use client";
import MaskTextAnimation from "@/animations/MaskTextAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SplitText from "gsap/SplitText";
import CookieSettingsButton from "@/components/cookie/CookieSettingsButton";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(SplitText);

const CookiePolicyPage = () => {
  const overviewRef = useRef(null);
  const consentRef = useRef(null);
  const wrapperRef = useRef(null);
  const sideBarRef = useRef(null);

  const [activeCookie, setActiveCookie] = useState(1);
  const [consentState, setConsentState] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [hasConsentDecision, setHasConsentDecision] = useState(false);
  const [consentId, setConsentId] = useState("N/A");
  const [consentDate, setConsentDate] = useState("Not available");

  const readCookieValue = (name: string) => {
    if (typeof document === "undefined") return null;
    const parts = document.cookie ? document.cookie.split("; ") : [];
    for (let i = 0; i < parts.length; i += 1) {
      const pair = parts[i].split("=");
      const key = pair.shift();
      if (key === name) {
        return pair.join("=");
      }
    }
    return null;
  };

  const parseConsentCookie = (raw: string | null) => {
    if (!raw) {
      return { necessary: true, analytics: false, marketing: false };
    }

    try {
      const decoded = decodeURIComponent(raw);
      const parsed = JSON.parse(decoded) as {
        necessary?: boolean;
        analytics?: boolean;
        marketing?: boolean;
      };

      return {
        necessary: parsed.necessary !== false,
        analytics: !!parsed.analytics,
        marketing: !!parsed.marketing,
      };
    } catch {
      return { necessary: true, analytics: false, marketing: false };
    }
  };

  useEffect(() => {
    const syncConsentMeta = () => {
      const raw = readCookieValue("cookies");
      const rawUpdatedAt = readCookieValue("cookie-updated-at");
      const hasDecision = !!raw;
      const parsed = parseConsentCookie(raw);

      setHasConsentDecision(hasDecision);
      setConsentState(parsed);
      if (!hasDecision) {
        setConsentId("N/A");
        setConsentDate("Not available");
      } else {
        setConsentId(
          btoa(
            `consent:${parsed.necessary}-analytics:${parsed.analytics}-marketing:${parsed.marketing}`
          )
        );
        if (rawUpdatedAt) {
          try {
            const decodedUpdatedAt = decodeURIComponent(rawUpdatedAt);
            const parsedDate = new Date(Number(decodedUpdatedAt));
            setConsentDate(
              Number.isNaN(parsedDate.getTime())
                ? "Not available"
                : parsedDate.toUTCString()
            );
          } catch {
            setConsentDate("Not available");
          }
        } else {
          setConsentDate("Not available");
        }
      }
    };

    syncConsentMeta();
    const interval = window.setInterval(syncConsentMeta, 1000);
    window.addEventListener("consent-reset", syncConsentMeta);

    return () => {
      window.removeEventListener("consent-reset", syncConsentMeta);
      window.clearInterval(interval);
    };
  }, []);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !consentRef.current || !overviewRef.current)
      return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: sideBarRef.current,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: overviewRef.current,
        start: "top top+=20%",

        onEnter: () => setActiveCookie(1),
        onEnterBack: () => setActiveCookie(1),
      });

      ScrollTrigger.create({
        trigger: consentRef.current,
        start: "top top+=20%",

        onEnter: () => setActiveCookie(2),
        onEnterBack: () => setActiveCookie(2),
      });
    }, wrapperRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <div className=" relative grid grid-cols-12 pt-25 px-6  pb-[80vh]">
        <div className="col-span-3"></div>

        <div ref={sideBarRef} className="col-span-3 flex flex-col  gap-4 ">
          <MaskTextAnimation
            text={"COOKIE POLICY"}
            className=" leading-7"
          ></MaskTextAnimation>
          <div className="text-xs  font-bold  flex flex-col gap-1">
            <h2
              className={`${activeCookie == 1 ? "opacity-100" : "opacity-30"}`}
            >
              Overview
            </h2>
            <h2
              className={`${activeCookie == 2 ? "opacity-100" : "opacity-30"}`}
            >
              Cookie Consent
            </h2>
          </div>
        </div>

        <div className="col-span-4  flex flex-col ">
          <div className="text-xs flex flex-col font-sans gap-10">
            <div className="flex flex-col gap-3">
              <h2
                ref={overviewRef}
                className={`text-xs font-bold opacity-30 ${activeCookie == 1 ? "opacity-100" : "opacity-30"}`}
              >
                Overview
              </h2>
              <p>
                Cookies are small text files used by websites to remember your
                device, preferences, and online activity. Data laws state that
                we can store cookies on your device if they are strictly
                necessary for the operation of this website. For all other types
                of cookies we require your permission.
              </p>
              <p>
                This site uses different types of cookies. Some cookies that
                appear on our pages may be placed by third party services
              </p>
              <p>
                You can change or withdraw your consent at any stage from this
                page.
              </p>
              <p>
                Please state your consent ID and date when you contact us
                regarding your consent.
              </p>
              <p>
                Learn more about how we process personal data in our Privacy
                Policy and GDPR Policy.
              </p>
              <p>
                Your consent applies to the following domains: parla.com
              </p>
            </div>

            <div className="flex flex-col gap-2  ">
              <h2
                ref={consentRef}
                className={`text-xs font-bold opacity-30 ${activeCookie == 2 ? "opacity-100" : "opacity-30"}`}
              >
                Cookie Consent
              </h2>
              <div className="flex flex-row items-baseline ">
                <h2 className="text-xs font-bold ">Your current state:</h2>
                <p className="text-[0.7rem]">
                  {!hasConsentDecision
                    ? "Not defined yet"
                    : consentState.analytics && consentState.marketing
                    ? "Accepted."
                    : !consentState.analytics && !consentState.marketing
                      ? "Declined."
                      : "Custom."}
                </p>
              </div>
              <div className="flex flex-row items-baseline">
                <h2 className="text-xs font-bold ">Your consent ID:</h2>
                <p className="text-[0.7rem]">{consentId}</p>
              </div>
              <div className="flex flex-row items-baseline">
                <h2 className="text-xs font-bold ">Consent date:</h2>
                <p className="text-[0.7rem]">{consentDate}</p>

                
              </div>
              <div>
                <CookieSettingsButton />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2"></div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
