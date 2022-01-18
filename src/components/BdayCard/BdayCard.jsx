import "./BdayCard.scss";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Comments } from "components/Comments";
import { ReactComponent as ConfettiBox } from "../../assets/svg/confetti_box.svg";
import { ReactComponent as ConfettiHat } from "../../assets/svg/confetti_hat.svg";
import { ReactComponent as ConfettiStar } from "../../assets/svg/confetti_star.svg";
import { ReactComponent as ConfettiCircle } from "../../assets/svg/confetti_circle.svg";
import {
  checkLocalStorage,
  removeLocalStorage,
  addLocalStorage,
} from "utils/localStorageData";
import { GiftIcon } from "components/GiftIcon/GiftIcon";
import { CommentIcon } from "components/CommentIcon/CommentIcon";
import { motion } from "framer-motion";
import { format } from "date-fns";

export const BdayCard = ({ storyData }) => {
  const [isGiftIconActive, setIsGiftIconActive] = useState(false);
  const [wishes, setWishes] = useState(storyData.wishes);
  const [commentIconActive, setCommentIconActive] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(storyData.comments);

  useEffect(() => {
    checkLocalStorage("savedBirthdays", storyData, setIsGiftIconActive);
    // eslint-disable-next-line
  }, []);

  const handleGiftIconClick = () => {
    setIsGiftIconActive(!isGiftIconActive);
    setWishes(
      !isGiftIconActive
        ? (prevWishes) => prevWishes + 1
        : (prevWishes) => prevWishes - 1
    );
    if (storyData && isGiftIconActive) {
      removeLocalStorage("savedBirthdays", storyData);
    } else {
      addLocalStorage("savedBirthdays", storyData);
    }
  };

  const handleCommentIconClick = () => {
    setCommentIconActive(!commentIconActive);
    setShowComments(!showComments);
  };

  const birthdayDate = new Date(storyData.birthdayDate);
  const formattedBirthdayDate = format(
    new Date(
      birthdayDate.getFullYear(),
      birthdayDate.getMonth(),
      birthdayDate.getDate()
    ),
    "MMM co"
  );

  return (
    <div className="bday-card">
      <div className="bday-card__profile">
        <img
          className="bday-card__img"
          src={storyData.userImage}
          alt="user-img"
        />
      </div>
      <div className="bday-card__main">
        <ConfettiStar className="confetti-piece" />
        <ConfettiCircle className="confetti-piece" />
        <ConfettiStar className="confetti-piece" />
        <ConfettiCircle className="confetti-piece" />
        <ConfettiStar className="confetti-piece" />
        <ConfettiCircle className="confetti-piece" />
        <ConfettiStar className="confetti-piece" />
        <ConfettiCircle className="confetti-piece" />
        <ConfettiStar className="confetti-piece" />
        <ConfettiCircle className="confetti-piece" />
        <div className="bday-card__content">
          <ConfettiHat className="bday-card__confetti-deco" />
          <div className="bday-card__details">
            <div className="bday-card__text--name-uppercase">
              {storyData.userName}
            </div>
            <div className="bday-card__text">
              Celebrated a birthday on&nbsp;
              <strong>{formattedBirthdayDate}</strong>
            </div>
            <div className="bday-card__text">
              <strong>Send a wish!</strong>
            </div>
          </div>
          <ConfettiBox className="bday-card__confetti-deco" />
        </div>
        <div className="bday-card__main__divider"></div>
        <div className="bday-card__main__action">
          <motion.div className="bday-card__gift" whileTap={{ scale: 0.95 }}>
            <button onClick={handleGiftIconClick}>
              <GiftIcon active={isGiftIconActive} />
            </button>
            <div className="bday-card__numbers">{wishes}</div>
          </motion.div>
          <motion.div className="bday-card__comment" whileTap={{ scale: 0.95 }}>
            <button onClick={handleCommentIconClick}>
              <CommentIcon active={commentIconActive} />
            </button>
            <div className="bday-card__numbers">{commentList.length}</div>
          </motion.div>
        </div>
        {showComments && (
          <Comments
            commentsList={commentList}
            setCommentList={setCommentList}
          />
        )}
      </div>
    </div>
  );
};

BdayCard.propTypes = {
  storyData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userImage: PropTypes.string.isRequired,
    birthdayDate: PropTypes.string.isRequired,
    wishes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string,
        comment: PropTypes.string,
        date: PropTypes.string,
      })
    ),
  }),
};
