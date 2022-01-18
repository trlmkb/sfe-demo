export const sortByDistance = (user, restaurants, number = 9) => {
  if (number > restaurants.length) return restaurants;
  const getDistance = (restaurant) =>
    Math.sqrt(
      (restaurant.location.coordinates.lat - user.lat) ** 2 +
        (restaurant.location.coordinates.lng - user.lng) ** 2
    );
  restaurants.sort((a, b) => getDistance(a) - getDistance(b));
  return restaurants.slice(0, number);
};
