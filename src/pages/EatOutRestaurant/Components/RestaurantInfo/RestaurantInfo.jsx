import React from "react";
import { PropTypes } from "prop-types";
import "./RestaurantInfo.scss";
import { ReactComponent as MapPinSVG } from "../../../../assets/svg/RestaurantInfoSVG/map-pin.svg";
import { ReactComponent as GlobeSVG } from "../../../../assets/svg/RestaurantInfoSVG/globe.svg";
import { ReactComponent as PhoneSVG } from "../../../../assets/svg/RestaurantInfoSVG/phone.svg";
import { ReactComponent as ClockSVG } from "../../../../assets/svg/RestaurantInfoSVG/clock.svg";
import { shorten } from "utils/restaurant-utils";

export const RestaurantInfo = ({ restaurant }) => {
  return (
    <div className="information">
      <div className="information__title">Information</div>
      <div className="information__content">
        <div className="information__content-row">
          <div className="information__content-item">
            <div className="information__content-item-icon">
              <MapPinSVG />
            </div>
            <div className="information__content-item-text">
              <div className="information__content-item-title">Address</div>
              <div className="information__content-item-subtitle">
                {restaurant.location.address}
              </div>
            </div>
          </div>
          <div className="information__content-item">
            <div className="information__content-item-icon">
              <GlobeSVG />
            </div>
            <div className="information__content-item-text">
              <div className="information__content-item-title">Website</div>
              <div className="information__content-item-subtitle">
                <a
                  href={restaurant.website}
                  className="information__content-item-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shorten(restaurant.website)}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="information__content-row">
          <div className="information__content-item">
            <div className="information__content-item-icon">
              <PhoneSVG />
            </div>
            <div className="information__content-item-text">
              <div className="information__content-item-title">
                Phone number
              </div>
              <div className="information__content-item-subtitle">
                <a
                  href={`tel:${restaurant.phone}`}
                  className="information__content-item-link"
                >
                  {restaurant.phone}
                </a>
              </div>
            </div>
          </div>
          <div className="information__content-item">
            <div className="information__content-item-icon">
              <ClockSVG />
            </div>
            <div className="information__content-item-text">
              <div className="information__content-item-title">Work hours</div>
              <div className="information__content-item-subtitle">
                {restaurant.openingHours.map((hours) => (
                  <div key={hours.hours}>
                    {hours.days} {hours.hours}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RestaurantInfo.propTypes = {
  restaurant: PropTypes.object,
};
