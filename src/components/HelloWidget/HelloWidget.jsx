import { UserContext } from "features/UserContext";
import React, { useEffect, useState, useContext } from "react";
import "./HelloWidget.scss";

export const HelloWidget = () => {
  const { userData } = useContext(UserContext);

  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  };

  const getGreeting = () => {
    let currentHour = new Date().getHours();
    let msg = "";

    if (currentHour < 12) msg = "Good Morning, ";
    else if (currentHour >= 12 && currentHour <= 17) msg = "Good Afternoon, ";
    else if (currentHour >= 18 && currentHour < 24) msg = "Good Evening, ";

    msg = msg + userData.userName;
    return msg;
  };

  const [time, setTime] = useState(
    new Intl.DateTimeFormat("en-US", optionsTime).format(Date.now())
  );

  const [greeting, setGreeting] = useState(getGreeting());

  const updateValues = () => {
    setTime(new Intl.DateTimeFormat("en-US", optionsTime).format(Date.now()));
    setGreeting(getGreeting());
  };

  useEffect(() => {
    const remainingSeconds = 60 - new Date().getSeconds();
    const remainingTime = setTimeout(() => {
      updateValues();
      const intervalTime = setInterval(() => updateValues(), 60000);
      return () => {
        clearInterval(intervalTime);
      };
    }, remainingSeconds * 1000);
    return clearTimeout(remainingTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hello-widget">
      <div className="hello-widget__time">{time}</div>
      <div className="hello-widget__greeting">{greeting}</div>
    </div>
  );
};
