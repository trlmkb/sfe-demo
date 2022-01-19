import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as StarSvg } from "../../../assets/svg/star.svg";

export const RatingShell = ({ ratingData }) => {
  return (
    <button
      aria-expanded={ratingData.isOpen}
      aria-controls="accordion-content"
      aria-label={`Restaurant ${ratingData.rating} rating`}
      onClick={ratingData.toggleVisibility}
      className={classNames("rating")}
      onMouseEnter={ratingData.toggleVisibility}
    >
      <StarSvg
        className={classNames("rating__star", {
          "rating__star--rated": ratingData.isStarClicked,
        })}
      />
      <p>{ratingData.rating}</p>
    </button>
  );
};
RatingShell.propTypes = {
  ratingData: PropTypes.object.isRequired,
};
