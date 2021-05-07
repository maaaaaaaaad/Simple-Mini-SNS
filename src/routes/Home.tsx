import React, { useState } from "react";

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
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
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Please you enter message"
        />
        <input type="submit" value={message} />
      </form>
    </>
  );
};

export default Home;
