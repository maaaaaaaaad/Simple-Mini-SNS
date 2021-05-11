import React, { useEffect, useRef, useState } from "react";
import { FirebaseUser } from "../App";
import View from "../components/View";
import { firebaseStore, storage } from "../service/firebaseSet";

interface Props {
  userData: FirebaseUser | undefined;
}

type Arrays = Array<Snap>;
export type Snap = {
  [key: string]: string;
};

const Home: React.FC<Props> = ({ userData }) => {
  const [message, setMessage] = useState<string>();
  const [newMessage, setNewMessage] = useState<Arrays>();
  const [imageFile, setImageFile] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    firebaseStore
      .collection("user")
      .orderBy("createAt", "asc")
      .onSnapshot((snapshot) => {
        const snapArray = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setNewMessage(snapArray);
      });
  }, []);

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

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Please you enter message"
          maxLength={300}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Upload" />
      </form>
      {imageFile && (
        <form>
          <img src={imageFile} alt="selectedImg" width="100px" height="100px" />
          <button onClick={imgCancel}>Cancel</button>
        </form>
      )}
      <ul>
        {newMessage?.map((item) => (
          <View
            key={item.id}
            docData={item}
            message={item.text}
            isOwner={item.createId === userData!.uid}
            imageFile={item.imageUrl}
          ></View>
        ))}
      </ul>
    </>
  );
};

export default Home;
