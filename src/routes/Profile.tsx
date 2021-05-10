import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { FirebaseUser } from "../App";
import AuthServcie from "../service/authService";
import { firebaseStore } from "../service/firebaseSet";

interface Props {
  authService: AuthServcie;
  userData: FirebaseUser | undefined;
  refreshUser: () => void;
}

const Profile: React.FC<Props> = ({ authService, userData, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState<string>(
    userData!.displayName!
  );
  const history = useHistory();

  const onLogout = async () => {
    await authService.logout();
    history.push("/");
  };

  const getMyMessage = async (userData: FirebaseUser) => {
    firebaseStore
      .collection("user")
      .where("createId", "==", userData.uid)
      .orderBy("createAt", "asc")
      .get();
  };

  useEffect(() => {
    getMyMessage(userData!);
  }, [userData]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (userData!.displayName !== newDisplayName) {
      await userData!.updateProfile({
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update" />
      </form>
      <button onClick={onLogout}>Log out</button>
    </>
  );
};

export default Profile;
