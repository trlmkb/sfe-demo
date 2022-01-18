import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./ErrorScreen.scss";

export const ErrorScreen = ({ fullScreen, message }) => {
  return (
    <div
      className={classNames("error__container", {
        "error__container--full-screen": fullScreen,
      })}
    >
      <h2 className="error__msg">{message}</h2>
    </div>
  );
};

ErrorScreen.propTypes = {
  fullScreen: PropTypes.bool,
  message: PropTypes.string.isRequired,
};
