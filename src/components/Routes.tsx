import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProps, FirebaseUser } from "../App";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Profile from "../routes/Profile";

import Nav from "./Nav";

interface Props extends AuthProps {
  loginState: boolean;
  userData: FirebaseUser | undefined;
  refreshUser: () => void;
  showProfileImg: (profileImg: string) => void;
  profileImage: string;
}

const AppRoutes: React.FC<Props> = ({
  loginState,
  authService,
  userData,
  refreshUser,
  showProfileImg,
  profileImage,
}) => {
  const getProfileImg = (profileImg: string) => {
    showProfileImg(profileImg);
  };

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
              <Home userData={userData} profileImage={profileImage}></Home>
            </Route>
            <Route exact path="/profile">
              <Profile
                getProfileImg={getProfileImg}
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
