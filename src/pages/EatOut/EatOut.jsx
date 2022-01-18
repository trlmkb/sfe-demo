import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Layout } from "components/Layout";
import { Breadcrumbs } from "components/Breadcrumbs";
import { LoadingScreen } from "components/LoadingScreen";
import { HeroSlider } from "./components/HeroSlider";
import { CardSlider } from "../../components/CardSlider";
import { selectRandom } from "utils/selectRandom";
import { sortByDistance } from "utils/sortByDistance";
import { sortByDate } from "utils/sortByDate";
import { UserContext } from "../../features/UserContext";
import "./eatout.scss";
import { EatOutCategories } from "../EatOut/components/EatOutCategories";
import { motion } from "framer-motion";
import { fromToptoBottomAnimation } from "../../animations";
import { ErrorScreen } from "components/ErrorScreen/ErrorScreen";
const dbPath =
  "http://frontendsourceryweb.s3-website.eu-central-1.amazonaws.com";

const locationAPI = {
  key: process.env.REACT_APP_LOCATION_API_KEY,
  base: "https://api.opencagedata.com/geocode/v1/",
};

export const EatOut = () => {
  const { userData, userDataLoading, userDataError, userDataErrorMsg } =
    useContext(UserContext);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState({});
  const [error, setError] = useState({});
  const [randomRestaurants, setRandomRestaurants] = useState([]);

  useEffect(() => {
    async function fecthData() {
      try {
        const fetchRestaurants = await axios.get(`${dbPath}/restaurants.json`);
        setRestaurants(fetchRestaurants.data.restaurants);
        const fetchCategories = await axios.get(`${dbPath}/categories.json`);
        setCategories(fetchCategories.data.categories);
      } catch (e) {
        setError(e);
      }
    }
    fecthData();
  }, []);

  useEffect(() => {
    setRandomRestaurants(selectRandom(restaurants, 5));
  }, [restaurants]);

  useEffect(() => {
    async function fecthCoordinates() {
      try {
        const fetchCoordinates = await axios.get(
          `${locationAPI.base}json?q=${userData.location}&key=${locationAPI.key}`
        );
        const coordinates = fetchCoordinates.data.results[0].geometry;
        setUserCoordinates(coordinates);
      } catch (e) {
        setError(e);
      }
    }
    if (userData.location) fecthCoordinates();
  }, [userData]);

  if (userDataLoading) {
    return <LoadingScreen fullScreen />;
  }

  if (!restaurants.length || !categories.length) {
    return (
      <Layout>
        <LoadingScreen />
        {error.message && error.message}
      </Layout>
    );
  }

  if (userDataError) {
    return <ErrorScreen fullScreen message={userDataErrorMsg} />;
  }

  return (
    <Layout>
      <article className="eatout">
        <div className="eatout__container">
          <motion.div
            className="eatout__heading"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.7, duration: 0.5 }}
            variants={fromToptoBottomAnimation}
          >
            <Breadcrumbs />
            <h1>Hungry? Find the best place!</h1>
          </motion.div>
          <motion.section
            className="eatout__hero-slider"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.9, duration: 0.5 }}
            variants={fromToptoBottomAnimation}
          >
            <HeroSlider restaurants={randomRestaurants} />
          </motion.section>
          <motion.section
            className="eatout__categories"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 1.1, duration: 0.5 }}
            variants={fromToptoBottomAnimation}
          >
            <EatOutCategories restaurants={restaurants} />
          </motion.section>
          <motion.section
            className="eatout__near-you"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 1.3, duration: 0.5 }}
            variants={fromToptoBottomAnimation}
          >
            <CardSlider
              restaurants={sortByDistance(userCoordinates, restaurants)}
              title="Discover near you"
            />
          </motion.section>
          <motion.section
            className="eatout__new-places"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 1.5, duration: 0.5 }}
            variants={fromToptoBottomAnimation}
          >
            <CardSlider
              restaurants={sortByDate(restaurants)}
              title="New Places"
            />
          </motion.section>
        </div>
      </article>
    </Layout>
  );
};
