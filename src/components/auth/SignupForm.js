import React from "react";
import AuthForm from "../../UIs/authForm/AuthForm";
import useInput from "../../hooks/use-input";
import style from "./SignupForm.module.scss";

export default function SignupForm() {
  const {
    userInput: nameInput,
    userInputIsValid: nameInputIsValid,
    hasError: nameInputHasError,
    userInputChangeHandler: nameChangeHandler,
    userInputBlurHandler: nameBlurHandler,
  } = useInput((value) =>
    /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/.test(value)
  );
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
  } = useInput((value) => value.trim().length >= 6);
  const {
    userInput: confirmPasswordInput,
    userInputIsValid: confirmPasswordInputIsValid,
    hasError: confirmPasswordInputHasError,
    userInputChangeHandler: confirmPasswordChangeHandler,
    userInputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value.trim() === passwordInput);

  let formIsValid = false;
  if (
    nameInputIsValid &&
    emailInputIsValid &&
    passwordInputIsValid &&
    confirmPasswordInputIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/users/signup",
        {
          method: "POST",
          body: JSON.stringify({
            name: nameInput,
            email: emailInput,
            password: passwordInput,
            passwordConfirm: confirmPasswordInput,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  const nameInputClasses = nameInputHasError
    ? `${style["form-control"]} ${style["invalid"]}`
    : style["form-control"];
  const emailInputClasses = emailInputHasError
    ? `${style["form-control"]} ${style["invalid"]}`
    : style["form-control"];
  const passwordInputClasses = passwordInputHasError
    ? `${style["form-control"]} ${style["invalid"]}`
    : style["form-control"];
  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? `${style["form-control"]} ${style["invalid"]}`
    : style["form-control"];

  return (
    <AuthForm
      onSubmit={formSubmitHandler}
      authFormTitle="CREATE YOUR ACCOUNT"
      authFormBtn="Signup"
    >
      <div className={nameInputClasses}>
        <label htmlFor="user-name">Name</label>
        <input
          type="text"
          id="user-name"
          name="user-name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameInput}
        />
      </div>
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
          autoComplete="new-password"
        />
      </div>
      <div className={confirmPasswordInputClasses}>
        <label htmlFor="user-Confirmpassword">Confrim Password</label>
        <input
          type="password"
          id="user-Confirmpassword"
          name="user-Confirmpassword"
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          value={confirmPasswordInput}
          autoComplete="new-password"
        />
      </div>
    </AuthForm>
  );
}
