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
}

const AppRoutes: React.FC<Props> = ({ loginState, authService, userData }) => {
  return (
    <>
      <BrowserRouter>
        {loginState && <Nav></Nav>}
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
              <Profile authService={authService}></Profile>
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
