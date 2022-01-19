import "./navigation-bar.scss";
import React from "react";
import { ReactComponent as TopBarLogo } from "../../assets/svg/TopBarLogo.svg";
import { BellNotification } from "../../components/UserWidget/Bell.jsx";
import { DropdownMenu } from "../../components/UserWidget/UserWidget.jsx";
import { HashLink as Link } from "react-router-hash-link";
import { MainNavigation } from "./MainNavigation.jsx";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";

export const NavigationBar = () => {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  return (
    <nav className="navBar">
      <div className="navBar__container">
        <div className="navBar__logo">
          <Link scroll={(el) => scrollWithOffset(el)} to="#main">
            <TopBarLogo aria-label="skip to main content" />
          </Link>
        </div>
        <div
          className="navBar__menu navBar--desktop"
          role="navigation"
          aria-labelledby="nav1"
        >
          <MainNavigation />
        </div>
        <div className="navBar__bell navBar--desktop">
          <BellNotification />
        </div>
        <div className="navBar__notification-user navBar--desktop">
          <DropdownMenu />
        </div>
        <BurgerMenu />
      </div>
    </nav>
  );
};
