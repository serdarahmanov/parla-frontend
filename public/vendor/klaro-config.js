window.klaroConfig = {
  version: 1,
  elementID: "klaro",
  storageMethod: "cookie",
  storageName: "klaro",
  default: false,
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  htmlTexts: true,

  translations: {
    zz: {
      privacyPolicyUrl: "/cookie"
    },
    en: {
      consentNotice: {
        description:
          "We use essential technologies to run this site and optional analytics and marketing technologies to measure traffic and improve campaigns. You can accept all, reject optional use, or customize your choices."
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
