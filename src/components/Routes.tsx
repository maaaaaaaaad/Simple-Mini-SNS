import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Profile from "../routes/Profile";
import AuthServcie from "../service/authService";
import Nav from "./Nav";

interface Props {
  loginState: boolean;
  authService: AuthServcie;
}

const AppRoutes: React.FC<Props> = ({ loginState, authService }) => {
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
              <Home></Home>
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
