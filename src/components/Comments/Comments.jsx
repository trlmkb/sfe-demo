import React from "react";
import PropTypes from "prop-types";
import { CommentList } from "./Components/CommentList";
import "./Comments.scss";
import { CommentBlock } from "./Components/CommentBlock";

export const Comments = ({ commentsList, setCommentList }) => {
  return (
    <div className="comments">
      <CommentList comments={commentsList} />
      <CommentBlock setCommentList={setCommentList} />
    </div>
  );
};

Comments.propTypes = {
  commentsList: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string,
      comment: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  setCommentList: PropTypes.func,
};
