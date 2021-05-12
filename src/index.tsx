import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthServcie from "./service/authService";

const authService = new AuthServcie();

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} />
  </React.StrictMode>,
  document.getElementById("root")
);
