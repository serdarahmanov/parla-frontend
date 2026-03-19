export default function CookieSettingsButton() {
  const openSettings = () => {
    if (typeof window === "undefined") return;
    window.klaro?.show(window.klaroConfig, true);
  };

  const resetConsent = () => {
    if (typeof window === "undefined") return;

    try {
      const manager = window.klaro?.getManager(window.klaroConfig);
      manager?.resetConsents();
      window.__consentBridge?.clearStored();
      window.dispatchEvent(new Event("consent-reset"));
    } catch (e) {
      console.error("Failed to reset consent", e);
    }
  };

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <button type="button" onClick={openSettings} className="cookie-btn">
        Cookie settings
      </button>
      <button type="button" onClick={resetConsent} className="cookie-btn secondary">
        Reset consent
      </button>
    </div>
  );
}
