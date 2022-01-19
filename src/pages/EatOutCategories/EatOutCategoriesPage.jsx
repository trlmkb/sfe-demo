import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../features/UserContext";

import PropTypes from "prop-types";

import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { ErrorScreen } from "components/ErrorScreen/ErrorScreen";
import { LoadingScreen } from "components/LoadingScreen/LoadingScreen";
import { Layout } from "components/Layout";

import "./categories.scss";
import { RestaurantCard } from "components/RestaurantCard/RestaurantCard";

export const EatOutCategoriesPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [categoriesDataLoading, setCategoriesDataLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { userDataLoading, userDataError, userDataErrorMsg } =
    useContext(UserContext);
  const id =
    useParams().id.charAt(0).toUpperCase() +
    useParams().id.split("-").join(" ").slice(1);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get(
          "/api/restaurants.json"
        );
        setRestaurants(response.data.restaurants);
      } catch (e) {
        setErrorMessage(e);
        setError(true);
      }
    };
    getRestaurants();
    setTimeout(() => {
      setCategoriesDataLoading(false);
    }, 250);
  }, []);

  if (userDataLoading) {
    return <LoadingScreen fullScreen />;
  }

  if (categoriesDataLoading) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  if (userDataError) {
    return <ErrorScreen fullScreen message={userDataErrorMsg} />;
  }

  if (error) {
    return <ErrorScreen fullScreen={true} message={errorMessage.toString()} />;
  }

  return (
    <Layout>
      <article className="eat-out-categories">
        <section className="eat-out-categories__container">
          <div className="eat-out-categories__breadcrumbs">
            <Breadcrumbs />
          </div>
          <h1 className="eat-out-categories__title">
            The best places for the {id.toUpperCase()}!
          </h1>
          <div className="eat-out-categories__grid">
            {restaurants
              .filter((restaurant) => restaurant.categories.includes(id))
              .map((filteredRestaurant) => (
                <div
                  className="eat-out-categories__item"
                  key={filteredRestaurant.name}
                >
                  <RestaurantCard
                    expanded={true}
                    restaurant={filteredRestaurant}
                  />
                </div>
              ))}
          </div>
        </section>
      </article>
    </Layout>
  );
};
EatOutCategoriesPage.propTypes = {
  categories: PropTypes.array,
};
