import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { AuthProps, FirebaseUser } from "../App";
import { firebaseStore, storage } from "../service/firebaseSet";
import "../css/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faImage,
  faSignOutAlt,
  faUndo,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";

interface Props extends AuthProps {
  userData: FirebaseUser | undefined;
  refreshUser: () => void;
  getProfileImg: (profileImg: string) => void;
}

const Profile: React.FC<Props> = ({
  authService,
  userData,
  refreshUser,
  getProfileImg,
}) => {
  const [newDisplayName, setNewDisplayName] = useState<string>(
    userData!.displayName!
  );
  const [selectedProfileImg, setSelectedProfileImg] = useState<string>("");
  const [resultImg, setResultImg] = useState<string>("");

  const profileImg = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  useEffect(() => {
    resultImg && getProfileImg(resultImg);
  }, [getProfileImg, resultImg]);

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
    if (userData!.displayName && selectedProfileImg) {
      const reference = storage
        .ref()
        .child(`Profile_img_${userData!.uid}/seletedImage`);
      const pushed = await reference.putString(selectedProfileImg!, "data_url");
      const profileImgUrl: string = await pushed.ref.getDownloadURL();
      setResultImg(profileImgUrl);

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

  const onUpdateImg: React.MouseEventHandler<SVGSVGElement> = () => {};

  const onProfileImgChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const {
      target: { files },
    } = event;
    const selectedFile = files![0];
    const fileReader = new FileReader();
    fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
      const target = event.currentTarget as FileReader;
      const result = target.result as string;
      setSelectedProfileImg(result);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const onImgClick: React.MouseEventHandler<SVGSVGElement> = () => {
    profileImg.current!.click();
  };

  const imageCancel: React.MouseEventHandler<SVGSVGElement> = () => {
    setSelectedProfileImg("");
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
          <input
            className="profile__userImg"
            ref={profileImg}
            type="file"
            accept="image/*"
            onChange={onProfileImgChange}
          />
          <FontAwesomeIcon
            className="profile__icon img"
            icon={faImage}
            size={"1x"}
            onClick={onImgClick}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className="profile__icon return"
            onClick={onSubmitClick}
            icon={faUndo}
            size={"1x"}
          ></FontAwesomeIcon>
        </div>
        {selectedProfileImg && (
          <div className="profile__image__preview">
            <img
              className="profile__image__seletedImg"
              src={selectedProfileImg}
              alt="seletedImg"
              width={100}
              height={100}
            />
            <FontAwesomeIcon
              className="profile__icon close"
              icon={faWindowClose}
              onClick={imageCancel}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              onClick={onUpdateImg}
              className="profile__icon arrow"
              icon={faArrowCircleRight}
            ></FontAwesomeIcon>
          </div>
        )}
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
          Currently Name: {userData!.displayName}
        </div>
        <span onClick={onLogout}>
          <FontAwesomeIcon
            className="profile__icon signout"
            icon={faSignOutAlt}
            size={"1x"}
          ></FontAwesomeIcon>
        </span>
      </div>
    </>
  );
};

export default Profile;
