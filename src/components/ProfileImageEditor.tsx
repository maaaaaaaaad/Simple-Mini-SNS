import React, { useState } from "react";
import { FirebaseUser } from "../App";
import { storage } from "../service/firebaseSet";

interface Props {
  userData: FirebaseUser | undefined;
}

const ProfileImageEditor: React.FC<Props> = ({ userData }) => {
  const [imageFile, setImageFile] = useState<string>("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const fileSet = storage.ref().child(`Image_${userData?.uid}/${Date.now()}`);
    const res = await fileSet.putString(imageFile, "data_url");
    await res.ref.getDownloadURL();
    setImageFile("");
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

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Image Upload" />
      </form>
      {imageFile && (
        <div>
          <img src={imageFile} alt="profileImg" width={150} height={150} />
          <button onClick={imgCancel}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default ProfileImageEditor;
