import React, { useState } from "react";
import AppRoutes from "./components/Routes";

const App: React.FC = () => {
  const [loginState, setLoginState] = useState(false);

  return (
    <div className="app">
      <AppRoutes loginState={loginState}></AppRoutes>
      <footer className="app__footer">
        &copy; Project SNS {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
