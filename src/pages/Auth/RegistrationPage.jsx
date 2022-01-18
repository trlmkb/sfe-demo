import React from "react";
import "./auth.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ReactComponent as MainLogo } from "../../assets/Logo-main-colourful.svg";
import { Layout } from "components/Layout";
import { useContext } from "react";
import { UserContext } from "../../features/UserContext";
import { Link } from "react-router-dom";
import { InputField } from "components/InputField";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "components/LoadingScreen/LoadingScreen";
import { motion } from "framer-motion";
import {
  fromRightToLeftAnimation,
  fromLeftToRightAnimation,
} from "../../animations";

export const RegistrationPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Must be 2 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("First name is required"),
      lastName: Yup.string()
        .min(2, "Must be 2 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Last name is required"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Must be at least 6 charaters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      const userLocalStorageData = {
        ...values,
        isLogged: false,
        savedStories: [],
        savedBirthdays: [],
        savedRestaurants: [],
      };
      localStorage.setItem("userInfo", JSON.stringify(userLocalStorageData));
      navigate("/login");
    },
  });

  const { userDataLoading } = useContext(UserContext);

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
            <h2 className="auth-page__header-title">Register</h2>
            <div className="auth-page__header-subtitle">
              Let&apos;s get you on board.
            </div>
          </div>
          <div className="auth-page__fields">
            <div className="auth-page__fields-registrationNameSection">
              <InputField
                name="firstName"
                label="first name"
                type="text"
                placeholder="Insert first name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                touched={formik.touched.firstName}
                error={formik.touched.firstName && formik.errors.firstName}
                clearInput={() => formik.setFieldValue("firstName", "")}
              />
              <InputField
                name="lastName"
                label="last name"
                type="text"
                placeholder="Insert last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                touched={formik.touched.lastName}
                error={formik.touched.lastName && formik.errors.lastName}
                clearInput={() => formik.setFieldValue("lastName", "")}
              />
            </div>
            <div className="auth-page__fields-registrationEmailSection">
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
            <div className="auth-page__fields-registrationPasswordSection">
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
              <InputField
                name="confirmPassword"
                label="confirm password"
                type="password"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                touched={formik.touched.confirmPassword}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                clearInput={() => formik.setFieldValue("confirmPassword", "")}
              />
            </div>
          </div>
          <div className="auth-page__actionBlock">
            <Button
              label="Register"
              size="large"
              variant="primary"
              type="submit"
            />
            <div className="auth-page__actionBlock-signUpLink">
              Already have an account?{" "}
              <Link className="auth-page__actionBlock-link" to="/login">
                Sign in
              </Link>
            </div>
          </div>
        </motion.form>
      </section>
    </Layout>
  );
};
