export const consentBridgeScript = `(function () {
  window.dataLayer = window.dataLayer || [];

  window.__consentState = window.__consentState || {
    analytics: false,
    marketing: false
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

    deleteCookie: function (name) {
      try {
        document.cookie = name + "=; path=/; max-age=0; SameSite=Lax";
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

    isSameConsents: function (a, b) {
      return (
        !!a &&
        !!b &&
        !!a.analytics === !!b.analytics &&
        !!a.marketing === !!b.marketing
      );
    },

    setGlobalState: function (consents) {
      var normalized = {
        analytics: !!consents.analytics,
        marketing: !!consents.marketing
      };

      window.__consentState = normalized;
      return normalized;
    },

    pushEvent: function (eventName, payload) {
      window.dataLayer.push(
        Object.assign(
          { event: eventName },
          payload || {}
        )
      );
    },

    applyDefault: function () {
      var consents = this.readStored();
      var normalized = this.setGlobalState(consents);

      this.lastApplied = normalized;

      this.pushEvent("consent_state_ready", {
        consent_source: "klaro_cookie",
        consent_analytics: normalized.analytics,
        consent_marketing: normalized.marketing
      });
    },

    applyUpdate: function (consents, reason) {
      var normalized = this.setGlobalState(consents);
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

      this.lastApplied = normalized;

      this.writeCookie(
        this.UPDATED_AT_KEY,
        String(Date.now()),
        60 * 60 * 24 * 180
      );

      this.pushEvent("consent_updated", {
        consent_reason: reason || "unknown",
        consent_analytics: normalized.analytics,
        consent_marketing: normalized.marketing
      });
    },

    clearStored: function () {
      var cleared = { analytics: false, marketing: false };
      this.deleteCookie(this.STORAGE_KEY);
      this.deleteCookie(this.UPDATED_AT_KEY);
      this.lastApplied = cleared;
      this.setGlobalState(cleared);
      this.pushEvent("consent_updated", {
        consent_reason: "clear_stored",
        consent_analytics: false,
        consent_marketing: false
      });
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
