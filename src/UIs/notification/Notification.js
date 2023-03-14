import React from "react";
import style from "./Notification.module.scss";

export default function Notification(props) {
  return (
    <div
      className={`${style["notification"]} ${
        props.notification.status === "fail" ? style["error"] : ""
      }`}
    >
      <p>{props.notification.message}</p>
    </div>
  );
}
