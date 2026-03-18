export {};

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown> | IArguments>;
    gtag?: (...args: unknown[]) => void;
    klaro?: {
      show: (config?: unknown, modal?: boolean) => void;
      getManager: (config?: unknown) => {
        getConsent: (name: string) => boolean;
        resetConsents: () => void;
        saveAndApplyConsents: () => void;
      };
      version: () => string;
    };
    klaroConfig?: Record<string, unknown>;
    __consentBridge?: {
      STORAGE_KEY: string;
      readStored: () => {
        analytics: boolean;
        marketing: boolean;
      };
      writeStored: (consents: { analytics: boolean; marketing: boolean }) => void;
      clearStored: () => void;
      toGoogleConsent: (consents: {
        analytics: boolean;
        marketing: boolean;
      }) => Record<string, string>;
      applyDefault: () => void;
      applyUpdate: (
        consents: { analytics: boolean; marketing: boolean },
        reason?: string
      ) => void;
      syncFromKlaro: (reason?: string) => void;
      pushEvent: (
        eventName: string,
        payload?: Record<string, unknown>
      ) => void;
    };
  }
}