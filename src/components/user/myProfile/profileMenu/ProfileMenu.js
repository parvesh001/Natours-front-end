import React, { useContext } from "react";
import { AuthContext } from "../../../../context/auth-ctx";
import { BsArrowBarLeft } from "react-icons/bs";
import style from "./ProfileMenu.module.scss";
import AdminMenu from "./AdminMenu";
import UserMenu from "./UserMenu";

export default function ProfileMenu(props) {
  const authCtx = useContext(AuthContext);
  return (
    <div className={`${style["profile-menu"]} ${props.className}`}>
      <BsArrowBarLeft className={style["close-icon"]} onClick={props.onClose} />
      <UserMenu onClose={props.onClose} />
      {authCtx.user.role === "admin" && <AdminMenu onClose={props.onClose} />}
    </div>
  );
}
