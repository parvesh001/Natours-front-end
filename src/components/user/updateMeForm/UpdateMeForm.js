import React, { useContext, useRef, useState } from "react";
import FormLayout from "../../../UIs/authFormLayout/AuthFormLayout";
import Input from "../../../UIs/Input/Input";
import useInput from "../../../hooks/use-input";
import Notification from "../../../UIs/notification/Notification";
import { AuthContext } from "../../../context/auth-ctx"
import style from "./UpdateMeForm.module.scss";

export default function ProfileSettings() {
  const authCtx = useContext(AuthContext);
  const [notification,setNotification] = useState(null)
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

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    const photo = profilePhotoRef.current.files[0]
    const formData = new FormData()
    formData.append('name', nameInput)
    formData.append('email', emailInput)
    formData.append('photo', photo)
    
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/users/updateMe`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            "Authorization": "Bearer " + authCtx.token
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      setNotification({ status: "success", message: "User Updated!" });
      setTimeout(() => {
        setNotification(null);
        authCtx.setUser({...data.data.user})
      }, 1000);
    } catch (err) {
      setNotification({ status: "fail", message: err.message});
      setTimeout(() => setNotification(null), 1000);
    }
  };

  const nameInputClass = nameInputHasError ? "invalid" : "";
  const emailInputClass = emailInputHasError ? "invalid" : "";

  const profilePhotoURL = `${process.env.REACT_APP_DOMAIN_NAME}/img/users/${authCtx.user.photo}`
  
  return (
    <FormLayout
      onSubmit={formSubmitHandler}
      authFormTitle="YOUR ACCOUNT SETTINGS"
      authFormBtn="SAVE SETTINGS"
      formIsValid = {formIsValid}
    >
       {notification && <Notification notification={notification} />}
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
          src={profilePhotoURL}
          alt={authCtx.user.name}
        />
        <div className={style["form-control"]}>
          <input type="file" id="photo" ref={profilePhotoRef} />
          <label htmlFor="photo">Choose New Photo</label>
        </div>
      </div>
    </FormLayout>
  );
}
