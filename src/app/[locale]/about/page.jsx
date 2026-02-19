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
  const tCv = useTranslations("cvItems");

  const container = useRef();
  const aboutCopyRef = useRef(null);
  const cvWrapperRef = useRef(null);
  const cvHeaderRef = useRef(null);
  const cvListRef = useRef(null);
  const heroImgRef = useRef(null);

  const cvItems = [
    { name: tCv("item1"), year: "2022 - Present" },
    { name: tCv("item2"), year: "2020 - 2022" },
    { name: tCv("item3"), year: "2019 - 2020" },
    { name: tCv("item4"), year: "2017 - 2019" },
    { name: tCv("item5"), year: "2016 - 2017" },
    { name: tCv("item6"), year: "2013 - 2017" },
    { name: tCv("item7"), year: "2012 - 2016" },
    { name: tCv("item8"), year: "2018 - Present" },
    { name: tCv("item9"), year: "2021 - Present" },
    { name: tCv("item10"), year: "2023" },
    { name: tCv("item11"), year: "2021 - 2022" },
  ];

  useEffect(() => {
    const init = async () => {
      const { default: SplitType } = await import("../../lib/SplitType/index");

      gsap.registerPlugin(CustomEase, ScrollTrigger);
      CustomEase.create(
        "hop2",
        "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1",
      );

      const applySplitType = (element) => {
        const splitTexts = element.querySelectorAll("h1, p");
        splitTexts.forEach((text) => {
          const split = new SplitType(text, {
            types: "lines",
            tagName: "span",
          });

          split.lines.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.className = "line-wrapper";
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });
        });
      };

      if (aboutCopyRef.current) {
        applySplitType(aboutCopyRef.current);
        gsap.to(aboutCopyRef.current.querySelectorAll(".line-wrapper span"), {
          y: 0,
          stagger: 0.05,
          delay: 1.5,
          duration: 1.5,
          ease: "power4.out",
        });
      }

      if (cvHeaderRef.current) {
        applySplitType(cvHeaderRef.current);
      }

      if (cvListRef.current) {
        applySplitType(cvListRef.current);
      }

      if (cvWrapperRef.current) {
        const cvHeaderSpans =
          cvHeaderRef.current.querySelectorAll(".line-wrapper span");
        const cvListSpans =
          cvListRef.current.querySelectorAll(".line-wrapper span");

        gsap.set([cvHeaderSpans, cvListSpans], { y: "100%" });

        ScrollTrigger.create({
          trigger: cvWrapperRef.current,
          start: "top 50%",
          onEnter: () => {
            gsap.to(cvHeaderSpans, {
              y: 0,
              stagger: 0.05,
              duration: 1.5,
              ease: "power4.out",
            });
            gsap.to(cvListSpans, {
              y: 0,
              stagger: 0.02,
              duration: 1.5,
              ease: "power4.out",
            });
          },
        });
      }

      if (heroImgRef.current) {
        ScrollTrigger.create({
          trigger: heroImgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const scale = 1 + self.progress * 0.5;
            gsap.to(heroImgRef.current.querySelector("img"), {
              scale: scale,
              ease: "none",
              duration: 0.1,
            });
          },
        });
      }
    };

    init();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      [aboutCopyRef, cvHeaderRef, cvListRef].forEach((ref) => {
        if (ref.current) {
          const splitTexts = ref.current.querySelectorAll("h1, h2, h3");
          splitTexts.forEach((text) => {
            text.querySelectorAll(".line-wrapper").forEach((wrapper) => {
              wrapper.replaceWith(...wrapper.childNodes);
            });
          });
        }
      });
    };
  }, []);

  useGSAP(
    () => {
      gsap.to(".about-portrait", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        delay: 0.8,
        duration: 1,
        ease: "hop",
      });

      gsap.to(".about-copy-wrapper .about-copy-title h1", {
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
                  alt="Photo of Alex Nothing - By Maeldan"
                />
              </div>
            </div>
            <div className="col about-copy-wrapper">
              <div className="about-copy-title">
                <h1>{t("bio")}</h1>
              </div>

              <div className="about-copy" ref={aboutCopyRef}>
                <p>{t("paragraph1")}</p>
                <br />
                <p>{t("paragraph2")}</p>
                <br />
                <p>{t("paragraph3")}</p>
                <br />
                <p>{t("paragraph4")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="about-hero-img" ref={heroImgRef}>
          <img src="/about/portrait-2-min.jpg" alt="Portrait" />
        </div> */}

        {/* <div className="container">
          <div className="cv-wrapper" ref={cvWrapperRef}>
            <div className="cv-header" ref={cvHeaderRef}>
              <h2>{t("cv")}</h2>
            </div>

            <div className="cv-list" ref={cvListRef}>
              {cvItems.map((item, index) => (
                <div className="cv-item" key={index}>
                  <div className="cv-name">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="cv-year">
                    <h3>{item.year}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </ReactLenis>
  );
};

export default AboutPage;
