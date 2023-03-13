import React from "react";
import AuthForm from "../../UIs/authForm/AuthForm";
import useInput from "../../hooks/use-input";
import Input from "../../UIs/Input/Input";

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

  const nameInputClasses = nameInputHasError ? "invalid" : "";
  const emailInputClasses = emailInputHasError ? "invalid" : "";
  const passwordInputClasses = passwordInputHasError ? "invalid" : "";
  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? "invalid"
    : "";

  const signupFormStyle = {
    backgroundColor: " #f2f2f2",
    width: " 100vw",
    height: "100vh",
    padding: "10rem 3rem",
  };

  return (
    <div style={signupFormStyle}>
      <AuthForm
        onSubmit={formSubmitHandler}
        authFormTitle="CREATE YOUR ACCOUNT"
        authFormBtn="Signup"
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
      </AuthForm>
    </div>
  );
}
