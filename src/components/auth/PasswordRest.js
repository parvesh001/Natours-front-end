import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-ctx";
import useInput from "../../hooks/use-input";
import AuthForm from "../../UIs/authForm/AuthForm";
import Input from "../../UIs/Input/Input";
import Notification from "../../UIs/notification/Notification";



export default function PasswordRest() {
  const authCtx = useContext(AuthContext)
  const [notification, setNotification]=useState(null)
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

  const formSubmitHandler = async(event) => {
    event.preventDefault();
    if (!formIsValid) return;
    try{
      const response = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/v1/users/updateMyPassword`, {
           method:'PATCH',
           body:JSON.stringify({
            oldPassword:currentPassword,
            newPassword:newPassword,
            newPasswordConfirm:confirmPassword
           }),
           headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + authCtx.token

           }
      })
      if(!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
      const data = await response.json()
      setNotification({ status: "success", message: "Password Resetted!" });
      setTimeout(() => {
        setNotification(null);
        authCtx.setToken(data.token);
      }, 1000);
    }catch(err){
      setNotification({ status: "fail", message: err.message});
      setTimeout(() => setNotification(null), 1000);
    }
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
      {notification && <Notification notification={notification} />}
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
