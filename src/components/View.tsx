import React from "react";
import { Snap } from "../routes/Home";
import DelMessage from "./DelMessage";
import EditMessage from "./EditMessage";
import "../css/View.css";

interface Props {
  message: string;
  isOwner: boolean;
  docData: Snap;
  imageFile: string;
  profileImage: string;
}

const View: React.FC<Props> = ({
  message,
  isOwner,
  docData,
  imageFile,
  profileImage,
}) => {
  return (
    <li className="view">
      <div className="view__section">
        {isOwner && (
          <>
            {profileImage && (
              <img
                className="view__userImg"
                src={profileImage}
                alt=""
                width={50}
                height={50}
              />
            )}
          </>
        )}
        <span className="view__message">{message}</span>
        {imageFile && (
          <>
            <img src={imageFile} alt="img" width={100} height={100} />
          </>
        )}
        {isOwner && (
          <>
            <span className="view__message edit">
              <EditMessage message={message} docData={docData}></EditMessage>
            </span>
            <span className="view__message delete">
              <DelMessage docData={docData}></DelMessage>
            </span>
          </>
        )}
      </div>
    </li>
  );
};

export default View;
