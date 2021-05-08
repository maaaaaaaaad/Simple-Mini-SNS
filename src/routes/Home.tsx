import React, { useRef, useState } from "react";
import { firebaseStore } from "../service/firebaseSet";

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await firebaseStore.collection("user").add({
      text: message,
      createAt: Date.now(),
    });
    formRef.current!.reset();
    setMessage("");
  };

  const onChange: React.ChangeEventHandler<HTMLElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

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
    </>
  );
};

export default Home;
