import React, { useState } from "react";
import AuthServcie from "../service/authService";

const authService = new AuthServcie();

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newAccount, setAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        // Create Account
        const createData = await authService.createAccount(email, password);
        await console.log(createData);
      } else {
        // Login
        const loginData = await authService.signInWithAccount(email, password);
        await console.log(loginData);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const signIn: React.MouseEventHandler<HTMLButtonElement> = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const target = event.currentTarget.textContent as string;
    await authService.diffLogin(target);
  };

  const toggleAccount = () => {
    setAccount((prev) => !prev);
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
        <span onClick={toggleAccount} className="form__toggle">
          {newAccount ? "SIGN IN" : "Create Account"}
        </span>
      </form>
      <div className="error">{error}</div>
      <div className="btn">
        <button onClick={signIn} className="btn__google">
          Continue Google
        </button>
        <button onClick={signIn} className="btn__github">
          Continue Github
        </button>
      </div>
    </>
  );
};

export default Login;
