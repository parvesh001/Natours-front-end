import React from "react";
import style from "./StandardBtn.module.scss";

export default function StandardBtn(props) {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${style["standard-btn"]} ${props.className} ${
        props.danger ? style["danger"] : ""
      }`}
    >
      {props.children}
    </button>
  );
}
