const findScoreTotal = (reviews) => {
  let total = 0;
  for (let i = 0; i < reviews.length; i++) {
    total = reviews[i].rating + total;
  }
  return total;
};

export const findRating = (reviews) => {
  let scoreTotal = findScoreTotal(reviews);
  if (scoreTotal === 0) {
    return "0";
  } else {
    return (scoreTotal / reviews.length).toFixed(1);
  }
};

export function shorten(website) {
  let shortened = website;
  if (shortened.indexOf("w") === 8) {
    return shortened.slice(12);
  }
  if (shortened.indexOf("w") === 7) {
    return shortened.slice(11);
  }
  if (shortened.indexOf("s") === 4) {
    return shortened.slice(8);
  } else {
    return shortened.slice(7);
  }
}

export const listRatings = (restaurants) => {
  const reviewsList = [];
  for (let i = 0; i < restaurants.length; i++) {
    const reviewScore = findRating(restaurants[i].reviews);
    reviewsList.push(reviewScore);
  }
  return findTopRated(reviewsList);
};

const findTopRated = (reviewsList) => {
  let topReview = 0;
  let prevTopValue = 0;
  const topRated = [];
  for (let i = 0; i < reviewsList.length; i++) {
    if (reviewsList[i] > topReview || reviewsList[i] > prevTopValue) {
      prevTopValue = topReview;
      topReview = reviewsList[i];
    }
  }
  topRated.push(topReview);
  topRated.push(prevTopValue);
  return topRated;
};
