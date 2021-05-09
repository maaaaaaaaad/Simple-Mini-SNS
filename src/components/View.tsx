import React from "react";
import { Snap } from "../routes/Home";

import DelMessage from "./DelMessage";
import EditMessage from "./EditMessage";

interface Props {
  message: string;
  isOwner: boolean;
  docData: Snap;
  imageFile: string;
}

const View: React.FC<Props> = ({ message, isOwner, docData, imageFile }) => {
  return (
    <li className="View">
      <div className="View__section">
        <span className="View__message">{message}</span>
        {imageFile && (
          <>
            <img src={imageFile} alt="img" width={100} height={100} />
          </>
        )}
        {isOwner && (
          <>
            <EditMessage message={message} docData={docData}></EditMessage>
            <DelMessage docData={docData}></DelMessage>
          </>
        )}
      </div>
    </li>
  );
};

export default View;
