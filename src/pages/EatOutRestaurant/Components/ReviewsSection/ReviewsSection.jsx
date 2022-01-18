import React, { useState, useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { ReviewsList } from "./Components/ReviewsList";
import { Button } from "components/Button";
import { AnimatePresence } from "framer-motion";
import { ReviewsModal } from "./Components/ReviewsModal";
import "./ReviewsSection.scss";

export const ReviewsSection = ({ reviews }) => {
  const defaultSize = 3;
  //maxHeight - maximum height in px inside of a grid without distortions (infomation section + location section + gap)
  const maxHeight = document.querySelector(
    ".eatout-restaurant__reviews"
  )?.offsetHeight;
  const [collapsed, setCollapsed] = useState(true);
  const [modalRequired, setModalRequired] = useState(false);
  const reviewsSectionRef = useRef();

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  useLayoutEffect(() => {
    if (
      reviewsSectionRef.current.offsetHeight >= maxHeight &&
      window.innerWidth > 767
    ) {
      setCollapsed(true);
      setModalRequired(true);
    }
  }, [collapsed, maxHeight]);

  return (
    <div className="reviews-section" ref={reviewsSectionRef}>
      <h2 className="reviews-section__heading">Reviews</h2>
      <ReviewsList
        reviews={reviews}
        numberOfReviews={collapsed ? defaultSize : reviews.length}
        defaultSize={defaultSize}
      />
      {reviews.length > defaultSize && (
        <Button
          label={collapsed ? "show more" : "show less"}
          variant="primary"
          onClick={handleClick}
        />
      )}

      <AnimatePresence exitBeforeEnter={true}>
        {modalRequired && (
          <ReviewsModal setModalRequired={setModalRequired}>
            <h2 className="reviews-section__modal-heading">Reviews</h2>
            <ReviewsList
              reviews={reviews}
              numberOfReviews={reviews.length}
              defaultSize={1}
            />
          </ReviewsModal>
        )}
      </AnimatePresence>
    </div>
  );
};

ReviewsSection.propTypes = {
  reviews: PropTypes.array.isRequired,
};
