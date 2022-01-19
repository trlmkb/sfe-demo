import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as StarSvg } from "../../../assets/svg/star.svg";
import { motion } from "framer-motion";

export const RatingShellExpanded = ({ ratingData }) => {
  return (
    <motion.div
      animate={{ x: 55 }}
      transition={{ ease: "easeOut", duration: 0.25 }}
      className="rating--expanded"
      onMouseLeave={ratingData.toggleVisibility}
      id="accordion-content"
    >
      {[1, 2, 3, 4, 5].map((indexOfStar) => {
        return (
          <button
            onClick={() => ratingData.newUserRating(indexOfStar)}
            key={indexOfStar}
            className="rating__star-button"
            aria-label={`${indexOfStar} star rating`}
          >
            <StarSvg
              className={classNames("rating__star", {
                "rating__star--off":
                  indexOfStar > (ratingData.hover || ratingData.rating),
              })}
              onMouseEnter={() => ratingData.setHover(indexOfStar)}
              onMouseLeave={() => ratingData.setHover(ratingData.rating)}
            />
          </button>
        );
      })}

      <p>&nbsp;{ratingData.rating}</p>
    </motion.div>
  );
};
RatingShellExpanded.propTypes = {
  ratingData: PropTypes.object.isRequired,
};
