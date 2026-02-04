import { getMessages } from "next-intl/server";
import { constructMetadata } from "../../../../utils/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return constructMetadata({
    title: messages.metadata?.photos?.title || "Photos",
    description:
      messages.metadata?.photos?.description ||
      "Alex Nothing photo gallery: concerts, studio sessions and captured moments.",
    slug: "/photos",
    locale,
    keywords: messages.keywords?.photos || [],
  });
}

export default function PhotosLayout({ children }) {
  return children;
}
