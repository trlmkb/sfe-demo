import React from "react";
import PropTypes from "prop-types";
import "./EatOutSection.scss";

import { EatOutWidget } from "./EatOutWidget/EatOutWidget";
import { findRating, listRatings } from "utils/restaurant-utils";
import { RestaurantCard } from "components/RestaurantCard/RestaurantCard";
import { ErrorScreen } from "components/ErrorScreen/ErrorScreen";

export const EatOutSection = ({ restaurants, dataError, dataErrorMsg }) => {
  if (dataError) {
    return (
      <div className="eat-out__container">
        <ErrorScreen fullScreen={false} message={dataErrorMsg} />
      </div>
    );
  }

  return (
    <div className="eat-out__container">
      <div className="eat-out__grid">
        <div className="eat-out__item1">
          <EatOutWidget />
        </div>

        {restaurants.map((restaurant) => {
          const ratings = listRatings(restaurants);
          const rate = findRating(restaurant.reviews);
          if (rate === ratings[0]) {
            return (
              <div className="eat-out__item2" key={restaurant.name}>
                <RestaurantCard expanded={false} restaurant={restaurant} />
              </div>
            );
          }
          if (rate === ratings[1]) {
            return (
              <div className="eat-out__item3" key={restaurant.name}>
                <RestaurantCard expanded={false} restaurant={restaurant} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

EatOutSection.propTypes = {
  restaurants: PropTypes.array,
  dataError: PropTypes.bool,
  dataErrorMsg: PropTypes.string,
};
