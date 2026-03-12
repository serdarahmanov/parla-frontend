"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MouseEvent,
  Ref,
  forwardRef,
} from "react";

type LinkProps = React.ComponentProps<typeof Link>;

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function getHrefString(href: LinkProps["href"]) {
  if (typeof href === "string") return href;
  if ("pathname" in href && typeof href.pathname === "string") {
    const search = href.query ? `?${new URLSearchParams(href.query as Record<string, string>).toString()}` : "";
    const hash = href.hash ? `#${href.hash}` : "";
    return `${href.pathname}${search}${hash}`;
  }
  return String(href);
}

const ViewTransitionLink = forwardRef(function ViewTransitionLink(
  { href, onClick, target, ...props }: LinkProps,
  ref: Ref<HTMLAnchorElement>,
) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (event.button !== 0 || isModifiedClick(event)) return;
    if (target && target !== "_self") return;

    const hrefString = getHrefString(href);
    if (!hrefString || hrefString.startsWith("#")) return;

    const url = new URL(hrefString, window.location.href);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();

    const doc = document as ViewTransitionDocument;
    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(() => {
        router.push(url.pathname + url.search + url.hash);
      });
      return;
    }

    router.push(url.pathname + url.search + url.hash);
  };

  return <Link ref={ref} href={href} onClick={handleClick} target={target} {...props} />;
});

export default ViewTransitionLink;
