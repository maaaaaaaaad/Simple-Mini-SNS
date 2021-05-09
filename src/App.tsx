import React, { useEffect, useState } from "react";
import AppRoutes from "./components/Routes";
import AuthServcie from "./service/authService";
import "./App.css";

const authService = new AuthServcie();
export type FirebaseUser = firebase.default.User;

const App: React.FC = () => {
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

  return (
    <>
      {lodingSpanner ? (
        <div className="app">
          <AppRoutes
            loginState={loginState}
            authService={authService}
            userData={userData}
          ></AppRoutes>
          <footer className="app__footer">
            &copy; Project SNS {new Date().getFullYear()}
          </footer>
        </div>
      ) : (
        <div className="lodingSpanner"></div>
      )}
    </>
  );
};

export default App;
