"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import "../home.css";
import Footer from "../components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";

let isInitialLoad = true;

export default function Home() {
  const t = useTranslations("home");
  const containerRef = useRef(null);
  const preloaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop-main",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1",
    );
  }, []);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      if (showPreloader) {
        tl.to(progressBarRef.current, {
          scaleX: 1,
          duration: 4,
          ease: "power1.inOut",
        });

        tl.set(progressBarRef.current, { transformOrigin: "right" }).to(
          progressBarRef.current,
          {
            scaleX: 0,
            duration: 1,
            ease: "power2.in",
          },
        );

        tl.to(preloaderRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.5,
          ease: "hop-main",
          onComplete: () => setShowPreloader(false),
        });

        tl.to(
          ".hero-title .line h1",
          {
            y: 0,
            stagger: 0.1,
            duration: 1.5,
            ease: "power4.out",
          },
          "-=0.5",
        );
      } else {
        gsap.to(".hero-title .line h1", {
          y: 0,
          stagger: 0.1,
          delay: 0.5,
          duration: 1.5,
          ease: "power4.out",
        });
      }
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <>
      {showPreloader && (
        <div className="pre-loader" ref={preloaderRef}>
          <div className="progress-bar" ref={progressBarRef}></div>
        </div>
      )}
      <div className="home-page" ref={containerRef}>
        <div className="hero-img">
          <img src="/home/hero-img.jpg" alt="" />
        </div>
        <div className="hero-title">
          <div className="line" style={{ overflow: "hidden" }}>
            <h1 style={{ transform: "translateY(100%)" }}>{t("heroLine1")}</h1>
          </div>
          <div className="line" style={{ overflow: "hidden" }}>
            <h1 style={{ transform: "translateY(100%)" }}>{t("heroLine2")}</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
