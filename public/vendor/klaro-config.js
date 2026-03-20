window.klaroConfig = {
  version: 1,
  elementID: "klaro",
  storageMethod: "cookie",
  storageName: "cookies",
  cookiePath: "/",
  default: false,
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  htmlTexts: true,
  styling: {
    "font-family": "var(--font-sans)",
    "title-font-family": "var(--font-sans)",
    "font-size": "14px",
    "border-radius": "4px",
    "border-style": "none",
    // "border-width": "0px",
    "dark1": "#ffffff",
    "dark2": "#111827",
    "light1": "#111827",
    "light2": "#e5e7eb",
    "light3": "#6b7280",
    "button-text-color": "#f9fafb",
    "green1": "#111827",
    "green2": "#111827",
    "green3": "#374151",
    "blue1": "#111827",
    "blue2": "#374151"
  },


  translations: {
    zz: {
      privacyPolicyUrl: "/cookie"
    },
    en: {
      ok: "Accept All",
      consentNotice: {
        learnMore: "Manage",
        description:
         "We use cookies"
      },
      consentModal: {
        title: "Cookie settings",
        description:
          "Choose which optional technologies you allow. Essential technologies stay active because the site depends on them."
      },
      purposes: {
        necessary: {
          title: "Necessary"
        },
        analytics: {
          title: "Analytics"
        },
        marketing: {
          title: "Marketing"
        }
      }
    }
  },

  services: [
    {
      name: "necessary",
      required: true,
      default: true,
      purposes: ["necessary"],
      translations: {
        zz: {
          title: "Necessary"
        },
        en: {
          description:
            "Required for core website functionality, security, and remembering your consent settings."
        }
      }
    },

    {
      name: "analytics",
      purposes: ["analytics"],
      onlyOnce: true,
      cookies: [
        /^_ga$/,
        /^_gid$/,
        /^_ga_.*/
      ],
      translations: {
        zz: {
          title: "Analytics"
        },
        en: {
          description:
            "Helps us understand traffic and site usage."
        }
      }
    },

    {
      name: "marketing",
      purposes: ["marketing"],
      onlyOnce: true,
      cookies: [
        /^_gcl_au$/,
        /^_gcl_aw$/,
        /^_gcl_gs$/,
        /^_gac_gb_.*/
      ],
      translations: {
        zz: {
          title: "Marketing"
        },
        en: {
          description:
            "Supports ad measurement and advertising features where enabled."
        }
      }
    }
  ],

  callback: function (consent, service) {
    if (window.__consentBridge) {
      window.__consentBridge.syncFromKlaro(
        "global_callback_" + (service && service.name ? service.name : "unknown")
      );
    }
  }
};


