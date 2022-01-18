import "./navigation-bar.scss";
import React from "react";
import { ReactComponent as TopBarLogo } from "../../assets/svg/TopBarLogo.svg";
import { BellNotification } from "../../components/UserWidget/Bell.jsx";
import { DropdownMenu } from "../../components/UserWidget/UserWidget.jsx";
import { Link } from "react-router-dom";
import { MainNavigation } from "./MainNavigation.jsx";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";

export const NavigationBar = () => {
  return (
    <nav className="navBar">
      <div className="navBar__container">
        <div className="navBar__logo">
          <Link to="/">
            <TopBarLogo />
          </Link>
        </div>
        <ul className="navBar__menu navBar--desktop">
          <MainNavigation />
        </ul>
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
