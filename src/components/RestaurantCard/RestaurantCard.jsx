import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { findRating, shorten } from "../../utils/restaurant-utils";
import { Card } from "./Card/Card";

import "./RestaurantCard.scss";

export const RestaurantCard = ({ restaurant, expanded }) => {
  const [favorite, setFavorite] = useState(restaurant);
  const newAddress = shorten(restaurant.website);
  const rating = findRating(restaurant.reviews);
  const handleClick = () => {
    let storage = localStorage.getItem(favorite.name);
    if (storage !== null) {
      let newFavorite = {
        ...favorite,
        isFavorit: false,
      };
      setFavorite(newFavorite);
      localStorage.removeItem(favorite.name);
    } else {
      let newFavorite = {
        ...favorite,
        isFavorit: true,
      };
      setFavorite(newFavorite);
      localStorage.setItem(favorite.name, JSON.stringify(newFavorite));
    }
  };

  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem(favorite.name) || "0");
    if (getFavorites !== 0) {
      setFavorite(getFavorites);
    }
  }, [favorite.name]);

  return (
    <Card
      restaurant={favorite}
      isExpanded={expanded}
      newAddress={newAddress}
      rating={rating}
      handleClick={handleClick}
    />
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.object,
  expanded: PropTypes.bool.isRequired,
};
