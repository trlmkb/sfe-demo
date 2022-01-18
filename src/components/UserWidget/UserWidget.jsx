import React from "react";
import "./UserWidget.scss";
import { ReactComponent as Settings } from "../../assets/svg/settings.svg";
import { ReactComponent as LogOut } from "../../assets/svg/log_out.svg";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";
import { useContext } from "react";
import { UserContext } from "../../features/UserContext";

export const DropdownMenu = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const { userData, handleUserLogout } = useContext(UserContext);

  const userLogout = () => {
    handleUserLogout();
  };

  return (
    <div
      className="user"
      onMouseEnter={() => setShowMenu((prev) => !prev)}
      onMouseLeave={() => setShowMenu((prev) => !prev)}
    >
      <div className="user__spacing">
        <img src={userData.userImage} alt="user-avatar" />
      </div>
      <Arrow className="user__arrow" />
      {showMenu && (
        <ul className="user__menu">
          <li>
            <button className="user__menu-button">
              <Settings className="user__menu-icon" />
              <div className="user__menu-text">Settings</div>
            </button>
          </li>
          <li>
            <button className="user__menu-button" onClick={userLogout}>
              <LogOut className="user__menu-icon" />
              <div className="user__menu-text">Log out</div>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
