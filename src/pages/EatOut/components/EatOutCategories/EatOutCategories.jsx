import React from "react";
import PropTypes from "prop-types";
import "./eataoutcategories.scss";
import { EatOutCategory } from "./Components/EatOutCategory";

export const EatOutCategories = ({ restaurants }) => {
  const categories = restaurants.reduce((accumulator, restaurant) => {
    restaurant.categories.map((category) => {
      if (Object.prototype.hasOwnProperty.call(accumulator, category)) {
        accumulator[category]++;
      } else {
        accumulator[category] = 1;
      }
      return accumulator;
    });
    return accumulator;
  }, {});
  return (
    <div className="categories__container">
      <h2 className="categories__heading">Categories</h2>
      <div className="categories__grid-container">
        {Object.keys(categories).map((category) => (
          <EatOutCategory
            key={category}
            title={category}
            places={categories[category]}
          />
        ))}
      </div>
    </div>
  );
};

EatOutCategories.propTypes = {
  restaurants: PropTypes.array,
};
