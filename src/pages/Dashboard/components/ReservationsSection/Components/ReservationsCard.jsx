import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../reservations.scss";

export const ReservationsCard = ({ title, reserved, icon }) => {
  return (
    <Link to="/reservations" className="reservation-box">
      <h2 className="reservation-box__title">{title}</h2>
      <div className="reservation-box__reserved">
        {reserved} reserved
        <div className="reservation-box__img">{icon}</div>
      </div>
    </Link>
  );
};

ReservationsCard.propTypes = {
  title: PropTypes.string.isRequired,
  reserved: PropTypes.number,
  icon: PropTypes.object,
};
