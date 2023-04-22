import React from "react";
import style from "./StandardBtnTP.module.scss";

export default function StandardBtnTP(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${style['standard-btn-tp']} ${
        props.className
      }`}
    >
      {props.children}
    </button>
  );
}