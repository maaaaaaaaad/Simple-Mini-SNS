import {
  faArrowRight,
  faImage,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { FirebaseUser } from "../App";
import { firebaseStore, storage } from "../service/firebaseSet";
import "../css/Message.css";

interface Props {
  userData: FirebaseUser | undefined;
}

const Message: React.FC<Props> = ({ userData }) => {
  const [message, setMessage] = useState<string>();
  const [imageFile, setImageFile] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    let imageUrl: string = "";

    if (imageFile !== "") {
      const fileSet = storage.ref().child(`${userData?.uid}/${Date.now()}`);
      const res = await fileSet.putString(imageFile!, "data_url");
      imageUrl = await res.ref.getDownloadURL();
    }

    const uploadData = {
      text: message,
      createAt: Date.now(),
      createId: userData!.uid,
      imageUrl,
    };

    await firebaseStore.collection("user").add(uploadData);
    setImageFile("");
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

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { files },
    } = event;
    const selecteFile = files![0];
    const fileReader = new FileReader();
    fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
      const target = event.currentTarget as FileReader;
      const result = target.result as string;
      setImageFile(result);
    };
    fileReader.readAsDataURL(selecteFile);
  };

  const imgCancel: React.MouseEventHandler<HTMLButtonElement> = () => {
    const checking: boolean = window.confirm("Do you cancel this photo?");
    if (checking) {
      setImageFile("");
    }
  };

  const onFileClick: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.preventDefault();
    imageRef.current!.click();
  };

  const onSubmitClick: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.preventDefault();
    submitRef.current!.click();
  };

  return (
    <section className="message">
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="message__input__box">
          <input
            className="message__input_message"
            onChange={onChange}
            type="text"
            placeholder="message"
            maxLength={300}
          />
          <FontAwesomeIcon
            className="message__icon__image"
            onClick={onFileClick}
            icon={faImage}
            size={"lg"}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className="message__icon__arrow"
            onClick={onSubmitClick}
            icon={faArrowRight}
            size={"lg"}
          ></FontAwesomeIcon>
        </div>
        <div className="message__input__file">
          <input
            ref={imageRef}
            className="message__input__image"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          <input
            ref={submitRef}
            className="message__input__submit"
            type="submit"
            value="Update"
          />
        </div>
      </form>
      {imageFile && (
        <form>
          <img src={imageFile} alt="selectedImg" width="100px" height="100px" />
          <span onClick={imgCancel}>
            <FontAwesomeIcon
              icon={faWindowClose}
              color="white"
            ></FontAwesomeIcon>
          </span>
        </form>
      )}
    </section>
  );
};

export default Message;
