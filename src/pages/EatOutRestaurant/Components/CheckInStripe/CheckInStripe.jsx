import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { HeartIcon } from "components/HeartIcon";
import { Button } from "components/Button";
import {
  addLocalStorage,
  checkLocalStorageRestaurant,
  removeLocalStorage,
} from "utils/localStorageData";
import "./CheckInStripe.scss";
import { Rating } from "../../../../components/Rating/Rating";

export const CheckInStripe = ({ restaurant }) => {
  const [restaurantData, setRestaurantData] = useState(restaurant);
  const [checkedIn, setCheckedIn] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    checkLocalStorageRestaurant("savedRestaurants", restaurantData, setLiked);
    const newRestaurant = {
      ...restaurantData,
      isLiked: !liked,
    };
    setLiked(!liked);
    removeLocalStorage("savedRestaurants", newRestaurant);
    addLocalStorage("savedRestaurants", newRestaurant);
  };

  useEffect(() => {
    const data = checkLocalStorageRestaurant(
      "savedRestaurants",
      restaurantData
    );
    if (data) {
      setRestaurantData(data);
      setLiked(data.isLiked);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="check-in-stripe">
      <div className="check-in-stripe__actions">
        <div className="check-in-stripe__rating">
          <Rating restaurant={restaurantData} />
        </div>
        <button className="check-in-stripe__heart-icon" onClick={handleLike}>
          <HeartIcon active={liked} />
        </button>
      </div>
      <div className="check-in-stripe__info">
        {restaurantData.checkIns === 0 && "be the first one to check-in!"}
        {restaurantData.checkIns === 1 && "1 person has already checked-in!"}
        {restaurantData.checkIns > 1 &&
          `${restaurantData.checkIns} people already checked-in!`}
      </div>
      <div className="check-in-stripe__check-in">
        <Button variant="secondary" label="invite" />
        <div
          className={classNames({
            "check-in-stripe__button--checked": checkedIn,
          })}
        >
          <Button
            variant="primary"
            onClick={() => setCheckedIn(true)}
            label={checkedIn ? "checked-in" : "check-in"}
          />
        </div>
      </div>
    </div>
  );
};

CheckInStripe.propTypes = {
  restaurant: PropTypes.object.isRequired,
};
