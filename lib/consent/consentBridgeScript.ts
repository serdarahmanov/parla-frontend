export const consentBridgeScript = `(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.__consentBridge = {
    STORAGE_KEY: "cookies",
    UPDATED_AT_KEY: "cookie-updated-at",
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

    deleteCookie: function (name) {
      try {
        document.cookie = name + "=; path=/; max-age=0; SameSite=Lax";
      } catch (e) {}
    },

    writeCookie: function (name, value, maxAgeSeconds) {
      try {
        document.cookie =
          name +
          "=" +
          value +
          "; path=/; max-age=" +
          maxAgeSeconds +
          "; SameSite=Lax";
      } catch (e) {}
    },

    normalizeConsents: function (source) {
      var data = source && typeof source === "object" ? source : {};
      var nested = data.consents && typeof data.consents === "object"
        ? data.consents
        : data.services && typeof data.services === "object"
          ? data.services
          : data;

      return {
        analytics: !!nested.analytics,
        marketing: !!nested.marketing
      };
    },

    readStored: function () {
      try {
        var raw = this.readCookie(this.STORAGE_KEY);
        if (!raw) {
          return { analytics: false, marketing: false };
        }

        var decoded = raw;
        try {
          decoded = decodeURIComponent(raw);
        } catch (e) {}

        try {
          return this.normalizeConsents(JSON.parse(decoded));
        } catch (e) {
          return {
            analytics: /analytics\\s*[:=]\\s*(true|1)/i.test(decoded),
            marketing: /marketing\\s*[:=]\\s*(true|1)/i.test(decoded)
          };
        }
      } catch (e) {
        return { analytics: false, marketing: false };
      }
    },

    writeStored: function (consents) {
      return consents;
    },

    clearStored: function () {
      try {
        this.deleteCookie(this.STORAGE_KEY);
        this.deleteCookie(this.UPDATED_AT_KEY);
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
      window.gtag("set", "ads_data_redaction", true);

      this.pushEvent("consent_default_applied", {
        consent_source: "klaro_cookie",
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
      var previous = this.lastApplied || this.readStored();
      var isUserAction =
        typeof reason === "string" &&
        reason.indexOf("global_callback_") === 0;

      if (this.isSameConsents(previous, normalized)) {
        if (isUserAction) {
          this.writeCookie(
            this.UPDATED_AT_KEY,
            String(Date.now()),
            60 * 60 * 24 * 180
          );
        }
        this.lastApplied = normalized;
        return;
      }

      var googleConsent = this.toGoogleConsent(consents);

      window.gtag("consent", "update", googleConsent);
      this.lastApplied = normalized;
      this.writeCookie(
        this.UPDATED_AT_KEY,
        String(Date.now()),
        60 * 60 * 24 * 180
      );

      this.pushEvent("consent_updated", {
        consent_reason: reason || "unknown",
        consent_analytics: normalized.analytics,
        consent_marketing: normalized.marketing,
        google_consent: googleConsent
      });

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

  window.__consentBridge.applyDefault();
})()`;
