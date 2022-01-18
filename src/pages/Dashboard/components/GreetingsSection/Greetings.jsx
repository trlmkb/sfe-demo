import React from "react";
import "./greetings.scss";
import { WeatherWidget } from "components/WeatherWidget/WeatherWidget";
import { HelloWidget } from "components/HelloWidget/HelloWidget";

export const Greetings = () => {
  return (
    <div className="greetings-section">
      <HelloWidget />
      <WeatherWidget />
    </div>
  );
};
