import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Snap } from "../routes/Home";
import { firebaseStore, storage } from "../service/firebaseSet";

interface Props {
  docData: Snap;
}

const DelMessage: React.FC<Props> = ({ docData }) => {
  const onDeleteHandler: React.MouseEventHandler<HTMLButtonElement> =
    async () => {
      const warningMessage: string = "Are you sure you to this message?";
      const toggleSign: boolean = window.confirm(warningMessage);

      if (toggleSign) {
        await firebaseStore.collection("user").doc(`${docData.id}`).delete();
        await storage.refFromURL(`${docData?.imageUrl}`).delete();
      }
    };

  return (
    <span onClick={onDeleteHandler} className="Del__message">
      <FontAwesomeIcon icon={faTrash} color="white"></FontAwesomeIcon>
    </span>
  );
};

export default DelMessage;
