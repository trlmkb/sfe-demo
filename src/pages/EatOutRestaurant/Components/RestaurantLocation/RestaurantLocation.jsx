import React from "react";
import { Map } from "./Map";
import { PropTypes } from "prop-types";
import "./RestaurantLocation.scss";

export const RestaurantLocation = ({ restaurant }) => {
  return (
    <div className="location">
      <div className="location__title">Location</div>
      <Map restaurant={restaurant} />
    </div>
  );
};

RestaurantLocation.propTypes = {
  restaurant: PropTypes.object,
};
