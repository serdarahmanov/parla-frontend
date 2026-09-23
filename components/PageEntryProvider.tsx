"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/router";

type EntrySource = "landing-exit" | "route-navigation";

export type PageEntry = {
  id: number;
  routeKey: string;
  source: EntrySource;
};

type PageEntryContextValue = {
  entry: PageEntry | null;
  notifyLandingEntry: () => void;
};

const PageEntryContext = createContext<PageEntryContextValue | null>(null);

const routeKeyOf = (url: string) => url.split("#", 1)[0] || "/";

type PageEntryProviderProps = {
  landingActive: boolean;
  children: ReactNode;
};

export function PageEntryProvider({
  landingActive,
  children,
}: PageEntryProviderProps) {
  const router = useRouter();
  const [entry, setEntry] = useState<PageEntry | null>(null);
  const entryIdRef = useRef(0);
  const landingWasActiveRef = useRef(landingActive);
  const landingActiveRef = useRef(landingActive);
  const landingEntrySignaledRef = useRef(false);
  const currentRouteRef = useRef(routeKeyOf(router.asPath));
  const pendingRouteRef = useRef<string | null>(null);

  useEffect(() => {
    landingActiveRef.current = landingActive;
  }, [landingActive]);

  const emitEntry = useCallback((source: EntrySource, url: string) => {
    const routeKey = routeKeyOf(url);
    entryIdRef.current += 1;
    setEntry({ id: entryIdRef.current, routeKey, source });
  }, []);

  const notifyLandingEntry = useCallback(() => {
    if (!landingActiveRef.current || landingEntrySignaledRef.current) return;

    landingEntrySignaledRef.current = true;
    const routeKey = pendingRouteRef.current ?? routeKeyOf(router.asPath);
    pendingRouteRef.current = null;
    currentRouteRef.current = routeKey;
    emitEntry("landing-exit", routeKey);
  }, [emitEntry, router.asPath]);

  useEffect(() => {
    const handleRouteChangeComplete = (url: string) => {
      const routeKey = routeKeyOf(url);
      if (routeKey === currentRouteRef.current) return;

      currentRouteRef.current = routeKey;

      if (landingActiveRef.current) {
        pendingRouteRef.current = routeKey;
        return;
      }

      emitEntry("route-navigation", routeKey);
    };

    const handleRouteChangeError = () => {
      pendingRouteRef.current = null;
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [emitEntry, router.events]);

  useEffect(() => {
    const landingJustFinished = landingWasActiveRef.current && !landingActive;
    landingWasActiveRef.current = landingActive;

    if (landingActive) {
      landingEntrySignaledRef.current = false;
      return;
    }

    if (!landingJustFinished) return;

    if (landingEntrySignaledRef.current) return;

    const routeKey = pendingRouteRef.current ?? routeKeyOf(router.asPath);
    pendingRouteRef.current = null;
    currentRouteRef.current = routeKey;
    emitEntry("landing-exit", routeKey);
  }, [emitEntry, landingActive, router.asPath]);

  return (
    <PageEntryContext.Provider value={{ entry, notifyLandingEntry }}>
      {children}
    </PageEntryContext.Provider>
  );
}

export function usePageEntry() {
  const context = useContext(PageEntryContext);

  if (!context) {
    throw new Error("usePageEntry must be used within PageEntryProvider");
  }

  return context;
}
