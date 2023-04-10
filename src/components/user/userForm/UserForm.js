import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth-ctx";
import AuthFormLayout from "../../../UIs/authFormLayout/AuthFormLayout";
import useInput from "../../../hooks/use-input";
import Input from "../../../UIs/Input/Input";
import style from "./UserForm.module.scss";

export default function UserForm(props) {
  const { token } = useContext(AuthContext);
  const {
    userInput: nameInput,
    userInputIsValid: nameInputIsValid,
    hasError: nameInputHasError,
    userInputChangeHandler: nameChangeHandler,
    userInputBlurHandler: nameBlurHandler,
  } = useInput(
    (value) => /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/.test(value),
    props.updating ? props.updateData.name : ""
  );
  const {
    userInput: emailInput,
    userInputIsValid: emailInputIsValid,
    hasError: emailInputHasError,
    userInputChangeHandler: emailChangeHandler,
    userInputBlurHandler: emailBlurHandler,
  } = useInput(
    (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    props.updating ? props.updateData.email : ""
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
  const {
    userInput: userRoleInput,
    userInputIsValid: userRoleInputIsValid,
    hasError: userRoleInputHasError,
    userInputChangeHandler: userRoleChangeHandler,
    userInputBlurHandler: userRoleBlurHandler,
  } = useInput(
    (value) =>
      value === "user" ||
      value === "admin" ||
      value === "lead-guide" ||
      value === "guide",
    props.updating ? props.updateData.role : ""
  );

  let formIsValid = false;
  if (!props.updating) {
    if (
      nameInputIsValid &&
      emailInputIsValid &&
      passwordInputIsValid &&
      confirmPasswordInputIsValid &&
      userRoleInputIsValid
    ) {
      formIsValid = true;
    }
  } else {
    if (nameInputIsValid && emailInputIsValid && userRoleInputIsValid) {
      formIsValid = true;
    }
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    props.setIsLoading(true);
    let endpoint = props.updating ? `/${props.updateData.id}` : "";
    let method = props.updating ? "PATCH" : "POST";
    let body = props.updating
      ? JSON.stringify({
          name: nameInput,
          email: emailInput,
          role: userRoleInput,
        })
      : JSON.stringify({
          name: nameInput,
          email: emailInput,
          password: passwordInput,
          passwordConfirm: confirmPasswordInput,
          role: userRoleInput,
        });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/users${endpoint}`,
        {
          method,
          body,
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      props.onFormSubmit(data.data.data);
      props.setNotification({
        status: "success",
        message: props.updating ? "User Updated" : "user created successfully",
      });
      setTimeout(() => props.setNotification(null), 3000);
    } catch (err) {
      props.setNotification({ status: "fail", message: err.message });
      setTimeout(() => props.setNotification(null), 3000);
      console.log(err);
    }
    props.setIsLoading(false);
    props.onCancel();
  };

  const nameInputClasses = nameInputHasError ? "invalid" : "";
  const emailInputClasses = emailInputHasError ? "invalid" : "";
  const passwordInputClasses = passwordInputHasError ? "invalid" : "";
  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? "invalid"
    : "";
  const userRoleInputClasses = userRoleInputHasError ? "invalid" : "";

  return (
    <div className={style["user-form"]}>
      <AuthFormLayout
        onSubmit={formSubmitHandler}
        authFormTitle={props.updating ? "Update User" : "Add New User"}
        authFormBtn={props.updating ? "Update" : "Add"}
        forManagement={true}
        onCancel={props.onCancel}
      >
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

        {!props.updating && (
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
        )}

        {!props.updating && (
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
        )}
        <Input
          className={userRoleInputClasses}
          type="text"
          id="user-role"
          name="user-role"
          onChange={userRoleChangeHandler}
          onBlur={userRoleBlurHandler}
          value={userRoleInput}
          label="User Role"
        />
      </AuthFormLayout>
    </div>
  );
}
