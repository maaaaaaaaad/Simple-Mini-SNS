import React, { useState } from "react";
import AuthServcie from "../service/authService";

interface Props {
  authService: AuthServcie;
}

const Login: React.FC<Props> = ({ authService }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newAccount, setAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [lodingSpanner, setSpanner] = useState<boolean>(false);

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
        await authService.createAccount(email, password);
      } else {
        // Login
        setSpanner(true);
        await authService.signInWithAccount(email, password);
        setSpanner(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const signIn: React.MouseEventHandler<HTMLButtonElement> = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const target = event.currentTarget.textContent as string;
    setSpanner(true);
    await authService.diffLogin(target);
    setSpanner(false);
  };

  const toggleAccount = () => {
    setAccount((prev) => !prev);
  };

  return (
    <>
      {!lodingSpanner ? (
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
          <div className="btn">
            <button onClick={signIn} className="btn__google">
              Continue Google
            </button>
            <button onClick={signIn} className="btn__github">
              Continue Github
            </button>
          </div>
        </>
      ) : (
        <div className="lodingSpanner"></div>
      )}

      <div className="error">{error}</div>
    </>
  );
};

export default Login;
