# Simple & Mini SNS

1. Stack: Typescript, React
2. Design: Basic CSS
3. Back-end: Firebase

# Implements

1. Create user ID with Email and Password
2. Loign as Google and Github Authentication
3. User message write and view
4. Upload user profile

# Get User Data in App components
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
