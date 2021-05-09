import React from "react";
import { Snap } from "../routes/Home";
import { firebaseStore } from "../service/firebaseSet";

interface Props {
  docData: Snap;
}

const DelMessage: React.FC<Props> = ({ docData }) => {
  const onDeleteHandler: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const warningMessage: string = "Are you sure you to this message?";
    const toggleSign: boolean = window.confirm(warningMessage);

    if (toggleSign) {
      await firebaseStore.collection("user").doc(`${docData.id}`).delete();
    }
  };

  return (
    <button onClick={onDeleteHandler} className="Del__message">
      Delete
    </button>
  );
};

export default DelMessage;
