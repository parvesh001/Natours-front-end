import React from "react";
import useInput from "../../hooks/use-input";
import AuthForm from "../../UIs/authForm/AuthForm";
import style from "./LoginForm.module.scss";

export default function LoginForm() {
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
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const emailInputClasses = emailInputHasError
    ? `${style["form-control"]} ${style["invalid"]}`
    : style["form-control"];

  const passwordInputClasses = passwordInputHasError
    ? `${style["form-control"]} ${style["invalid"]}`
    : style["form-control"];

  return (
    <AuthForm
      onSubmit={formSubmitHandler}
      authFormTitle="PLEASE LOGIN"
      authFormBtn="Login"
    >
      <div className={emailInputClasses}>
        <label htmlFor="user-email">Email</label>
        <input
          type="email"
          id="user-email"
          name="user-email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailInput}
        />
      </div>
      <div className={passwordInputClasses}>
        <label htmlFor="user-password">Password</label>
        <input
          type="password"
          id="user-password"
          name="user-password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={passwordInput}
        />
      </div>
    </AuthForm>
  );
}
