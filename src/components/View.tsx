import React from "react";
import { Snap } from "../routes/Home";

import DelMessage from "./DelMessage";
import EditMessage from "./EditMessage";

interface Props {
  message: string;
  isOwner: boolean;
  docData: Snap;
}

const View: React.FC<Props> = ({ message, isOwner, docData }) => {
  return (
    <li className="View">
      <div className="View__section">
        <span className="View__message">{message}</span>
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
