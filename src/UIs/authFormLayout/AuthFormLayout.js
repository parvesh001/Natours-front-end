import React from "react";
import StandardBtn from "../StandardBtn/StandardBtn";
import style from "./AuthFormLayout.module.scss";

export default function AuthFormLayout(props) {
  return (
    <form className={style["auth-form"]} onSubmit={props.onSubmit}>
      <h2 className={style["title"]}>{props.authFormTitle}</h2>
      {props.children}
      <div className={style["auth-form-controllers"]}>
        <StandardBtn type="submit" disabled={!props.formIsValid}>{props.authFormBtn}</StandardBtn>
        {props.forManagement && <StandardBtn type="button" danger={true} onClick={props.onCancel}>
          Cancel
        </StandardBtn>}
      </div>
    </form>
  );
}
