import React from "react";
import User from "./User";
import style from "./Users.module.scss";

export default function Users(props) {
  return (
    <div className={style["users-container"]}>
      {props.users.map((user) => {
        return (
          <User
            key={user._id}
            id={user._id}
            name={user.name}
            email={user.email}
            photo={user.photo}
            onEditing={() =>
              props.onEditing({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
              })
            }
            onDeleting={() => props.onDeleting(user._id)}
          />
        );
      })}
    </div>
  );
}
