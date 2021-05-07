import React from "react";
import { useHistory } from "react-router";
import AuthServcie from "../service/authService";

interface Props {
  authService: AuthServcie;
}

const Profile: React.FC<Props> = ({ authService }) => {
  const history = useHistory();

  const onLogout = async () => {
    await authService.logout();
    history.push("/");
  };

  return (
    <>
      <h1>Profile</h1>
      <button onClick={onLogout}>Log out</button>
    </>
  );
};

export default Profile;
