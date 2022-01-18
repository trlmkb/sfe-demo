export const filterSimilarTo = (thisRestaurant, restaurants) =>
  restaurants.filter(
    (restaurant) =>
      restaurant !== thisRestaurant &&
      restaurant.categories.some((category) =>
        thisRestaurant.categories.includes(category)
      )
  );
