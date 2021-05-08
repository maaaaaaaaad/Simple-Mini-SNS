import React, { useEffect, useRef, useState } from "react";
import View from "../components/View";
import { firebaseStore } from "../service/firebaseSet";

type FirebaseQuery<
  Data
> = firebase.default.firestore.QueryDocumentSnapshot<Data>;

type FirebaseDocumentData = firebase.default.firestore.DocumentData;

type Arrays = string[];

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [newMessage, setNewMessage] = useState<Arrays | FirebaseDocumentData>(
    []
  );

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

  const getMessage = async () => {
    const getData = await firebaseStore.collection("user").get();
    getData.forEach((document: FirebaseQuery<FirebaseDocumentData>) => {
      const mesDummy = {
        ...document.data(),
        id: document.id,
      };
      setNewMessage((prev: Arrays) => [...prev, mesDummy]);
    });
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit}>
        <input
          value={message}
          onChange={onChange}
          type="text"
          placeholder="Please you enter message"
          maxLength={300}
        />
        <input type="submit" value="Upload" />
      </form>
      <ul>
        {newMessage.map((item: any) => (
          <View key={item.id} message={item.text}></View>
        ))}
      </ul>
    </>
  );
};

export default Home;
