import React from "react";
import AuthServcie from "../service/authService";

const authServce = new AuthServcie();

const Home: React.FC = () => {
  const onLogOut = () => {
    authServce.logout();
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={onLogOut}>Log out</button>
    </>
  );
};

export default Home;
