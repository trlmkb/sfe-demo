import React, { useState, createRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { motion } from "framer-motion";

import { Rating } from "components/Rating/Rating";
import { shorten } from "utils/restaurant-utils";
import { HeartIcon } from "components/HeartIcon/HeartIcon";
import { ReactComponent as PersonSvg } from "../../../assets/svg/user.svg";
import { ReactComponent as EllipseSvg } from "../../../assets/svg/ellipse.svg";
import { ReactComponent as GlobeSvg } from "../../../assets/svg/globe.svg";
import { ReactComponent as PinSvg } from "../../../assets/svg/pin.svg";
import { Button } from "components/Button/Button";
import { Link } from "react-router-dom";
import { slugify } from "../../../utils/slugify";

export const Card = ({
  restaurant,
  handleHeartIconClick,
  isExpanded,
  liked,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [checkedInCount, setCheckedInCount] = useState(restaurant.checkIns);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const ref = createRef();
  const [showButton, setShowButton] = useState(false);
  const newAddress = shorten(restaurant.website);
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckIn = () => {
    if (!isCheckedIn) {
      setCheckedInCount((prev) => prev + 1);
    }
    if (isCheckedIn) {
      setCheckedInCount((prev) => prev - 1);
    }
    setIsCheckedIn(!isCheckedIn);
  };
  useLayoutEffect(() => {
    if (ref.current.clientHeight < ref.current.scrollHeight) {
      setShowButton(true);
    }
  }, [ref]);
  const toggleClass = () => {
    setReadMore(!readMore);
  };
  return (
    <div
      className={classNames("r-card", { "r-card--expanded": isExpanded })}
      onMouseEnter={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(!isHovered)}
    >
      <motion.div
        animate={isHovered ? { scale: 1.025 } : { scale: 1.0 }}
        transition={{ duration: 0.5 }}
        className={classNames("r-card__photo", {
          "r-card__photo--short": readMore,
        })}
        style={{
          backgroundImage: `url(${restaurant.image})`,
        }}
      >
        <div
          className={classNames("r-card__gradient", {
            "r-card__gradient--short": readMore,
          })}
        >
          <div className="r-card__rating-row">
            <div className="r-card__rating">
              <Rating restaurant={restaurant} />
            </div>
            <button
              aria-label={`checked ${isCheckedIn ? `in` : "out"}`}
              onClick={() => handleCheckIn()}
              className={classNames("r-card__check-in-button", {
                "r-card__check-in-button--checked": isCheckedIn,
              })}
            >
              <PersonSvg aria-hidden="true" className="r-card__person" />
              <p>{checkedInCount}</p>
            </button>
          </div>
        </div>
      </motion.div>
      <div
        className={classNames("r-card__details", {
          "r-card__details--expanded": isExpanded,
        })}
      >
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
          <button
            aria-label={`add to favorites ${liked ? `clicked` : "not clicked"}`}
            onClick={() => handleHeartIconClick()}
          >
            <HeartIcon aria-hidden="true" active={liked} />
          </button>
        </div>
        <div className="r-card__time">
          {restaurant.openingHours.length > 1 && (
            <div>
              <span>
                I-V
                <span className="r-card__spacer" />
                {restaurant.openingHours[0].hours}
              </span>
              <span>
                <span className="r-card__spacer--wider" />/
                <span className="r-card__spacer--wider" />
                VI-VII {restaurant.openingHours[1].hours}
              </span>
            </div>
          )}
          {restaurant.openingHours.length === 1 && (
            <span>
              I-V
              <span className="r-card__spacer" />
              {restaurant.openingHours[0].hours}
            </span>
          )}
        </div>
        <div
          className={classNames("r-card__expanded-section", {
            "r-card__expanded-section--hidden": !isExpanded,
          })}
        >
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
          <p
            ref={ref}
            className={classNames("r-card__description", {
              "r-card__description--more": readMore,
            })}
          >
            {restaurant.description}
          </p>
        </div>
      </div>
      <div
        className={classNames("r-card__button-row", {
          "r-card__button-row--hidden": !isExpanded,
        })}
      >
        <div
          className={classNames({
            "check-in-stripe__button--checked": isCheckedIn,
          })}
        >
          <Button
            onClick={() => handleCheckIn()}
            label={isCheckedIn ? "checked-in" : "check-in"}
            variant="primary"
            aria-current={isCheckedIn}
            size="medium"
          />
        </div>
        <div
          aria-hidden="true"
          className={classNames("r-card__read-more", {
            "r-card__read-more--hidden": !showButton,
          })}
        >
          <Button
            onClick={toggleClass}
            label={readMore ? "read-less" : "read-more"}
            variant="secondary"
            size="medium"
          />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  restaurant: PropTypes.object.isRequired,
  handleHeartIconClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  liked: PropTypes.bool,
};
