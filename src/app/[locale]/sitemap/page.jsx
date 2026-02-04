"use client";
import React, { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import "./sitemap.css";

import { gsap } from "gsap";
import { ReactLenis } from "@studio-freight/react-lenis";

const SitemapPage = () => {
  const t = useTranslations("sitemap");
  const tNav = useTranslations("navigation");
  const locale = useLocale();
  const container = useRef();
  const headerRef = useRef();
  const sectionsRef = useRef([]);

  const siteLinks = [
    { name: tNav("home"), path: "/" },
    { name: tNav("portfolio"), path: "/portfolio" },
    { name: tNav("photos"), path: "/photos" },
    { name: tNav("about"), path: "/about" },
    { name: tNav("contact"), path: "/contact" },
    { name: t("sitemap"), path: "/sitemap" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });

      gsap.delayedCall(1.1, () => {
        sectionsRef.current.forEach((section) => {
          if (section) {
            gsap.to(section.querySelectorAll("p, a"), {
              y: 0,
              duration: 1,
              stagger: 0.08,
              ease: "power3.out",
            });
          }
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root>
      <div className="sitemap-page" ref={container}>
        <div className="container">
          <div className="col">
            <div
              className="sitemap-section"
              ref={(el) => (sectionsRef.current[0] = el)}
            >
              <div className="title">
                <p>{t("pages")}</p>
              </div>
              {siteLinks.map((link, index) => (
                <div className="item" key={index}>
                  <Link href={link.path}>
                    <p>{link.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="col">
            <div className="sitemap-header">
              <h1 ref={headerRef}>{t("title")}</h1>
            </div>
            <div
              className="sitemap-description"
              ref={(el) => (sectionsRef.current[1] = el)}
            >
              <div className="title">
                <p>{t("description")}</p>
              </div>
              <div className="item">
                <p>{t("descriptionText")}</p>
              </div>
            </div>
            <div
              className="sitemap-info"
              ref={(el) => (sectionsRef.current[2] = el)}
            >
              <div className="title">
                <p>{t("lastUpdate")}</p>
              </div>
              <div className="item">
                <p>2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default SitemapPage;
