import "./card.scss";
import React, { useRef, useState, useEffect } from "react";
import { HeartIcon } from "components/HeartIcon/HeartIcon";
import { CommentIcon } from "components/CommentIcon/CommentIcon";
import { ReactComponent as PlayButton } from "../../assets/play-button.svg";
import PropTypes from "prop-types";
import { Comments } from "components/Comments";
import { formatDistance } from "date-fns";
import {
  checkLocalStorage,
  addLocalStorage,
  removeLocalStorage,
} from "utils/localStorageData";
import { motion } from "framer-motion";

export const Card = ({ storyData }) => {
  const [heartIconActive, setHeartIconActive] = useState(false);
  const [likes, setLikes] = useState(storyData.likes);
  const [commentIconActive, setCommentIconActive] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(storyData.comments);

  useEffect(() => {
    checkLocalStorage("savedStories", storyData, setHeartIconActive);
    // eslint-disable-next-line
  }, []);

  const handleHeartIconClick = () => {
    setHeartIconActive(!heartIconActive);
    setLikes(
      !heartIconActive
        ? (prevLikes) => prevLikes + 1
        : (prevLikes) => prevLikes - 1
    );
    if (storyData && heartIconActive) {
      removeLocalStorage("savedStories", storyData);
    } else {
      addLocalStorage("savedStories", storyData);
    }
  };

  const handleCommentIconClick = () => {
    setCommentIconActive(!commentIconActive);
    setShowComments(!showComments);
  };

  const videoRef = useRef(null);
  const videoButtonRef = useRef(null);

  const handleVideoPlay = () => {
    videoRef.current.play();
    // hide <PlayButton /> component after video start;
    videoButtonRef.current.classList.add("card__play-button--hidden");
    videoRef.current.setAttribute("controls", "controls");
  };

  const handlePlayButtonShow = () => {
    // show <PlayButton /> component after video ends;
    videoButtonRef.current.classList.remove("card__play-button--hidden");
    videoRef.current.removeAttribute("controls");
  };

  const todayDate = new Date();
  const storiesDate = new Date(storyData.postDate);
  const cardDate = formatDistance(
    new Date(
      storiesDate.getFullYear(),
      storiesDate.getMonth(),
      storiesDate.getDate()
    ),
    new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    ),
    {
      addSuffix: true,
    }
  );

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__header-left">
          <div className="card__header-left-icon">
            <img src={storyData.userImage} alt="user-icon" />
          </div>
          <div className="card__header-left-name">{storyData.userName}</div>
        </div>
        <div className="card__header-right">
          <div className="card__header-right-location">
            {storyData.postLocation}
          </div>
          <div className="card__header-right-time">{cardDate}</div>
        </div>
      </div>
      {storyData.type === "video" ? (
        <div className="card__media-content">
          <video
            ref={videoRef}
            onEnded={handlePlayButtonShow}
            poster={storyData.postCover}
          >
            <source src={storyData.postVideo} />
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
          <PlayButton
            className="card__play-button"
            ref={videoButtonRef}
            onClick={handleVideoPlay}
          />
        </div>
      ) : (
        <div className="card__media-content">
          <img src={storyData.postImage} alt="card-img-content" />
        </div>
      )}
      <div className="card__action-bar">
        <motion.div className="card__likes" whileTap={{ scale: 0.95 }}>
          <button onClick={handleHeartIconClick}>
            <HeartIcon active={heartIconActive} />
          </button>
          <div className="card__likes-number">{likes}</div>
        </motion.div>
        <motion.div className="card__comments" whileTap={{ scale: 0.95 }}>
          <button onClick={handleCommentIconClick}>
            <CommentIcon active={commentIconActive} />
          </button>
          <div className="card__comments-number">{commentList.length}</div>
        </motion.div>
      </div>
      {showComments && (
        <Comments commentsList={commentList} setCommentList={setCommentList} />
      )}
    </div>
  );
};

Card.propTypes = {
  storyData: PropTypes.shape({
    type: PropTypes.oneOf(["video", "post"]).isRequired,
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userImage: PropTypes.string.isRequired,
    postLocation: PropTypes.string.isRequired,
    postDate: PropTypes.string.isRequired,
    postImage: PropTypes.string,
    postCover: PropTypes.string,
    postVideo: PropTypes.string,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string,
        comment: PropTypes.string,
        date: PropTypes.string,
      })
    ),
  }),
};
