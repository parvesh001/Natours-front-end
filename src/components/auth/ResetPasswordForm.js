import React, { useContext, useState } from "react";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/auth-ctx";
import useInput from "../../hooks/use-input";
import AuthForm from "../../UIs/authForm/AuthForm";
import Input from "../../UIs/Input/Input";
import Loader from "../../UIs/loader/Loader";
import Model from "../../UIs/Model/Model";
import Notification from "../../UIs/notification/Notification";
import style from "./ResetPasswordForm.module.scss";

export default function ResetPasswordForm(props) {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const {
    userInput: passwordInput,
    userInputIsValid: passwordInputIsValid,
    hasError: passwordInputHasError,
    userInputChangeHandler: passwordChangeHandler,
    userInputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length > 6 );
  const {
    userInput: confirmPasswordInput,
    userInputIsValid: confirmPasswordInputIsValid,
    hasError: confirmPasswordInputHasError,
    userInputChangeHandler: confirmPasswordChangeHandler,
    userInputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value.trim() === passwordInput);

  let formIsValid = false;
  if (confirmPasswordInputIsValid && passwordInputIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/users/resetPassword/${props.resetToken}`,
        {
          method: "PATCH",
          body: JSON.stringify({
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
      const { token, data } = await response.json();
      setNotification({ status: "success", message: "Password Resetted Successfully!" });
      setTimeout(() => {
        setNotification(null);
        authCtx.setToken(token);
        authCtx.setUser(data.user)
        navigate("/");
      }, 1000);
    } catch (err) {
      setNotification({ status: "fail", message: err.message });
      setTimeout(() => setNotification(null), 1000);
    }
    setIsLoading(false);
  };

  const confirmPasswordInputClasses = confirmPasswordInputHasError ? "invalid" : "";
  const passwordInputClasses = passwordInputHasError ? "invalid" : "";

  if (isLoading)
    return (
      <Model>
        <Loader />
      </Model>
    );

  return (
    <div className={style['reset-password-form']}>
      {notification && <Notification notification={notification} />}
      <AuthForm
        onSubmit={formSubmitHandler}
        authFormTitle="RESET YOUR PASSWORD"
        authFormBtn="Reset"
      >
        <Input
          className={passwordInputClasses}
          type="password"
          id="user-password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={passwordInput}
          label="Password"
        />

        <Input
          className={confirmPasswordInputClasses}
          type="password"
          id="user-confirmPassword"
          name="user-confirmPassword"
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          value={confirmPasswordInput}
          label="Confirm Password"
        />
      </AuthForm>
    </div>
  );
}
