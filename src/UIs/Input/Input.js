import React from "react";
import style from "./Input.module.scss";

export default function Input(props) {
  return (
    <div className={`${style["form-control"]} ${style[props.className]}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        placeholder={props.placeholder}
        autoComplete="off"
      />
    </div>
  );
}
