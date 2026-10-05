import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  devIndicators: false,
  i18n: {
    locales: ["tk", "en"],
    defaultLocale: "tk",
    localeDetection: false,
  },
};

export default withPayload(nextConfig);
