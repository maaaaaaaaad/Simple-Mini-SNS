import React, { useEffect, useState } from "react";
import AppRoutes from "./components/Routes";
import AuthServcie from "./service/authService";
import "./css/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopyright,
  faDog,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export interface AuthProps {
  authService: AuthServcie;
}

export type FirebaseUser = firebase.default.User;

const App: React.FC<AuthProps> = ({ authService }) => {
  const [lodingSpanner, setSpanner] = useState<boolean>(false);
  const [loginState, setLoginState] = useState<boolean>(false);
  const [userData, setUserData] = useState<FirebaseUser>();

  useEffect(() => {
    authService.onStateChanged((user: FirebaseUser) => {
      if (user) {
        setLoginState(true);
        setUserData(user);
      } else {
        setLoginState(false);
      }
      setSpanner(true);
    });
  });

  const refreshUser = () => {
    const user = authService.currentUser();
    setUserData(Object.assign<{}, FirebaseUser>({}, user));
  };

  return (
    <section className="app">
      <header className="app__header">
        <FontAwesomeIcon
          className="app__header__icon"
          icon={faDog}
          color="white"
          size={"5x"}
        ></FontAwesomeIcon>
      </header>

      <section className="app__body">
        <div className="app__image__preview">
          <FontAwesomeIcon icon={faUserCircle} size={"6x"}></FontAwesomeIcon>
        </div>
        {lodingSpanner ? (
          <div className="app__routes">
            <AppRoutes
              loginState={loginState}
              authService={authService}
              userData={userData}
              refreshUser={refreshUser}
            ></AppRoutes>
          </div>
        ) : (
          <div className="lodingSpanner"></div>
        )}
      </section>

      <footer className="app__footer">
        <FontAwesomeIcon
          className="app__icon"
          icon={faCopyright}
          size={"1x"}
          color="white"
        ></FontAwesomeIcon>
        Project SNS {new Date().getFullYear()}
      </footer>
    </section>
  );
};

export default App;
