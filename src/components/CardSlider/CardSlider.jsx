import React, { useRef, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { ControlButton } from "../ControlButton";
import { RestaurantCard } from "components/RestaurantCard/RestaurantCard";
import "./CardSlider.scss";

export const CardSlider = ({ restaurants, title }) => {
  const [controlButtonsRequired, setControlButtonsRequired] = useState(false);
  const cardsContainerRef = useRef();

  const changeSlide = (direction) => {
    const currentPosition = cardsContainerRef.current.scrollLeft;
    const scrollBy = cardsContainerRef.current.offsetWidth;
    cardsContainerRef.current.scrollTo({
      left: currentPosition + scrollBy * (direction === "left" ? -1 : 1),
    });
  };

  useLayoutEffect(() => {
    cardsContainerRef.current.offsetWidth <
      cardsContainerRef.current.scrollWidth && setControlButtonsRequired(true);
  }, []);

  return (
    <div className="card-slider">
      <div className="card-slider__static-elements">
        <h2 className="card-slider__heading">{title}</h2>
        {controlButtonsRequired && (
          <>
            <ControlButton
              direction="left"
              onClick={() => changeSlide("left")}
            />
            <ControlButton
              direction="right"
              onClick={() => changeSlide("right")}
            />
          </>
        )}
      </div>
      <div className="card-slider__cards-container" ref={cardsContainerRef}>
        {restaurants.map((restaurant) => (
          <RestaurantCard
            restaurant={restaurant}
            key={restaurant.id}
            expanded={true}
          />
        ))}
      </div>
    </div>
  );
};

CardSlider.propTypes = {
  restaurants: PropTypes.array,
  title: PropTypes.string,
};
