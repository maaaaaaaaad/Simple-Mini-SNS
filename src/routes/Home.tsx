import React, { useEffect, useState } from "react";
import { FirebaseUser } from "../App";
import Message from "../components/Message";
import View from "../components/View";
import { firebaseStore } from "../service/firebaseSet";
import "../css/Home.css";

interface Props {
  userData: FirebaseUser | undefined;
}

type Arrays = Array<Snap>;
export type Snap = {
  [key: string]: string;
};

type FirebaseSnapshot =
  firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>;

const Home: React.FC<Props> = ({ userData }) => {
  const [newMessage, setNewMessage] = useState<Arrays>();

  useEffect(() => {
    firebaseStore
      .collection("user")
      .orderBy("createAt", "asc")
      .onSnapshot((snapshot: FirebaseSnapshot) => {
        const snapArray = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setNewMessage(snapArray);
      });
  }, []);

  return (
    <>
      <Message userData={userData}></Message>
      <ul className="message">
        {newMessage?.map((item) => (
          <View
            key={item.id}
            docData={item}
            message={item.text}
            isOwner={item.createId === userData!.uid}
            imageFile={item.imageUrl}
            userProfileImg={item.userImage}
          ></View>
        ))}
      </ul>
    </>
  );
};

export default Home;
