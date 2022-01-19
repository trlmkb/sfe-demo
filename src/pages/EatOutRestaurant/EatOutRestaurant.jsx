import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { LoadingScreen } from "components/LoadingScreen";
import { ErrorScreen } from "components/ErrorScreen";
import { Layout } from "components/Layout";
import { HeroBanner } from "./Components/HeroBanner";
import { ReviewsSection } from "./Components/ReviewsSection";
import { motion } from "framer-motion";
import { fromToptoBottomAnimation } from "../../animations";
import "./EatOutRestaurant.scss";
import { RestaurantInfo } from "./Components/RestaurantInfo/RestaurantInfo";
import { RestaurantLocation } from "./Components/RestaurantLocation/RestaurantLocation";
import { CardSlider } from "components/CardSlider";
import { filterSimilarTo } from "../../utils/filterSimilarTo";
import { UserContext } from "../../features/UserContext";

const dbPath =
  "/api";

export const EatOutRestaurant = () => {
  const { userDataLoading, userDataError, userDataErrorMsg } =
    useContext(UserContext);
  const slug = useParams().id;
  const id = slug.slice(slug.lastIndexOf("-") + 1);
  const [restaurants, setRestaurants] = useState([]);
  const [thisRestaurant, setThisRestaurant] = useState({});
  const [categories, setCategories] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    async function fecthData() {
      try {
        const fetchRestaurants = await axios.get(`${dbPath}/restaurants.json`);
        setRestaurants(fetchRestaurants.data.restaurants);
        setThisRestaurant(
          fetchRestaurants.data.restaurants.filter(
            (restaurant) => restaurant.id === id
          )[0]
        );
        const fetchCategories = await axios.get(`${dbPath}/categories.json`);
        setCategories(fetchCategories.data.categories);
        setDataLoading(false);
      } catch (e) {
        setError(e);
      }
    }
    fecthData();
    // eslint-disable-next-line
  }, []);

  if (userDataLoading) {
    return <LoadingScreen fullScreen />;
  }

  if (Object.keys(error).length)
    return <ErrorScreen fullScreen message={error.message} />;

  if (dataLoading) {
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
      <article className="eatout-restaurant">
        <HeroBanner restaurant={thisRestaurant} />
        <div className="eatout-restaurant__container">
          <div
            className={classNames("eatout-restaurant__about", {
              "eatout-restaurant__about--grid":
                thisRestaurant.reviews.length > 0,
            })}
          >
            <motion.section
              className="eatout-restaurant__information"
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: 0.9, duration: 0.5 }}
              variants={fromToptoBottomAnimation}
            >
              <RestaurantInfo restaurant={thisRestaurant} />
            </motion.section>
            <motion.section
              className="eatout-restaurant__location"
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: 1.1, duration: 0.5 }}
              variants={fromToptoBottomAnimation}
            >
              <RestaurantLocation restaurant={thisRestaurant} />
            </motion.section>
            {thisRestaurant.reviews.length > 0 && (
              <motion.section
                className="eatout-restaurant__reviews"
                restaurant={thisRestaurant}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: 1.1, duration: 0.5 }}
                variants={fromToptoBottomAnimation}
              >
                <ReviewsSection reviews={thisRestaurant.reviews} />
              </motion.section>
            )}
          </div>
          <motion.section
            className="eatout-restaurant__similar-restaurants"
            restaurants={restaurants}
            restaurant={thisRestaurant}
            categories={categories}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 1.3, duration: 0.5 }}
            variants={fromToptoBottomAnimation}
          >
            <CardSlider
              title="Also you could like"
              restaurants={filterSimilarTo(thisRestaurant, restaurants)}
            />
          </motion.section>
        </div>
      </article>
    </Layout>
  );
};
