import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ChevronRight } from "../../assets/svg/chevron_right.svg";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "./Breadcrumbs.scss";

export const Breadcrumbs = () => {
  const routes = [
    { path: "/", breadcrumb: "dashboard" },
    { path: "/eatout", breadcrumb: "eat-out" },
  ];

  const breadcrumbs = useBreadcrumbs(routes, {
    excludePaths: ["/eatout/category", "/eatout/restaurant"],
  });

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map(({ match, breadcrumb }, index) =>
        index !== breadcrumbs.length - 1 ? (
          <Link
            className="breadcrumbs__link"
            to={match.pathname}
            key={match.pathname}
          >
            {breadcrumb}
            <ChevronRight className="breadcrumbs__separator" />
          </Link>
        ) : (
          <div className="breadcrumbs__current-page" key={match.pathname}>
            {breadcrumb.key.includes("/restaurant/")
              ? breadcrumb.props.children.split("-").slice(0, -1).join(" ")
              : breadcrumb}
          </div>
        )
      )}
    </div>
  );
};
