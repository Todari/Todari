import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://todari.dev/sitemap.xml",
    host: "https://todari.dev",
  };
}
