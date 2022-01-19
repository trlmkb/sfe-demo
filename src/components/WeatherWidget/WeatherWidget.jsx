import React, { useState, useEffect } from "react";
import axios from "axios";
import { WeatherWidgetDisplay } from "./components/WeatherWidgetDisplay";
import "./WeatherWidget.scss";

const locationAPI = {
  key: process.env.REACT_APP_LOCATION_API_KEY,
  base: "https://api.opencagedata.com/geocode/v1/",
};

const weatherApi = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

export const WeatherWidget = () => {
  const [location, setLocation] = useState("Vilnius, Lithuania");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const controller = new AbortController();

  useEffect(() => {
    let locationWatch;
    const fetchLocation = () => {
      if (window.navigator.geolocation) {
        locationWatch = navigator.geolocation.watchPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const response = await axios.get(
                `${locationAPI.base}json?q=${latitude}+${longitude}&key=${locationAPI.key}`,
                {
                  signal: controller.signal,
                }
              );
              const formattedResponse = response.data.results[0].formatted
                .split(" ")
                .slice(-2)
                .join(" ");
              setLocation(formattedResponse);
            } catch (e) {
              setError(e.message);
            }
          }
        );
      }
    };
    fetchLocation();
    return () => {
      if (window.navigator.geolocation) {
        controller.abort();
        navigator.geolocation.clearWatch(locationWatch);
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchWeather = async (query) => {
      if (query) {
        try {
          const response = await axios.get(
            `${weatherApi.base}weather?q=${query}&units=metric&APPID=${weatherApi.key}`,
            {
              signal: controller.signal,
            }
          );
          setWeather(response.data);
        } catch (e) {
          setError(e.message);
        }
      }
    };
    fetchWeather(location);
    return () => controller.abort();
    // eslint-disable-next-line
  }, [location]);

  return (
    <WeatherWidgetDisplay location={location} weather={weather} error={error} />
  );
};
