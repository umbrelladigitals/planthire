import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aberdeenshireplanthire.co.uk";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/products/"],
        disallow: ["/panel/", "/login/", "/register/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
