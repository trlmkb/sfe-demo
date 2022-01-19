import React from "react";
import "./NotFound.scss";
import { ReactComponent as QuestionMark } from "../../assets/question_mark.svg";
import { Layout } from "components/Layout";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { container, fromToptoBottomAnimation } from "../../animations";

export const NotFound = () => {
  return (
    <Layout>
      <motion.main
        className="notfound"
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          className="notfound__symbol-wrapper"
          variants={fromToptoBottomAnimation}
        >
          <div className="notfound__symbol">4</div>
          <QuestionMark className="notfound__symbol rotating" />
          <div className="notfound__symbol">4</div>
        </motion.div>
        <motion.div
          className="notfound__text"
          variants={fromToptoBottomAnimation}
        >
          <p>
            Maybe this page moved? <br />
            Got deleted? Is hiding out in quarantine? <br />
            Never existed in the first place? <br />
            <br />
            Go to{" "}
            <Link className="notfound__text" to="/">
              dashboard
            </Link>{" "}
            and try from there
          </p>
        </motion.div>
      </motion.main>
    </Layout>
  );
};
