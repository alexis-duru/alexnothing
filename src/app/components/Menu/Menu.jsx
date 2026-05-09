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
  const routeTransitionRef = useRef(null);
  const pendingRouteRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRouteTransitioning, setIsRouteTransitioning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: t("home"), path: "/" },
    // { label: t("portfolio"), path: "/portfolio" },
    { label: t("photos"), path: "/photos" },
    { label: t("about"), path: "/about" },
    { label: t("contact"), path: "/contact" },
  ];

  const socials = [
    {
      label: tSocials("instagram"),
      url: "https://www.instagram.com/alexnothingmusic",
    },
    {
      label: tSocials("tiktok"),
      url: "https://www.tiktok.com/@alexnothingmusic",
    },
    {
      label: tSocials("facebook"),
      url: "https://www.facebook.com/alexnothing.music",
    },
  ];

  const address = [
    tMenu("address.name"),
    tMenu("address.city"),
    tMenu("address.country"),
  ];

  const contactInfo = [tMenu("contactInfo.email")];

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
        const menuLinks = menu.querySelectorAll(".link .link-wrapper");
        const socialItems = menu.querySelectorAll(".socials .line p");

        gsap.set(menu, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });
        gsap.set(menuLinks, { y: 60 });
        gsap.set(socialItems, { y: 30 });

        if (routeTransitionRef.current) {
          gsap.set(routeTransitionRef.current, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            pointerEvents: "none",
          });
        }

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
  }, [isAnimating]);

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

  const handleNavigate = useCallback(
    (event, targetPath) => {
      event.preventDefault();

      if (
        isAnimating ||
        isRouteTransitioning ||
        !routeTransitionRef.current ||
        pathname === targetPath
      ) {
        if (pathname === targetPath) {
          closeMenu();
        }
        return;
      }

      pendingRouteRef.current = targetPath;
      setIsRouteTransitioning(true);
      setIsOpen(false);

      gsap.to(routeTransitionRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.9,
        ease: "hop",
        onStart: () => {
          routeTransitionRef.current.style.pointerEvents = "all";
        },
        onComplete: () => {
          if (pendingRouteRef.current) {
            router.push(pendingRouteRef.current);
          }
        },
      });
    },
    [closeMenu, isAnimating, isRouteTransitioning, pathname, router],
  );

  useEffect(() => {
    if (!isRouteTransitioning || !routeTransitionRef.current) {
      return;
    }

    if (!pendingRouteRef.current || pathname !== pendingRouteRef.current) {
      return;
    }

    const overlay = routeTransitionRef.current;

    gsap.to(overlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 0.9,
      delay: 0.15,
      ease: "hop",
      onComplete: () => {
        overlay.style.pointerEvents = "none";
        gsap.set(overlay, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });
        pendingRouteRef.current = null;
        setIsRouteTransitioning(false);
      },
    });
  }, [pathname, isRouteTransitioning]);

  return (
    <div ref={container}>
      <div className="route-transition-layer" ref={routeTransitionRef} />

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
                  <Link
                    href={link.path}
                    onClick={(event) => handleNavigate(event, link.path)}
                  >
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
