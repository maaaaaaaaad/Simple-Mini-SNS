import React, { useEffect, useState } from "react";
import AppRoutes from "./components/Routes";
import AuthServcie from "./service/authService";
import "./App.css";

const authService = new AuthServcie();

const App: React.FC = () => {
  const [lodingSpanner, setSpanner] = useState<boolean>(false);
  const [loginState, setLoginState] = useState<boolean>(false);

  useEffect(() => {
    authService.onStateChanged((user: firebase.default.User) => {
      if (user) {
        setLoginState(true);
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
          <AppRoutes loginState={loginState}></AppRoutes>
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
