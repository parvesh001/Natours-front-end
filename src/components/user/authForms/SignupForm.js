import React, { useContext, useState } from "react";
import AuthFormLayout from "../../../UIs/authFormLayout/AuthFormLayout";
import useInput from "../../../hooks/use-input";
import Input from "../../../UIs/Input/Input";
import Model from "../../../UIs/Model/Model";
import Loader from "../../../UIs/loader/Loader";
import Notification from "../../../UIs/notification/Notification";
import { AuthContext } from "../../../context/auth-ctx";
import { useNavigate } from "react-router-dom";
import style from './SignupForm.module.scss'

export default function SignupForm() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [notification, setNotification] = useState(null);


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
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/users/signup`,
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
      setNotification({ status: "success", message: "Signedup Successfully!" });
      setTimeout(() => {
        setNotification(null);
        authCtx.setToken(data.token);
        authCtx.setUser(data.data.user);
        navigate("/");
      }, 1000);
    } catch (err) {
      setNotification({ status: "fail", message: err.message });
      setTimeout(() => setNotification(null), 1000);
    }
    setIsLoading(false);
  };

  const nameInputClasses = nameInputHasError ? "invalid" : "";
  const emailInputClasses = emailInputHasError ? "invalid" : "";
  const passwordInputClasses = passwordInputHasError ? "invalid" : "";
  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? "invalid"
    : "";


  if (isLoading)
    return (
      <Model>
        <Loader />
      </Model>
    );

  return (
    <div className={style['signup-form']}>
      <AuthFormLayout
        onSubmit={formSubmitHandler}
        authFormTitle="CREATE YOUR ACCOUNT"
        authFormBtn="Signup"
      >
        {notification && <Notification notification={notification} />}
        <Input
          className={nameInputClasses}
          type="text"
          id="user-name"
          name="user-name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameInput}
          label="Name"
        />

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
          autoComplete="new-password"
          label="Password"
        />

        <Input
          className={confirmPasswordInputClasses}
          type="password"
          id="user-Confirmpassword"
          name="user-Confirmpassword"
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          value={confirmPasswordInput}
          autoComplete="new-password"
          label="Confirm Password"
        />
      </AuthFormLayout>
    </div>
  );
}
