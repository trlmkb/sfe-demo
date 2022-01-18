import React from "react";
import "./NotFound.scss";
import { ReactComponent as QuestionMark } from "../../assets/question_mark.svg";
import { Navigate } from "react-router-dom";
import { Layout } from "components/Layout";
import { useContext } from "react";
import { UserContext } from "../../features/UserContext";
import { Link } from "react-router-dom";

export const NotFound = () => {
  const { userData } = useContext(UserContext);
  if (!userData.isLogged) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <main className="notfound">
        <div className="notfound__symbol--wrapper">
          <div className="notfound__symbol">4</div>
          <QuestionMark className="notfound__symbol rotating" />
          <div className="notfound__symbol">4</div>
        </div>
        <div className="notfound__text">
          <p>
            Maybe this page moved? Got deleted? <br />
            Is hiding out in quarantine? <br />
            Never existed in the first place? <br />
            <br />
            Go to{" "}
            <Link className="notfound__text" to="/">
              dashboard
            </Link>{" "}
            and try from there
          </p>
        </div>
      </main>
    </Layout>
  );
};
