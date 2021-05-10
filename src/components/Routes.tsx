import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FirebaseUser } from "../App";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Profile from "../routes/Profile";
import AuthServcie from "../service/authService";
import Nav from "./Nav";

interface Props {
  loginState: boolean;
  authService: AuthServcie;
  userData: FirebaseUser | undefined;
  refreshUser: () => void;
}

const AppRoutes: React.FC<Props> = ({
  loginState,
  authService,
  userData,
  refreshUser,
}) => {
  return (
    <>
      <BrowserRouter>
        {loginState && <Nav userData={userData}></Nav>}
        {!loginState ? (
          <Switch>
            <Route exact path="/">
              <Login authService={authService}></Login>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Home userData={userData}></Home>
            </Route>
            <Route exact path="/profile">
              <Profile
                authService={authService}
                userData={userData}
                refreshUser={refreshUser}
              ></Profile>
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
