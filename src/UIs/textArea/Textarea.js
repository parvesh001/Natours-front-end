import React from "react";
import style from './Textarea.module.scss'

export default function Textarea(props) {
  return (
    <div className={style["form-control"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea id={props.id} name={props.name} />
    </div>
  );
}
