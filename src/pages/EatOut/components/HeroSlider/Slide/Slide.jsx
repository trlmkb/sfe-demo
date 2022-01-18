import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Slide.scss";
import { Button } from "components/Button";
import { slugify } from "../../../../../utils/slugify";

export const Slide = ({ restaurant }) => (
  <div className="slide">
    <div
      className="slide__image"
      style={{ backgroundImage: `url(${restaurant.image})` }}
    >
      <div className="slide__image-filter"></div>
    </div>
    <div className="slide__info-box">
      <div className="slide__title">
        <p className="slide__slogan">{restaurant.slogan}</p>
        <h2>{restaurant.name}</h2>
      </div>
      <p className="slide__description">{restaurant.description}</p>
      <Link
        className="slide__link"
        to={`/eatout/restaurant/${slugify(restaurant.name, restaurant.id)}`}
      >
        <Button label="learn more" variant="primary" />
      </Link>
    </div>
  </div>
);

Slide.propTypes = {
  restaurant: PropTypes.object,
};
