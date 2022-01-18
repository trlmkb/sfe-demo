import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { springyDropIn } from "../../../../../animations";
import { ReactComponent as Cross } from "../../../../../assets/svg/cross.svg";
import "./ReviewsModal.scss";

export const ReviewsModal = ({ children, setModalRequired }) => (
  <motion.div
    className="reviews-modal"
    onClick={() => setModalRequired(false)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className="reviews-modal__container"
      variants={springyDropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Cross
        className="reviews-modal__cross"
        onClick={() => setModalRequired(false)}
      />
      {children}
    </motion.div>
  </motion.div>
);

ReviewsModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  setModalRequired: PropTypes.func.isRequired,
};
