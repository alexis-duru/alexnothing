"use client";
import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import "./about.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ReactLenis } from "@studio-freight/react-lenis";
import { onRouteReady } from "../../lib/routeTransition";

const AboutPage = () => {
  const t = useTranslations("about");
  const container = useRef();
  const aboutCopyRef = useRef(null);

  useEffect(() => {
    let splitInstances = [];
    let cancelled = false;
    let cancelRouteReady = () => {};
    let resizeObserver = null;

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
                delay: isDesktop ? 0.2 : 0,
                duration: 1.2,
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

      // Le ResizeObserver déclenche setupSplit dès l'observe : on attend la fin de la transition
      cancelRouteReady = onRouteReady(() => {
        if (cancelled) return;

        resizeObserver = new ResizeObserver(() => {
          setupSplit();
          ScrollTrigger.refresh();
        });

        if (container.current) resizeObserver.observe(container.current);
      });
    };

    init();

    return () => {
      cancelled = true;
      cancelRouteReady();
      resizeObserver?.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      splitInstances.forEach((si) => si.revert());
    };
  }, []);

  useGSAP(
    (context, contextSafe) => {
      gsap.set(".about-copy", { autoAlpha: 0 });

      return onRouteReady(
        contextSafe(() => {
          gsap.to(".about-portrait", {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            delay: 0.2,
            duration: 0.9,
            ease: "power4.inOut",
          });

          gsap.to(".about-copy-title h1", {
            y: 0,
            delay: 0.35,
            duration: 1.1,
            ease: "power4.out",
          });

          gsap.to(".about-copy", {
            autoAlpha: 1,
            delay: 0.45,
            duration: 0.6,
            ease: "power2.out",
          });
        }),
      );
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
                  alt="Portrait de Alex Nothing, réalisé en 2026 par le photographe Maeldan en Studio à Bordeaux"
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
