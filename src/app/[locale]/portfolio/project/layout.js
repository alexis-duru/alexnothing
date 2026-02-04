import { getMessages } from "next-intl/server";
import {
  constructMetadata,
  generateCreativeWorkJsonLd,
  SITE_URL,
} from "../../../../../utils/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return constructMetadata({
    title: locale === "fr" ? "Projet - Portfolio" : "Project - Portfolio",
    description:
      locale === "fr"
        ? "Découvrez ce projet créatif d'Alex Nothing. Détails, visuels et processus de création."
        : "Discover this creative project by Alex Nothing. Details, visuals and creative process.",
    slug: "/portfolio/project",
    locale,
    type: "article",
    keywords:
      locale === "fr"
        ? ["projet Alex Nothing", "création musicale", "portfolio artiste"]
        : ["Alex Nothing project", "music creation", "artist portfolio"],
  });
}

export default function ProjectLayout({ children }) {
  const jsonLd = generateCreativeWorkJsonLd({
    title: "Creative Project",
    description: "A creative project by Alex Nothing",
    image: `${SITE_URL}/img/portfolio/project-1.jpg`,
    url: `${SITE_URL}/portfolio/project`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      {children}
    </>
  );
}
