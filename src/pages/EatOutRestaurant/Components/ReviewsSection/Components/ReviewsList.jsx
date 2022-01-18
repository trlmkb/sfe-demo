import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { fromToptoBottomAnimation } from "../../../../../animations";
import { ReactComponent as Star } from "../../../../../assets/svg/star-filled.svg";
import "./ReviewsList.scss";

export const ReviewsList = ({ reviews, numberOfReviews, defaultSize }) => (
  <div className="reviews-list">
    {reviews.slice(0, numberOfReviews).map((review, index) => (
      <motion.div
        className="reviews-list__review"
        key={review.id}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          delay:
            index < defaultSize ? index * 0.1 : (index - defaultSize) * 0.1,
          type: "spring",
          damping: 25,
          stifness: 400,
        }}
        variants={fromToptoBottomAnimation}
      >
        <div className="reviews-list__name">{review.userName}</div>
        <div className="reviews-list__rating">
          <Star /> {review.rating}
        </div>
        <div className="reviews-list__comment">{review.comment}</div>
      </motion.div>
    ))}
  </div>
);

ReviewsList.propTypes = {
  reviews: PropTypes.array.isRequired,
  numberOfReviews: PropTypes.number.isRequired,
  defaultSize: PropTypes.number.isRequired,
};
