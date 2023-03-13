import React from "react";
import useInput from "../../hooks/use-input";
import AuthForm from "../../UIs/authForm/AuthForm";
import Input from "../../UIs/Input/Input";

export default function PasswordRest() {
  const {
    userInput: currentPassword,
    userInputIsValid: currentPasswordIsValid,
    hasError: currentPasswordHasError,
    userInputChangeHandler: currentPasswordChangeHandler,
    userInputBlurHandler: currentPasswordBlurHandler,
  } = useInput((value) => value.trim().length >= 6);
  const {
    userInput: newPassword,
    userInputIsValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    userInputChangeHandler: newPasswordChangeHandler,
    userInputBlurHandler: newPasswordBlurHandler,
  } = useInput((value) => value.trim().length >= 6);
  const {
    userInput: confirmPassword,
    userInputIsValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    userInputChangeHandler: confirmPasswordChangeHandler,
    userInputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value.trim() === newPassword);

  let formIsValid = false;
  if (currentPasswordIsValid && newPasswordIsValid && confirmPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    console.log("submitted!");
  };

  const currentPasswordClass = currentPasswordHasError ? "invalid" : "";
  const newPasswordClass = newPasswordHasError ? "invalid" : "";
  const confirmPasswordClass = confirmPasswordHasError ? "invalid" : "";

  return (
    <AuthForm
      onSubmit={formSubmitHandler}
      authFormTitle="RESET YOUR PASSWORD"
      authFormBtn="Reset"
    >
      <Input
        className={currentPasswordClass}
        label="Current Password"
        id="current-password"
        type="password"
        onChange={currentPasswordChangeHandler}
        onBlur={currentPasswordBlurHandler}
        value={currentPassword}
      />
      <Input
        className={newPasswordClass}
        label="New Password"
        id="new-password"
        type="password"
        onChange={newPasswordChangeHandler}
        onBlur={newPasswordBlurHandler}
        value={newPassword}
      />
      <Input
        className={confirmPasswordClass}
        label="Confirm Password"
        id="confirm-password"
        type="password"
        onChange={confirmPasswordChangeHandler}
        onBlur={confirmPasswordBlurHandler}
        value={confirmPassword}
      />
    </AuthForm>
  );
}
