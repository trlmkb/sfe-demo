import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ThunderstormIcon } from "assets/svg/thunderstorm.svg";
import { ReactComponent as CloudyIcon } from "assets/svg/cloudy.svg";
import { ReactComponent as RainnyIcon } from "assets/svg/rainny.svg";
import { ReactComponent as SnowingIcon } from "assets/svg/snowing.svg";
import { ReactComponent as SunnyIcon } from "assets/svg/sunny.svg";

export const WeatherIcon = ({ weatherType }) => {
  switch (weatherType) {
    case "Thunderstorm":
      return <ThunderstormIcon className="weather-widget__weather-icon" />;
    case "Drizzle":
    case "Rain":
      return <RainnyIcon className="weather-widget__weather-icon" />;
    case "Snow":
      return <SnowingIcon className="weather-widget__weather-icon" />;
    case "Clear":
      return <SunnyIcon className="weather-widget__weather-icon" />;
    case "Clouds":
    default:
      return <CloudyIcon className="weather-widget__weather-icon" />;
  }
};

WeatherIcon.propTypes = {
  weatherType: PropTypes.string,
};
