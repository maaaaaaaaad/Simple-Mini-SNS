import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newAccount, setAccount] = useState<boolean>(true);

  const onChange: React.ChangeEventHandler<HTMLElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (newAccount) {
      // Create Account
    } else {
      // Login
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <input
          className="form__email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={onChange}
        />
        <input
          className="form__password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={onChange}
        />
        <input
          className="form__submit"
          name="submit"
          type="submit"
          value={newAccount ? "Create Account" : "SIGN IN"}
        />
      </form>
      <div className="btn">
        <button className="btn__google">Continue Google</button>
        <button className="btn__github">Continue Github</button>
      </div>
    </>
  );
};

export default Login;
