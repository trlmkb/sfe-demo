import React from "react";
import PropTypes from "prop-types";
import { WeatherIcon } from "./WeatherIcon";
import { DateLocationHeading } from "./DateLocationHeading";
import { ReactComponent as WindGustIcon } from "assets/svg/wind-gust.svg";
import { ReactComponent as RainDropIcon } from "assets/svg/rain-drop.svg";
import { LoadingScreen } from "../../LoadingScreen";

export const WeatherWidgetDisplay = ({ location, weather, error }) => {
  const weatherKeys = Object.keys(weather);
  if (
    !weatherKeys.includes("main") ||
    !weatherKeys.includes("weather") ||
    !weatherKeys.includes("wind")
  ) {
    return (
      <div className="weather-widget">
        <div className="weather-widget__container weather-widget__container--onload">
          <LoadingScreen fullScreen={false} />
          {error && (
            <div className="weather-widget__error-message">{error}</div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="weather-widget">
      <div className="weather-widget__container">
        <DateLocationHeading date={new Date()} location={location} />
        <div className="weather-widget__forecast">
          <div className="weather-widget__temperature">
            {Math.round(weather.main.temp)}°
          </div>
          <div className="weather-widget__main">{weather.weather[0].main}</div>
          <hr className="weather-widget__divider" />
          <div className="weather-widget__wind">
            <WindGustIcon className="weather-widget__small-icon" />
            <p>{weather.wind.speed} m/s</p>
          </div>
          <div className="weather-widget__rain">
            <RainDropIcon className="weather-widget__small-icon" />
            <p>
              {weatherKeys.includes("rain")
                ? weather.rain["3h"]
                  ? weather.rain["3h"]
                  : weather.rain["1h"]
                : "0"}{" "}
              mm
            </p>
          </div>
        </div>
      </div>
      {typeof weather.weather && (
        <WeatherIcon weatherType={weather.weather[0].main} />
      )}
    </div>
  );
};

WeatherWidgetDisplay.propTypes = {
  weather: PropTypes.object,
  location: PropTypes.string,
  error: PropTypes.string,
};
