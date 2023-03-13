import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-ctx";
import useInput from "../../hooks/use-input";
import AuthForm from "../../UIs/authForm/AuthForm";
import Input from "../../UIs/Input/Input";
import Loader from "../../UIs/loader/Loader";
import Model from "../../UIs/Model/Model";

export default function LoginForm() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    userInput: emailInput,
    userInputIsValid: emailInputIsValid,
    hasError: emailInputHasError,
    userInputChangeHandler: emailChangeHandler,
    userInputBlurHandler: emailBlurHandler,
  } = useInput((value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  );
  const {
    userInput: passwordInput,
    userInputIsValid: passwordInputIsValid,
    hasError: passwordInputHasError,
    userInputChangeHandler: passwordChangeHandler,
    userInputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length > 6);

  let formIsValid = false;
  if (emailInputIsValid && passwordInputIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const { token, data } = await response.json();
      authCtx.setToken(token);
      authCtx.setUser(data.user);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  const emailInputClasses = emailInputHasError ? "invalid" : "";

  const passwordInputClasses = passwordInputHasError ? "invalid" : "";

  if (isLoading)
    return (
      <Model>
        <Loader />
      </Model>
    );

  const loginFormStyle = {
    backgroundColor: " #f2f2f2",
    width: " 100vw",
    height: "100vh",
    padding: "10rem 3rem",
  };

  return (
    <div style={loginFormStyle}>
      <AuthForm
        onSubmit={formSubmitHandler}
        authFormTitle="PLEASE LOGIN"
        authFormBtn="Login"
      >
        <Input
          className={emailInputClasses}
          type="email"
          id="user-email"
          name="user-email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailInput}
          label="Email"
        />

        <Input
          className={passwordInputClasses}
          type="password"
          id="user-password"
          name="user-password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={passwordInput}
          label="Password"
        />
      </AuthForm>
    </div>
  );
}
