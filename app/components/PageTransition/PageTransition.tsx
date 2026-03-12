"use client";
import styles from "./PageTransition.module.css";

import { usePathname, useSearchParams } from "next/navigation";
import { CSSProperties, ReactNode } from "react";
import {useState, useRef, useEffect} from "react";

type Props = {
  children: ReactNode;
};

export default function PageTransition({ children }: Props) {
  const DEFAULT_TRANSITION_MS = 5100;
  const pathName= usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathName}?${searchParams.toString()}`;

  const [currentChildren, setCurrentChildren] = useState(children);
  const [previousChildren, setPreviousChildren] = useState<ReactNode | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevRouteKeyRef = useRef(routeKey);
  const currentChildrenRef = useRef(children);

  useEffect(() => {
    currentChildrenRef.current = currentChildren;
  }, [currentChildren]);

  useEffect(() => {
    if (prevRouteKeyRef.current !== routeKey) {
      setPreviousChildren(currentChildrenRef.current);
      setCurrentChildren(children);
      currentChildrenRef.current = children;
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setPreviousChildren(null);
        setIsTransitioning(false);
      }, DEFAULT_TRANSITION_MS);

      prevRouteKeyRef.current = routeKey;
      return () => clearTimeout(timer);
    } else {
      setCurrentChildren(children);
    }
  }, [routeKey, children]);

  const transitionStyles = {
    "--page-transition-duration": `${DEFAULT_TRANSITION_MS}ms`,
  } as CSSProperties;


  return (
    <div className={styles["transition-root"]} style={transitionStyles}>
      {!isTransitioning && <div className={styles["page-layer"]}>{currentChildren}</div>}

      {previousChildren && (
        <div className={`${styles["page-layer"]} ${styles["page-layer--leaving"]}`}>
          {previousChildren}
        </div>
      )}

      <div
        className={`${styles["page-layer"]} ${styles["page-layer--entering"]} ${isTransitioning ? styles["is-active"] : ""}`}
      >
        {isTransitioning ? currentChildren : null}
      </div>

      <div className={styles["transition-overlay"]} />

      
    </div>
  );
}
