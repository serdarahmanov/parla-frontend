"use client";
import MaskTextAnimation from "@/animations/MaskTextAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import CookieSettingsButton from "@/components/cookie/CookieSettingsButton";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const CookiePolicyPage = () => {
  const policiesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const wrapperRef = useRef(null);
  const sideBarRef = useRef(null);
  const programmaticCookieRef = useRef<number | null>(null);
  const scrollRequestRef = useRef(0);
  const [activeCookie, setActiveCookie] = useState(0);

  const sectionId = (index: number) => `cookie-policy-section-${index}`;

  const scrollToSection = useCallback((index: number, updateHash = true) => {
    const section = policiesRef.current[index];
    if (!section) return;

    const requestId = ++scrollRequestRef.current;
    programmaticCookieRef.current = index;

    if (updateHash) {
      window.history.replaceState(null, "", `#${sectionId(index)}`);
    }

    window.dispatchEvent(
      new CustomEvent("parla-scroll-to-position", {
        detail: {
          target: section,
          offset: -(window.innerHeight * 0.3),
          onComplete: () => {
            if (scrollRequestRef.current !== requestId) return;
            programmaticCookieRef.current = null;
            setActiveCookie(index);
          },
        },
      }),
    );
  }, []);
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

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const index = [0, 1].find((sectionIndex) => sectionId(sectionIndex) === hash);
    if (index === undefined) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToSection(index, false));
    });
  }, [scrollToSection]);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const context = gsap.context(() => {
      const updateActiveCookie = () => {
        if (programmaticCookieRef.current !== null) return;

        const activationLine = window.innerHeight * 0.3;
        let currentCookie = 0;
        policiesRef.current.forEach((section, index) => {
          if (section && section.getBoundingClientRect().top <= activationLine) {
            currentCookie = index;
          }
        });

        setActiveCookie((current) =>
          current === currentCookie ? current : currentCookie,
        );
      };

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: sideBarRef.current,
        pinSpacing: false,
        onUpdate: updateActiveCookie,
        onRefresh: updateActiveCookie,
      });

      updateActiveCookie();
    }, wrapperRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className=""
    >
      <div className="header-clearance-top relative grid grid-cols-12 pb-[80vh] px-6 font-sans gap-1
      md:relative md:grid md:grid-cols-12 md:pb-[80vh] md:px-6 md:gap-0
      lg:relative lg:grid lg:grid-cols-12 lg:pb-[80vh] lg:px-6 lg:gap-0">

        {/* Left Bar */}
        <div
          ref={sideBarRef}
          className="box-border h-screen pt-[5vh] col-span-3 gap-4 flex flex-col col-start-1
          md:h-screen md:pt-[5vh] md:col-span-3 md:gap-4 md:flex md:flex-col md:col-start-2
          lg:h-screen lg:pt-[5vh] lg:col-span-3 lg:gap-4 lg:flex lg:flex-col lg:col-start-4"
        >

          <MaskTextAnimation
            text={"COOKIE POLICY"}
            className=" leading-4 text-lg font-semibold font-sans
            md:leading-7 md:text-2xl md:font-semibold
            lg:leading-7 lg:text-2xl lg:font-semibold"
          ></MaskTextAnimation>
          <div className="gap-3 text-xs font-bold flex flex-col md:gap-1 md:text-xs md:font-bold md:flex md:flex-col lg:gap-1 lg:text-xs lg:font-bold lg:flex lg:flex-col">
            {["Overview", "Cookie Consent"].map((label, index) => (
              <a
                key={label}
                href={`#${sectionId(index)}`}
                className={`${activeCookie === index ? "opacity-100" : "opacity-30"} cursor-pointer`}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveCookie(index);
                  scrollToSection(index);
                }}
              >
                {label}
              </a>
            ))}
          </div>


        </div>



             {/* Right Bar */}
        <div className="col-start-4 col-span-9 gap-8 flex flex-col
        md:col-start-6 md:col-span-6 md:gap-8 md:flex md:flex-col
        lg:col-start-8 lg:col-span-4 lg:gap-8 lg:flex lg:flex-col">




          <div className="flex flex-col gap-8 text-xs font-sans md:flex md:flex-col md:gap-8 lg:flex lg:flex-col lg:gap-8">
            <div id={sectionId(0)} className="flex flex-col gap-3 md:flex md:flex-col md:gap-3 lg:flex lg:flex-col lg:gap-3">
              <h2
                ref={(el) => {
                  policiesRef.current[0] = el;
                }}
                className={`text-xs font-bold ${activeCookie === 0 ? "opacity-100" : "opacity-30"} md:text-xs md:font-bold lg:text-xs lg:font-bold`}
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

            <div id={sectionId(1)} className="flex flex-col gap-2 md:flex md:flex-col md:gap-2 lg:flex lg:flex-col lg:gap-2">
              <h2
                ref={(el) => {
                  policiesRef.current[1] = el;
                }}
                className={`text-xs font-bold ${activeCookie === 1 ? "opacity-100" : "opacity-30"} md:text-xs md:font-bold lg:text-xs lg:font-bold`}
              >
                Cookie Consent
              </h2>
              <div className="flex flex-col items-baseline md:flex md:flex-col md:items-baseline lg:flex lg:flex-row lg:items-baseline">
                <h2 className="text-xs font-bold md:text-xs md:font-bold lg:text-xs lg:font-bold">
                  Your current state:
                </h2>
                <p className="text-[0.7rem] md:text-[0.7rem] lg:text-[0.7rem]">
                  {!hasConsentDecision
                    ? "Not defined yet"
                    : consentState.analytics && consentState.marketing
                    ? "Accepted."
                    : !consentState.analytics && !consentState.marketing
                      ? "Declined."
                      : "Custom."}
                </p>
              </div>
              <div className=" flex flex-col items-baseline md:flex md:flex-col md:items-baseline lg:flex lg:flex-row lg:items-baseline">
                <h2 className="text-xs font-bold md:text-xs md:font-bold lg:text-xs lg:font-bold">
                  Your consent ID:
                </h2>
                <p className="  break-all text-[0.7rem] md:text-[0.7rem] lg:text-[0.7rem]">
                  {consentId}
                </p>
              </div>
              <div className=" flex flex-col items-baseline md:flex md:flex-col md:items-baseline lg:flex lg:flex-row lg:items-baseline">
                <h2 className="text-xs font-bold md:text-xs md:font-bold lg:text-xs lg:font-bold">
                  Consent date:
                </h2>
                <p className="text-[0.7rem] md:text-[0.7rem] lg:text-[0.7rem]">
                  {consentDate}
                </p>

                
              </div>
              <div>
                <CookieSettingsButton />
              </div>
            </div>
          </div>



        </div>





       
      </div>
     
    </div>
  );
};

export default CookiePolicyPage;
