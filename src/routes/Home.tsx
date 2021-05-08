import React, { useEffect, useRef, useState } from "react";
import View from "../components/View";
import { firebaseStore } from "../service/firebaseSet";

type Arrays = Array<Snap>;
type Snap = {
  [key: string]: string;
};

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>();
  const [newMessage, setNewMessage] = useState<Arrays>();

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await firebaseStore.collection("user").add({
      text: message,
      createAt: Date.now(),
    });
    formRef.current!.reset();
  };

  const onChange: React.ChangeEventHandler<HTMLElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  useEffect(() => {
    firebaseStore
      .collection("user")
      .orderBy("createAt", "asc")
      .onSnapshot((snapshot) => {
        const snapArray = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setNewMessage(snapArray);
      });
  }, []);

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Please you enter message"
          maxLength={300}
        />
        <input type="submit" value="Upload" />
      </form>
      <ul>
        {newMessage?.map((item) => (
          <View key={item.id} message={item.text}></View>
        ))}
      </ul>
    </>
  );
};

export default Home;
