import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  // Source map upload requires SENTRY_AUTH_TOKEN. Omit until needed.
  widenClientFileUpload: true,
});
