"use client";
import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import "./about.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ReactLenis } from "@studio-freight/react-lenis";

const AboutPage = () => {
  const t = useTranslations("about");
  const container = useRef();
  const aboutCopyRef = useRef(null);

  useEffect(() => {
    let splitInstances = [];

    const init = async () => {
      const { default: SplitType } = await import("../../lib/SplitType/index");
      gsap.registerPlugin(CustomEase, ScrollTrigger);

      const setupSplit = () => {
        splitInstances.forEach((si) => si.revert());
        splitInstances = [];

        if (aboutCopyRef.current) {
          const paragraphs = aboutCopyRef.current.querySelectorAll("p");

          paragraphs.forEach((p) => {
            const split = new SplitType(p, {
              types: "lines",
              tagName: "span",
            });

            split.lines.forEach((line) => {
              const wrapper = document.createElement("div");
              wrapper.className = "line-wrapper";
              line.parentNode.insertBefore(wrapper, line);
              wrapper.appendChild(line);
            });
            splitInstances.push(split);
          });

          const spans =
            aboutCopyRef.current.querySelectorAll(".line-wrapper span");
          gsap.set(spans, { y: "100%" });

          // Détection de la largeur pour le délai
          const isDesktop = window.innerWidth > 900;

          ScrollTrigger.create({
            trigger: aboutCopyRef.current,
            start: isDesktop ? "top 95%" : "top 85%", // Plus sensible sur desktop si déjà visible
            onEnter: () => {
              gsap.to(spans, {
                y: 0,
                stagger: 0.05,
                delay: isDesktop ? 1.5 : 0, // Delay uniquement sur Desktop
                duration: 1.5,
                opacity: 1,
                ease: "power4.out",
                overwrite: true,
              });
            },
            // Optionnel: reset si on veut que ça se rejoue (sinon on laisse par défaut)
            toggleActions: "play none none none",
          });
        }
      };

      setupSplit();

      const resizeObserver = new ResizeObserver(() => {
        setupSplit();
        ScrollTrigger.refresh();
      });

      if (container.current) resizeObserver.observe(container.current);

      return () => resizeObserver.disconnect();
    };

    init();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      splitInstances.forEach((si) => si.revert());
    };
  }, []);

  useGSAP(
    () => {
      gsap.to(".about-portrait", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        delay: 0.8,
        duration: 1,
        ease: "power4.inOut",
      });

      gsap.to(".about-copy-title h1", {
        y: 0,
        delay: 1,
        duration: 1.5,
        ease: "power4.out",
      });
    },
    { scope: container },
  );

  return (
    <ReactLenis root>
      <div className="about-page" ref={container}>
        <div className="container">
          <div className="about-intro">
            <div className="col about-portrait-img">
              <div className="about-portrait">
                <img
                  src="/about/alex-nothing-portrait.webp"
                  alt="Alex Nothing"
                />
              </div>
            </div>
            <div className="col about-copy-wrapper">
              <div className="about-copy-title" style={{ overflow: "hidden" }}>
                <h1 style={{ transform: "translateY(100%)" }}>{t("bio")}</h1>
              </div>
              <div className="about-copy" ref={aboutCopyRef}>
                <p>{t("paragraph1")}</p>
                <p>{t("paragraph2")}</p>
                <p>{t("paragraph3")}</p>
                <p>{t("paragraph4")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default AboutPage;
