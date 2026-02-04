import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Menu from "../components/Menu/Menu";
import "../globals.css";
import {
  constructMetadata,
  generatePersonJsonLd,
  generateWebsiteJsonLd,
} from "../../../utils/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return constructMetadata({
    title: messages.metadata?.home?.title || "Alex Nothing",
    description:
      messages.metadata?.home?.description ||
      "Alex Nothing crafts a free-flowing and immersive form of electronic music",
    slug: "",
    locale,
    keywords: messages.keywords?.global || [],
  });
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  // JSON-LD structured data
  const personJsonLd = generatePersonJsonLd();
  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Menu />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
