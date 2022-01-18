import React from "react";
import PropTypes from "prop-types";

export const DateLocationHeading = ({ date, location }) => {
  let weekDay = date.toLocaleDateString("en-US", { weekday: "long" });
  let monthDay = date.getDate();
  let month = date.toLocaleDateString("en-US", { month: "long" });
  return (
    <div className="weather-widget__heading">
      {weekDay}, {monthDay} {month} | {location}
    </div>
  );
};

DateLocationHeading.propTypes = {
  date: PropTypes.object,
  location: PropTypes.string,
};
