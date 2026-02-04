import { getMessages } from "next-intl/server";
import {
  constructMetadata,
  generateContactPageJsonLd,
} from "../../../../utils/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const metadata = constructMetadata({
    title: messages.metadata?.contact?.title || "Contact",
    description:
      messages.metadata?.contact?.description ||
      "Contact Alex Nothing for your projects, collaborations or booking requests.",
    slug: "/contact",
    locale,
    keywords: messages.keywords?.contact || [],
  });

  return metadata;
}

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateContactPageJsonLd()),
        }}
      />
      {children}
    </>
  );
}
