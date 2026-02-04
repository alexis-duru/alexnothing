import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "404 - Page non trouvée | Alex Nothing",
  description:
    "La page que vous recherchez n'existe pas. Retournez à l'accueil.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body>
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0f0f0f",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "2em",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "180px",
                fontWeight: "700",
                color: "#fff",
                lineHeight: "1",
                letterSpacing: "-0.05em",
                marginBottom: "0.2em",
              }}
            >
              404
            </span>
            <h1
              style={{
                color: "#fff",
                fontSize: "40px",
                fontWeight: "500",
                marginBottom: "0.5em",
              }}
            >
              Page non trouvée
            </h1>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "400",
                color: "#555555",
                marginBottom: "2em",
                maxWidth: "400px",
                lineHeight: "150%",
              }}
            >
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
            </p>
            <Link
              href="/"
              style={{
                display: "inline-block",
                fontSize: "16px",
                fontWeight: "600",
                color: "#fff",
                padding: "1em 2.5em",
                border: "1px solid #fff",
                borderRadius: "50px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
