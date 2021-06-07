# Simple & Mini SNS

1. Stack: Typescript, React
2. Design: Basic CSS
3. Back-end: Firebase

# Implements

1. Create user ID with Email and Password
2. Loign as Google and Github Authentication
3. User message write and view
4. Upload user profile


## Auth

```javascript
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AuthServcie from "../service/authService";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "../css/Login.css";

library.add(fab);

interface Props {
  authService: AuthServcie;
}

const Login: React.FC<Props> = ({ authService }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newAccount, setAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [lodingSpanner, setSpanner] = useState<boolean>(false);

  const onChange: React.ChangeEventHandler<HTMLElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        // Create Account
        await authService.createAccount(email, password);
      } else {
        // Login
        setSpanner(true);
        await authService.signInWithAccount(email, password);
        setSpanner(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const signIn: React.MouseEventHandler<HTMLButtonElement> = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const target = event.currentTarget.textContent as string;
    setSpanner(true);
    await authService.diffLogin(target);
    setSpanner(false);
  };

  const toggleAccount = () => {
    setAccount((prev) => !prev);
  };

  return (
    <>
      {!lodingSpanner ? (
        <>
          <form onSubmit={onSubmit} className="form__section">
            <input
              className="form__email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={onChange}
            />
            <input
              className="form__password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={onChange}
            />
            <input
              className="form__submit"
              name="submit"
              type="submit"
              value={newAccount ? "Create Account" : "SIGN IN"}
            />
            <span onClick={toggleAccount} className="form__toggle">
              {newAccount ? "SIGN IN" : "Create Account"}
            </span>
          </form>
          <div className="btn">
            <button onClick={signIn} className="btn__google">
              <FontAwesomeIcon icon={["fab", "google"]}></FontAwesomeIcon>
              Continue Google
            </button>
            <button onClick={signIn} className="btn__github">
              <FontAwesomeIcon icon={["fab", "github"]}></FontAwesomeIcon>
              Continue Github
            </button>
          </div>
        </>
      ) : (
        <div className="lodingSpanner"></div>
      )}

      <div className="error">{error}</div>
    </>
  );
};

export default Login;

```

## Profile

```javascript
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
    if (userData!.displayName !== userData!.uid) {
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

  const onUpdateImg: React.MouseEventHandler<SVGSVGElement> = async () => {
    const ok = window.confirm(`Do you upload this profile image?`);
    if (ok) {
      const reference = storage
        .ref()
        .child(`Profile_img_${userData!.uid}/seletedImage`);
      const pushed = await reference.putString(selectedProfileImg!, "data_url");
      const profileImgUrl: string = await pushed.ref.getDownloadURL();
      setSelectedProfileImg("");
      setResultImg(profileImgUrl);
    }
  };

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

```

## Get User Data in App components
```javascript
export type FirebaseUser = firebase.default.User;

const App: React.FC<AuthProps> = ({ authService }) => {
  const [lodingSpanner, setSpanner] = useState<boolean>(false);
  const [loginState, setLoginState] = useState<boolean>(false);
  const [userData, setUserData] = useState<FirebaseUser>();
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    authService.onStateChanged((user: FirebaseUser) => {
      if (user) {
        setLoginState(true);
        setUserData(user);
      } else {
        setLoginState(false);
      }
      setSpanner(true);
    });
  });

  const getImgDB = async () => {
    const getImgDB: string = await storage
      .ref()
      .child(`Profile_img_${userData?.uid}/seletedImage`)
      .getDownloadURL();

    setProfileImage(getImgDB);
  };

  useEffect(() => {
    userData && getImgDB();
  });

  const refreshUser = () => {
    const user = authService.currentUser();
    setUserData(Object.assign<{}, FirebaseUser>({}, user));
  };

  const showProfileImg = (profileImg: string) => {
    setProfileImage(profileImg);
  };
```

## Object assign 
1. If I using the setUserData(user) is no re-render. Because so many data in object from user.
2. In this case use ‘object.assign’ that copy to current object into the new object.
```javascript
setUserData(Object.assign<{}, FirebaseUser>({}, user));
```
