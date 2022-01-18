import React, { useContext } from "react";
import { UserContext } from "../features/UserContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({
  children,
  isLogInRequired,
  isLogOutRequired,
}) => {
  const { userData } = useContext(UserContext);

  if (isLogInRequired)
    return userData.isLogged ? children : <Navigate to="/login" />;

  if (isLogOutRequired)
    return !userData.isLogged ? children : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  isLogInRequired: PropTypes.bool,
  isLogOutRequired: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
