import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { scrollDown } from "utils/scrollDown";

const formatTime = (date) => {
  return new Date(date)
    .toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .split(",")
    .join(" ");
};

export const CommentList = ({ comments }) => {
  const commentListRef = useRef();

  useEffect(() => {
    commentListRef && scrollDown(commentListRef.current);
  }, [comments]);

  if (!comments.length) {
    return null;
  }
  return (
    <div className="comments-list" ref={commentListRef}>
      {comments.map((comment, index) => (
        <div className="comments-list__comment" key={index}>
          <div className="comments-list__comment-info">
            <div className="comments-list__comment-name">
              {comment.userName}
            </div>
            <div className="comments-list__comment-date">
              {formatTime(comment.date)}
            </div>
          </div>
          {comment.comment}
        </div>
      ))}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};
