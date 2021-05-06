import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";

interface Props {
  loginState: boolean;
}

const AppRoutes: React.FC<Props> = ({ loginState }) => {
  return (
    <>
      <BrowserRouter>
        {!loginState ? (
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
