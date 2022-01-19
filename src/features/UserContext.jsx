import React, { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const userLocalStorageData = JSON.parse(localStorage.getItem("userInfo"));
    return userLocalStorageData
      ? { isLogged: userLocalStorageData.isLogged }
      : { isLogged: false };
  });

  const [userDataLoading, setUserDataLoading] = useState(true);
  const [userDataError, setUserDataError] = useState(false);
  const [userDataErrorMsg, setUserDataErrorMsg] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataFetch = await axios.get(
          "/api/userData.json"
        );
        setUserData({ ...userData, ...userDataFetch.data.userData[0] });
      } catch (error) {
        setUserDataError(true);
        setUserDataErrorMsg("User data request failed. Please try again.");
      }
      setUserDataLoading(false);
    };
    getUserData();
    // eslint-disable-next-line
  }, []);

  const handleUserLogin = () => {
    const userLocalStorageData = JSON.parse(localStorage.getItem("userInfo"));
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...userLocalStorageData, isLogged: true })
    );
    setUserData({ ...userData, isLogged: true });
  };

  const handleUserLogout = () => {
    const userLocalStorageData = JSON.parse(localStorage.getItem("userInfo"));
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...userLocalStorageData, isLogged: false })
    );
    setUserData({ ...userData, isLogged: false });
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        handleUserLogin,
        handleUserLogout,
        userDataLoading,
        userDataError,
        userDataErrorMsg,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
