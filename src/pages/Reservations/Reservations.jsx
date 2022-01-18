import React, { useState, useEffect, useContext } from "react";
import "./reservations.scss";
import { Layout } from "components/Layout";
import { ErrorScreen } from "components/ErrorScreen/ErrorScreen";
import { UserContext } from "../../features/UserContext";
import { LoadingScreen } from "components/LoadingScreen/LoadingScreen";
import { motion } from "framer-motion";
import { fromToptoBottomAnimation } from "../../animations";

export const Reservations = () => {
  const { userDataLoading, userDataError, userDataErrorMsg } =
    useContext(UserContext);
  const [reservationsDataError, setReservationsDataError] = useState(false);
  const [reservationsDataErrorMsg, setReservationsDataErrorMsg] = useState("");
  const [reservationsDataLoading, setReservationsDataLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setReservationsDataError(true);
      setReservationsDataErrorMsg(
        "Reservations data request failed. Please try again."
      );
      setReservationsDataLoading(false);
    }, 500);
    // eslint-disable-next-line
  }, []);

  if (userDataLoading) {
    return (
      <Layout>
        <LoadingScreen fullScreen />;
      </Layout>
    );
  } else if (reservationsDataLoading) {
    return (
      <Layout>
        <LoadingScreen fullScreen={false} />
      </Layout>
    );
  }

  if (userDataError) {
    return <ErrorScreen fullScreen message={userDataErrorMsg} />;
  }

  return (
    <Layout>
      <main className="reservations">
        <motion.section
          className="reservations__container"
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.3, duration: 0.5 }}
          variants={fromToptoBottomAnimation}
        >
          {reservationsDataError && (
            <ErrorScreen
              fullScreen={false}
              message={reservationsDataErrorMsg}
            />
          )}
        </motion.section>
      </main>
    </Layout>
  );
};
