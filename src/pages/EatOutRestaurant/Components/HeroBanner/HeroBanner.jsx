import React from "react";
import { PropTypes } from "prop-types";
import { Breadcrumbs } from "components/Breadcrumbs";
import "./HeroBanner.scss";
import { CheckInStripe } from "../CheckInStripe";

export const HeroBanner = ({ restaurant }) => {
  return (
    <div className="hero-banner">
      <div
        className="hero-banner__image"
        style={{ backgroundImage: `url(${restaurant.image})` }}
      >
        <div className="hero-banner__image-filter"></div>
      </div>
      <div className="hero-banner__container">
        <Breadcrumbs />
        <div className="hero_banner__info">
          <ul className="hero-banner__categories">
            {restaurant.categories.map((category) => (
              <li className="hero-banner__category" key={category}>
                {category}
              </li>
            ))}
          </ul>
          <h1 className="hero-banner__title">{restaurant.name}</h1>
        </div>
      </div>
      <CheckInStripe restaurant={restaurant} />
    </div>
  );
};

HeroBanner.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
