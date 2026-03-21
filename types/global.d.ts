export {};

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown> | IArguments>;

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

    __consentState?: {
      analytics: boolean;
      marketing: boolean;
    };

    __consentBridge?: {
      STORAGE_KEY: string;
      UPDATED_AT_KEY: string;
      lastApplied: {
        analytics: boolean;
        marketing: boolean;
      } | null;

      readCookie: (name: string) => string | null;
      writeCookie: (
        name: string,
        value: string,
        maxAgeSeconds: number
      ) => void;
      deleteCookie: (name: string) => void;

      normalizeConsents: (source: unknown) => {
        analytics: boolean;
        marketing: boolean;
      };

      readStored: () => {
        analytics: boolean;
        marketing: boolean;
      };

      isSameConsents: (
        a:
          | {
              analytics: boolean;
              marketing: boolean;
            }
          | null
          | undefined,
        b:
          | {
              analytics: boolean;
              marketing: boolean;
            }
          | null
          | undefined
      ) => boolean;

      setGlobalState: (consents: {
        analytics: boolean;
        marketing: boolean;
      }) => {
        analytics: boolean;
        marketing: boolean;
      };

      pushEvent: (
        eventName: string,
        payload?: Record<string, unknown>
      ) => void;

      applyDefault: () => void;

      applyUpdate: (
        consents: {
          analytics: boolean;
          marketing: boolean;
        },
        reason?: string
      ) => void;

      clearStored: () => void;

      syncFromKlaro: (reason?: string) => void;
    };
  }
}
