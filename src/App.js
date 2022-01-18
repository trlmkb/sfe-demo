import React, { useContext } from "react";

import "./styles/global.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Dashboard } from "./pages/Dashboard";
import { Reservations } from "./pages/Reservations";
import { EatOut } from "./pages/EatOut";
import { EatOutCategoriesPage } from "pages/EatOutCategories/EatOutCategoriesPage";
import { RegistrationPage } from "./pages/Auth";
import { LoginPage } from "./pages/Auth";
import { EatOutRestaurant } from "pages/EatOutRestaurant";
import { NotFound } from "pages/NotFound";
import { UserContext } from "features/UserContext";

import { Header } from "components/Header/Header";
import { Footer } from "components/Footer/Footer";
import { ProtectedRoute } from "features/ProtectedRoute";

export function App() {
  const { userData } = useContext(UserContext);
  const location = useLocation();
  return (
    <>
      {userData.isLogged && <Header />}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          {/* Dashboard (index) page */}

          <Route
            path="/"
            element={
              <ProtectedRoute isLogInRequired>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Reservation page */}
          <Route
            path="/reservations"
            element={
              <ProtectedRoute isLogInRequired>
                <Reservations />
              </ProtectedRoute>
            }
          />
          {/* EatOut page */}
          <Route
            path="/eatout"
            element={
              <ProtectedRoute isLogInRequired>
                <EatOut />
              </ProtectedRoute>
            }
          />
          {/* EatOutCategories page  */}
          <Route
            path="eatout/category/:id"
            element={
              <ProtectedRoute isLogInRequired>
                <EatOutCategoriesPage />
              </ProtectedRoute>
            }
          />
          {/* EatOutRestaurant page */}
          <Route
            path="eatout/restaurant/:id"
            element={
              <ProtectedRoute isLogInRequired>
                <EatOutRestaurant />
              </ProtectedRoute>
            }
          />
          {/* Registration Page */}
          <Route
            path="/registration"
            element={
              <ProtectedRoute isLogOutRequired>
                <RegistrationPage />
              </ProtectedRoute>
            }
          />
          {/* Login Page */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isLogOutRequired>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          {/* 404 page error */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {userData.isLogged && <Footer />}
    </>
  );
}
