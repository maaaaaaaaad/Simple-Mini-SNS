import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { AuthProps, FirebaseUser } from "../App";
import { firebaseStore } from "../service/firebaseSet";
import "../css/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUndo } from "@fortawesome/free-solid-svg-icons";

interface Props extends AuthProps {
  userData: FirebaseUser | undefined;
  refreshUser: () => void;
}

const Profile: React.FC<Props> = ({ authService, userData, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState<string>(
    userData!.displayName!
  );
  const submitRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const onLogout = async () => {
    const warningMessage: string = "Are you sure sign out?";
    const toggleSign: boolean = window.confirm(warningMessage);

    if (toggleSign) {
      await authService.logout();
      history.push("/");
    }
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

  const onSubmitClick: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.preventDefault();
    submitRef.current!.click();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="profile__input__box">
          <input
            className="profile__input__text"
            type="text"
            placeholder="Display name"
            onChange={onChange}
            maxLength={15}
            value={newDisplayName}
          />
          <FontAwesomeIcon
            onClick={onSubmitClick}
            icon={faUndo}
            size={"1x"}
          ></FontAwesomeIcon>
        </div>

        <div>
          <input
            ref={submitRef}
            className="profile__input__submit"
            type="submit"
            value="Update"
          />
        </div>
      </form>
      <div className="profile__user__box">
        <div className="profile__user__name">
          Currently User: {userData!.displayName}
        </div>
        <span onClick={onLogout}>
          <FontAwesomeIcon
            className="profile__input__icon__signout"
            icon={faSignOutAlt}
            size={"2x"}
          ></FontAwesomeIcon>
        </span>
      </div>
    </>
  );
};

export default Profile;
