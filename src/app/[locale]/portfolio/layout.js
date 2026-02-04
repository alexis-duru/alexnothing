import { getMessages } from "next-intl/server";
import { constructMetadata } from "../../../../utils/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return constructMetadata({
    title: messages.metadata?.portfolio?.title || "Portfolio",
    description:
      messages.metadata?.portfolio?.description ||
      "Explore Alex Nothing's portfolio: music projects and sound creations.",
    slug: "/portfolio",
    locale,
    keywords: messages.keywords?.portfolio || [],
  });
}

export default function PortfolioLayout({ children }) {
  return children;
}
