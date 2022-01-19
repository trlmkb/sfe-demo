import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import {
  checkLocalStorageRestaurant,
  removeLocalStorage,
  addLocalStorage,
} from "utils/localStorageData";
import { RatingShell } from "./components/RatingShell";
import { RatingShellExpanded } from "./components/RatingShellExpanded";
import { UserContext } from "features/UserContext";
import { findRating } from "../../utils/restaurant-utils";
import "./rating.scss";

export const Rating = ({ restaurant }) => {
  const [restaurantData, setRestaurantData] = useState(restaurant);
  const [rating, setRating] = useState(findRating(restaurantData.reviews));
  const [isStarClicked, setIsStarClicked] = useState(false);
  const [hover, setHover] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const toggleVisibility = () => setIsOpen(!isOpen);
  const { userData } = useContext(UserContext);

  const newUserRating = (indexParam) => {
    toggleVisibility();
    setIsStarClicked(true);
    const newUserRating = {
      userName: userData.userName,
      id: userData.id,
      rating: indexParam,
    };
    const hasUserRated = restaurantData.reviews.find((review) => {
      return review.id === newUserRating.id;
    });
    if (hasUserRated) {
      restaurantData.reviews.pop();
    }
    restaurantData.reviews.push(newUserRating);
    removeLocalStorage("savedRestaurants", restaurantData);
    addLocalStorage("savedRestaurants", restaurantData);
    setRating(findRating(restaurantData.reviews));
  };

  useEffect(() => {
    const data = checkLocalStorageRestaurant("savedRestaurants", restaurant);
    if (data) {
      setRestaurantData(data);
      setRating(findRating(data.reviews));
      const isReviewed = data.reviews.find((item) => {
        return item.id === userData.id;
      });
      setIsStarClicked(!!isReviewed);
    }
  }, [restaurant, userData.id]);

  const ratingData = {
    isOpen,
    isStarClicked,
    rating,
    hover,
    newUserRating,
    setHover,
    toggleVisibility,
  };

  return (
    <>
      {!isOpen && <RatingShell ratingData={ratingData} />}
      {isOpen && <RatingShellExpanded ratingData={ratingData} />}
    </>
  );
};
Rating.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
