import React from "react";
import style from "./Textarea.module.scss";

export default function Textarea(props) {
  return (
    <div className={`${style["form-control"]} ${style[props.className]}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        placeholder={props.placeholder}
        autoComplete="off"
      />
    </div>
  );
}
