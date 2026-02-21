"use client";
import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import "./contact.css";

import { gsap } from "gsap";
import { ReactLenis } from "@studio-freight/react-lenis";

const Page = () => {
  const t = useTranslations("contact");
  const container = useRef();
  const headerRef = useRef();
  const sectionsRef = useRef([]);

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
          gsap.to(section.querySelectorAll("p"), {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          });
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root>
      <div className="contact-page" ref={container}>
        <div className="container">
          <div className="col">
            <div className="where" ref={(el) => (sectionsRef.current[0] = el)}>
              <div className="title">
                <p>{t("musicPlatforms")}</p>
              </div>
              <div className="item">
                <p>
                  <a
                    href="https://open.spotify.com/intl-fr/artist/5IeewgS3Eds4y2s9A663lN?si=2Pj4e1boQFq69LyxjL5GMw"
                    target="_blank"
                  >
                    Spotify
                  </a>
                </p>
              </div>
              <div className="item">
                <p>
                  <a
                    href="https://music.apple.com/fr/artist/alex-nothing/1858966255"
                    target="_blank"
                  >
                    Apple Music
                  </a>
                </p>
              </div>
              <div className="item">
                <p>
                  <a
                    href="https://www.deezer.com/fr/artist/69449"
                    target="_blank"
                  >
                    Deezer
                  </a>
                </p>
              </div>
              <div className="item">
                <p>
                  <a href="https://soundcloud.com/alexnothing" target="_blank">
                    Soundcloud
                  </a>
                </p>
              </div>
              <div className="item">
                <p>
                  <a
                    href="https://alexnothingmusic.bandcamp.com/"
                    target="_blank"
                  >
                    Bandcamp
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="contact-header">
              <h1 ref={headerRef}>{t("title")}</h1>
            </div>
            <div
              className="socials"
              ref={(el) => (sectionsRef.current[2] = el)}
            >
              <div className="title">
                <p>{t("socials")}</p>
              </div>
              <div className="item">
                <p>
                  <a
                    href="https://www.instagram.com/alexnothingmusic"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </p>
              </div>
              <div className="item">
                <p>
                  <a href="https://tiktok.com/@alexnothing" target="_blank">
                    Tiktok
                  </a>
                </p>
              </div>
              <div className="item">
                <p>
                  <a
                    href="https://www.facebook.com/alexnothingmusic"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </p>
              </div>
            </div>
            <div className="mail" ref={(el) => (sectionsRef.current[3] = el)}>
              <div className="title">
                <p>{t("mail")}</p>
              </div>
              <div className="item">
                <p>
                  <a href="mailto:alexnothing.music@gmail.com">
                    alexnothing.music@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default Page;
