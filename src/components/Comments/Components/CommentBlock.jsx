import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button/Button";
import { autoSize } from "utils/autosize";
import { UserContext } from "../../../features/UserContext";

export const CommentBlock = ({ setCommentList }) => {
  const { userData } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const { userName, userImage } = userData;
  const textareaRef = useRef();
  const defaultHeight = "1.5rem";

  const postNewComment = () => {
    if (!newComment.trim()) return null;
    const newCommentObject = {
      userName: userName,
      comment: newComment,
      date: new Date(Date.now()).toISOString(),
    };
    setCommentList((prevComments) => [...prevComments, newCommentObject]);
    setNewComment("");
  };

  useEffect(() => {
    autoSize(textareaRef.current, defaultHeight);
  }, [newComment]);

  return (
    <div className="comment-block">
      {userImage && (
        <img src={userImage} alt="" className="comment-block__user-img" />
      )}
      <form className="comment-block__form">
        <textarea
          className="comment-block__input"
          rows="1"
          placeholder="Leave a comment..."
          ref={textareaRef}
          onChange={({ target }) => setNewComment(target.value)}
          value={newComment}
          // If key pressed is "Enter" it prevents from creating a new line and posts newly written comment
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
            e.key === "Enter" && postNewComment();
          }}
        ></textarea>
        <Button
          label="POST"
          onClick={(e) => {
            e.preventDefault();
            postNewComment();
          }}
          variant="secondary"
          type="submit"
        />
      </form>
    </div>
  );
};

CommentBlock.propTypes = {
  setCommentList: PropTypes.func.isRequired,
};
