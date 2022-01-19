import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Layout } from "components/Layout";

import { UserContext } from "../../features/UserContext";
import { Reservations } from "./components/ReservationsSection";
import { EatOutSection } from "./components/EatOutSection/EatOutSection";
import { Greetings } from "./components/GreetingsSection/Greetings";
import { LoadingScreen } from "components/LoadingScreen/LoadingScreen";
import { ErrorScreen } from "components/ErrorScreen/ErrorScreen";
import { NewsFeedSection } from "./components/NewsFeedSection";
import "./dashboard.scss";
import { motion } from "framer-motion";
import { fromToptoBottomAnimation } from "../../animations";

export const Dashboard = () => {
  const { userDataLoading, userDataError, userDataErrorMsg } =
    useContext(UserContext);
  const [dashboardData, setDashboardData] = useState();
  const [dashboardDataLoading, setDashboardDataLoading] = useState(true);
  const [dashboardDataError, setDashboardDataError] = useState(false);
  const [dashboardDataErrorMsg, setDashboardDataErrorMsg] = useState("");

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const restaurantsDataFetch = await axios.get("/api/restaurants.json");
        setDashboardData(restaurantsDataFetch.data.restaurants);
      } catch (error) {
        setDashboardDataError(true);
        setDashboardDataErrorMsg(
          "Dashboard data request failed. Please try again."
        );
      }
      setDashboardDataLoading(false);
    };
    getDashboardData();
    // eslint-disable-next-line
  }, []);

  if (userDataLoading) {
    return (
      <Layout>
        <LoadingScreen fullScreen />;
      </Layout>
    );
  } else if (dashboardDataLoading) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  if (userDataError) {
    return <ErrorScreen fullScreen message={userDataErrorMsg} />;
  }

  return (
    <Layout>
      <article className="dashboard">
        <div className="dashboard__container">
          <motion.section
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.7, duration: 0.5 }}
            variants={fromToptoBottomAnimation}
          >
            <Greetings />
          </motion.section>
          <motion.section
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.9, duration: 0.5 }}
            variants={fromToptoBottomAnimation}
          >
            <Reservations />
          </motion.section>
          <motion.section
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 1.1, duration: 0.5 }}
            variants={fromToptoBottomAnimation}
          >
            <EatOutSection
              restaurants={dashboardData}
              dataError={dashboardDataError}
              dataErrorMsg={dashboardDataErrorMsg}
            />
          </motion.section>
          <motion.section
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 1.3, duration: 0.5 }}
            variants={fromToptoBottomAnimation}
          >
            <NewsFeedSection />
          </motion.section>
        </div>
      </article>
    </Layout>
  );
};
