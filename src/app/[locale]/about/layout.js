import { getMessages } from "next-intl/server";
import { constructMetadata } from "../../../../utils/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return constructMetadata({
    title: messages.metadata?.about?.title || "About",
    description:
      messages.metadata?.about?.description ||
      "Discover the story and journey of Alex Nothing, electronic music artist.",
    slug: "/about",
    locale,
    keywords: messages.keywords?.about || [],
  });
}

export default function AboutLayout({ children }) {
  return children;
}
