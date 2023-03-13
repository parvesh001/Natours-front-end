import React, { useContext, useRef } from "react";
import AuthForm from "../../UIs/authForm/AuthForm";
import Input from "../../UIs/Input/Input";
import useInput from "../../hooks/use-input";
import { AuthContext } from "../../context/auth-ctx";
import style from "./ProfileSettings.module.scss";

export default function ProfileSettings() {
  const authCtx = useContext(AuthContext);
  const profilePhotoRef = useRef();
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

  let formIsValid = false;

  if (nameInputIsValid && emailInputIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    console.log("form submitted!");
  };

  const nameInputClass = nameInputHasError ? "invalid" : "";
  const emailInputClass = emailInputHasError ? "invalid" : "";

  return (
    <AuthForm
      onSubmit={formSubmitHandler}
      authFormTitle="YOUR ACCOUNT SETTINGS"
      authFormBtn="SAVE SETTINGS"
    >
      <Input
        id="name"
        className={nameInputClass}
        type="text"
        label="Name"
        value={nameInput}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        placeholder={authCtx.user.name}
      />
      <Input
        id="email"
        className={emailInputClass}
        type="text"
        label="Email"
        value={emailInput}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        placeholder={authCtx.user.email}
      />
      <div className={style["change-profile"]}>
        <img
          src={`http://localhost:8080/img/users/${authCtx.user.photo}`}
          alt={authCtx.user.name}
        />
        <div className={style["form-control"]}>
          <input type="file" id="photo" ref={profilePhotoRef} />
          <label htmlFor="photo">Choose New Photo</label>
        </div>
      </div>
    </AuthForm>
  );
}
