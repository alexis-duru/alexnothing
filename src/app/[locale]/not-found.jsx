"use client";
import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import "./not-found.css";

import { gsap } from "gsap";

const NotFound = () => {
  const t = useTranslations("notFound");
  const container = useRef();
  const titleRef = useRef();
  const codeRef = useRef();
  const descRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(codeRef.current, {
        y: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      tl.to(
        titleRef.current,
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8",
      );

      tl.to(
        descRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6",
      );

      tl.to(
        linkRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="not-found-page" ref={container}>
      <div className="not-found-content">
        <div className="code-wrapper">
          <span className="error-code" ref={codeRef}>
            404
          </span>
        </div>
        <div className="title-wrapper">
          <h1 ref={titleRef}>{t("title")}</h1>
        </div>
        <p className="description" ref={descRef}>
          {t("description")}
        </p>
        <Link href="/" className="back-link" ref={linkRef}>
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
