import React from "react";
import "./UserWidget.scss";
import { ReactComponent as Bell } from "../../assets/svg/bell.svg";

export const BellNotification = () => (
  <Bell aria-label="notification bell" className="bell" />
);
