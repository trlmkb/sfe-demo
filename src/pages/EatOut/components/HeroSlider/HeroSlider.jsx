import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Slide } from "./Slide";
import { ControlButton } from "../../../../components/ControlButton";
import "./HeroSlider.scss";

export const HeroSlider = ({ restaurants }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pause, setPause] = useState(false);
  const slidesContainerRef = useRef();

  const changeSlide = (slideNumber) => {
    const nextSlide = (slideNumber + restaurants.length) % restaurants.length;
    setCurrentSlide(nextSlide);
    if (slidesContainerRef.current)
      slidesContainerRef.current.style.transform = `translateX(${
        -100 * nextSlide
      }%)`;
  };

  const switchTo = (index) => {
    setPause(true);
    changeSlide(index);
    const resume = setTimeout(() => {
      if (slidesContainerRef.current) setPause(false);
    }, 10000);
    return () => {
      clearTimeout(resume);
    };
  };

  const slideshow = (delay) => {
    const playSlides = setTimeout(() => {
      // If displayed slide differs from a current slide in a state, it means that user has changed slides manually.
      // Automatic slide change is aborted when slides are being changed manually
      const displayedSlide = parseInt(
        document
          .querySelector(".hero-slider__paginator-bubble--selected")
          ?.getAttribute("value")
      );
      displayedSlide === currentSlide && changeSlide(currentSlide + 1);
      return () => {
        clearTimeout(playSlides);
      };
    }, delay);
  };

  useEffect(() => {
    !pause && slideshow(4000);
    // eslint-disable-next-line
  }, [currentSlide, pause]);

  return (
    <div className="hero-slider">
      <div className="hero-slider__slides-container" ref={slidesContainerRef}>
        {restaurants.map((restaurant, index) => (
          <Slide restaurant={restaurant} key={index} />
        ))}
      </div>

      <div className="hero-slider__static-elements">
        <div className="hero-slider__paginator">
          {/* Method to iterate over a number: */}
          {Array.from(Array(restaurants.length), (_instance, index) => {
            return (
              <button
                className={classNames("hero-slider__paginator-bubble", {
                  "hero-slider__paginator-bubble--selected":
                    index === currentSlide,
                })}
                onClick={() => switchTo(index)}
                key={index}
                value={index}
              ></button>
            );
          })}
        </div>

        <ControlButton
          direction="left"
          onClick={() => switchTo(currentSlide - 1)}
        />
        <ControlButton
          direction="right"
          onClick={() => switchTo(currentSlide + 1)}
        />
      </div>
    </div>
  );
};

HeroSlider.propTypes = {
  restaurants: PropTypes.array,
};
