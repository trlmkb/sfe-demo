import React from "react";
import "./UserWidget.scss";
import { ReactComponent as Settings } from "../../assets/svg/settings.svg";
import { ReactComponent as LogOut } from "../../assets/svg/log_out.svg";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";
import { useContext } from "react"; //TODO Find out if this is needed?
import { UserContext } from "../../features/UserContext";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import classNames from "classnames";

export const DropdownMenu = () => {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);
  const { userData, handleUserLogout } = useContext(UserContext);

  const userLogout = () => {
    handleUserLogout();
  };

  return (
    <div
      className="user"
      onMouseLeave={() => setIsOpen((prev) => prev.false)}
      onMouseEnter={() => setIsOpen((prev) => !prev)}
    >
      <div className="user__spacing">
        <img src={userData.userImage} alt="user-avatar" />
      </div>
      <button
        aria-label="user"
        className={classNames("user__arrow", { "user__arrow--active": isOpen })}
        {...buttonProps}
      >
        <Arrow />
      </button>

      <ul role="menu" className={isOpen ? "user__menu" : "user__menu--off"}>
        <li>
          <button
            {...itemProps[0]}
            aria-label="Settings button"
            className="user__menu-button"
          >
            <Settings className="user__menu-icon" />
            <div aria-hidden="true" className="user__menu-text">
              Settings
            </div>
          </button>
        </li>
        <li>
          <button
            {...itemProps[1]}
            aria-label="Logout button"
            className="user__menu-button"
            onClick={userLogout}
          >
            <LogOut className="user__menu-icon" />
            <div aria-hidden="true" className="user__menu-text">
              Log out
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};
