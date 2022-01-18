import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./CommentIcon.scss";

import { ReactComponent as CommentIconSvg } from "../../assets/comment.svg";

export const CommentIcon = ({ active }) => {
  return (
    <CommentIconSvg
      className={classNames("comment-icon", {
        "comment-icon--active": active,
      })}
    />
  );
};

CommentIcon.propTypes = {
  active: PropTypes.bool,
};
