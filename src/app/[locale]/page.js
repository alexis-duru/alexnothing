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
  const numberRef = useRef(null); // Ref pour le texte du chiffre
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
        // Objet virtuel pour animer le chiffre de 0 à 100
        const progressValue = { val: 0 };

        // 1. Animation de la barre ET du chiffre en même temps
        tl.to(progressBarRef.current, {
          scaleX: 1,
          duration: 4,
          ease: "power1.inOut",
        });

        tl.to(
          progressValue,
          {
            val: 100,
            duration: 4,
            ease: "power1.inOut",
            onUpdate: () => {
              if (numberRef.current) {
                // padStart(3, "0") permet de garder le format 001, 010, 100
                numberRef.current.textContent = `${Math.round(progressValue.val).toString().padStart(3, "0")}%`;
              }
            },
          },
          "<", // Démarre en même temps que la barre
        );

        // 2. Disparition du chiffre avant la fin du preloader
        tl.to(".progress-number", {
          opacity: 0,
          duration: 0.5,
        });

        // 3. Animation de sortie de la barre
        tl.set(progressBarRef.current, { transformOrigin: "right" }).to(
          progressBarRef.current,
          {
            scaleX: 0,
            duration: 1,
            ease: "power2.in",
          },
        );

        // 4. Rideau final
        tl.to(preloaderRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.5,
          ease: "hop-main",
          onComplete: () => setShowPreloader(false),
        });

        tl.to(
          ".hero-title .line .text-translate",
          {
            y: 0,
            stagger: 0.1,
            duration: 1.5,
            ease: "power4.out",
          },
          "-=0.5",
        );
      } else {
        gsap.to(".hero-title .line .text-translate", {
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
          {/* Conteneur du chiffre */}
          <div className="progress-number">
            <span>[</span>
            <span ref={numberRef}>000%</span>
            <span>]</span>
          </div>

          <div className="progress-bar" ref={progressBarRef}></div>
        </div>
      )}

      <div className="home-page" ref={containerRef}>
        {/* ... reste du contenu ... */}
        <div className="hero-img">
          <img src="/img/hero/hero-3.webp" alt="" />
        </div>
        <h1 className="hero-title">
          <div className="line" style={{ overflow: "hidden" }}>
            <div
              className="text-translate text-1"
              style={{ transform: "translateY(100%)" }}
            >
              {t("heroLine1")}
            </div>
          </div>
          <div className="line" style={{ overflow: "hidden" }}>
            <div
              className="text-translate"
              style={{ transform: "translateY(100%)" }}
            >
              {t("heroLine2")}
            </div>
          </div>
        </h1>
      </div>
      <Footer />
    </>
  );
}
