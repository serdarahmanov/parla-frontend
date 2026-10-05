"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

type MediaValue = number | {
  url?: string | null;
  mimeType?: string | null;
};

type SiteSettingsResponse = {
  logo?: MediaValue | null;
  favicon?: MediaValue | null;
  websiteJsonLd?: {
    name?: string | null;
    description?: string | null;
    alternateNames?: { value?: string | null }[] | null;
  } | null;
  organizationJsonLd?: {
    name?: string | null;
    legalName?: string | null;
    description?: string | null;
    email?: string | null;
    telephone?: string | null;
    streetAddress?: string | null;
    addressLocality?: string | null;
    addressCountry?: string | null;
    socialProfiles?: { url?: string | null }[] | null;
  } | null;
  additionalJsonLd?: {
    entries?: {
      name?: string | null;
      enabled?: boolean | null;
      data?: unknown;
    }[] | null;
  } | null;
};

const absoluteUrl = (value: string | null | undefined, baseUrl: string) => {
  if (!value) return null;
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return null;
  }
};

const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

export default function SiteStructuredData() {
  const router = useRouter();
  const [schemas, setSchemas] = useState<unknown[]>([]);
  const [favicon, setFavicon] = useState<{ href: string; type?: string } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const locale = router.locale === "en" ? "en" : "tk";

    const loadSchemas = async () => {
      try {
        const response = await fetch(`/api/globals/site-settings?locale=${locale}&depth=1`, {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const settings = (await response.json()) as SiteSettingsResponse;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
        const homeUrl = new URL("/", siteUrl).toString();
        const organizationId = `${homeUrl}#organization`;
        const websiteId = `${homeUrl}#website`;
        const organizationName = settings.organizationJsonLd?.name || "Parla";
        const websiteName = settings.websiteJsonLd?.name || "Parla";
        const logoUrl =
          settings.logo && typeof settings.logo === "object"
            ? absoluteUrl(settings.logo.url, siteUrl)
            : null;
        const faviconUrl =
          settings.favicon && typeof settings.favicon === "object"
            ? absoluteUrl(settings.favicon.url, siteUrl)
            : null;
        const sameAs = (settings.organizationJsonLd?.socialProfiles ?? [])
          .map((profile) => absoluteUrl(profile.url, siteUrl))
          .filter((url): url is string => Boolean(url));
        const alternateNames = (settings.websiteJsonLd?.alternateNames ?? [])
          .map((entry) => entry.value?.trim())
          .filter((value): value is string => Boolean(value));
        const organization = settings.organizationJsonLd;
        const hasAddress = Boolean(
          organization?.streetAddress ||
            organization?.addressLocality ||
            organization?.addressCountry,
        );

        const organizationSchema = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": organizationId,
          name: organizationName,
          url: homeUrl,
          ...(logoUrl ? { logo: logoUrl } : {}),
          ...(organization?.legalName ? { legalName: organization.legalName } : {}),
          ...(organization?.description ? { description: organization.description } : {}),
          ...(organization?.email ? { email: organization.email } : {}),
          ...(organization?.telephone ? { telephone: organization.telephone } : {}),
          ...(sameAs.length ? { sameAs } : {}),
          ...(hasAddress
            ? {
                address: {
                  "@type": "PostalAddress",
                  ...(organization?.streetAddress
                    ? { streetAddress: organization.streetAddress }
                    : {}),
                  ...(organization?.addressLocality
                    ? { addressLocality: organization.addressLocality }
                    : {}),
                  ...(organization?.addressCountry
                    ? { addressCountry: organization.addressCountry }
                    : {}),
                },
              }
            : {}),
        };

        const websiteSchema = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": websiteId,
          name: websiteName,
          url: homeUrl,
          inLanguage: ["tk", "en"],
          publisher: { "@id": organizationId },
          ...(alternateNames.length ? { alternateName: alternateNames } : {}),
          ...(settings.websiteJsonLd?.description
            ? { description: settings.websiteJsonLd.description }
            : {}),
        };

        const additionalSchemas = (settings.additionalJsonLd?.entries ?? [])
          .filter((entry) => entry.enabled !== false)
          .map((entry) => entry.data)
          .filter(
            (data): data is Record<string, unknown> | unknown[] =>
              Boolean(data) && typeof data === "object",
          )
          .map((data) =>
            Array.isArray(data) || "@context" in data
              ? data
              : { "@context": "https://schema.org", ...data },
          );

        setSchemas([organizationSchema, websiteSchema, ...additionalSchemas]);
        setFavicon(
          faviconUrl
            ? {
                href: faviconUrl,
                ...(settings.favicon && typeof settings.favicon === "object" && settings.favicon.mimeType
                  ? { type: settings.favicon.mimeType }
                  : {}),
              }
            : null,
        );
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    };

    void loadSchemas();
    return () => controller.abort();
  }, [router.locale]);

  return (
    <Head>
      {favicon ? <link rel="icon" href={favicon.href} type={favicon.type} /> : null}
      {schemas.map((schema, index) => (
        <script
          key={`site-json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
    </Head>
  );
}
