import React, { useState } from "react";
import { Snap } from "../routes/Home";
import { firebaseStore } from "../service/firebaseSet";

interface Props {
  message: string;
  docData: Snap;
}

const EditMessage: React.FC<Props> = ({ message, docData }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>(message);

  const onToggleHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await firebaseStore.collection("user").doc(`${docData.id}`).update({
      text: newMessage,
    });
    setEditing(false);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event;
    setNewMessage(value);
  };

  return (
    <>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="edit__form">
            <input
              className="edit__message"
              type="text"
              placeholder="Edit your message"
              value={newMessage}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={onToggleHandler} className="edit__cancel">
            Cancel
          </button>
        </>
      ) : (
        <button onClick={onToggleHandler} className="edit__button">
          Edit
        </button>
      )}
    </>
  );
};

export default EditMessage;
