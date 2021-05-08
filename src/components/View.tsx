import React from "react";

interface Props {
  message: any;
}

const View: React.FC<Props> = ({ message }) => {
  return <li>{message}</li>;
};

export default View;
