import { routing } from "@/i18n/routing";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alexnothing.com";
  const { locales, defaultLocale } = routing;

  const pages = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/portfolio", priority: 0.9 },
    { path: "/photos", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
  ];

  return pages.flatMap((page) => {
    return locales.map((locale) => {
      // Logique as-needed : vide pour FR, /en pour EN
      const isDefault = locale === defaultLocale;
      const localePath = isDefault ? "" : `/${locale}`;

      const url = `${baseUrl}${localePath}${page.path}`;

      // Génération des liens alternatifs (SEO important)
      const languages = {};
      locales.forEach((l) => {
        const altPath = l === defaultLocale ? "" : `/${l}`;
        languages[l] = `${baseUrl}${altPath}${page.path}`;
      });

      return {
        url: url || baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page.priority,
        alternates: {
          languages: languages,
        },
      };
    });
  });
}
