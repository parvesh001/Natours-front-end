import React from "react";
import StandardBtn from "../StandardBtn";
import style from "./AuthForm.module.scss";

export default function AuthForm(props) {
  return (
    <div className={style["auth-form-container"]}>
      <form className={style["auth-form"]} onSubmit={props.onSubmit}>
        <h2 className={style["title"]}>{props.authFormTitle}</h2>
        {props.children}
        <StandardBtn type="submit">{props.authFormBtn}</StandardBtn>
      </form>
    </div>
  );
}