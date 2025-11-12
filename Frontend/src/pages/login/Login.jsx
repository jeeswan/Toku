import React, { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Taku</h3>
          <span className="logindesc">
            Connect with people around the globe on Taku
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={password}
              minLength={6}
              required
            />
            <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? "loading" : "Log In"}</button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton">{isFetching ? "loading" : "Create new account"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
