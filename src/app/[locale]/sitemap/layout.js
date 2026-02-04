import { getMessages } from "next-intl/server";
import { constructMetadata } from "../../../../utils/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return constructMetadata({
    title: messages.metadata?.sitemap?.title || "Sitemap",
    description:
      messages.metadata?.sitemap?.description ||
      "Alex Nothing sitemap - Easily access all pages.",
    slug: "/sitemap",
    locale,
    noIndex: true, // Sitemap pages généralement non indexées
  });
}

export default function SitemapLayout({ children }) {
  return children;
}
