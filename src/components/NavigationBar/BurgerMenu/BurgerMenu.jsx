import React, { useState } from "react";
import { MainNavigation } from "../MainNavigation";
import { ReactComponent as Settings } from "../../../assets/svg/settings.svg";
import { ReactComponent as LogOut } from "../../../assets/svg/log_out.svg";
import { useContext } from "react";
import { UserContext } from "../../../features/UserContext";
import "./BurgerMenu.scss";
import Burger from "react-css-burger";
import { motion } from "framer-motion";
import { fromRightTopCornerAnimation } from "../../../animations";

export const BurgerMenu = () => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHamburgerToggle = () => {
    setMenuOpen(!menuOpen);
    setHamburgerActive(!hamburgerActive);
  };

  window.onclick = ({ target }) => {
    if (
      !target.classList.contains("burger_hamburger-box__3lYk7") &&
      !target.classList.contains("burger_hamburger-inner__14XT2")
    ) {
      setMenuOpen(false);
      setHamburgerActive(false);
    }
  };

  const { handleUserLogout } = useContext(UserContext);

  const userLogout = () => {
    handleUserLogout();
  };

  return (
    <div className="burger-menu">
      <Burger
        className="burger-menu__icon"
        onClick={handleHamburgerToggle}
        active={hamburgerActive}
        burger="spin"
        color="white"
        hoverOpacity={0.8}
        marginTop="0"
      />
      {menuOpen && (
        <motion.ul
          className="burger-menu__list"
          initial="initial"
          animate="animate"
          variants={fromRightTopCornerAnimation}
        >
          <MainNavigation />
          <button className="burger-menu__list-item">
            <Settings className="burger-menu__list-icon" />
            Settings
          </button>
          <button className="burger-menu__list-item" onClick={userLogout}>
            <LogOut className="burger-menu__list-icon" />
            Log out
          </button>
        </motion.ul>
      )}
    </div>
  );
};
