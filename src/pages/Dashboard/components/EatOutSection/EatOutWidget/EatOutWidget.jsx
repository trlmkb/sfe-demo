import React from "react";
import "./EatOutWidget.scss";
import { Button } from "components/Button/Button";
import { Link } from "react-router-dom";

export const EatOutWidget = () => {
  return (
    <div className="widget__container">
      <h2 className="widget__title">
        View all your favourite lunch spots and more
      </h2>
      <Link to="/eatout">
        <Button variant="primary" size="medium" label="browse list" />
      </Link>
    </div>
  );
};
