export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alexnothing.com";
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  return {
    rules: [
      {
        userAgent: "*",
        allow: allowIndexing ? "/" : undefined,
        disallow: allowIndexing ? ["/api/", "/_next/", "/static/"] : ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
