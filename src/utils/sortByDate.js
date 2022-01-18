export const sortByDate = (restaurants, number = 9) =>
  restaurants
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
    .slice(0, number);
