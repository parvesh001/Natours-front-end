import React, { useState } from "react";
import AuthFormLayout from "../../../UIs/authFormLayout/AuthFormLayout";
import Input from "../../../UIs/Input/Input";
import useInput from "../../../hooks/use-input";
import Notification from "../../../UIs/notification/Notification";
import Loader from "../../../UIs/loader/Loader";
import Model from "../../../UIs/Model/Model";
import style from "./ForgetPasswordForm.module.scss";

export default function ForgetPasswordForm() {
  const [emailIsSent, setEmailIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

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
  if (emailInputIsValid) formIsValid = true;

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/users/forgetPassword`,
        {
          method: "POST",
          body: JSON.stringify({ email: emailInput }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      setNotification({ status: "success", message: "Email Was Sent" });
      setTimeout(() => {
        setNotification(null);
        setEmailIsSent(true);
      }, 2000);
    } catch (err) {
      setNotification({ status: "fail", message: err.message });
      setTimeout(() => setNotification(null), 2000);
    }
    setIsLoading(false);
  };

  const emailInputClasses = emailInputHasError ? "invalid" : "";

  if (isLoading)
    return (
      <Model>
        <Loader />
      </Model>
    );

  return (
    <div className={style["ForgetPasswordForm"]}>
      {notification && <Notification notification={notification} />}
      {!emailIsSent && (
        <AuthFormLayout
          onSubmit={formSubmitHandler}
          authFormTitle="FORGET PASSWORD"
          authFormBtn="Forget"
          formIsValid = {formIsValid}
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
        </AuthFormLayout>
      )}
      {emailIsSent && (
        <div className={style["email-sent-msg"]}>
          <p>Email Is Sent To You Please Check Your EmailBox</p>
        </div>
      )}
    </div>
  );
}
