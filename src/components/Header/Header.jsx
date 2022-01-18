import React from "react";
import "./header.scss";
import { NavigationBar } from "../NavigationBar";
import { motion } from "framer-motion";
import { fadeInFadeOutAnimation } from "../../animations";

export const Header = () => {
  return (
    <motion.header
      className="header"
      initial="initial"
      animate="animate"
      transition={{ delay: 0.1, duration: 0.7 }}
      variants={fadeInFadeOutAnimation}
    >
      <NavigationBar />
    </motion.header>
  );
};
