"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import "./MenuBar.css";
import MenuBtn from "../MenuBtn/MenuBtn";

const MenuBar = ({
  isOpen,
  toggleMenu,
  onSwitchLocale,
  onNavigate,
  localeSwitchLabel,
}) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const franceTime = now.toLocaleTimeString("fr-FR", {
        timeZone: "Europe/Paris",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(franceTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="menu-bar">
      <div className="menu-bar-left">
        <button className="locale-switch" onClick={onSwitchLocale}>
          {localeSwitchLabel}
        </button>
        <div className="menu-time">
          <p>
            Bordeaux, <span>{time}</span>
          </p>
        </div>
      </div>
      <div className="logo">
        <Link href="/" onClick={(event) => onNavigate(event, "/")}>
          <p>Alex Nothing</p>
        </Link>
      </div>
      <div className="menu-toggle-wrapper">
        <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
    </div>
  );
};

export default MenuBar;
