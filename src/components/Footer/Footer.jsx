import React from "react";
import "./footer.scss";
import { motion } from "framer-motion";
import { fadeInFadeOutAnimation } from "../../animations";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial="initial"
      animate="animate"
      transition={{ delay: 0.1, duration: 0.7 }}
      variants={fadeInFadeOutAnimation}
    >
      <div className="footer__container">
        <div className="footer__text">Copyright &copy; {year} Devbridge</div>
      </div>
    </motion.footer>
  );
};
