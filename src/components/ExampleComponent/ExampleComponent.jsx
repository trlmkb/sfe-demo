import React from "react";
import PropTypes from "prop-types";

import "./ExampleComponent.scss";

export const ExampleComponent = ({ title }) => (
  <div className="example-component">
    <h2 className="example-component__title">{title}</h2>
  </div>
);

ExampleComponent.propTypes = {
  title: PropTypes.string,
};
