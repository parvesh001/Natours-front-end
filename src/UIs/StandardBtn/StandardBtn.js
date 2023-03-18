import React from "react";
import style from './StandardBtn.module.scss'

export default function StandardBtn(props) {
  return (
    <button type={props.type} onClick={props.onClick} className={`${style['standard-btn']} ${props.className}`}>
      {props.children}
    </button>
  );
}
