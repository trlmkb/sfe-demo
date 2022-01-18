import React from "react";
import { PropTypes } from "prop-types";
import { Breadcrumbs } from "components/Breadcrumbs";
import { motion } from "framer-motion";
import { fromToptoBottomAnimation } from "../../../../animations";
import "./HeroBanner.scss";
import { CheckInStripe } from "../CheckInStripe";

export const HeroBanner = ({ restaurant }) => {
  return (
    <motion.div
      className="hero-banner"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay: 0.7, duration: 0.5 }}
      variants={fromToptoBottomAnimation}
    >
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
    </motion.div>
  );
};

HeroBanner.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
