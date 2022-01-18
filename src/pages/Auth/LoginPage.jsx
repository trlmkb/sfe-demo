import React from "react";
import "./auth.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ReactComponent as MainLogo } from "../../assets/Logo-main-colourful.svg";
import { Layout } from "components/Layout";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../features/UserContext";
import { Link } from "react-router-dom";
import { InputField } from "components/InputField";
import { Button } from "components/Button";
import { LoadingScreen } from "components/LoadingScreen/LoadingScreen";
import { motion } from "framer-motion";
import {
  fromRightToLeftAnimation,
  fromLeftToRightAnimation,
  fromToptoBottomAnimation,
} from "../../animations";

export const LoginPage = () => {
  const [loginAuthError, setLoginAuthError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        setLoginAuthError(true);
      } else if (
        values.email !== user.email ||
        values.password !== user.password
      ) {
        setLoginAuthError(true);
      } else {
        handleUserLogin();
      }
    },
  });

  const { handleUserLogin, userDataLoading } = useContext(UserContext);

  if (userDataLoading) {
    return (
      <div className="loader-container">
        <LoadingScreen fullScreen={true} />
      </div>
    );
  }

  return (
    <Layout>
      <section className="auth-page">
        <motion.div
          className="auth-page__icon"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fromRightToLeftAnimation}
        >
          <MainLogo />
        </motion.div>
        <motion.form
          noValidate
          onSubmit={formik.handleSubmit}
          className="auth-page__form"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fromLeftToRightAnimation}
        >
          <div className="auth-page__header">
            <h2 className="auth-page__header-title">Login</h2>
            <div className="auth-page__header-subtitle">
              Welcome back, please login.
            </div>
          </div>
          <div className="auth-page__fields">
            <div className="auth-page__fields-loginEmailSection">
              <InputField
                name="email"
                label="email"
                type="email"
                placeholder="Insert email"
                value={formik.values.email}
                onChange={formik.handleChange}
                touched={formik.touched.email}
                error={formik.touched.email && formik.errors.email}
                clearInput={() => formik.setFieldValue("email", "")}
              />
            </div>
            <div className="auth-page__fields-loginPasswordSection">
              <InputField
                name="password"
                label="password"
                type="password"
                placeholder="Insert password"
                value={formik.values.password}
                onChange={formik.handleChange}
                touched={formik.touched.password}
                error={formik.touched.password && formik.errors.password}
                clearInput={() => formik.setFieldValue("password", "")}
              />
            </div>
          </div>
          {loginAuthError && (
            <motion.div
              className="auth-page__loginError"
              initial="initial"
              animate="animate"
              variants={fromToptoBottomAnimation}
            >
              Please enter a correct username and password.
            </motion.div>
          )}
          <div className="auth-page__actionBlock">
            <Button
              label="Login"
              size="large"
              variant="primary"
              type="submit"
            />
            <div className="auth-page__actionBlock-signUpLink">
              Don&apos;t have an account?{" "}
              <Link className="auth-page__actionBlock-link" to="/registration">
                Sign up
              </Link>
            </div>
          </div>
        </motion.form>
      </section>
    </Layout>
  );
};
