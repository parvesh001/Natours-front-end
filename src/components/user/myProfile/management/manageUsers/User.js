import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import style from "./User.module.scss";

export default function User(props) {
  return (
    <div className={style["user-card"]}>
      <div className={style["card-header"]}>
        <div className={style["card-picture-overlay"]} />
        <div className={style["card-picture"]}>
          <img
            src={`${process.env.REACT_APP_DOMAIN_NAME}/img/users/${props.photo}`}
            alt={props.name}
          />
        </div>
      </div>
      <div className={style["card-body"]}>
        <h1>{props.name}</h1>
        <span>{props.email}</span>
      </div>
      <div className={style["card-footer"]}>
        <AiOutlineEdit className={style['controller']} onClick={props.onEditing}/>
        <AiOutlineDelete className={style['controller']} onClick={props.onDeleting}/>
      </div>
    </div>
  );
}
