import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../eataoutcategories.scss";
import { ReactComponent as BrunchIcon } from "../../../../../assets/svg/EatOutSVG/brunch.svg";
import { ReactComponent as BurgerIcon } from "../../../../../assets/svg/EatOutSVG/burger.svg";
import { ReactComponent as GrillIcon } from "../../../../../assets/svg/EatOutSVG/grill.svg";
import { ReactComponent as KebabIcon } from "../../../../../assets/svg/EatOutSVG/kebab.svg";
import { ReactComponent as PancakesIcon } from "../../../../../assets/svg/EatOutSVG/pancakes.svg";
import { ReactComponent as PizzaIcon } from "../../../../../assets/svg/EatOutSVG/pizza.svg";
import { ReactComponent as RamenIcon } from "../../../../../assets/svg/EatOutSVG/ramen.svg";
import { ReactComponent as SaladsIcon } from "../../../../../assets/svg/EatOutSVG/salad.svg";
import { ReactComponent as SandwitchIcon } from "../../../../../assets/svg/EatOutSVG/sandwitch.svg";
import { ReactComponent as SoupsIcon } from "../../../../../assets/svg/EatOutSVG/soups.svg";
import { ReactComponent as SushiIcon } from "../../../../../assets/svg/EatOutSVG/sushi.svg";
import { ReactComponent as SweetsIcon } from "../../../../../assets/svg/EatOutSVG/sweets.svg";
import { ReactComponent as HotDogIcon } from "../../../../../assets/svg/EatOutSVG/hotdog.svg";
import { slugify } from "utils/slugify";

export const EatOutCategory = ({ title, places }) => {
  let icon = "Ramen";

  let placesCount = "";
  if (places > 1) {
    placesCount = "PLACES";
  } else if (places === 1) {
    placesCount = "PLACE";
  } else {
    placesCount = "NO PLACES";
  }

  switch (title) {
    case "Brunch":
      icon = <BrunchIcon className="category-box__icon" />;
      break;
    case "Breakfast":
      icon = <BrunchIcon className="category-box__icon" />;
      break;
    case "Burger":
      icon = <BurgerIcon className="category-box__icon" />;
      break;
    case "Grill":
      icon = <GrillIcon className="category-box__icon" />;
      break;
    case "Hot dogs":
      icon = <HotDogIcon className="category-box__icon" />;
      break;
    case "Kebab":
      icon = <KebabIcon className="category-box__icon" />;
      break;
    case "Pancakes":
      icon = <PancakesIcon className="category-box__icon" />;
      break;
    case "Pizza":
      icon = <PizzaIcon className="category-box__icon" />;
      break;
    case "Ramen":
      icon = <RamenIcon className="category-box__icon" />;
      break;
    case "Salads":
      icon = <SaladsIcon className="category-box__icon" />;
      break;
    case "Sandwich":
      icon = <SandwitchIcon className="category-box__icon" />;
      break;
    case "Soup":
      icon = <SoupsIcon className="category-box__icon" />;
      break;
    case "Soups":
      icon = <SoupsIcon className="category-box__icon" />;
      break;
    case "Sushi":
      icon = <SushiIcon className="category-box__icon" />;
      break;
    case "Sweets":
      icon = <SweetsIcon className="category-box__icon" />;
      break;
    case "Donuts":
      icon = <SweetsIcon className="category-box__icon" />;
      break;
    default:
      icon = <RamenIcon className="category-box__icon" />;
      break;
  }
  return (
    <Link to={`/eatout/category/${slugify(title)}`} className="category-box">
      <h2 className="category-box__title">{title}</h2>
      <div className="category-box__places">
        {places} {placesCount}
        <div className="category-box__img">{icon}</div>
      </div>
    </Link>
  );
};

EatOutCategory.propTypes = {
  title: PropTypes.string.isRequired,
  places: PropTypes.number.isRequired,
};
