import React from "react";
import { Link } from "@/i18n/routing";
import "./MenuBar.css";
import MenuBtn from "../MenuBtn/MenuBtn";

const MenuBar = ({
  isOpen,
  toggleMenu,
  closeMenu,
  onSwitchLocale,
  localeSwitchLabel,
}) => {
  return (
    <div className="menu-bar">
      <div className="menu-toggle-wrapper">
        <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>

      <div className="logo" onClick={closeMenu}>
        <Link href="/">Stefan Markovic</Link>
      </div>

      <div className="menu-bar-right">
        <button className="locale-switch" onClick={onSwitchLocale}>
          {localeSwitchLabel}
        </button>
        <div className="portfolio-year">
          <p>&copy; 2024</p>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
