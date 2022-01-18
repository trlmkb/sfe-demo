import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { HeartIcon } from "components/HeartIcon";
import { Button } from "components/Button";
import {
  checkLocalStorage,
  addLocalStorage,
  removeLocalStorage,
} from "utils/localStorageData";
import "./CheckInStripe.scss";

export const CheckInStripe = ({ restaurant }) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    liked
      ? removeLocalStorage("savedRestaurants", restaurant)
      : addLocalStorage("savedRestaurants", restaurant);
  };

  useEffect(() => {
    checkLocalStorage("savedRestaurants", restaurant, setLiked);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="check-in-stripe">
      <div className="check-in-stripe__actions">
        {/* TODO SFE21Z-54: substitute the following div with reviews element */}
        <div className="check-in-stripe__rating">4.5</div>
        <button className="check-in-stripe__heart-icon" onClick={handleLike}>
          <HeartIcon active={liked} />
        </button>
      </div>
      <div className="check-in-stripe__info">
        {restaurant.checkIns === 0 && "be the first one to check-in!"}
        {restaurant.checkIns === 1 && "1 person has already checked-in!"}
        {restaurant.checkIns > 1 &&
          `${restaurant.checkIns} people already checked-in!`}
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
