import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ArrowLeft } from "../../assets/svg/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/svg/arrow-right.svg";
import "./ControlButton.scss";

export const ControlButton = ({ direction, onClick }) => {
  return (
    <button
      className={`control-button control-button--${direction}`}
      onClick={onClick}
    >
      {direction === "right" ? <ArrowRight /> : <ArrowLeft />}
    </button>
  );
};

ControlButton.propTypes = {
  direction: PropTypes.string,
  onClick: PropTypes.func,
  currentSlide: PropTypes.number,
};
