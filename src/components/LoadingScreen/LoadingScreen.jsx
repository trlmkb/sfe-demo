import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./LoadingScreen.scss";

export const LoadingScreen = ({ fullScreen }) => {
  return (
    <div
      className={classNames("loading__container", {
        "loading__container--full-screen": fullScreen,
      })}
    >
      <div className="loading__screen">
        <div className="loading__bubble loading__bubble--1"></div>
        <div className="loading__bubble  loading__bubble--2"></div>
        <div className="loading__bubble  loading__bubble--3"></div>
        <div className="loading__bubble  loading__bubble--4"></div>
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  fullScreen: PropTypes.bool,
};
