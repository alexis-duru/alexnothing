// utils/seo.js

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const SITE_NAME = "Alex Nothing";

/**
 * Génère l'objet robots selon l'environnement.
 * Utilise la variable NEXT_PUBLIC_ALLOW_INDEXING configurée sur Netlify.
 */
export const getRobots = () => {
  const isProd = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  return {
    index: isProd,
    follow: isProd,
    nocache: !isProd,
    googleBot: {
      index: isProd,
      follow: isProd,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
};

/**
 * Helper pour construire les métadonnées de page facilement.
 * @param {Object} options - Options de métadonnées
 * @param {string} options.title - Titre de la page
 * @param {string} options.description - Description de la page
 * @param {string} options.image - Image OG (optionnel)
 * @param {string} options.slug - Slug de la page (ex: "/about")
 * @param {string} options.locale - Locale actuelle (ex: "fr", "en")
 * @param {boolean} options.noIndex - Force le noindex même en prod (optionnel)
 * @param {string} options.type - Type de page OpenGraph (optionnel, défaut: "website")
 * @param {Array} options.keywords - Mots-clés pour le SEO (optionnel)
 */
export function constructMetadata({
  title,
  description,
  image,
  slug = "",
  locale = "fr",
  noIndex = false,
  type = "website",
  keywords = [],
}) {
  const cleanSlug = slug.startsWith("/") ? slug : `/${slug}`;
  const localePath = locale === "fr" ? "" : `/${locale}`;
  const url = `${SITE_URL}${localePath}${cleanSlug}`;

  // Construction du titre complet
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}${cleanSlug}`,
        en: `${SITE_URL}/en${cleanSlug}`,
      },
    },
    // Si noIndex est forcé manuellement OU si on est pas en prod, on désactive l'indexation
    robots: noIndex ? { index: false, follow: false } : getRobots(),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: image || `${SITE_URL}/img/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image || `${SITE_URL}/img/og-default.jpg`],
      creator: "@alexnothing",
    },
  };
}

/**
 * Générateur de JSON-LD pour les données structurées (Personne/Artiste)
 */
export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/img/og-default.jpg`,
    jobTitle: "Electronic Music Artist",
    description:
      "Alex Nothing crafts a free-flowing and immersive form of electronic music",
    sameAs: [
      "https://instagram.com/alexnothing",
      "https://linkedin.com/in/alexnothing",
      "https://vimeo.com/alexnothing",
    ],
  };
}

/**
 * Générateur de JSON-LD pour le site web
 */
export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Alex Nothing - Electronic music artist crafting immersive soundscapes",
    inLanguage: ["fr", "en"],
  };
}

/**
 * Générateur de JSON-LD pour une page de portfolio/créations
 */
export function generateCreativeWorkJsonLd({ title, description, image, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    image,
    url,
    creator: {
      "@type": "Person",
      name: SITE_NAME,
    },
  };
}

/**
 * Générateur de JSON-LD pour la page contact
 */
export function generateContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact - Alex Nothing",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Person",
      name: SITE_NAME,
      email: "contact@alexnothing.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Verona",
        addressCountry: "IT",
      },
    },
  };
}

export { SITE_URL, SITE_NAME };
