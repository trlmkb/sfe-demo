import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./GiftIcon.scss";

import { ReactComponent as GiftIconSvg } from "../../assets/gift.svg";

export const GiftIcon = ({ active }) => {
  return (
    <GiftIconSvg
      className={classNames("gift-icon", {
        "gift-icon--active": active,
      })}
    />
  );
};

GiftIcon.propTypes = {
  active: PropTypes.bool,
};
