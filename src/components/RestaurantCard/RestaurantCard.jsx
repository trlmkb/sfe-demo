import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  checkLocalStorageRestaurant,
  addLocalStorage,
  removeLocalStorage,
} from "utils/localStorageData";
import { Card } from "./Card/Card";

import "./RestaurantCard.scss";

export const RestaurantCard = ({ restaurant, expanded }) => {
  const [favorite, setFavorite] = useState(restaurant);
  const [liked, setLiked] = useState(false);
  const handleHeartIconClick = () => {
    const newRestaurant = {
      ...favorite,
      isLiked: !liked,
    };
    setLiked(!liked);
    removeLocalStorage("savedRestaurants", newRestaurant);
    addLocalStorage("savedRestaurants", newRestaurant);
  };

  useEffect(() => {
    const data = checkLocalStorageRestaurant("savedRestaurants", favorite);
    if (data) {
      setFavorite(data);
      setLiked(data.isLiked);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Card
      restaurant={favorite}
      isExpanded={expanded}
      handleHeartIconClick={handleHeartIconClick}
      liked={liked}
    />
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.object,
  expanded: PropTypes.bool.isRequired,
};
