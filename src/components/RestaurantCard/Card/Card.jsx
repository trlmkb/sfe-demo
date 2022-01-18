import React, { useState, createRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";

import { ReactComponent as HeartSvg } from "../../../assets/svg/heart.svg";
import { ReactComponent as PersonSvg } from "../../../assets/svg/user.svg";
import { ReactComponent as StarSvg } from "../../../assets/svg/star.svg";
import { ReactComponent as EllipseSvg } from "../../../assets/svg/ellipse.svg";
import { ReactComponent as GlobeSvg } from "../../../assets/svg/globe.svg";
import { ReactComponent as PinSvg } from "../../../assets/svg/pin.svg";
import { Button } from "components/Button/Button";
import { Link } from "react-router-dom";
import { slugify } from "../../../utils/slugify";

export const Card = ({
  restaurant,
  rating,
  handleClick,
  isExpanded,
  newAddress,
}) => {
  const [readMore, setReadMore] = useState(false);
  const ref = createRef();
  const [showButton, setShowButton] = useState(false);
  useLayoutEffect(() => {
    if (ref.current.clientHeight < ref.current.scrollHeight) {
      setShowButton(true);
    }
  }, [ref]);
  const toggleClass = () => {
    setReadMore(!readMore);
  };
  const cardClassName = isExpanded ? "r-card--expanded" : "r-card";

  const expandedClassName = isExpanded
    ? "r-card__expanded-section"
    : "r-card__expanded-section--hidden";

  const heartClassName = restaurant.isFavorit
    ? "r-card__heart--clicked"
    : "r-card__heart";

  const checkInClassName = isExpanded
    ? "r-card__check-in--hidden"
    : "r-card__check-in";

  const detailsClassName = isExpanded
    ? "r-card__details--expanded"
    : "r-card__details";

  const buttonRowClassName = isExpanded
    ? "r-card__button-row"
    : "r-card__button-row--hidden";

  const descriptionClassName = readMore
    ? "r-card__description--more"
    : "r-card__description";

  const readMoreClassName = showButton
    ? "r-card__read-more"
    : "r-card__read-more--hidden";

  const readLabel = readMore ? "read-less" : "read-more";

  return (
    <section className={cardClassName}>
      <div
        className="r-card__photo"
        style={{
          backgroundImage: `url(${restaurant.image})`,
        }}
      >
        <div className="r-card__gradient">
          <div className="r-card__rating-row">
            <a className={checkInClassName} href="/reservations">
              <div className="r-card__check-wrapper">
                <PersonSvg className="r-card__person" />
                <p>{restaurant.checkIns}</p>
              </div>
            </a>
            <div className="r-card__rating">
              <div className="r-card__rating-wrapper">
                <StarSvg className="r-card__star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={detailsClassName}>
        <div className="r-card__categories-row">
          {restaurant.categories.map((category) => (
            <div className="r-card__category" key={category}>
              <span>{category}</span>
              <span>
                <EllipseSvg className="r-card__ellipse" />
              </span>
            </div>
          ))}
        </div>
        <div className="r-card__content-row">
          <Link
            to={`/eatout/restaurant/${slugify(restaurant.name, restaurant.id)}`}
            className="r-card__title-link"
          >
            <h3 className="r-card__title">{restaurant.name}</h3>
          </Link>
          <div className="r-card__heart-container">
            <HeartSvg
              className={heartClassName}
              onClick={(e) => handleClick(e)}
            />
          </div>
        </div>
        <div className="r-card__time">
          {restaurant.openingHours.map((hours) => (
            <div className="r-card__hours" key={hours.hours}>
              <span>{hours.hours}</span>
              <span>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;</span>
            </div>
          ))}
        </div>
        <div className={expandedClassName}>
          <a
            className="r-card__link"
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlobeSvg />
            <p>{newAddress}</p>
          </a>
          <div>
            <a
              className="r-card__link"
              href={
                "https://maps.google.com?q=" +
                `${restaurant.location.coordinates.lat}` +
                "," +
                `${restaurant.location.coordinates.lng}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <PinSvg />
              <p>{restaurant.location.address}</p>
            </a>
          </div>
          <p ref={ref} className={descriptionClassName}>
            {restaurant.description}
          </p>
        </div>
      </div>
      <div className={buttonRowClassName}>
        <a className="r-card__web-link" href="/reservations">
          <Button label="check-in" variant="primary" size="medium" />
        </a>
        <div className={readMoreClassName}>
          <Button
            onClick={toggleClass}
            label={readLabel}
            variant="secondary"
            size="medium"
          />
        </div>
      </div>
    </section>
  );
};

Card.propTypes = {
  restaurant: PropTypes.object.isRequired,
  rating: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  newAddress: PropTypes.string.isRequired,
};
