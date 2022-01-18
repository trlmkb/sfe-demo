import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./HeartIcon.scss";

import { ReactComponent as HeartIconSvg } from "../../assets/heart.svg";

export const HeartIcon = ({ active }) => {
  return (
    <HeartIconSvg
      className={classNames("heart-icon", {
        "heart-icon--active": active,
      })}
    />
  );
};

HeartIcon.propTypes = {
  active: PropTypes.bool,
};
