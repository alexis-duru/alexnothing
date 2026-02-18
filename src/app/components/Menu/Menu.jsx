"use client";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import "./Menu.css";
import MenuBar from "../MenuBar/MenuBar";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";

const Menu = () => {
  const t = useTranslations("navigation");
  const tMenu = useTranslations("menu");
  const tSocials = useTranslations("socials");
  const tLang = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const init = useRef(false);
  const container = useRef();
  const menuRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: t("home"), path: "/" },
    // { label: t("portfolio"), path: "/portfolio" },
    { label: t("photos"), path: "/photos" },
    { label: t("about"), path: "/about" },
    { label: t("contact"), path: "/contact" },
  ];

  const socials = [
    { label: tSocials("instagram"), url: "https://instagram.com/codegridweb" },
    { label: tSocials("linkedin"), url: "https://linkedin.com/codegridweb" },
    { label: tSocials("twitter"), url: "https://twitter.com/codegridweb" },
    { label: tSocials("facebook"), url: "https://facebook.com/codegridweb" },
  ];

  const address = [
    tMenu("address.name"),
    tMenu("address.street"),
    tMenu("address.city"),
    tMenu("address.country"),
  ];

  const contactInfo = [
    tMenu("contactInfo.email1"),
    tMenu("contactInfo.email2"),
    tMenu("contactInfo.phone"),
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1",
    );
  }, []);

  useGSAP(
    () => {
      if (menuRef.current) {
        const menu = menuRef.current;
        const menuLinks = menu.querySelectorAll(".link a");
        const socialItems = menu.querySelectorAll(".socials .line p");

        menuLinks.forEach((link) => {
          link.addEventListener("click", toggleMenu);
        });

        gsap.set(menu, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });
        gsap.set(menuLinks, { y: 60 });
        gsap.set(socialItems, { y: 30 });

        init.current = true;
      }
    },
    { scope: container },
  );

  const animateMenu = useCallback((open) => {
    if (!menuRef.current) {
      return;
    }

    const menu = menuRef.current;
    const menuLinks = menu.querySelectorAll(".link .link-wrapper");
    const socialsCols = menu.querySelectorAll(".socials .sub-col");

    setIsAnimating(true);

    if (open) {
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      gsap.to(menuLinks, {
        y: 0,
        stagger: 0.1,
        delay: 0.75,
        duration: 1.5,
        ease: "power4.out",
      });

      socialsCols.forEach((subCol) => {
        const socialCopy = subCol.querySelectorAll(".line p");
        gsap.to(socialCopy, {
          y: 0,
          stagger: 0.1,
          delay: 0.75,
          duration: 1.5,
          ease: "power4.out",
        });
      });
    } else {
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "hop",
        duration: 1.5,
        delay: 0.25,
        onComplete: () => {
          menu.style.pointerEvents = "none";
          gsap.set(menu, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });

          gsap.set(menuLinks, { y: 60 });
          socialsCols.forEach((subCol) => {
            const socialCopy = subCol.querySelectorAll(".line p");
            gsap.set(socialCopy, { y: 30 });
          });

          setIsAnimating(false);
        },
      });
    }
  }, []);

  useEffect(() => {
    if (init.current) {
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating) {
      setIsOpen((prevIsOpen) => {
        return !prevIsOpen;
      });
    }
  }, [isAnimating, isOpen]);

  const closeMenu = useCallback(() => {
    if (!isAnimating) {
      if (isOpen) {
        setIsOpen((prevIsOpen) => {
          return !prevIsOpen;
        });
      } else return;
    }
  }, [isAnimating, isOpen]);

  const switchLocale = useCallback(() => {
    const newLocale = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: newLocale });
  }, [locale, router, pathname]);

  return (
    <div ref={container}>
      <MenuBar
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        onSwitchLocale={switchLocale}
        localeSwitchLabel={tLang("switch")}
      />

      <div className="menu" ref={menuRef}>
        <div className="col col-1">
          <div className="socials">
            <div className="sub-col">
              {address.map((line, index) => (
                <div className="line" key={index}>
                  <p>{line}</p>
                </div>
              ))}
              <br />
              {contactInfo.slice(0, 2).map((line, index) => (
                <div className="line" key={index}>
                  <p>{line}</p>
                </div>
              ))}
            </div>
            <div className="sub-col">
              {socials.map((social, index) => (
                <div className="line" key={index}>
                  <p>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.label}
                    </a>
                  </p>
                </div>
              ))}
              <br />
              <div className="line">
                <p>{contactInfo[2]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-2">
          <div className="links">
            {links.map((link, index) => (
              <div className="link" key={index}>
                <div className="link-wrapper">
                  <Link href={link.path}>
                    <h1>{link.label}</h1>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
