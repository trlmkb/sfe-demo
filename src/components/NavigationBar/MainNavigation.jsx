import React from "react";
import { ReactComponent as DashboardIcon } from "../../assets/svg/DashboardIcon.svg";
import { ReactComponent as ReservationIcon } from "../../assets/svg/ReservationIcon.svg";
import { ReactComponent as EatOutIcon } from "../../assets/svg/EatOutIcon.svg";
import { Link } from "react-router-dom";

export const MainNavigation = () => {
  return (
    <ul>
      <li className="navBar__menu__Item">
        <Link className="navBar__menu__link" to="/">
          <DashboardIcon className="navBar__menu__icon" />
          Dashboard
        </Link>
      </li>
      <li className="navBar__menu__Item">
        <Link className="navBar__menu__link" to="/reservations">
          <ReservationIcon className="navBar__menu__icon" />
          Reservations
        </Link>
      </li>
      <li className="navBar__menu__Item">
        <Link className="navBar__menu__link" to="/eatout">
          <EatOutIcon className="navBar__menu__icon" />
          Eat-Out
        </Link>
      </li>
    </ul>
  );
};
