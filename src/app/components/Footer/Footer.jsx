"use client";
import React from "react";
import { useTranslations } from "next-intl";
import "./Footer.css";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <>
      <div className="footer">
        <div className="footer-item">
          <p>{t("rights")}</p>
        </div>
        <div className="footer-item">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
